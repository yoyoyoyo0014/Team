-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: bookgarden
-- ------------------------------------------------------
-- Server version	8.0.38

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
-- Table structure for table `secondgenre`
--

DROP TABLE IF EXISTS `secondgenre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `secondgenre` (
  `sg_num` int NOT NULL AUTO_INCREMENT,
  `sg_name` varchar(10) DEFAULT NULL,
  `sg_parent` int NOT NULL,
  PRIMARY KEY (`sg_num`),
  KEY `FK_genre_TO_secondgenre_1` (`sg_parent`),
  CONSTRAINT `FK_genre_TO_secondgenre_1` FOREIGN KEY (`sg_parent`) REFERENCES `genre` (`ge_num`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `secondgenre`
--

LOCK TABLES `secondgenre` WRITE;
/*!40000 ALTER TABLE `secondgenre` DISABLE KEYS */;
INSERT INTO `secondgenre` VALUES (1,'경제경영',1),(2,'자기계발',1),(3,'소설',1),(4,'시/에세이',1),(5,'인문',1),(6,'정치/사회',1),(7,'국어/외국어',1),(8,'IT/프로그래밍',1),(9,'교재/수험서',1),(10,'역사/문화',1),(11,'종교',1),(12,'메거진',1),(13,'아동',1),(14,'유아',1),(15,'가정/생활/요리',1),(16,'건강/의학',1),(17,'예술/대중문화',1),(18,'여행/취미',1),(19,'로맨스',2),(20,'로맨스판타지',2),(21,'BL',2),(22,'판타지',2),(23,'무협',2),(24,'라이트노벨',2),(25,'드라마',3),(26,'순정만화',3),(27,'할리퀸',3),(28,'BL만화',3),(29,'학원물',3),(30,'스포츠',3),(31,'액션/무협',3),(32,'SF/판타지',3),(33,'명랑/코믹',3),(34,'탐정/추리',3),(35,'공포/스릴러',3),(36,'요리',3);
/*!40000 ALTER TABLE `secondgenre` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-08 15:00:08
