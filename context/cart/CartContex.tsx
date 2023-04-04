import { ICartProduct } from '@/interface';
import { createContext } from 'react';

interface ContextProps {
	cart: ICartProduct[];
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;
	//method
	addProductToCart: (product: ICartProduct) => void;
	updateCartQuantity: (product: ICartProduct) => void;
	removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
