import { Product, sequelize } from '../model/establecimiento.model.js';

// Ejemplo de uso
async function createProduct() {
    try {
        const newProduct = await Product.create({
            product_name: 'Producto Ejemplo',
            price: 19.99,
            is_stock: true,
        });
        console.log('Producto creado:', newProduct.toJSON());
    } catch (error) {
        console.error('Error al crear el producto:', error);
    }
}

createProduct();
