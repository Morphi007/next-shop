import { NextPage } from 'next';
import { ShopLayaout } from '@/components/layout';
import { Products_List } from '@/components/products';
import { initialData } from '@/database/products';
import { Typography } from '@mui/material/';
import { useProducts } from '@/hook';
import { FullScreenLoading } from '@/components/ui';

const HomePage: NextPage = () => {
	const { products, isLoading } = useProducts('/products');
	return (
		<ShopLayaout title={'TesloShop'} pageDescription={'encuentra lo mejores productos'}>
			<Typography variant="h1">Tienda</Typography>
			<Typography variant="h2" sx={{ mb: 1 }}>
				Todo los productos
			</Typography>
			{isLoading ? <FullScreenLoading /> : <Products_List products={products} />}
		</ShopLayaout>
	);
};

export default HomePage;
