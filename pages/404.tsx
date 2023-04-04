import React from 'react';
import { ShopLayaout } from '@/components/layout';
import { Box, Typography } from '@mui/material';

type Props = {};

const Custom404 = (props: Props) => {
	return (
		<ShopLayaout
			title="Page not found 404"
			pageDescription="no hay nada que encontrar aqui "
		>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="calc( 100vh - 200px ) "
                sx={{flexDirection:{xs:"column",sm:"row"}}}
			>
				<Typography variant="h1" component="h1" fontSize={80} fontWeight={200}>
					404 |
				</Typography>
				<Typography marginLeft={2}>Pagina no encontrada</Typography>
			</Box>
		</ShopLayaout>
	);
};

export default Custom404;
