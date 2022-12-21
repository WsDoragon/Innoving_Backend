DROP DATABASE IF EXISTS innoving;

CREATE DATABASE If NOT EXISTS innoving;

USE innoving;

CREATE TABLE IF NOT EXISTS `ejes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

INSERT INTO `ejes` (`id`, `nombre`) VALUES
	(1, 'Gobernanza y Sinergias'),
	(2, 'Gestión del Cambio y Capital Humano Avanzado'),
	(3, 'I+D Aplicado y Vínculo con Sector Productivo'),
	(4, 'Comercialización de Tecnología y Emprendimiento de Base Tecnológica'),
	(5, 'Alianzas Internacionales'),
	(6, 'Armonización Curricular y postgrados tecnológicos');
/*!40000 ALTER TABLE `ejes` ENABLE KEYS */;
	

CREATE TABLE IF NOT EXISTS `historialpeticiones` (
  `id` varchar(50) NOT NULL DEFAULT 'hola',
  `id_imm` varchar(50) DEFAULT NULL,
  `tipo` int(11) DEFAULT NULL,
  `solicitud` varchar(50) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `fecha` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `indicadores` (
  `id` varchar(50) DEFAULT NULL,
  `CalificacionCORFO` varchar(100) DEFAULT NULL,
  `NumeroIndicador` int(11) NOT NULL AUTO_INCREMENT,
  `MisionUniversitaria` varchar(100) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `TipoIndicador` varchar(100) DEFAULT NULL,
  `eje` int(11) DEFAULT NULL,
  `Unidad` varchar(100) DEFAULT NULL,
  `FuenteInformacion` varchar(100) DEFAULT NULL,
  `Responsable` varchar(100) DEFAULT NULL,
  `Frecuencia` varchar(100) DEFAULT NULL,
  `Aprobado` int(50) DEFAULT NULL,
  `Peticion` varchar(50) DEFAULT NULL,
  `id_editado` varchar(50) DEFAULT NULL,
  `Descripcion` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`NumeroIndicador`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla nodedb2.indicadores: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `indicadores` DISABLE KEYS */;
CREATE TABLE IF NOT EXISTS `metas` (
  `id` varchar(50) NOT NULL DEFAULT 'hola',
  `idindicador` varchar(150) NOT NULL DEFAULT '0',
  `fecha` varchar(150) NOT NULL DEFAULT '0',
  `cantidad` int(11) DEFAULT NULL,
  `Peticion` varchar(150) NOT NULL DEFAULT '0',
  `Aprobado` int(11) DEFAULT NULL,
  `antiguaid` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;



CREATE TABLE Variables (
  id INT PRIMARY KEY AUTO_INCREMENT,
  descripcion VARCHAR(100) NOT NULL
);

CREATE TABLE Indicadores_Variables (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_indicador INT(11) NOT NULL,
  id_variable INT NOT NULL,
  FOREIGN KEY (id_indicador) REFERENCES indicadores(NumeroIndicador),
  FOREIGN KEY (id_variable) REFERENCES Variables(id)
);

create table publicacion(
    publicacion_id int not null AUTO_INCREMENT primary key,
	issn_doi varchar(100) not null,
    titulo varchar(100),
    autores varchar(100),
    revista varchar(100),
    autores_extranjeros TINYINT(1),
    validado TINYINT(1),
    indexacion varchar(100), 
    anio date,
    clasificacion varchar(100),
    disciplina varchar(100)
);

CREATE TABLE Variables_Publicaciones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  valor INT NOT NULL,
  id_publicacion INT NOT NULL,
  id_variable INT ,
  FOREIGN KEY (id_publicacion) REFERENCES publicacion(publicacion_id),
  FOREIGN KEY (id_variable) REFERENCES Variables(id)
);

create table archivo(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_fk_pub int(6),
    id_fk_pro int(6),
    nombre varchar(255),
    ruta varchar(255),
    foreign key(id_fk_pub) references publicacion(`publicacion_id`)
);

/*
USUARIOS
*/
DROP TABLE IF EXISTS `rol`;

CREATE TABLE `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;


LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Gerente'),(2,'Administrador'),(3,'Analista'),(4,'Proveedor');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol_usuario`
--

DROP TABLE IF EXISTS `rol_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rol_usuario` (
  `id_rut` varchar(20) NOT NULL,
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id_rut`,`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol_usuario`
--

LOCK TABLES `rol_usuario` WRITE;
/*!40000 ALTER TABLE `rol_usuario` DISABLE KEYS */;
INSERT INTO `rol_usuario` VALUES ('a-0',1), ('a-0',2),('a-0',3);
/*!40000 ALTER TABLE `rol_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `rut` varchar(20) NOT NULL DEFAULT '0',
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rut`),
  UNIQUE KEY `rut_UNIQUE` (`rut`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('a-0','carlitos','torrez','carlitos@gmail.com',"1f40fc92da241694750979ee6cf582f2d5d7d28e18335de05abc54d0560e0f5302860c652bf08d560252aa5e74210546f369fbbbce8c12cfc7957b2652fe9a75",1,NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
