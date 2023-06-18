import React, { FC, useEffect, useReducer } from 'react';
import { useSession,signOut } from 'next-auth/react';
import { IUser } from '@/interface';
import { AuthContext, authReducer } from './';
import { tesloApi } from '@/api';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter} from 'next/router';

export interface AuthState {
	isLoggedIn: boolean;
	user?: IUser;
}


const Auth_INITIAL_STATE: AuthState = {
	isLoggedIn: false,
	user: undefined,
};

interface Props {
	children?: React.ReactNode | undefined;
}

export const AuthProvider: FC<Props> = ({ children }) => {

	const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);
	const {data,status} =useSession()
	const router = useRouter();

	//useEffect(() => {
	//	checkToken();
	//}, []);


	useEffect(() => {
	   if(status==="authenticated"){
          //console.log({user:data?.user})
		  dispatch({type:"[Auth] - Login", payload:data?.user as IUser})

	   } 

	}, [status,data])
	

	const checkToken = async () => {
		if (!Cookies.get("token")) {
			return;
		}
              

		try {
			const { data } = await tesloApi.get('/user/validate-token');
			const { token, user } = data;
			Cookies.set('token', token);

			dispatch({ type: '[Auth] - Login', payload: user });
		} catch (error) {
			Cookies.remove('token');
		}
	};

	const loginUser = async (email: string, password: string): Promise<boolean> => {
		try {
			const { data } = await tesloApi.post('/user/login', { email, password });
			const { token, user } = data;
			Cookies.set('token', token);
			dispatch({ type: '[Auth] - Login', payload: user });
			return true;
		} catch (error) {
			return false;
		}
	};

	const registerUser = async (
		name: string,
		email: string,
		password: string,
	): Promise<{ hasError: boolean; message?: string }> => {
		try {
			const { data } = await tesloApi.post('/user/register', { name, email, password });
			const { token, user } = data;
			Cookies.set('token', token);
			dispatch({ type: '[Auth] - Login', payload: user });
			//Todo return
			return {
				hasError: false,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return {
					hasError: true,
					message: error.response?.data.message,
				};
			}
			return {
				hasError: true,
				message: ' no se pudo crear el usuario - intento de nuevo',
			};
		}
	};

	const logout = () => {
		Cookies.remove('cart');
		Cookies.remove('firName');
		Cookies.remove('lasName');
		Cookies.remove('address');
		Cookies.remove('address2');
		Cookies.remove('zip');
		Cookies.remove('city');
		Cookies.remove('country');
		Cookies.remove('phone');
		signOut();
		//router.reload();
		//Cookies.remove('token');

	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				//method:
				loginUser,
				registerUser,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
