CREATE DATABASE IF NOT EXISTS formulariodb;
USE formulariodb;
CREATE TABLE IF NOT EXISTS establecimientos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    razon_social VARCHAR(255),
    correo_electronico VARCHAR(255),
    tipo_establecimiento VARCHAR(255),
    fecha DATE,
    local VARCHAR(255),
    telefono VARCHAR(50),
    nit VARCHAR(50),
    administrador VARCHAR(255)    
);

CREATE TABLE IF NOT EXISTS evaluaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    establecimiento_id INT,
    bloque VARCHAR(255),
    criterio VARCHAR(255),
    hallazgos TEXT,
    calificacion VARCHAR(2),
    FOREIGN KEY (establecimiento_id) REFERENCES establecimientos(id)
);

INSERT INTO establecimientos VALUES
(1, 'Cazuelitas', 'cazuelas@sandiego.com', 'Restaurante', '2024-07-18', 'L2012', '4440624', '890911709', 'Javier perez')