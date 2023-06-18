import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { ShopLayaout } from '@/components/layout';
import {
	DataGrid,
	GridRowsProp,
	GridColDef,
	GridValueGetterParams,
	GridRenderCellParams,
} from '@mui/x-data-grid';
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
import { getSession } from 'next-auth/react';
import { getOrdersByUser } from '@/database/dbOrders';
import { dbOrder } from '@/database';
import { IOrder } from '@/interface';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 100 },
	{ field: 'Fullname', headerName: 'Nombre Completo', width: 300 },
	
	{
		field: 'paid',
		headerName: 'Pagada',
		description: 'Muestra informacion si esta pagada la orden o no',
		width: 200,
		renderCell: (params:  GridRenderCellParams) => {
            return (
                params.row.paid
                    ? <Chip color="success" label="Pagada" variant='outlined' />
                    : <Chip color="error" label="No pagada" variant='outlined' />
            )
        }
	},
	
    {
		field: 'order',
		headerName: 'Ver orden ',
		description: 'Muestra informacion si esta pagada la orden o no',
		width: 200,
        sortable: false,
		renderCell: (params:  GridRenderCellParams) => {
			return (
                <NextLink href={`/orders/${params.row.orderId}`}  passHref legacyBehavior>
                  <Link underline="always">
                  Ver Orden
                  </Link>
                </NextLink>
            )
		},
	},
];

/*
const rows: GridRowsProp = [
	{ id: 1, paid: true, Fullname: 'Morphy' },
	{ id: 2, paid: false, Fullname: 'Fernando' },
	{ id: 3, paid: true, Fullname: 'Laxi' },
	{ id: 4, paid: false, Fullname: 'Juan' },
];
*/
type Props = {
	orders:IOrder[]
};


const historyPage:NextPage<Props>=({orders}) => {
   
  const rows= orders.map((order,idx)=> ({
	     id:idx + 1,
		 paid:order.isPaid,
		 Fullname: `${ order.shippingAddress.firName } ${ order.shippingAddress.lasName }`,
		 orderId: order._id
  }))

	  
	return (
		<ShopLayaout
			title={'historial de ordenes'}
			pageDescription={'historial de ordenes del cliente'}
		>
			<Typography variant="h1" component="h1">
				Historial de ordenes
			</Typography>
			<Grid container className="fadeIn">

			<Grid item xs={12} sx={{ height: 650, width: '100%' }}>
				<DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
			</Grid>
			</Grid>
		</ShopLayaout>
	);
};



export const getServerSideProps: GetServerSideProps = async ({req}) => {
 
    const session:any =await getSession({req});

     if(!session){
		return{
			redirect:{
				destination:"/auth/login?p=/orders/history",
				permanent:false
			}
		}
	 }

      const orders = await dbOrder.getOrdersByUser(session.user._id);

	return {
		props:{
			orders
		}
	}
}



export default historyPage;
