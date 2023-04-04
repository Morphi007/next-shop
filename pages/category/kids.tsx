import { NextPage } from 'next';
import { ShopLayaout } from '@/components/layout';
import { Products_List } from '@/components/products';
import { initialData } from '@/database/products';
import { Typography } from '@mui/material/';
import { useProducts } from '@/hook';
import { FullScreenLoading } from '@/components/ui';

const MenPage: NextPage = () => {
	const { products, isLoading } = useProducts('/products?gender=kid');
	return (
		<ShopLayaout title={'Teslo-Shop Kid'} pageDescription={'encuentra lo mejores productos para Niños'}>
			<Typography variant="h1">KiD</Typography>
			<Typography variant="h2" sx={{ mb: 3 }}>
				Todo los para Niños
			</Typography>
			{isLoading ? <FullScreenLoading /> : <Products_List products={products} />}
		</ShopLayaout>
	);
};

export default MenPage;
