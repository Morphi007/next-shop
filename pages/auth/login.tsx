import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from "next";
import { signIn,getSession,getProviders } from "next-auth/react";
import NextLink from 'next/link';
//import { tesloApi } from '@/api';
import AuthLayout from '@/components/layout/AuthLayout';
import { useForm } from 'react-hook-form';
import { validation } from '@/utils';
import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthContext} from '@/context';

type FormData = {
	email: string;
	password: string;
};

const LoginPage = () => {
	const router=useRouter()
	const {register,handleSubmit,formState: { errors },} = useForm<FormData>();
	const [showError,setShowError] = useState(false);
	//const {loginUser} = useContext(AuthContext)
   
	const [provider, setProvider] = useState<any>({})


	useEffect(() => {
		getProviders().then(prov =>{
			setProvider(prov)
		})
		
	},[])
	
	  
	const onLoginUser = async ({ email, password }: FormData) => {
		setShowError(false)
          
       // const isValidLogin = await loginUser(email, password);
		
		//if(!isValidLogin){
			
		//	setShowError(true)
			 // setTimeout(() => {setShowError(true)}, 3000);
			//  return ;
		 // }	
		  
		  //TODO: navegar a pantalla que el usuario estaba
        // const destination =router.query.p?.toString() || "/";
		 // router.replace(destination)

		  /*

		try {
			const { data } = await tesloApi.post('/user/login', { email, password });
			const { token, user } = data;
			console.log({token,user});
		} catch (error) {
			setTimeout(() => {setShowError(true)}, 3000);
		} */

		signIn("credentials",{email,password});
	
	};
      

	//Todo:navegar a la patanlla que el usuario estaba
	return (
		<AuthLayout title={'ingresar'}>
			<form onSubmit={handleSubmit(onLoginUser)} noValidate>
			<Box sx={{ width: 350, padding:'10px 20px' }}>

				<Grid container sx={{ width: 350, padding: '10px 20px' }} spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h1" component="h1">
							Iniciar seccion
						</Typography>
					</Grid>
					<Chip
						label="no reconocemos ese usuario / contraseña"
						color="error"
						icon={<ErrorOutline />}
						className="fadeIn"
						sx={{display:showError?"flex":"none"}}
						
					/>
					<Grid item xs={12}>
						<TextField
							type="email"
							label="Correo"
							variant="filled"
							fullWidth
							{...register('email', {
								required: 'este campo es requerido',
								validate: validation.isEmail,
							})}
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Password"
							type="password"
							variant="filled"
							fullWidth
							{...register('password', {
								required: 'Este campo es requerido',
								minLength: { value: 6, message: 'Mínimo 6 caracteres' },
							})}
							error={!!errors.password}
							helperText={errors.password?.message}
							/>
					</Grid>
					<Grid item xs={12}>
						<Button
							type="submit"
							color="secondary"
							className="circular-btn"
							size="large"
							fullWidth
							>
							Ingresar
						</Button>
					</Grid>
					<Grid item xs={12} display="flex" flexDirection="column" justifyContent="end">
						<NextLink href={router.query.p ?`/auth/register?p=${router.query.p}`:"/auth/register"} passHref legacyBehavior>
							<Link underline="always">Crear una cuenta</Link>
						</NextLink>
					</Grid>
				</Grid>
				
			{	<Grid item xs={12} display="flex" flexDirection="column" justifyContent={"end"} >
				  <Divider sx={{ width: '100%', mb: 2 }} />
				    {
						Object.values(provider).map((provider:any)=>{
                            
							 if(provider.id==="credentials") return (<div key="credentials"></div>)
							 return(
                                 <Button key={provider.id} variant="outlined" fullWidth color='primary' sx={{mb:1}} onClick={()=>signIn(provider.id)} >
                                     {provider.name}
								 </Button>

							 )
						})
					}
				</Grid> }
           
			</Box>
			</form>
		</AuthLayout>
	);
};


//redireciona y proteje la session 


export const getServerSideProps: GetServerSideProps = async ({req,query}) => {
  
	const session =await getSession({req})
    console.log({session})
	const {p = "/" }=query;
	
	if(session){
		return {
		  redirect:{
			destination: p.toString(),
			permanent: false
		  }
		}
	}
  
	return {
	  props: {}
	}
  }
  

export default LoginPage;
