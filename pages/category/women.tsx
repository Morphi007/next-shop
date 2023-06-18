import { NextPage } from 'next';
import { ShopLayaout } from '@/components/layout';
import { Products_List } from '@/components/products';
import { initialData } from '@/database/seed-data';
import { Typography } from '@mui/material/';
import { useProducts } from '@/hook';
import { FullScreenLoading } from '@/components/ui';

const WomenPage: NextPage = () => {
	const { products, isLoading } = useProducts('/products?gender=women');
	return (
		<ShopLayaout
			title={'Teslo-Shop Women'}
			pageDescription={'encuentra lo mejores productos para Mujeres'}
		>
			<Typography variant="h1">Mujeres</Typography>
			<Typography variant="h2" sx={{ mb: 1 }}>
				Productor para ellas
			</Typography>
			{isLoading ? <FullScreenLoading /> : <Products_List products={products} />}
		</ShopLayaout>
	);
};

export default WomenPage;
