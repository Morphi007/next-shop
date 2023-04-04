import React from 'react';
import NextLink from "next/link";

import { Box, Link, Typography } from '@mui/material';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { ShopLayaout } from '@/components/layout';

type Props = {};

const emptyPage = (props: Props) => {
	return (
		<ShopLayaout
			title={'carrito de compra vacio'}
			pageDescription={'No hay articulo en carrito de compras'}
		>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="calc( 100vh - 200px ) "
				sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
			>
                <RemoveShoppingCartOutlined sx={{fontSize:100}}></RemoveShoppingCartOutlined>
				<Box display="flex" flexDirection="column" alignItems="center">
					<Typography variant="h1" >su carrito esta vacio</Typography>
                    <NextLink href="/" passHref  legacyBehavior>
                        <Link typography="h4" color="secondary">
                            Regresar
                        </Link>
                    </NextLink>
				</Box>
			</Box>
		</ShopLayaout>
	);
};

export default emptyPage;
