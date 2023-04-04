import NextLink from 'next/link';
import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayaout } from '@/components/layout';
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Divider,
	Grid,
	Link,
	Typography,
} from '@mui/material';
import {
	CreditCardOffOutlined,
	CreditScore,
	CreditScoreOutlined,
} from '@mui/icons-material';

type Props = {};

const ordersPage = (props: Props) => {
	return (
		<ShopLayaout
			title={'Resumen de orde 1384616186'}
			pageDescription={'resumen de la orden'}
		>
			<Typography variant="h1" component="h1">
				Orden: ABC14556
			</Typography>
			<Chip
				sx={{ my: 2 }}
				label="pendiente de pago"
				variant="outlined"
				color="error"
				icon={<CreditCardOffOutlined />}
			/>
			<Chip
				sx={{ my: 2 }}
				label="orden pagada"
				variant="outlined"
				color="success"
				icon={<CreditScoreOutlined />}
			/>

			<Grid container>
				<Grid item xs={12} sm={7}>
					<CartList />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className="summary-card">
						<CardContent>
							<Typography variant="h2">Resumen(3 productos )</Typography>
							<Divider sx={{ my: 1 }} />
							{/*Confirmar y direccion orden */}
							<Box display="flex" justifyContent="space-between">
								<Typography variant="subtitle1"> Direcion de entrega</Typography>
								<NextLink href={'/checkout/address'} passHref legacyBehavior>
									<Link underline="always"> Editar</Link>
								</NextLink>
							</Box>
							<Typography> Morphy DM</Typography>
							<Typography>AV.SVTE</Typography>
							<Typography> Calle #1</Typography>
							<Typography> Estado unidos</Typography>
							<Typography> +1829546546</Typography>
							<Divider sx={{ my: 1 }} />
							<Box display="flex" justifyContent="end">
								<NextLink href={'/checkout/address'} passHref legacyBehavior>
									<Link underline="always"> Editar</Link>
								</NextLink>
							</Box>
							{/*summary orden */}
							<OrderSummary />
							<Box sx={{ mt: 3 }}>
								{/* TODO*/}
								<h1>Pagar</h1>
								<Chip
									sx={{ my: 2 }}
									label="orden pagada"
									variant="outlined"
									color="success"
									icon={<CreditScoreOutlined />}
								/>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayaout>
	);
};

export default ordersPage;
