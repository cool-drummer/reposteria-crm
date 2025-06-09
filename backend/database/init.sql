-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS ${DB_NAME}
CHARACTER SET ${DB_CHARSET}
COLLATE ${DB_COLLATION};

USE ${DB_NAME};

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=${DB_CHARSET} COLLATE=${DB_COLLATION};

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    sabor VARCHAR(100),
    imagen_url VARCHAR(255),
    estado ENUM('activo', 'archivado', 'agotado') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
) ENGINE=InnoDB DEFAULT CHARSET=${DB_CHARSET} COLLATE=${DB_COLLATION};

-- Tabla de ingredientes
CREATE TABLE IF NOT EXISTS ingredientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    unidad_medida VARCHAR(50),
    stock DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=${DB_CHARSET} COLLATE=${DB_COLLATION};

-- Tabla de relación productos-ingredientes
CREATE TABLE IF NOT EXISTS producto_ingredientes (
    producto_id INT,
    ingrediente_id INT,
    cantidad DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (producto_id, ingrediente_id),
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (ingrediente_id) REFERENCES ingredientes(id)
) ENGINE=InnoDB DEFAULT CHARSET=${DB_CHARSET} COLLATE=${DB_COLLATION};

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'empleado') DEFAULT 'empleado',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=${DB_CHARSET} COLLATE=${DB_COLLATION};

-- Insertar algunas categorías de ejemplo
INSERT INTO categorias (nombre, descripcion) VALUES
('Pasteles', 'Pasteles y tortas para toda ocasión'),
('Cupcakes', 'Pequeños pasteles individuales'),
('Galletas', 'Galletas artesanales'),
('Postres', 'Postres variados');

-- Insertar usuario administrador por defecto
INSERT INTO usuarios (nombre, email, password, rol) VALUES
('${ADMIN_NAME}', '${ADMIN_EMAIL}', '${ADMIN_PASSWORD}', 'admin'); 