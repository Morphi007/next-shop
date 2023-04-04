import NextLink from 'next/link';
import AuthLayout from '@/components/layout/AuthLayout';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';

type Props = {};

const registerPage = (props: Props) => {
	return (
		<AuthLayout title={'registrase'}>
			<Grid container sx={{ width: 350, padding: '10px 20px' }} spacing={2}>
				<Grid item xs={12}>
					<Typography variant="h1" component="h1">
						Registrase
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<TextField label="ingresa correo electronico" variant="filled" fullWidth />
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="ingresa password"
						variant="filled"
						type="password"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="confirmar password"
						variant="filled"
						type="password"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<Button color="secondary" className="circular-btn" size="large" fullWidth>
						Registrarse
					</Button>
				</Grid>

				<Grid item xs={12} display="flex" justifyContent="end">
					<NextLink href="/auth/login" passHref legacyBehavior>
						<Link underline="always">Iniciar sesion</Link>
					</NextLink>
				</Grid>
			</Grid>
		</AuthLayout>
	);
};

export default registerPage;
