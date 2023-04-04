import { NextPage, GetServerSideProps } from 'next';
import { ShopLayaout } from '@/components/layout';
import { Products_List } from '@/components/products';
import { Box, Typography } from '@mui/material/';
import { dbProducts } from '@/database';
import { IProduct } from '@/interface';

type Props = {
	products: IProduct[];
	foundProduct: boolean;
	query: string;
};

const SearchPage: NextPage<Props> = ({ products,foundProduct,query}) => {
	return (
		<ShopLayaout
			title={'Teslo--Shop-Search'}
			pageDescription={'encuentra lo mejores productos'}
		>
			<Typography variant="h1">Buscar producto</Typography>

			{
				 foundProduct?<Typography variant="h2" sx={{ mb: 1 }}>Termino: {query}</Typography>
				             :(
								<Box display={"flex"}>
                                      <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize">No encontramos ningun producto:</Typography>
									  <Typography variant="h2" sx={{ ml: 1 }} textTransform="capitalize" color="secondary" >{query} </Typography>
								</Box>
							 )
			}
			


			<Products_List products={products} />
		</ShopLayaout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { query = '' } = params as { query: string };

	if (query.length === 0) {
		return {
			redirect: {
				destination: '/',
				permanent: true,
			},
		};
	}

	// es un let para hacer el todo en caso de que no se encuentre producto  recomiende otro producto
	let products = await dbProducts.getProductByTerm(query);
	const foundProduct = products.length > 0;

	//TODO: Retornar los productos
	if (!foundProduct) {
		//products=await dbProducts.getAllProduct();
		 products = await dbProducts.getProductByTerm("shirt");

	}

	return {
		props: {
			products,
			foundProduct,
			query,
		},
	};
};

export default SearchPage;
