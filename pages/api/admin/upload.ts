import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = {
	message: string;
};

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return uploadFile(req, res);

		default:
			res.status(400).json({ message: 'Proceso realizado correctamente' });
	}
}

//el save file es para grabar la imagenes en file system
const saveFile = async (file: formidable.File): Promise<string> => {
	//const data = fs.readFileSync(file.filepath);
	//fs.writeFileSync(`./public/${file.originalFilename}`,data);
	//fs.unlinkSync(file.filepath);
	//return;

	const { secure_url } = await cloudinary.uploader.upload(file.filepath);
	return secure_url;
};

const parseFile = async (req: NextApiRequest): Promise<string> => {
	return new Promise((resolve, reject) => {
		const form = new formidable.IncomingForm(); //formidable para analizar el mensaje

		form.parse(req, async (err, fields, files) => {
			//console.log({err,fields,files})

			if (err) {
				return reject(err);
			}
			const filePath = await saveFile(files.file as formidable.File); //si tenemos un aimagen la procesamos en la funcion
			resolve(filePath);
		});
	});
};

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const imageUrl = await parseFile(req); //hacemos el parse de los archivos

	res.status(200).json({ message: imageUrl });
};
