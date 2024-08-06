import { pool } from "../connectiondb.js"
import { Establecimiento, sequelize } from '../model/establecimiento.model.js';

export const getEstablecimientos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM establecimientos');
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron establecimientos'
      });
    }
    res.status(200).json({
      message: 'Establecimientos encontrados',
      data: rows
    });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

export const getEstablecimiento = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM establecimientos WHERE id = ?', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Establecimiento no encontrado'
      });
    }
    res.status(200).json({
      message: 'Establecimiento encontrado',
      data: rows[0]
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};


export const postEstablecimiento = async (req, res) => {
  try {
    const { razon_social, correo_electronico, tipo_establecimiento, fecha, local, telefono, nit, administrador } = req.body;

    const [result] = await pool.query(
      'INSERT INTO establecimientos (razon_social, correo_electronico, tipo_establecimiento, fecha, local, telefono, nit, administrador) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
      [razon_social, correo_electronico, tipo_establecimiento, fecha, local, telefono, nit, administrador]
    );

    res.status(201).json({
      message: 'Establecimiento creado exitosamente',
      data: {
        id: result.insertId,
        razon_social,
        correo_electronico,
        tipo_establecimiento,
        fecha,
        local,
        telefono,
        nit,
        administrador
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al crear el establecimiento'
    });
  }
};

export const putEstablecimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { razon_social, correo_electronico, tipo_establecimiento, fecha, local, telefono, nit, administrador } = req.body;
    const [result] = await pool.query(
      `UPDATE establecimientos 
       SET razon_social = IFNULL(?, razon_social), 
           correo_electronico = IFNULL(?, correo_electronico), 
           tipo_establecimiento = IFNULL(?, tipo_establecimiento), 
           fecha = IFNULL(?, fecha), 
           local = IFNULL(?, local), 
           telefono = IFNULL(?, telefono), 
           nit = IFNULL(?, nit), 
           administrador = IFNULL(?, administrador) 
       WHERE id = ?`,
      [razon_social, correo_electronico, tipo_establecimiento, fecha, local, telefono, nit, administrador, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Establecimiento no encontrado'
      });
    }
    const [rows] = await pool.query('SELECT * FROM establecimientos WHERE id = ?', [id]);
    res.status(200).json({
      message: 'Establecimiento actualizado correctamente',
      data: rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al actualizar el establecimiento'
    });
  }
};




export const deleteEstablecimiento = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM establecimientos WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Establecimiento no encontrado'
      });
    }
    res.status(200).json({
      message: 'Establecimiento eliminado'
    });
  } catch (error) {
    console.error(error); // Imprimir el error para depuración
    res.status(500).json({
      message: 'Error al eliminar el establecimiento'
    });
  }
};
