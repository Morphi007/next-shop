export interface IUser {
	_id      : string;
    name     : string;
    email    : string;
    password?: string;
    role     : string;
	//Todo:saber cuando se creo y cuando se actualizo gracias a timestamps: true

    createdAt?: string;
    updatedAt?: string;
}
