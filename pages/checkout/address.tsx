import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '@/context';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { ShopLayaout } from '@/components/layout';
import {
	Box,
	Button,
	FormControl,
	Grid,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import { countries, jwt } from '@/utils';
import { redirect } from 'next/dist/server/api-utils';
import Cookies from 'js-cookie';

type FormData = {
	firName: string;
	lasName: string;
	address: string;
	address2: string;
	zip: string;
	country: string;
	city: string;
	phone: string;
};

const getAddressFromCookies = (): FormData => {
	return {
		firName:  Cookies.get('firName') || '',
		lasName:  Cookies.get('lasName') || '',
		address:  Cookies.get('address') || '',
		address2: Cookies.get('address2') || '',
		zip:      Cookies.get('zip') || '',
		city:     Cookies.get('city') || '',
		country:  Cookies.get('country') || '',
		phone:    Cookies.get('phone') || '',
	};
};

const AddressPage = () => {

	 const {updateAddress} = useContext(CartContext)
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues:getAddressFromCookies()

		
	});

	const onAddress = async (data: FormData) => {
		/*
		Cookie.set('firName', data.firName);
		Cookie.set('lasName', data.lasName);
		Cookie.set('address', data.address);
		Cookie.set('address2', data.address2 || '');
		Cookie.set('zip', data.zip);
		Cookie.set('city', data.city);
		Cookie.set('country', data.country);
		Cookie.set('phone', data.phone);*/
        updateAddress(data)
		router.push('/checkout/summary');
	};

	return (
		<ShopLayaout title={'Direccion'} pageDescription={'confirmar direccion del destino'}>
			<form onSubmit={handleSubmit(onAddress)} noValidate>
				<Typography variant="h1" component="h1">
					Direccion
				</Typography>
				<Grid container spacing={2} sx={{ mt: 5 }}>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Nombre"
							variant="filled"
							fullWidth
							{...register('firName', {
								required: 'este campo es requerido',
							})}
							error={!!errors.firName}
							helperText={errors.firName?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Apellido"
							variant="filled"
							fullWidth
							{...register('lasName', {
								required: 'este campo es requerido',
							})}
							error={!!errors.lasName}
							helperText={errors.lasName?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Direccion"
							variant="filled"
							fullWidth
							{...register('address', {
								required: 'este campo es requerido',
							})}
							error={!!errors.address}
							helperText={errors.address?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Direccion 2 (Opcional)"
							variant="filled"
							fullWidth
							{...register('address2', {
								required: 'este campo es requerido',
							})}
							error={!!errors.address2}
							helperText={errors.address2?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Codigo Postal"
							variant="filled"
							fullWidth
							{...register('zip', {
								required: 'este campo es requerido',
							})}
							error={!!errors.zip}
							helperText={errors.zip?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
					   {/* <FormControl fullWidth> */}
					   <TextField
                             //select
                            variant="filled"
                            label="País"
                            fullWidth
                            // defaultValue={ Cookies.get('country') || countries[0].code }
                            { ...register('country', {
                                required: 'Este campo es requerido'
                            })}
                            error={ !!errors.country }
                            helperText={ errors.country?.message }
                        />
                            {/* {
                                countries.map( country => (
                                    <MenuItem 
                                        key={ country.code }
                                        value={ country.code }
                                    >{ country.name }</MenuItem>
                                ))
                            }
                        </TextField> */}
                    {/* </FormControl> */}
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Ciudad"
							variant="filled"
							fullWidth
							{...register('city', {
								required: 'este campo es requerido',
							})}
							error={!!errors.city}
							helperText={errors.city?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Phone"
							variant="filled"
							fullWidth
							{...register('phone', {
								required: 'este campo es requerido',
							})}
							error={!!errors.phone}
							helperText={errors.phone?.message}
						/>
					</Grid>
				</Grid>
				<Box sx={{ mt: 5 }} display={'flex'} justifyContent="center">
					<Button type="submit" color="secondary" className="circular-btn" size="large">
						Revisar pedido
					</Button>
				</Box>
			</form>
		</ShopLayaout>
	);
};

/*
export const getServerSideProps: GetServerSideProps = async ({req}) => {
	 
	const {token=""}=req.cookies
 
	let isValidToken=false;

    try {
		 await jwt.isValidToken(token)
		 isValidToken=true;
	} catch (error) {
		isValidToken=false;
	}

	if(!isValidToken){
		 return{
			 redirect:{
				destination:"/auth/login?p=/checkout/address",
				permanent:false,
			 }
		 }
	}

	return {
		props: {}
	}
}

*/

export default AddressPage;
