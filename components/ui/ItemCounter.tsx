import React, { FC } from 'react';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

type Props = {
	currentValue:number;
	maxValue:number;
	updateQuantity:(newValue:number)=>void;
};

export const ItemCounter: FC<Props> = ({currentValue,maxValue,updateQuantity}) => {
            
	const addCart=(value:number) => {
          if(value===-1){
 			  if(currentValue===1)return;
               
			  return updateQuantity(currentValue-1)
		  }   
		   
		  if(currentValue>=maxValue) return
		  return updateQuantity(currentValue+1)
	  }


	return (
		<Box display="flex" alignItems="center">
			<IconButton onClick={()=>addCart(-1)}>
				<RemoveCircleOutline />
			</IconButton>
			<Typography sx={{ width: 40, textAlign: 'center' }}>{currentValue}</Typography>
			<IconButton onClick={()=>addCart(+1)}>
				<AddCircleOutline />
			</IconButton>
		</Box>
	);
};
