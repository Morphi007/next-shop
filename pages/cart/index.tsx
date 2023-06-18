import { CartList, OrderSummary } from '@/components/cart';
import { ShopLayaout } from '@/components/layout';
import { CartContext } from '@/context';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

type Props = {};

const CartPage = (props: Props) => {
	const { isLoaded, cart } = useContext(CartContext);
	const router = useRouter();

	useEffect(() => {
		if (isLoaded && cart.length === 0) {
			router.replace('/cart/empty');
		}
	}, [isLoaded, cart, router]);

	if (!isLoaded || cart.length === 0) {
		return <></>;
	}

	return (
		<ShopLayaout title={'carrito'} pageDescription={'Carrito de compra de la tienda'}>
			<Typography variant="h1" component="h1">
				Carrito
			</Typography>
			<Grid container>
				<Grid item xs={12} sm={7}>
					<CartList editable={true} />{/*Cart List */}
				</Grid>
				<Grid item xs={12} sm={5}>
					<Card className="summary-card">
						<CardContent>
							<Typography variant="h2">Orden</Typography>
							<Divider sx={{ my: 1 }} />{/*summary orden */}
							<OrderSummary />
							<Box sx={{ mt: 3 }}>
								<Button color="secondary" className="circular-btn" fullWidth
								  href={"/checkout/address"}
								 >
									Checkout
								</Button>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</ShopLayaout>
	);
};

export default CartPage;
