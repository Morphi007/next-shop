import { ISize } from '@/interface';
import { Box, Button } from '@mui/material';
import React, { FC } from 'react';

type Props = {
	selectedSize?: ISize;
    sizes: ISize[];
	//method
	onSelectedSize:(size: ISize) => void;
};

export const SizeSelector: FC<Props> = ({ selectedSize, sizes,onSelectedSize }) => {
	return (
		<Box>
			{sizes.map((size) => (
				<Button key={size} size="small" color={selectedSize===size?"primary":"info"} onClick={()=>onSelectedSize(size)}>
					{size}
				</Button>
				
			))}
		</Box>
	);
};
