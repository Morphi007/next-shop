import { NextPage } from 'next';
import { ShopLayaout } from '@/components/layout';
import { Products_List } from '@/components/products';
import { initialData } from '@/database/products';
import { Typography } from '@mui/material/';
import { useProducts } from '@/hook';
import { FullScreenLoading } from '@/components/ui';

const MenPage: NextPage = () => {
	const { products, isLoading } = useProducts('/products?gender=men');
	return (
		<ShopLayaout title={'Teslo-Shop Men'} pageDescription={'encuentra lo mejores productos para hombres'}>
			<Typography variant="h1">Hombres</Typography>
			<Typography variant="h2" sx={{ mb: 1 }}>
				Productor para ellos
			</Typography>
			{isLoading ? <FullScreenLoading /> : <Products_List products={products} />}
		</ShopLayaout>
	);
};

export default MenPage;
