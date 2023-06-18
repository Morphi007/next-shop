import React, { useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';

import { UIContext } from '@/context';

type Props = {};

export const AdminNavbar = (props: Props) => {
	const { toggleSideMenu } = useContext(UIContext);

	return (
		<AppBar>
			<Toolbar>
				<NextLink href={'/'} passHref legacyBehavior>
					<Link display="flex" alignItems="center">
						<Typography variant="h6">Shop</Typography>
						<Typography sx={{ ml: 0.5 }}>Prime</Typography>
					</Link>
				</NextLink>

				{/*todo flex */}
				<Box flex={1} />

				<Box flex={1} />
				{/*todo flex */}

				{/*Pantallas grandes*/}

				{/*Pantallas pequeña*/}

				<Button onClick={() => toggleSideMenu()}>Menu</Button>
			</Toolbar>
		</AppBar>
	);
};
