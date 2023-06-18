import NextLink from 'next/link';
import {
	Box,
	Button,
	CardActionArea,
	CardMedia,
	Grid,
	Link,
	Typography,
} from '@mui/material';
import { ItemCounter } from '../ui';
import { FC, useContext } from 'react';
import { CartContext } from '@/context';
import { ICartProduct, IOrderItem } from '@/interface';

/*

const producListCart = [
    initialData.products[0],
	initialData.products[1],
	initialData.products[2],
]; */

type Props = {
	editable?: boolean;
	products?:IOrderItem[];
};

export const CartList: FC<Props> = ({ editable = false,products }) => {
	const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

	const onNewQuantityvalue = (product: ICartProduct, newQuantityValue: number) => {
		product.quantity = newQuantityValue;
		updateCartQuantity(product);
	};

	 const productsToshow = products ? products:cart 

	return (
		<>
			{productsToshow.map((product) => (
				<Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
					{/*llevar a la pagina del es slug */}
					<Grid item xs={3}>
						<NextLink href={`/product/${product.slug}`} legacyBehavior>
							<Link>
								<CardActionArea>
									<CardMedia
										image={product.images}
										component="img"
										sx={{ borderRadius: '5px' }}
									/>
								</CardActionArea>
							</Link>
						</NextLink>
					</Grid>
					<Grid item xs={7}>
						<Box display="flex" flexDirection="column">
							<Typography variant="body1">{product.title} </Typography>
							<Typography variant="body1">
								Talla:<strong>{product.size}</strong>
							</Typography>
							{/*Condicional */}
							{editable ? (
								<ItemCounter
									currentValue={product.quantity}
									maxValue={10}
									updateQuantity={(value) => onNewQuantityvalue(product as  ICartProduct , value)}
								/>
							) : (
								<Typography variant="h5">
									{product.quantity > 1 ? 'Productos' : 'Producto'}{' '}
								</Typography>
							)}
						</Box>
					</Grid>
					<Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
						<Typography variant="subtitle1">{`${product.price} $`}</Typography>
						{/*editable */}
						{editable && (
							<Button
								variant="text"
								color="secondary"
								onClick={() => removeCartProduct(product as   ICartProduct)}
							>
								Remover
							</Button>
						)}
					</Grid>
				</Grid>
			))}
		</>
	);
};
