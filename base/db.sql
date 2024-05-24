
CREATE DATABASE  IF NOT EXISTS `pbbv` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pbbv`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: pbbv
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
                          `Id_curso` int NOT NULL,
                          `Titulo` varchar(25) NOT NULL,
                          `Fecha_inicio` date NOT NULL,
                          `Categoria` varchar(25) NOT NULL,
                          `Archivo` varchar(50) DEFAULT NULL,
                          `Descripcion` text NOT NULL,
                          PRIMARY KEY (`Id_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES
(1, 'Introducción a la Programación', '2024-06-01', 'Informática', 'introduccion_programacion.pdf', 'Curso introductorio sobre programación para principiantes.'),
(2, 'Marketing Digital Avanzado', '2024-06-15', 'Marketing', 'marketing_digital_avanzado.pdf', 'Curso avanzado que cubre estrategias y tácticas de marketing digital.'),
(3, 'Inglés Conversacional', '2024-07-01', 'Idiomas', 'ingles_conversacional.mp4', 'Curso diseñado para mejorar las habilidades de conversación en inglés.'),
(4, 'Diseño Gráfico Profesional', '2024-07-15', 'Diseño', 'diseno_grafico_profesional.zip', 'Curso completo sobre diseño gráfico utilizando herramientas profesionales.'),
(5, 'Finanzas Personales', '2024-08-01', 'Finanzas', NULL, 'Curso práctico para gestionar de manera efectiva las finanzas personales.'),
(6, 'Cocina Mediterránea', '2024-08-15', 'Cocina', 'cocina_mediterranea_recetas.docx', 'Curso de cocina centrado en recetas saludables de la cocina mediterránea.'),
(7, 'Desarrollo Web con HTML y CSS', '2024-09-01', 'Informática', 'desarrollo_web_html_css.pdf', 'Curso introductorio sobre desarrollo web utilizando HTML y CSS.'),
(8, 'Gestión de Proyectos con Scrum', '2024-09-15', 'Negocios', 'gestion_proyectos_scrum.pptx', 'Curso práctico sobre metodologías ágiles de gestión de proyectos.'),
(9, 'Fotografía Digital Básica', '2024-10-01', 'Arte', 'fotografia_digital_basica.jpg', 'Curso para principiantes que cubre los fundamentos de la fotografía digital.'),
(10, 'Introducción a la Inteligencia Artificial', '2024-10-15', 'Tecnología', NULL, 'Curso introductorio que explora conceptos básicos de inteligencia artificial y sus aplicaciones.'),
(11, 'Marketing en Redes Sociales', '2024-11-01', 'Marketing', 'marketing_redes_sociales.mp4', 'Curso avanzado sobre estrategias de marketing en diversas plataformas de redes sociales.'),
(12, 'Dibujo y Pintura para Principiantes', '2024-11-15', 'Arte', 'dibujo_pintura_principiantes.docx', 'Curso diseñado para aquellos que desean aprender técnicas básicas de dibujo y pintura.'),
(13, 'Programación en Python', '2024-12-01', 'Informática', 'programacion_python.zip', 'Curso completo sobre programación en Python, desde conceptos básicos hasta técnicas avanzadas.'),
(14, 'Gestión del Tiempo y Productividad', '2024-12-15', 'Desarrollo Personal', NULL, 'Curso práctico para mejorar la gestión del tiempo y aumentar la productividad personal y profesional.'),
(15, 'Nutrición y Dietética', '2025-01-01', 'Salud', 'nutricion_dietetica.pdf', 'Curso que aborda los principios básicos de la nutrición y ofrece pautas para mantener una dieta equilibrada.'),
(16, 'Aprendizaje Automático con TensorFlow', '2025-01-15', 'Tecnología', 'aprendizaje_automatico_tensorflow.zip', 'Curso avanzado sobre aprendizaje automático utilizando la biblioteca TensorFlow de Google.');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscripciones`
--

DROP TABLE IF EXISTS `inscripciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripciones` (
                                 `Id_usuario` int DEFAULT NULL,
                                 `Id_curso` int NOT NULL,
                                 `Fecha_inicio` date NOT NULL,
                                 `Comentario` text,
                                 KEY `fk_Users` (`Id_usuario`),
                                 KEY `fk_Curso` (`Id_curso`),
                                 CONSTRAINT `fk_Curso` FOREIGN KEY (`Id_curso`) REFERENCES `cursos` (`Id_curso`),
                                 CONSTRAINT `fk_Users` FOREIGN KEY (`Id_usuario`) REFERENCES `users` (`Id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripciones`
--

LOCK TABLES `inscripciones` WRITE;
/*!40000 ALTER TABLE `inscripciones` DISABLE KEYS */;
INSERT INTO `inscripciones` VALUES
    (1, 2, '2023-06-15', 'Estoy interesado en ampliar mis conocimientos sobre marketing digital.'),
    (2, 2, '2023-07-01', 'Quiero mejorar mi habilidad para hablar inglés en conversaciones.'),
    (3, 3, '2024-07-01', 'Quiero mejorar mi habilidad para hablar inglés en conversaciones.'),
    (4, 4, '2024-07-15', 'Me apasiona el diseño gráfico y quiero perfeccionar mis habilidades.'),
    (5, 5, '2024-08-01', 'Necesito mejorar mi gestión financiera personal.'),
    (6, 6, '2024-08-15', 'Me encanta cocinar y quiero aprender más sobre la cocina mediterránea.'),
    (7, 7, '2024-09-01', 'Quiero empezar a desarrollar mis propias páginas web.'),
    (8, 8, '2024-09-15', 'Necesito mejorar la gestión de proyectos en mi empresa.'),
    (9, 9, '2024-10-01', 'Siempre he querido aprender más sobre fotografía digital.'),
    (10, 10, '2024-10-15', 'Estoy intrigado por el potencial de la inteligencia artificial.'),
    (11, 11, '2024-11-01', 'Quiero mejorar mi estrategia de marketing en redes sociales para mi negocio.'),
    (12, 12, '2024-11-15', 'El dibujo y la pintura siempre me han interesado.'),
    (13, 13, '2024-12-01', 'Quiero aprender programación en Python para expandir mis habilidades.'),
    (14, 14, '2024-12-15', 'Necesito mejorar mi gestión del tiempo y ser más productivo.'),
    (15, 15, '2025-01-01', 'Estoy interesado en aprender más sobre nutrición y dietética.'),
    (16, 16, '2025-01-15', 'Me gustaría adentrarme en el aprendizaje automático con TensorFlow.');

/*!40000 ALTER TABLE `inscripciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
                         `Id_usuario` int NOT NULL,
                         `Nombre_Usuario` varchar(25) NOT NULL,
                         `Nombre` varchar(25) NOT NULL,
                         `Apellido` varchar(25) NOT NULL,
                         `Email` varchar(50) NOT NULL,
                         `Contraseña` varchar(25) NOT NULL,
                         `Tipo` varchar(20) DEFAULT NULL,
                         PRIMARY KEY (`Id_usuario`),
                         CONSTRAINT `users_chk_1` CHECK ((`Tipo` in (_utf8mb4'estudiante',_utf8mb4'administrador')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'pauliiortizz','Paulina','Ortiz Noseda','paulinaortizilr5@gmail.com','bangho123','administrador'),
(2,'baujuncos','Bautista','Juncos','baujuncos1205@gmail.com','23polo67','estudiante'),
(3,'belutreachii','Belen','Treachi','belentreachi@gmail.com','nicoybelu45','estudiante'),
(4,'virrodriguez','Virginia','Rodriguez','virchu23@gmail.com','virdiosa67','estudiante'),
(5,'magdanoseda','Magdalena','Noseda','maguinoseda@hotmail.com','iTAlia','administrador'),
(6,'olivetosofi','Sofia','Oliveto','oliveto078@gmail.com','ferXxo','estudiante'),
(7,'juanperez','Juan','Perez','juanperez@mail.com', 'tengohambre44', 'estudiante'),
(8,'anitaagomeeez','Ana','Gomez','anagomez@mail.com','quierocomer','Estudiante'),
(9,'carlitos4rodri','Carlos','Rodriguez','carlosrodriguez@mail.com','amoingenieria','administrador'),
(10,'luchimartinez','Lucia','Martinez','luciamartinez@mail.com','livelaughlove','estudiante' ),
(11,'mariitaa','Maria','Fernandez','mariafernandez@mail.com','soylomas','estudiante'),
(12, 'peposanchez', 'Pedro', 'Sánchez', 'pedrosanchez@example.com', 'Sánchez7890', 'administrador'),
(13, 'laurita', 'Laura', 'Rodríguez', 'laurarodriguez@example.com', 'Rodríguez123', 'estudiante'),
(14, 'fernandezsooo', 'Sofía', 'Fernández', 'sofiafernandez@example.com', 'Fernández456', 'estudiante'),
(15, 'gomezmiguelito', 'Miguel', 'Gómez', 'miguelgomez@example.com', 'Gómez789', 'estudiante'),
(16, 'diazelena', 'Elena', 'Díaz', 'elenadiaz@example.com', 'Díaz0123', 'administrador'),
(17, 'javi34alvarez', 'Javier', 'Alvarez', 'javieralvarez@example.com', 'Alvarez3456', 'estudiante'),
(18, 'pauchii', 'Paula', 'Torres', 'paulatorres@example.com', 'Torres6789', 'estudiante'),
(19, 'santoscarmelita', 'Carmen', 'Santos', 'carmensantos@example.com', 'Santos4567', 'estudiante'),
(20, 'alejimenez', 'Alejandro', 'Jiménez', 'alejandrojimenez@example.com', 'Jiménez8901', 'estudiante'),
(21, 'morenorosi', 'Rosa', 'Moreno', 'rosamoreno@example.com', 'Moreno2345', 'administrador'),
(22, 'hernandez44', 'Pablo', 'Hernández', 'pablohernandez@example.com', 'Hernández6789', 'estudiante'),
(23, 'lugarcia', 'Luisa', 'García', 'luisagarcia@example.com', 'García0123', 'estudiante'),
(24, 'vargasfer', 'Fernando', 'Vargas', 'fernandovargas@example.com', 'Vargas4567', 'estudiante'),
(25, 'luchi_lopez', 'Lucía', 'López', 'lucialopez@example.com', 'López8901', 'administrador');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-20 16:58:18
