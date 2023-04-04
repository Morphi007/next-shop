import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { IProduct } from '@/interface';
import { ProductCard } from './ProductCard';

type Props = {
	products: IProduct[];
};

export const Products_List: FC<Props> = ({products}) => {
	return (
		<Grid container spacing={4}>
			
          {
            products.map((product) =>(
                <ProductCard key={product.slug} product={product}/>
            ))
          }

		</Grid>
	);
};
