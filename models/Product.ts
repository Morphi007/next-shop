import { IProduct } from '@/interface';
import mongoose, { Schema, model, Model } from 'mongoose';

const productSchema = new Schema({
	description: { type: String, required: true },
	images: [{ type: String }],
	inStock: { type: Number, required: true, default: 0 },
	price: { type: Number, required: true, default: 0 },
	sizes: [
		{
			type: String,
			anum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
			message: '{VALUE} no es un tamaño permido ',
		},
	],
	slug: { type: String, required: true, unique: true },
	tags: [{ type: String }],
	title: { type: String, required: true },
	type: {
		type: String,
		anum: ['shirts', 'pants', 'hoodies', 'hats'],
		message: '{VALUE} no es un tipo valido',
	},
	gender: {
		type: String,
		enum: ['men', 'women', 'kid', 'unisex'],
		message: '{VALUE} no es un genero valido',
	},
},{timestamps:true});


//TODO: crear indice de mongo

productSchema.index({title:"text",tags:"text"})


const Product:Model<IProduct>=mongoose.models.Product || model("Product",productSchema);


export default Product;