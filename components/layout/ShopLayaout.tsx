import React, { FC } from 'react';
import Head from 'next/head';
import { Navbar, SideMenu } from '../ui';

type Props = {
	children: React.ReactNode;
	title: string;
	pageDescription: string;
	imageFullUrl?: string;
};

 export const ShopLayaout: FC<Props> = ({
	children,
	title,
	pageDescription,
	imageFullUrl,
 }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={pageDescription} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="og:title" content={title}/>
                <meta name="og:description" content={pageDescription}/>
				<link rel="icon" href="/favicon.ico" />

                {
                  imageFullUrl&&(
                    <meta name="or:image" content={imageFullUrl} />
                  )  
                }
			</Head>
			<nav>
				<Navbar/>
			</nav>
			<SideMenu/>
			<main style={{ margin: '80px auto', maxWidth: '1440px', padding: '0px 30px' }}>
				{children}
			</main>
			<footer>

            </footer>
		</>
	);
};
