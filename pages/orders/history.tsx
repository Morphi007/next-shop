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
                <NextLink href={`/orders/${params.row.id}`}  passHref legacyBehavior>
                  <Link underline="always">
                  Ver Orden
                  </Link>
                </NextLink>
            )
		},
	},
];

const rows: GridRowsProp = [
	{ id: 1, paid: true, Fullname: 'Morphy' },
	{ id: 2, paid: false, Fullname: 'Fernando' },
	{ id: 3, paid: true, Fullname: 'Laxi' },
	{ id: 4, paid: false, Fullname: 'Juan' },
];

type Props = {};

const historyPage = (props: Props) => {
	return (
		<ShopLayaout
			title={'historial de ordenes'}
			pageDescription={'historial de ordenes del cliente'}
		>
			<Typography variant="h1" component="h1">
				Historial de ordenes
			</Typography>
			<Grid item xs={12} sx={{ height: 650, width: '100%' }}>
				<DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
			</Grid>
		</ShopLayaout>
	);
};

export default historyPage;
