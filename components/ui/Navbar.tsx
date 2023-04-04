import React, { useContext, useState } from 'react';
import NextLink from 'next/link';
import {
	AppBar,
	Badge,
	Box,
	Button,
	IconButton,
	Input,
	InputAdornment,
	Link,
	Toolbar,
	Typography,
} from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCart } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { CartContext, UIContext } from '@/context';

type Props = {};

export const Navbar = (props: Props) => {
	const { asPath } = useRouter();
	const router = useRouter();
	const {numberOfItems} = useContext(CartContext)


	const { toggleSideMenu } = useContext(UIContext);
	const [searchTerm, setSearchTerm] = useState('');
	const [isSearchVisible, setIsSearchVisible] = useState(false);

	const onSearchTerm = () => {
		if (searchTerm.trim().length === 0) return;
		router.push(`/search/${searchTerm}`);
	};

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

				<Box
					sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
					className="fadeIn"
				>
					<NextLink href={'/category/men'} passHref legacyBehavior>
						<Link>
							<Button color={asPath === '/category/men' ? 'primary' : 'info'}>
								Hombres
							</Button>
						</Link>
					</NextLink>

					<NextLink href={'/category/women'} passHref legacyBehavior>
						<Link>
							<Button color={asPath === '/category/women' ? 'primary' : 'info'}>
								Mujeres
							</Button>
						</Link>
					</NextLink>

					<NextLink href={'/category/kids'} passHref legacyBehavior>
						<Link>
							<Button color={asPath === '/category/kids' ? 'primary' : 'info'}>
								Niños
							</Button>
						</Link>
					</NextLink>
				</Box>
				<Box flex={1} />
				{/*todo flex */}

				{/*Pantallas grandes*/}

				{isSearchVisible ? (
					<Input
					      sx={{display:{xs:"none",sm:"flex"} }}
						className="fadeIn"
						value={searchTerm}
						autoFocus
						onChange={(e) => setSearchTerm(e.target.value)}
						onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
						type="text"
						placeholder="Buscar..."
						endAdornment={
							<InputAdornment position="end">
								<IconButton onClick={() => setIsSearchVisible(false)}>
									<ClearOutlined />
								</IconButton>
							</InputAdornment>
						}
					/>
				) : (
					<IconButton   sx={{display:{xs:"none",sm:"flex"} }} onClick={() => setIsSearchVisible(true)} className="fadeIn">
						<SearchOutlined />
					</IconButton>
				)}

				{/*Pantallas pequeña*/}

				<IconButton
					sx={{ display: { xs: 'flex', sm: 'none' } }}
					onClick={toggleSideMenu}
				>
					<SearchOutlined />
				</IconButton>

				<NextLink href={'/cart'} passHref legacyBehavior>
					<Link>
						<IconButton>
							<Badge badgeContent={numberOfItems>9?"+9":numberOfItems} color="secondary">
								<ShoppingCart />
							</Badge>
						</IconButton>
					</Link>
				</NextLink>

				<Button onClick={() => toggleSideMenu()}>Menu</Button>
			</Toolbar>
		</AppBar>
	);
};
