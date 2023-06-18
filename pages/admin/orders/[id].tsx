import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { CartList, OrderSummary } from '@/components/cart';
import { AdminLayout  } from '@/components/layout';
import {
	Box,
	Card,
	CardContent,
	Chip,
	Divider,
	Grid,
	Typography,
} from '@mui/material';
import {
	CreditCardOffOutlined,
	CreditScoreOutlined,
} from '@mui/icons-material';
import { dbOrder } from '@/database';
import { IOrder } from '@/interface';

interface Props {
	order: IOrder;
}

const OrdersPage: NextPage<Props> = ({ order }) => {
	const { shippingAddress } = order;

	return (
		<AdminLayout title={'Resumen de la orden '} subTitle={`OrdenId: ${order._id}`}	
		>
			{
            order.isPaid
            ? (
                <Chip 
                    sx={{ my: 2 }}
                    label="Orden ya fue pagada"
                    variant='outlined'
                    color="success"
                    icon={ <CreditScoreOutlined /> }
                />
            ):
            (
                <Chip 
                    sx={{ my: 2 }}
                    label="Pendiente de pago"
                    variant='outlined'
                    color="error"
                    icon={ <CreditCardOffOutlined /> }
                />
            )
        }

        

        <Grid container className='fadeIn'>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList products={  order.orderItems } />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({ order.numberOfItems } { order.numberOfItems > 1 ? 'productos': 'producto'})</Typography>
                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                        </Box>

                        
                        <Typography>{ shippingAddress.firName } { shippingAddress.lasName }</Typography>
                        <Typography>{ shippingAddress.address } { shippingAddress.address2 ? `, ${ shippingAddress.address2 }`: '' }</Typography>
                        <Typography>{ shippingAddress.city }, { shippingAddress.zip }</Typography>
                        <Typography>{ shippingAddress.country }</Typography>
                        <Typography>{ shippingAddress.phone }</Typography>

                        <Divider sx={{ my:1 }} />


                        <OrderSummary 
                            orderValues={{
                                numberOfItems: order.numberOfItems,
                                subTotal: order.subTotal,
                                total: order.total,
                                tax: order.tax,
                            }} 
                        />

                        <Box sx={{ mt: 3 }} display="flex" flexDirection='column'>
                            {/* TODO */}


                            <Box display='flex' flexDirection='column'>
                                {
                                    order.isPaid
                                    ? (
                                        <Chip 
                                            sx={{ my: 2, flex: 1 }}
                                            label="Orden ya fue pagada"
                                            variant='outlined'
                                            color="success"
                                            icon={ <CreditScoreOutlined /> }
                                        />

                                    ):(
                                        <Chip 
                                            sx={{ my: 2, flex: 1 }}
                                            label="Pendiente de pago"
                                            variant='outlined'
                                            color="error"
                                            icon={ <CreditCardOffOutlined /> }
                                        />
                                    )
                                }
                            </Box>

                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


		</AdminLayout>
	);
};

//GetServerSideProps

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
	const { id = '' } = query;
	//const session: any = await getSession({ req });

	const order = await dbOrder.getOrderById(id.toLocaleString());

	if (!order) {
		return {
			redirect: {
				destination: `/admin/orders`,
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
