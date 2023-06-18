import { db } from '@/database';
import { IPaypal } from '@/interface';
import { Order } from '@/models';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return payOrder(req, res);
		default:
			res.status(400).json({ message: 'bas request' });
	}
}

const getPaypalBearerToken = async (): Promise<string | null> => {
	const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
	const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

	const base64Token = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`, 'utf-8').toString(
		'base64',
	);
	const body = new URLSearchParams('grant_type=client_credentials');

	try {
		const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${base64Token}`,
			},
		});

		return data.access_token;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(error.response?.data);
		} else {
			console.log(error);
		}
		return null;
	}
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	//ToDo: Validar Sesion del usuario
	//TODO: Valida mongoID

	const paypalBeareToken = await getPaypalBearerToken();

	if (!paypalBeareToken) {
		return res.status(400).json({ message: 'no se puede confirmar el token en paypal' });
	}

	const { transactionId = '', orderId = '' } = req.body;

	const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(
		`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
		{
			headers: {
				Authorization: `Bearer ${paypalBeareToken}`,
			},
		},
	);

	if (data.status !== 'COMPLETED') {
		return res.status(401).json({ message: 'Orden no recnoocida ' });
	}

	await db.connect();
	const dbOrder = await Order.findById(orderId);

	if (!dbOrder) {
		await db.disconnect();
		return res.status(400).json({ message: 'Orden no existe en nuestra base de Datos ' });
	}

	if (dbOrder?.total !== Number(data.purchase_units[0].amount.value)) {
		await db.disconnect();
		return res
			.status(400)
			.json({ message: 'lo montos de paypal y nuestra orden no son iguales' });
	}

	dbOrder.transactionId = transactionId;
	dbOrder.isPaid = true;
	dbOrder.save();
	await db.disconnect();

	res.status(200).json({ message: 'orden pagada' });
};
