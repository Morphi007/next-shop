import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayaout } from '@/components/layout';
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	CircularProgress,
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
import { dbOrder } from '@/database';
import { IOrder } from '@/interface';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { tesloApi } from '@/api';
import { useState } from 'react';

export type OrderResponseBody = {
	id: string;
	status: "CREATED" | "SAVED" | "APPROVED" | "VOIDED" | "COMPLETED" | "PAYER_ACTION_REQUIRED";
};

interface Props {
	order: IOrder;
}

const OrdersPage: NextPage<Props> = ({ order }) => {
	const router = useRouter();
	const { shippingAddress } = order;
	const [isPaying, setIsPaying] = useState(false);

	const onOrderCompleted = async (details: OrderResponseBody) => {
		if (details.status !== 'COMPLETED') {
			return alert('No hay pago en Paypal');
		}
		setIsPaying(true);

		try {
			const { data } = await tesloApi.post(`/orders/pay`, {
				transactionId: details.id,
				orderId: order._id,
			});

			router.reload();
		} catch (error) {
			setIsPaying(false);
			console.log(error);
		}
	};

	return (
		<ShopLayaout
			title={'Resumen de orde 1384616186'}
			pageDescription={'resumen de la orden'}
		>
			<Typography variant="h1" component="h1">
				Orden: {order._id}
			</Typography>
			{order.isPaid ? (
				<Chip
					sx={{ my: 2 }}
					label="orden pagada"
					variant="outlined"
					color="success"
					icon={<CreditScoreOutlined />}
				/>
			) : (
				<Chip
					sx={{ my: 2 }}
					label="pago pendiente"
					variant="outlined"
					color="error"
					icon={<CreditCardOffOutlined />}
				/>
			)}

			<Grid container className="fadeIn">
				<Grid item xs={12} sm={7}>
					<CartList products={order.orderItems} />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className="summary-card">
						<CardContent>
							<Typography variant="h2">
								Resumen({order.numberOfItems}{' '}
								{order.numberOfItems > 1 ? 'Productos' : 'Producto'})
							</Typography>
							<Divider sx={{ my: 1 }} />
							{/*Confirmar y direccion orden */}
							<Box display="flex" justifyContent="space-between">
								<Typography variant="subtitle1">Direcion de entrega</Typography>
							</Box>
							<Typography>
								{shippingAddress.firName} {shippingAddress.lasName}{' '}
							</Typography>
							<Typography>
								{shippingAddress.address} {shippingAddress.address2}
							</Typography>
							<Typography>
								{shippingAddress.city} {shippingAddress.zip}
							</Typography>
							<Typography>{shippingAddress.country} </Typography>
							<Typography> {shippingAddress.phone} </Typography>
							<Divider sx={{ my: 1 }} />
							<Box display="flex" justifyContent="end">
								<NextLink href={'/checkout/address'} passHref legacyBehavior>
									<Link underline="always"> Editar</Link>
								</NextLink>
							</Box>
							{/*summary orden */}
							<OrderSummary
								orderValues={{
									numberOfItems: order.numberOfItems,
									subTotal: order.subTotal,
									total: order.total,
									tax: order.tax,
								}}
							/>
							<Box sx={{ mt: 3 }} display="flex" flexDirection="column">
								{/* TODO*/}
								<Box
									display="flex"
									justifyContent="center"
									className="fadeIn"
									sx={{ display: isPaying ? 'flex' : 'none' }}
								>
									<CircularProgress />
								</Box>

								<Box
									flexDirection="column"
									sx={{ display: isPaying ? 'none' : 'flex', flex: 1 }}
								>
									{order.isPaid ? (
										<Chip
											sx={{ my: 2 }}
											label="orden pagada"
											variant="outlined"
											color="success"
											icon={<CreditScoreOutlined />}
										/>
									) : (
										<PayPalButtons
											createOrder={(data, actions) => {
												return actions.order.create({
													purchase_units: [
														{
															amount: {
																value: `${order.total}`,
															},
														},
													],
												});
											}}
											onApprove={(data, actions) => {
												return actions.order!.capture().then((details) => {
													onOrderCompleted(details);
													//console.log({details})
													//const name = details.payer.name!.given_name;
													//alert(`Transaction completed by ${name}`);
												});
											}}
										/>
									)}
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayaout>
	);
};

//GetServerSideProps

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
	const { id = '' } = query;
	const session: any = await getSession({ req });

	if (!session) {
		return {
			redirect: {
				destination: `/auth/login?p=/orders/${id}`,
				permanent: false,
			},
		};
	}

	const order = await dbOrder.getOrderById(id.toLocaleString());

	if (!order) {
		return {
			redirect: {
				destination: `/orders/history`,
				permanent: false,
			},
		};
	}

	if (order.user !== session.user._id) {
		return {
			redirect: {
				destination: `/orders/history`,
				permanent: false,
			},
		};
	}

	return {
		props: {
			order,
		},
	};
};

export default OrdersPage;
