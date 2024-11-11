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
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `bk_num` int NOT NULL AUTO_INCREMENT,
  `bk_name` varchar(255) NOT NULL,
  `bk_publisher` varchar(255) NOT NULL,
  `bk_state` varchar(4) NOT NULL,
  `bk_date` datetime NOT NULL,
  `bk_sg_num` int NOT NULL,
  `bk_plot` longtext NOT NULL,
  `bk_price` int NOT NULL DEFAULT '0',
  `bk_amount` int NOT NULL,
  `bk_index` varchar(255) DEFAULT NULL,
  `bk_isbn` varchar(255) NOT NULL,
  `bk_score` double DEFAULT '0',
  `bk_reviewCount` int DEFAULT '0',
  `bk_totalPage` int NOT NULL,
  `bk_agelimit` int NOT NULL,
  `bk_totalPurchase` int NOT NULL DEFAULT '0',
  `bk_age_60_male` int NOT NULL DEFAULT '0',
  `bk_age_60_female` int NOT NULL DEFAULT '0',
  `bk_age_50_male` int NOT NULL DEFAULT '0',
  `bk_age_50_female` int NOT NULL DEFAULT '0',
  `bk_age_40_male` int NOT NULL DEFAULT '0',
  `bk_age_40_female` int NOT NULL DEFAULT '0',
  `bk_age_30_male` int NOT NULL DEFAULT '0',
  `bk_age_30_female` int NOT NULL DEFAULT '0',
  `bk_age_20_male` int NOT NULL DEFAULT '0',
  `bk_age_20_female` int NOT NULL DEFAULT '0',
  `bk_age_10_male` int NOT NULL DEFAULT '0',
  `bk_age_10_female` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`bk_num`),
  KEY `FK_secondgenre_TO_book_1` (`bk_sg_num`),
  CONSTRAINT `FK_secondgenre_TO_book_1` FOREIGN KEY (`bk_sg_num`) REFERENCES `secondgenre` (`sg_num`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'빠르게 생각하고 똑똑하게 말하라','웨일북','해외도서','2024-09-10 00:00:00',2,'“어떻게 생각하세요?”라는 질문에 우리는 당황하거나 말을 얼버무리는 경우가 많다. 뇌가 갑자기 정지된 사람처럼 대화를 잇지 못한다. 자신의 생각을 다른 사람에게 전달해야 한다는 것 자체만으로도 두렵다. 즉 남들 앞에서 잘 말해야 한다는 압박감이 우리를 움츠러들게 만드는 것이다. 이는 말하기에 두려움을 느끼는 정도만큼 우리의 일과 인간관계에도 엄청난 영향을 끼친다.',17100,0,NULL,'0010011101',7,2,320,12,3,0,0,0,0,0,0,0,3,0,0,0,0),(2,'박태웅의 AI 강의 2025','한빛비즈','국내도서','2024-10-08 00:00:00',8,'2023년 청소년 교양도서 우수도서이자, 독자들이 뽑은 인공지능 분야 최고의 책으로 선택된 베스트셀러 《박태웅의 AI 강의》가 최신 AI 트렌드와 더 깊은 인사이트를 담아 《박태웅의 AI 강의 2025》로 돌아왔다. 인공지능 원리에 대한 쉬운 설명은 그대로 유지한 채 더욱 깊이 있는 기술 지식이 책 곳곳에 추가되었고, 우리가 반드시 알아야 할 AI 트렌드는 물론이요, AI로 인해 변화될 앞으로의 우리 모습까지 조망하고 있다.',18800,0,NULL,'9791157847679',12,3,300,0,4,0,0,0,0,0,0,0,4,0,0,0,0),(3,'고전이 답했다 마땅히 살아야 할 삶에 대하여','라곰','국내도서','2024-10-08 01:00:00',2,'매일 아침 7만 명이 유튜브 강의를 찾아 듣고, 한 달에 20여 차례 전국의 강연장을 찾아가 독자들을 만나는 이 시대 최고의 강연자. 30만 독자가 기다린 베스트셀러 저자 고명환이 지난 10여 년간의 인생 내공이 응축된 책, 『고전이 답했다 마땅히 살아야 할 삶에 대하여』에서 고전(古典)에서 길어 올린 흔들림 없는 삶의 내공을 전한다.',16800,0,NULL,'9791193939130',11,3,252,0,5,0,0,0,0,0,0,0,5,0,0,0,0),(4,'고양이 해결사 깜냥7','창비','국내도서','2024-10-08 02:00:00',13,'\n복잡한 도시에서 한가로이 자유와 낭만을 즐길 수 있는 캠핑장에 깜냥과 하품이가 나타났다. 둘은 장난감을 가져오지 않아 심심해하는 남매를 위해 자연 속에서 새로운 놀이를 발견하고, 휠체어를 탄 캠핑장 손님과 요리 대회에 나가 해결사로서 역할을 톡톡히 해내기도 한다. 맛있는 음식도 먹고 즐거운 시간을 보낸 두 고양이가 느긋하게 쉬려던 찰나, 평화롭던 한밤중 캠핑장에 기묘한 소리가 들려오는데……. 설마 귀신이라도 나타난 걸까? 설상가상으로 하품이까지 사라지자 깜냥은 불안한 마음으로 하품이를 찾아 나선다. 과연 깜냥과 하품이는 캠핑장에서 하루를 무사히 마칠 수 있을까?',14000,0,NULL,'9788936448752',9,2,92,8,0,0,0,0,0,0,0,0,0,0,0,0,0),(7,'대온실 수리 보고서 : 김금희 장편소설','창비','국내도서','2024-10-31 09:00:00',3,'창경궁 대온실의 비밀을 둘러싼 장엄한 서사<br/>소설이 줄 수 있는 최대의 재미와 감동을 만나다<br/>마침내 탄생한 김금희의 역작!<br/><br/>마음에 이는 무늬를 섬세하게 수놓으며 이야기의 아름다움을 증명해온 소설가 김금희가 장편소설 『대온실 수리 보고서』를 선보인다. 이 작품은 동양 최대의 유리온실이었던 창경궁 대온실을 배경으로, 그 안에 숨어 있는 가슴 저릿한 비밀과 인간에 대한 믿음을 저버리지 않으려는 신념을 감동적으로 보여준다. 작가가 작품활동을 시작한 지 15년 만에 처음 선보이는 역사소설로, 김금희 소설세계를 한차원 새롭게 열며 근래 보기 드문 풍성한 장편소설의 진면목을 보여주는 대작이다. 창경궁과 창덕궁을 둘러싼 자연에 대한 묘사, 한국 최초 유리온실인 대온실의 건축을 아우르는 역사, 일제강점기 창경원에 감춰진 비밀, 오래된 서울의 동네인 원서동이 풍기는 정취, 그리고 그 안에서 살아가는 사람들의 마음을 크고 작은 사건을 통해 생생하게 보여주는 이 작품은 소설이 줄 수 있는 최대치의 재미와 감동을 독자에게 선사한다고 해도 과언이 아니다.<br/>이 작품의 주인공이 써내려가는 ‘수리 보고서’는 건축물을 수리하는 과정을 담은 글이면서 동시에 우리의 아픈 역사와 상처받은 인생의 한 순간을 수리하고 재건하는 기록이기도 하다. 인간이라면 누구나 불가피하게 경험할 수밖에 없는 어떤 마음의 상처는 건축물을 구성하는 필수요소, 마치 문고리나 창틀이 집을 짓기 위해서는 반드시 필요한 소재인 것처럼 삶을 이루는 데 꼭 필요한 요소라고 작가는 이야기하는 듯하다. 두려운 나머지 잊고 묻어두었던 과거를 다시 마주하게 된 주인공이 보고서에 마침표를 찍을 수 있을 때 이 방대한 이야기를 따라온 독자는 이 작품을 읽기 전과는 다른 사람이 된 것만 같은 마음의 성장을 실감하는 동시에 가슴 찡한 감동을 느끼게 될 것이다.',14400,0,'1장. 원서동<br/>2장. 옮겨다 심은 종려나무 밑<br/>3장. 야앵(夜櫻)<br/>4장. 타오르는 소용돌이<br/>5장. 당신은 배고픈 쿠마 센세이<br/>6장. 큰물새우리<br/>7장. 목어와 새<br/>8장. 얘들아 내 얘기를<br/>9장. 대온실 수리 보고서<br/><br/>일러두기 | 작가의 말 | 참고자료','9788936439651',0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(8,'동물들의 보금자리','중앙출판사(중앙미디어)','해외도서','2005-01-01 09:00:00',13,'땅 속에 살고 있는 여우, 나무에 구멍을 뚫어 둥지를 만드는 딱따구리, 아프리카에 예쁜 둥지를 틀고 사는 베짜는새를 만날 수 있다. 동물들이 살고 있는 보금자리를 통해 동물들의 생활 모습을 알아본다.<br/><br/>자연 다큐멘터리의 세계적 권위를 자랑하는 내셔널 지오그래픽이 어린이들에게 살아 있는 자연의 신비를 생생하게 전하기 위해 만든 자연과학 입체북 시리즈. 책을 펼치는 순간 사실적이고 정교하며 입체적으로 펼쳐진 대자연의 모습에 눈을 떼지 못하게 된다.<br/><br/>처음에는 책장을 펼칠 때마다 쉼없이 튀어 오르는 엄청난 입체적 표현에 놀라고, 다음에는 플랩과 팝업, 탭 등을 움직여 보며 동식물의 움직임과 소리를 직접 만들어 내는 재미를 느끼고, 그 다음에는 입체 그림의 움직임 하나하나까지 빠짐없이 표현된 사실적이고 재미있는 내용에 반하게 된다.<br/><br/>플랩과 팝업, 탭 등을 통해 직접 동식물의 특징과 움직임, 소리까지 조작해 볼 수 있어 우리 아이들이 실제로 가 보기 힘든 바닷속, 정글, 사막, 투탕카멘의 무덤과 메사버드 등을 시간과 공간을 초월해 실제로 탐험하는 듯한 느낌을 주며 자연스럽게 자연 과학에 대한 흥미와 관심을 유발시켜 준다.',22000,0,'','8945120157 8945120203 ',0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(9,'Fünf Freunde. Drei rätselhafte Fälle','테스트','국내도서','2024-11-01 09:00:00',17,'이 헌법시행 당시의 법령과 조약은 이 헌법에 위배되지 아니하는 한 그 효력을 지속한다. 재판의 심리와 판결은 공개한다. 다만, 심리는 국가의 안전보장 또는 안녕질서를 방해하거나 선량한 풍속을 해할 염려가 있을 때에는 법원의 결정으로 공개하지 아니할 수 있다.<br/><br/>지방자치단체는 주민의 복리에 관한 사무를 처리하고 재산을 관리하며, 법령의 범위안에서 자치에 관한 규정을 제정할 수 있다. 대통령은 국회에 출석하여 발언하거나 서한으로 의견을 표시할 수 있다.',6500,0,'1. ㅇㅇㅇ<br/>2. ㄴㄴㄴㄴ','9783809426707 3809426709',0,0,25,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(10,'(Die) 100 besten 1-2-3 Minutengeschichten : von klugen Eulen, Schlossgespenstern und müden Zwergen','','국내도서','2024-11-01 09:00:00',24,'ssss',5000,0,'s<br/>s<br/>s','9783473368419 3473368415',0,0,25,0,0,0,0,0,0,0,0,0,0,0,0,0,0),(11,'(Die) 100 besten 1-2-3 Minutengeschichten : von klugen Eulen, Schlossgespenstern und müden Zwergen','','국내도서','2024-11-01 09:00:00',1,'dfasfasdf',10000,0,'12313123','9783473368419 3473368415',0,0,25,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
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
