import useSWR from 'swr';
import NextLink from 'next/link'
import { AdminLayout } from '@/components/layout';
import {
	AddOutlined,
	CategoryOutlined,
	ConfirmationNumber,
	ConfirmationNumberOutlined,
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button, CardMedia, Chip, Grid, Link, MenuItem, Select } from '@mui/material';
import { IProduct } from '@/interface';

const columns: GridColDef[] = [
	{ field: 'img', headerName: 'Foto', width: 150,
    renderCell: ({ row }: GridRenderCellParams) => {
        return (
              <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
                   <CardMedia 
                      component="img"
                      alt={row.title}
                      className='fadeIn'
                      image={row.img}

                   />
              </a>
        )
           
    }
    },
	{ field: 'title', headerName: 'Title', width: 250,
	renderCell: ({ row }: GridRenderCellParams) => {
        return (
               < NextLink href={`/admin/products/${row.slug}`} legacyBehavior passHref>
			     <Link underline='always'>
                    {row.title}
				 </Link>
			   </NextLink>
        )
           
    }
    },
	{ field: 'gender', headerName: 'Genero', width: 100 },
	{ field: 'type', headerName: 'Tipo', width: 100 },
	{ field: 'inStock', headerName: 'Inventario' },
	{ field: 'price', headerName: 'Precio', width: 100 },
	{ field: 'sizes', headerName: 'Tallas', width: 150 },
];

const ProductsPage = () => {
	const { data, error } = useSWR<IProduct[]>('/api/admin/products');

	if (!data && !error) return <></>;

	const rows = data!.map((product) => ({
		id: product._id,
		img: product.images[0],
		title: product.title,
		gender: product.gender,
		type: product.type,
		inStock: product.inStock,
		price: product.price,
		sizes: product.sizes.join(', '),
        slug: product.slug
	}));

	return (
		<AdminLayout
			title={`Productos (${data?.length})`}
			subTitle={'Mantenimiento de Productos'}
			Icon={<CategoryOutlined />}
		>
			 <Box display="flex" justifyContent={"end"} sx={{mb:5}} >
                 <Button startIcon={<AddOutlined/>} color="secondary"
				   href="/admin/products/new"
				  >
                       Crear productor
				 </Button>
			 </Box>
			<Grid container className="fadeIn">
				<Grid item xs={12} sx={{ height: 650, width: '100%' }}>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</Grid>
			</Grid>
		</AdminLayout>
	);
};

export default ProductsPage;
