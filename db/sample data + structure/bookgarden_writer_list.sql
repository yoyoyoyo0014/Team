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
-- Table structure for table `writer_list`
--

DROP TABLE IF EXISTS `writer_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `writer_list` (
  `wl_num` int NOT NULL AUTO_INCREMENT,
  `wl_wr_num` int NOT NULL,
  `wl_bk_num` int NOT NULL,
  `wl_wt_num` int NOT NULL,
  PRIMARY KEY (`wl_num`),
  KEY `FK_writer_TO_writer_List_1` (`wl_wr_num`),
  KEY `FK_book_TO_writer_List_1` (`wl_bk_num`),
  KEY `FK_writer_Type_TO_writer_List_1` (`wl_wt_num`),
  CONSTRAINT `FK_book_TO_writer_List_1` FOREIGN KEY (`wl_bk_num`) REFERENCES `book` (`bk_num`),
  CONSTRAINT `FK_writer_TO_writer_List_1` FOREIGN KEY (`wl_wr_num`) REFERENCES `writer` (`wr_num`),
  CONSTRAINT `FK_writer_Type_TO_writer_List_1` FOREIGN KEY (`wl_wt_num`) REFERENCES `writer_type` (`wt_num`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `writer_list`
--

LOCK TABLES `writer_list` WRITE;
/*!40000 ALTER TABLE `writer_list` DISABLE KEYS */;
INSERT INTO `writer_list` VALUES (1,1,1,1),(2,2,1,3),(3,3,2,2),(4,4,3,1),(5,5,4,1),(6,6,4,4),(9,7,7,1),(10,8,8,1),(11,9,8,4),(12,10,8,3),(13,1,9,1),(14,1,10,1),(15,1,11,1);
/*!40000 ALTER TABLE `writer_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-08 15:00:06
