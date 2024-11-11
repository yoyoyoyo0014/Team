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
-- Table structure for table `achievenent_list`
--

DROP TABLE IF EXISTS `achievenent_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `achievenent_list` (
  `acl_ac_num` int NOT NULL,
  `acl_me_id` varchar(15) NOT NULL,
  `acl_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `acl_observe` int NOT NULL DEFAULT '0',
  KEY `FK_achievenent_TO_achievenent_List_1` (`acl_ac_num`),
  KEY `FK_member_TO_achievenent_List_1` (`acl_me_id`),
  CONSTRAINT `FK_achievenent_TO_achievenent_List_1` FOREIGN KEY (`acl_ac_num`) REFERENCES `achievenent` (`ac_num`),
  CONSTRAINT `FK_member_TO_achievenent_List_1` FOREIGN KEY (`acl_me_id`) REFERENCES `member` (`me_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achievenent_list`
--

LOCK TABLES `achievenent_list` WRITE;
/*!40000 ALTER TABLE `achievenent_list` DISABLE KEYS */;
INSERT INTO `achievenent_list` VALUES (1,'angel1004','2024-10-31 12:27:42',0),(1,'testcpn22','2024-10-31 15:27:48',1),(1,'test1232','2024-11-04 16:28:42',1),(2,'test1232','2024-11-07 12:44:40',1),(2,'asd12345','2024-11-08 12:09:08',1);
/*!40000 ALTER TABLE `achievenent_list` ENABLE KEYS */;
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
