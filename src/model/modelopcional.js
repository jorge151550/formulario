const { DataTypes } = require('sequelize');
const sequelize = require('./path/to/your/sequelize/instance');

// Modelo para las condiciones unitarias
const UnitCondition = sequelize.define("UnitCondition", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Modelo para las preguntas dentro de cada condición unitaria
const Question = sequelize.define("Question", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Aceptable', 'Inaceptable', 'Aceptable con Requerimientos'),
    allowNull: false,
  },
  findings: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  unitConditionId: {
    type: DataTypes.INTEGER,
    references: {
      model: UnitCondition,
      key: 'id'
    },
    allowNull: false,
  }
});

// Establecemos la relación entre UnitCondition y Question
UnitCondition.hasMany(Question, { foreignKey: 'unitConditionId' });
Question.belongsTo(UnitCondition, { foreignKey: 'unitConditionId' });

module.exports = { UnitCondition, Question };