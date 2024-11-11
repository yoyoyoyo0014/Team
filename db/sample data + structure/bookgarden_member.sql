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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `me_id` varchar(255) NOT NULL,
  `me_name` varchar(45) NOT NULL,
  `me_nickname` varchar(8) NOT NULL,
  `me_pw` varchar(255) DEFAULT NULL,
  `me_email` varchar(50) NOT NULL,
  `me_phone` varchar(11) DEFAULT NULL,
  `me_address` text,
  `me_postalCode` varchar(5) DEFAULT NULL,
  `me_gender` varchar(25) NOT NULL DEFAULT 'male',
  `me_birth` date NOT NULL,
  `me_adult` int NOT NULL DEFAULT '0',
  `me_authority` varchar(10) NOT NULL DEFAULT 'user',
  `me_fail` int DEFAULT NULL,
  `me_cookie` varchar(255) DEFAULT NULL,
  `me_report` int DEFAULT NULL,
  `me_ms_name` varchar(10) NOT NULL,
  `me_stop` datetime DEFAULT NULL,
  `me_cm` varchar(20) DEFAULT NULL,
  `me_entercount` int DEFAULT NULL,
  `me_last` datetime DEFAULT NULL,
  `me_naverId` varchar(255) DEFAULT NULL,
  `me_point` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`me_id`),
  UNIQUE KEY `me_nickname` (`me_nickname`),
  UNIQUE KEY `me_email` (`me_email`),
  UNIQUE KEY `me_cm` (`me_cm`),
  KEY `FK_member_state_TO_member_1` (`me_ms_name`),
  CONSTRAINT `FK_member_state_TO_member_1` FOREIGN KEY (`me_ms_name`) REFERENCES `member_state` (`ms_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('admin123','ㅇ','admin','$2a$10$NqMCurlf/sPmYkKJR/YBdOs7V.6cQ2W0lcUG2rdSEq7ypMo2i7NHK','admin123@naver.com',NULL,NULL,NULL,'male','1999-09-09',1,'ADMIN',NULL,NULL,NULL,'사용',NULL,NULL,NULL,NULL,NULL,0),('angel1004','김김김','천사','$2a$10$PI4DfKtSu5FPfB4JJyGuQe8k7B6nCk6GkKthVzD3HCag8XKQJDmlS','angel@mail.net','0311234222','경기 성남시 분당구 판교역로 61 1111','13531','female','2000-10-11',0,'USER',NULL,NULL,NULL,'사용',NULL,NULL,NULL,NULL,NULL,0),('asd12345','김철수','찰스','$2a$10$NqMCurlf/sPmYkKJR/YBdOs7V.6cQ2W0lcUG2rdSEq7ypMo2i7NHK','sssaaa@e.net','01092222222','경기 오산시 가수로 33 111-111','18125','default','1999-01-01',0,'COMPANY',NULL,NULL,NULL,'사용',NULL,NULL,NULL,NULL,NULL,10),('test1232','하이','test123','$2a$10$NqMCurlf/sPmYkKJR/YBdOs7V.6cQ2W0lcUG2rdSEq7ypMo2i7NHK','test123@email.net','01011112222','경기 수원시 권선구 권선로357번길 30 111','16619','male','2000-10-10',0,'USER',NULL,NULL,NULL,'기간 정지','2024-11-09 12:24:56',NULL,NULL,NULL,NULL,10),('testcpn22','이대표','출판사테스트','$2a$10$8EIeMF9r.RzekF5/6Jh5.OBqFsWF4jVHT1UbJMtCG7wKHeW1Zr1r6','sss@e.net','0311234567','경기 오산시 세마역로19번길 6 111','18106','default','2000-10-10',0,'COMPANY',NULL,NULL,NULL,'사용',NULL,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
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
