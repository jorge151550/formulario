import { Sequelize, Model, DataTypes } from 'sequelize';

// Configuración de Sequelize
const sequelize = new Sequelize('formulariodb', 'root', 'Jorge24@', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
});

// Definición del Modelo de Producto
class Establecimiento extends Model {}

Establecimiento.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
        razon_social: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        correo_electronico: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        tipo_establecimiento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        local: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nit: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        administrador: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Establecimiento',
        tableName: 'establecimientos', // Nombre de la tabla en la base de datos
        timestamps: false, // Si no quieres columnas `createdAt` y `updatedAt`
    }
);

// Sincronización del Modelo con la Base de Datos
const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente.');
        await sequelize.sync({ force: true }); // Use `force: true` para dropear y recrear la tabla en cada inicio
        console.log('Sincronización del modelo completada.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
};

syncDatabase();

// Opcional: función para testear la conexión
export async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa.');
    } catch (err) {
        console.error('Error de conexión:', err);
    }
}

// Exportar el sequelize para usar en otros archivos
export { sequelize, Establecimiento };
