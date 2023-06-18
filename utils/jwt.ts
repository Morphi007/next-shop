import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
	if (!process.env.JWT_SCRET_SEED) {
		throw new Error('No hay semilla de JWT -REVISAR variable de entorno');
	}

	return jwt.sign(
		//payload:
		{ _id, email },

		//seed
		process.env.JWT_SCRET_SEED,

		//Option
		{ expiresIn: '30d' },
	);
};


export const isValidToken = (token:string):Promise<string> =>{
        
	if (!process.env.JWT_SCRET_SEED) {
		throw new Error('No hay semilla de JWT -REVISAR variable en el servidor');
	}

     if(token.length<=10){
		return Promise.reject("JWT no es valido")
	 }
	     
	
	   return new Promise((resolve, reject) =>{
			 try {
				 
				jwt.verify(token,process.env.JWT_SCRET_SEED||"",(err,payload)=>{
                     if(err) return reject("JWT NO ES VALIDO ")
                     
					 const {_id}=payload as{_id:string}

					 resolve(_id)
				} )
			 } catch (error) {
				reject("JWT NO ES VALIDO ")
			 }
		 } )

}