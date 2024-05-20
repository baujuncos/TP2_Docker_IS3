
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
(1,'Curso dde Fotografia','2024-06-11','Fotografia y Creatividad',NULL,'Te enseñamos a sacar fotos'),
(2,'Inteligencia Emocional','2024-07-11','Amor propio',NULL,'Aprender a autoconocerse'),
(3,'Biodanza','2024-03-02','Mindfulnes',NULL,'Conociendo el plano astral terrenal');
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
(2,2,'2024-12-05','me gusta mucho comer!'),
(3,2,'2023-11-06','holaa'),
(4,1,'2021-03-06','jajaja'),
(1,2,'2021-03-06','que divertido'),
(3,1,'2021-04-05',NULL);
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
INSERT INTO `users` VALUES (1,'pauliiortizz','Paulina','Ortiz Noseda','paulinaortizilr5@gmail.com','bangho123','administrador'),
                           (2,'baujuncos','Bautista','Juncos','baujuncos1205@gmail.com','23polo67','estudiante'),
                           (3,'belutreachii','Belen','Treachi','belentreachi@gmail.com','nicoybelu45','estudiante'),
                           (4,'virrodriguez','Virginia','Rodriguez','virchu23@gmail.com','virdiosa67','estudiante');
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
