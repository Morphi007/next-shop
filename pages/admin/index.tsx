import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { SumamryTitle } from '@/components/admin';
import { AdminLayout } from '@/components/layout';
import {
	AccessTimeOutlined,
	AttachMoneyOutlined,
	CancelPresentation,
	CategoryOutlined,
	CreditCardOffOutlined,
	DashboardOutlined,
	GroupAddOutlined,
	ProductionQuantityLimits,
} from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { DashboardSummaryResponse } from '@/interface';

//pendiente investigar

const DasboardPage = () => {
	const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
		refreshInterval: 30 * 1000, // 30 segundos
	});

      const [refreshIn, setRefreshIn] = useState(30)

	  useEffect(() => {
		const interval = setInterval(() =>{
			setRefreshIn(refreshIn=>refreshIn>0?refreshIn -1:30);
		},1000)
	  
		return () => { clearInterval(interval) }
	  }, [])
	  


	if (!error && !data) {
		return <></>;
	}

	if (error) {
		return <Typography>Error al cargar la informacion</Typography>;
	}
const{
	numberOfOrders,        
    paidOrders,            
    notPaidOrders,         
    numberOfClients,       
    numberOfProducts,      
    productsWithNoInventory,
    lowInventory,         
}=data!;

	return (
		<AdminLayout
			title={'Dashboard'}
			subTitle={'estadisticas generales'}
			Icon={<DashboardOutlined />}
		>
			<Grid container spacing={2}>
				<SumamryTitle
					title={numberOfOrders}
					subTitle={'Ordenes totales'}
					Icon={<CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} />}
				/>

				<SumamryTitle
					title={paidOrders}
					subTitle={'Ordenes Pagada'}
					Icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
				/>

				<SumamryTitle
					title={notPaidOrders}
					subTitle={'Ordenes Pendientes'}
					Icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
				/>

				<SumamryTitle
					title={ numberOfClients}
					subTitle={'Clientes'}
					Icon={<GroupAddOutlined color="success" sx={{ fontSize: 40 }} />}
				/>

				<SumamryTitle
					title={numberOfProducts}
					subTitle={'productos'}
					Icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
				/>

				<SumamryTitle
					title={productsWithNoInventory}
					subTitle={'sin existencias'}
					Icon={<CancelPresentation color="error" sx={{ fontSize: 40 }} />}
				/>
				<SumamryTitle
					title={lowInventory}
					subTitle={'Bajo inventario'}
					Icon={<ProductionQuantityLimits color="error" sx={{ fontSize: 40 }} />}
				/>
				<SumamryTitle
					title={refreshIn}
					subTitle={'Actualizacion en: '}
					Icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
				/>
			</Grid>
		</AdminLayout>
	);
};

export default DasboardPage;
