import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession, signIn} from 'next-auth/react';
import AuthLayout from '@/components/layout/AuthLayout';
import { Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
//import { tesloApi } from '@/api';
import { ErrorOutline } from '@mui/icons-material';
import { validation } from '@/utils';
import { AuthContext } from '@/context';

type FormData = {
	name: string;
	email: string;
	password: string;
};

const RegisterPage = ({}) => {
	const {registerUser} = useContext(AuthContext)

	const router=useRouter()

	const {register,handleSubmit,formState: { errors },} = useForm<FormData>();
	const [showError,setShowError] = useState(false);
	const [errorMessage,setErrorMessage] = useState("");
	
	const onRegisterForm = async({name,email,password}:FormData) => {
		
	   setShowError(false)
        
       const {hasError,message} = await registerUser(name, email, password)       
	   
	   if(hasError){
	 	   setShowError(false)
			setErrorMessage(message!)
		  setTimeout(() => {setShowError(true)}, 3000);
		  return;

	   }
	   
	  //TODO: navegar a pantalla que el usuario estaba
	 // const destination =router.query.p?.toString() || "/";
	  //router.replace(destination)
           
	   /*
		try {
			setShowError(false)
			const {data}=await tesloApi.post("/user/register",{name,email,password})
	
			const {token,user}=data;
			console.log({token,user})
			
		  } catch (error) {
			setTimeout(() => {setShowError(true)}, 3000);
		}
		*/

		signIn("credentials",{email,password});
         
	}; // end of function

	return (
		<AuthLayout title={'registrase'}>
			<form onSubmit={handleSubmit(onRegisterForm )}  noValidate>

			
			<Grid container sx={{ width: 350, padding: '10px 20px' }} spacing={2}>
				<Grid item xs={12}>
					<Typography variant="h1" component="h1">
						Registrase
					</Typography>
				</Grid>
				<Grid item xs={12}>
				     <Chip
						label="no reconocemos ese usuario / contraseña"
						color="error"
						icon={<ErrorOutline />}
						className="fadeIn"
						sx={{display:showError?"flex":"none"}}
						
					/>
					<TextField label="usuario" variant="filled" fullWidth 
					     
						 {...register("name", {
							required: 'Este campo es requerido',
							minLength: { value: 2, message: 'Mínimo 2 caracteres' },
						})}
						error={!!errors.name}
						helperText={errors.name?.message}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="ingresa correo"
						variant="filled"
						type="email"
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
						label="password"
						variant="filled"
						type="password"
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
					<Button type="submit" color="secondary" className="circular-btn" size="large" fullWidth >
						Registrarse
					</Button>
				</Grid>

				<Grid item xs={12} display="flex" justifyContent="end">
					<NextLink href={router.query.p ?`/auth/login?p=${router.query.p}`:"/auth/login"} passHref legacyBehavior>
						<Link underline="always">Iniciar sesion</Link>
					</NextLink>
				</Grid>
			</Grid>
			</form>
		</AuthLayout>
	);
};




//redireciona y proteje la session 
export const getServerSideProps: GetServerSideProps = async ({req,query}) => {
  
	const session =await getSession({req})
  
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


export default RegisterPage;
