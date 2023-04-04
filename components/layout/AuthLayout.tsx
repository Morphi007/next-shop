import { Box } from '@mui/material';
import Head from 'next/head';
import React, { FC } from 'react';

type Props = {
	children: React.ReactNode;
	title: string;
};

const AuthLayout: FC<Props> = ({ children, title }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={''} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="og:title" content={title} />
				<meta name="og:description" content={'pageDescription'} />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main style={{ margin: '80px auto', maxWidth: '1440px', padding: '0px 30px' }}>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					height="calc(100vh - 200px) "
          >
          {children}
           
        </Box>
			</main>
		</>
	);
};

export default AuthLayout;
