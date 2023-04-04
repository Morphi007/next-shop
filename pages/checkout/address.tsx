import { ShopLayaout } from '@/components/layout';
import {
    Box,
	Button,
	FormControl,
	Grid,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';

type Props = {};

const addressPage = (props: Props) => {
	return (
		<ShopLayaout title={'Direccion'} pageDescription={'confirmar direccion del destino'}>
			<Typography variant="h1" component="h1">
				Direccion
			</Typography>
			<Grid container spacing={2}  sx={{mt:5}}>
				<Grid item xs={12} sm={6}>
					<TextField label="Nombre" variant="filled" fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label="Apellido" variant="filled" fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label="Direccion" variant="filled" fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label="Direccion 2 (Opcional)" variant="filled" fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label="Codigo Postal" variant="filled" fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>

					<Select variant="filled" label="Pais" fullWidth value={2}>
						<MenuItem value={1}>Costa Rica</MenuItem>
						<MenuItem value={2}>Estados Unidos</MenuItem>
						<MenuItem value={3}>México</MenuItem>
						<MenuItem value={4}>Brasil</MenuItem>
						<MenuItem value={5}>Argentina</MenuItem>
						<MenuItem value={6}>Colombia</MenuItem>
						<MenuItem value={7}>España</MenuItem>
						<MenuItem value={8}>Francia</MenuItem>
						<MenuItem value={9}>Japón</MenuItem>
						<MenuItem value={10}>Australia</MenuItem>
					</Select>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField label="Ciudad" variant="filled" fullWidth />
				</Grid>
                <Grid item xs={12} sm={6}>
					<TextField label="calle" variant="filled" fullWidth />
				</Grid>
			</Grid>
            <Box sx={{mt:5}} display={"flex"} justifyContent="center">
               <Button color="secondary" className='circular-btn'  size="large">Revisar pedido</Button>
            </Box>
		</ShopLayaout>
	);
};

export default addressPage;
