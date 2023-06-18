import bcrypt from 'bcryptjs';
import { db } from '@/database';
import { User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { jwt } from '@/utils';
import { isValidToken } from '@/utils/jwt';

type Data =
	| { message: string }
	| {
			token: string;
			user: {
				email: string;
				name: string;
				role: string;
			};
	  };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return checkJWT(req, res);

		default:
			res.status(400).json({
				message: 'bad request',
			});
	}
}
const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { token = '' } = req.cookies;

	let userId = '';

	try {
		userId = await isValidToken(token);
	} catch (error) {
		res.status(401).json({
			message: 'Token de autorizacion no valido',
		});
	}

	await db.connect();
	const user = await User.findById(userId).lean();
    await db.disconnect();
	if(!user){
		res.status(400).json({
			message: 'no existe el usuario con ese ID',
		});
	}
	
	
	const {_id,email,role,name} =user;
    



    return res.status(200).json({
             token:jwt.signToken(_id,email),
             user:{
                email,role,name
             }

    })

};
