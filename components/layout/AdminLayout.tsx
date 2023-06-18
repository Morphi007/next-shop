import React, { FC } from 'react';
import { SideMenu } from '../ui';
import { AdminNavbar } from '../admin';
import { Box, Typography } from '@mui/material';

type Props = {
	title: string;
	subTitle: string;
	Icon?: JSX.Element;
	children: React.ReactNode;
};

export const AdminLayout: FC<Props> = ({ children, subTitle, title, Icon }) => {
	return (
		<>
			<nav>
				<AdminNavbar />
			</nav>
			<SideMenu />
			<main style={{ margin: '80px auto', maxWidth: '1440px', padding: '0px 30px' }}>
				<Box display="flex" flexDirection="column">
					<Typography variant="h1" component="h1">
						{Icon}
						{" "}
						{title}
					</Typography>
					<Typography variant="h2" sx={{ mb: 1 }}>
						{subTitle}
					</Typography>
				</Box>

				<Box className="fadeIn">{children}</Box>
			</main>
		</>
	);
};
