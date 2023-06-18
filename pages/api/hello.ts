import { NextApiRequest,NextApiResponse} from "next";

type Data = {
	message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	

	res.status(200).json({ message: 'Proceso realizado correctamente' });
}
