import React, { FC, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { ShopLayaout } from '@/components/layout';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { CartContext } from '@/context';
import { ProductSlideShow, SizeSelector } from '@/components/products';
import { ItemCounter } from '@/components/ui';
import { ICartProduct, IProduct, ISize } from '@/interface';
import { db, dbProducts } from '@/database';

type Props = {
	product: IProduct;
};

const ProductPage: FC<Props> = ({ product }) => {

	const router=useRouter()
	const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
		_id: product._id,
		images: product.images[0],
		price: product.price,
		size: undefined,
		slug: product.slug,
		title: product.title,
		gender: product.gender,
		quantity: 1,
	});

	const selectedSize = (size: ISize) => {
		setTempCartProduct((currentProduct) => ({
			...currentProduct,
			size,
		}));
	};

   const onUpdateQuantity=(quantity:number)=>{
	setTempCartProduct((currentProduct) => ({
		...currentProduct,
		  quantity,
	}));
           
   }

  const {addProductToCart} = useContext(CartContext)


	const onAddProduct = () => {
		if(!tempCartProduct.size){return}

		//Todo: llamar la accion del context para agregar al carrito
		console.log({ tempCartProduct });
		addProductToCart(tempCartProduct )
		//router.push("/cart")
	};

	return (
		<ShopLayaout title={product.title} pageDescription={product.description}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={7}>
					<ProductSlideShow images={product.images} />
				</Grid>
				<Grid item xs={12} sm={5}>
					<Box display="flex" flexDirection="column">
						{/*titulo */}
						<Typography variant="h1" component="h1">
							{product.title}
						</Typography>
						<Typography variant="subtitle1" component="h2">
							{`${product.price} $`}{' '}
						</Typography>
						{/*cantidad*/}
						<Box sx={{ my: 2 }}>
							<Typography variant="subtitle1" component="h2">
								Cantidad
							</Typography>
							{/*Item counter talla*/}
							<ItemCounter
								currentValue={tempCartProduct.quantity}
								maxValue={product.inStock > 5 ? 5 : product.inStock}
								updateQuantity={onUpdateQuantity}
							/>
							<SizeSelector
								selectedSize={tempCartProduct.size}
								sizes={product.sizes}
								onSelectedSize={selectedSize}
							/>
						</Box>
						{/*Agregar al carrito*/}

						{product.inStock > 0 ? (
							<Button color="secondary" className="circular-btn" onClick={onAddProduct}>
								{tempCartProduct.size ? 'agregar al carrito' : 'Seleciona una talla'}
							</Button>
						) : (
							<Chip label="no hay disponible" color="error" variant="outlined" />
						)}

						<Box sx={{ mt: 3 }}>
							<Typography variant="subtitle2">Decripcion</Typography>
							<Typography variant="body2">{product.description} </Typography>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ShopLayaout>
	);
};

//getSerSideProps
//no usar esto SSR.....

/*

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { slug = '' } = params as { slug: string };

	const product = await dbProducts.getProductByslug(slug);

	if (!product) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			product,
		},
	};
};  
*/

//getStaticPaths
export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const productSlugs = await dbProducts.getAllProductSlugs();

	return {
		paths: productSlugs.map(({ slug }) => ({
			params: {
				slug,
			},
		})),
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug = '' } = params as { slug: string };
	const product = await dbProducts.getProductBySlug(slug);

	if (!product) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			product,
		},
		revalidate: 60 * 60 * 24,
	};
};

export default ProductPage;
