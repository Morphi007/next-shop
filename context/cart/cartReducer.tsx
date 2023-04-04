import { ICartProduct } from '@/interface';
import { CartState } from './';
import { Product } from '@/models';

type CartActionType =
	| { type: '[Cart] - LoadCart from cookies | storage'; payload: ICartProduct[] }
	| { type: '[Cart] - Update product in cart'; payload: ICartProduct[] }
	| { type: '[Cart] - Change cart quantity'; payload: ICartProduct }
	| { type: '[Cart] - Remove cart quantity'; payload: ICartProduct }
	| {
			type: '[Cart] - Update order summary';
			payload: {
				numberOfItems: number;
				subTotal: number;
				tax: number;
				total: number;
			};
	  };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
	switch (action.type) {
		case '[Cart] - LoadCart from cookies | storage':
			return {
				...state,
				cart: [...action.payload],
			};
		case '[Cart] - Update product in cart':
			return {
				...state,
				cart: [...action.payload],
			};
		case '[Cart] - Change cart quantity':
			return {
				...state,
				cart: state.cart.map((product) => {
					if (product._id !== action.payload._id) return product;
					if (product.size !== action.payload.size) return product;

					/*Opcion #1*/
					//return product.quantity=action.payload.quantity
					//return product;
					/*opcion 2*/

					return action.payload;
				}),
			};
		case '[Cart] - Remove cart quantity':
			return {
				...state,
				cart: state.cart.filter(
					(product) =>
						!(product._id === action.payload._id && product.size === action.payload.size),
				),
			};
		case '[Cart] - Update order summary':
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};
