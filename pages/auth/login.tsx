import AuthLayout from '@/components/layout/AuthLayout';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import NextLink from 'next/link';
import React from 'react';

type Props = {};

const LoginPage = (props: Props) => {
	return (
		<AuthLayout title={'ingresar'}>
			<Grid container sx={{ width: 350, padding: '10px 20px' }} spacing={2}>
				<Grid item xs={12}>
					<Typography variant="h1" component="h1">
						Iniciar seccion
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<TextField label="Correo" variant="filled" fullWidth />
				</Grid>
				<Grid item xs={12}>
					<TextField label="Password" type="password" variant="filled" fullWidth />
				</Grid>
				<Grid item xs={12}>
					<Button color="secondary" className="circular-btn" size="large" fullWidth>
						Ingresar
					</Button>
				</Grid>
				<Grid item xs={12} display="flex" justifyContent="end">
					<NextLink href={'/auth/register'} passHref legacyBehavior>
						<Link underline="always">Crear una cuenta</Link>
					</NextLink>
				</Grid>
			</Grid>
		</AuthLayout>
	);
};

export default LoginPage;
