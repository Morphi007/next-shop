// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { Product } from '@/models';
import { IProduct } from '@/interface';

type Data = { message: string } | IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getProductBySlug(req, res);
		default:
			return res.status(401).json({ message: 'no existe' });
	}
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { slug } = req.query;

	await db.connect();
	const product = await Product.findOne({ slug }).lean();

	await db.disconnect();

	if (!product) {
		return res.status(404).json({
			message: 'Producto no encontrado',
		});
	}

	product.images = product.images.map( image => {
        return image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`
    });

    return res.json( product );
};
