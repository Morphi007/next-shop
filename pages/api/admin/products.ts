import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { isValidObjectId } from 'mongoose';
import { IProduct } from '@/interface';
import { Product } from '@/models';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = { message: string } | IProduct[] | IProduct;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getProducts(req, res);
		case 'PUT':
			return updateProducts(req, res);
		case 'POST':
			return createProducts(req, res);
		default:
			return res.status(400).json({ message: 'Bad request' });
	}
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	await db.connect();

	const products = await Product.find().sort({ title: 'asc' }).lean();

	await db.disconnect();

	TODO: 'tendremos que actualizar la imagenes';

	const updatedProducts = products.map( product => {
        product.images = product.images.map( image => {
            return image.includes('http') ? image : `${ process.env.HOST_NAME}products/${ image }`
        });

        return product;
    })


	 res.status(200).json(updatedProducts);
};

const updateProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { _id, images = [] } = req.body as IProduct;

	if (!isValidObjectId(_id)) {
		return res.status(400).json({ message: 'El id del producto no es valido' });
	}

	if (images.length < 2) {
		return res.status(400).json({ message: 'es necesario  al menos 2 imagenes' });
	}

	TODO: 'POSIBLEMENTE TENDREMOS UN LOCALHOTS:3000/PRODUCTS/ASDASD.JPG';

	try {
		await db.connect();
		const product = await Product.findById(_id);

		if (!product) {
			await db.disconnect();
			return res.status(400).json({ message: 'El producto no existe' });
		}

		TODO: 'eliminar fotos en cloudinary';

		product.images.forEach(async (image) => {
			//borrar de clou dinary
			//https://res.cloudinary.com/drlzzgvl2/image/upload/v1686761228/p6trdm86p2kfzoyfwbaa.webp
			if (!images.includes(image)) {
				const [fileId, extension] = image
					.substring(image.lastIndexOf('/') + 1)
					.split('.');
				console.log(image, fileId, extension);
				await cloudinary.uploader.destroy(fileId);
			}
		});

		await product.updateOne(req.body);
		await db.disconnect();

		return res.status(200).json(product);
	} catch (error) {
		console.log(error);
		await db.disconnect();
		return res.status(400).json({ message: 'Revisar la consola del servidor' });
	}
};

 const createProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { images = [] } = req.body;

	TODO: 'POSIBLEMENTE TENDREMOS UN LOCALHOTS:3000/PRODUCTS/ASDASD.JPG';

	if (images.length < 2) {
		return res.status(400).json({ message: 'es necesario  al menos 2 imagenes' });
	}

	try {
		await db.connect();

		const productInDB = await Product.findOne({ slug: req.body.slug });

		if (productInDB) {
			await db.disconnect();
			return res.status(400).json({ message: 'Ya existe un producto con ese slug' });
		}
		const product = new Product(req.body);
		await product.save();
		await db.disconnect();

		res.status(201).json(product);
	} catch (error) {
		console.log(error);
		await db.disconnect();
		return res.status(400).json({ message: 'Revisar la consola del servidor' });
	}
};
