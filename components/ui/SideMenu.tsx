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
import { UIContext } from '@/context';

export const SideMenu = () => {
	const router = useRouter();
	const { isMenuOpen,toggleSideMenu } = useContext(UIContext);
	const [searchTerm, setSearchTerm] = useState('');
     
    const onSearchTerm=()=>{
         if(searchTerm.trim().length===0) return;
		 navigateTo(`/search/${searchTerm}`)
	}


	const navigateTo = (url: string) => {
		router.push(url);
		toggleSideMenu();
	};
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

					<ListItem button>
						<ListItemIcon>
							<AccountCircleOutlined />
						</ListItemIcon>
						<ListItemText primary={'Perfil'} />
					</ListItem>

					<ListItem button>
						<ListItemIcon>
							<ConfirmationNumberOutlined />
						</ListItemIcon>
						<ListItemText primary={'Mis Ordenes'} />
					</ListItem>

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

					<ListItem button>
						<ListItemIcon>
							<VpnKeyOutlined />
						</ListItemIcon>
						<ListItemText primary={'Ingresar'} />
					</ListItem>

					<ListItem button>
						<ListItemIcon>
							<LoginOutlined />
						</ListItemIcon>
						<ListItemText primary={'Salir'} />
					</ListItem>

					{/* Admin */}
					<Divider />
					<ListSubheader>Admin Panel</ListSubheader>

					<ListItem button>
						<ListItemIcon>
							<CategoryOutlined />
						</ListItemIcon>
						<ListItemText primary={'Productos'} />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<ConfirmationNumberOutlined />
						</ListItemIcon>
						<ListItemText primary={'Ordenes'} />
					</ListItem>

					<ListItem button>
						<ListItemIcon>
							<AdminPanelSettings />
						</ListItemIcon>
						<ListItemText primary={'Usuarios'} />
					</ListItem>
				</List>
			</Box>
		</Drawer>
	);
};
