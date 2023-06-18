import { db, seedDatabase } from '@/database';
import { Product, User} from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (process.env.NODE_ENV === 'production') {
		return res.status(401).json({ message: 'No tiene acceso a este API' });
	}

	/* `await db.connect();` is connecting to the database. It is an asynchronous operation that waits for
	the connection to be established before proceeding with the rest of the code. */
	await db.connect();

   await  User.deleteMany();
   await  User.insertMany(seedDatabase.initialData.users)

	await Product.deleteMany();
	await Product.insertMany(seedDatabase.initialData.products);

	await db.disconnect();

	res.status(200).json({ message: 'Proceso realizado correctamente' });
}
