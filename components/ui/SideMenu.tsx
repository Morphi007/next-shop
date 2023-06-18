import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import {
	Box,
	Divider,
	Drawer,
	IconButton,
	Input,
	InputAdornment,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader,
} from '@mui/material';
import {
	AccountCircleOutlined,
	AdminPanelSettings,
	CategoryOutlined,
	ConfirmationNumberOutlined,
	EscalatorWarningOutlined,
	FemaleOutlined,
	LoginOutlined,
	MaleOutlined,
	SearchOutlined,
	VpnKeyOutlined,
} from '@mui/icons-material';
import { AuthContext, UIContext } from '@/context';

export const SideMenu = () => {
	const router = useRouter();
	const { isMenuOpen,toggleSideMenu } = useContext(UIContext);
	const [searchTerm, setSearchTerm] = useState('');
    const {user,isLoggedIn,logout} = useContext(AuthContext)  
    
    const onSearchTerm=()=>{
         if(searchTerm.trim().length===0) return;
		 navigateTo(`/search/${searchTerm}`)
	}


	const navigateTo = (url: string) => {
		router.push(url);
		toggleSideMenu();
	};

    const onLogout=() => {
		logout();       
	  }

	return (
		<Drawer
			open={isMenuOpen}
			onClose={toggleSideMenu}
			anchor="right"
			sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
		>
			<Box sx={{ width: 250, paddingTop: 5 }}>
				<List>
					<ListItem>
						<Input
							value={searchTerm}
							autoFocus
							onChange={(e) => setSearchTerm(e.target.value)}
							onKeyPress={(e)=>e.key==="Enter"?onSearchTerm():null}
							type="text"
							placeholder="Buscar..."
							endAdornment={
								<InputAdornment position="end">
									<IconButton onClick={onSearchTerm}>
										<SearchOutlined/>
									</IconButton>
								</InputAdornment>
							}
						/>
					</ListItem>

					   {   isLoggedIn &&(
						<>
						    <ListItem button>
						<ListItemIcon>
							<AccountCircleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Perfil'} />
					</ListItem>

					<ListItem button onClick={() => navigateTo('/orders/history')}>
						<ListItemIcon>
							<ConfirmationNumberOutlined />
						</ListItemIcon>
						<ListItemText primary={'Mis Ordenes'} />
					</ListItem>
						</>
					   )


					   }

					{/*tiene un condicion que significa si no esta en mobil sm . no saldra  */}
					<ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
						<ListItemIcon>
							<MaleOutlined />
						</ListItemIcon>
						<ListItemText
							primary={'Hombres'}
							onClick={() => navigateTo('/category/men')}
						/>
					</ListItem>

					<ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
						<ListItemIcon>
							<FemaleOutlined />
						</ListItemIcon>
						<ListItemText
							primary={'Mujeres'}
							onClick={() => navigateTo('/category/women')}
						/>
					</ListItem>

					<ListItem button sx={{ display: { xs: '', sm: 'none' } }}>
						<ListItemIcon>
							<EscalatorWarningOutlined />
						</ListItemIcon>
						<ListItemText
							primary={'Niños'}
							onClick={() => navigateTo('/category/kids')}
						/>
					</ListItem>
                      
                      {  isLoggedIn?(
						<ListItem button onClick={onLogout}>
						<ListItemIcon>
							<LoginOutlined />
						</ListItemIcon>
						<ListItemText primary={'Salir'} />
					</ListItem>
					  ):(
						<ListItem button   onClick={() => navigateTo(`/auth/login?p=${router.asPath}`) }>
						<ListItemIcon>
							<VpnKeyOutlined />
						</ListItemIcon>
						<ListItemText primary={'Ingresar'} />
					</ListItem>

					  )

					  }

					
					

					{/* Admin */}

                          {
                             user?.role==="admin" &&(
                                       <>
									   
								<Divider />
								<ListSubheader>Admin Panel</ListSubheader>
			
								<ListItem button
								    onClick={() => navigateTo("/admin/") }
								>
									<ListItemIcon>
										<CategoryOutlined />
									</ListItemIcon>
									<ListItemText primary={'Dashboard'} />
								</ListItem>

								<ListItem button
								   onClick={() => navigateTo("/admin/products") }
								>
									<ListItemIcon>
										<CategoryOutlined />
									</ListItemIcon>
									<ListItemText primary={'Productos'} />
								</ListItem>

								<ListItem button
								  onClick={() => navigateTo("/admin/orders") }
								>
									<ListItemIcon>
										<ConfirmationNumberOutlined />
									</ListItemIcon>
									<ListItemText primary={'Ordenes'} />
								</ListItem>
			
								<ListItem button
								   onClick={() => navigateTo("/admin/users") }
								>
									<ListItemIcon>
										<AdminPanelSettings />
									</ListItemIcon>
									<ListItemText primary={'Usuarios'} />
								</ListItem>
									   </>

							 )

						  }                

				</List>
			</Box>
		</Drawer>
	);
};
