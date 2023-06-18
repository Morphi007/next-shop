import { db } from '@/database';
import { Order, Product, User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	numberOfOrders: number;
	paidOrders: number; // ispad true
	notPaidOrders: number;
	numberOfClients: number; //role:client
	numberOfProducts: number; //
	productsWithNoInventory: number; //0
	lowInventory: number; // productos con menos de 10 o menos
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  //	const numberOfOrders = await Order.count();
  //	const paidOrders = await Order.find({ isPaid: true }).count();
	//const numberOfClients = await User.find({ role: 'client' }).count();
	//const numberOfProducts = await Product.count();
	//const productsWithNoInventory = await Product.find({ inStock: 0 }).count();
	//const lowInventory = await Product.find({ inStock: {$lte:10} }).count();
  
  
	await db.connect();
  
  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  ] = await Promise.all([
    Order.count(),
    Order.count({ isPaid: true }),
    User.count({ role: 'client' }),
    Product.count(),
    Product.count({ inStock: 0 }),
    Product.count({ inStock: { $lte: 10 } }),
  ]);
  
  await db.disconnect();



	return res.status(200).json({
		numberOfOrders,
		paidOrders,
		notPaidOrders:numberOfOrders-paidOrders,
		numberOfClients,
		numberOfProducts,
		productsWithNoInventory,
		lowInventory,
	});
}
