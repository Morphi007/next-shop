import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout';
import useSWR from 'swr';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { PeopleOutline } from '@mui/icons-material';
import { Grid, MenuItem, Select } from '@mui/material';
import { IUser } from '@/interface';
import { tesloApi } from '@/api';

type Props = {};

const UsersPage = (props: Props) => {
	const { data, error } = useSWR<IUser[]>('/api/admin/users');
	const [users, setUsers] = useState<IUser[]>([]);

	useEffect(() => {
		if (data) {
			setUsers(data);
		}
	}, [data]);

	if (!data && !error) {
		return <></>;
	}

	const onRoleUpdated = async (userId: string, newRole: string) => {
		const previosUser = users.map((user) => ({ ...user }));
		const updatedUsers = users.map((user) => ({
			...user,
			role: userId === user._id ? newRole : user.role,
		}));
		setUsers(updatedUsers);

		try {
			await tesloApi.put('/admin/users', { userId, role: newRole });
		} catch (error) {
			setUsers(previosUser);
			alert('Nose pudo actualizar el role usuario');
		}
	};

	const columns: GridColDef[] = [
		{ field: 'email', headerName: 'Correo', width: 300 },
		{ field: 'name', headerName: 'Nombre completo', width: 400 },
		{
			field: 'role',
			headerName: 'Rol',
			width: 400,
			renderCell: ({ row }: GridRenderCellParams) => {
				return (
					<Select
						value={row.role}
						label="Role"
						onChange={({ target }) => onRoleUpdated(row.id, target.value)}
						sx={{ width: '200px' }}
					>
						<MenuItem value="admin">Admin</MenuItem>
						<MenuItem value="client">Client</MenuItem>
						<MenuItem value="super-user">Super-User</MenuItem>
						<MenuItem value="SEO">Seo</MenuItem>
					</Select>
				);
			},
		},
	];

	const rows = users.map((user) => ({
		id: user._id,
		email: user.email,
		name: user.name,
		role: user.role,
	}));

	return (
		<AdminLayout
			title={'Usuario'}
			subTitle={'Mantenimiento de usuario'}
			Icon={<PeopleOutline />}
		>
			<Grid container className="fadeIn">
				<Grid item xs={12} sx={{ height: 650, width: '100%' }}>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</Grid>
			</Grid>
		</AdminLayout>
	);
};

export default UsersPage;
