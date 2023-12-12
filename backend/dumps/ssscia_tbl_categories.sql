-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: ssscia
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `tbl_categories`
--

DROP TABLE IF EXISTS `tbl_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cat_type` int DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_categories`
--

LOCK TABLES `tbl_categories` WRITE;
/*!40000 ALTER TABLE `tbl_categories` DISABLE KEYS */;
INSERT INTO `tbl_categories` VALUES (44,2,'အသင်းဝင်လျှောက်လွှာများ','2023-11-29 07:16:13','2023-11-29 07:16:57'),(49,1,'ပြည်တွင်းသတင်းများ','2023-11-29 09:35:52','2023-11-29 09:35:52'),(54,1,'နည်းပညာသတင်းများ','2023-11-30 04:42:24','2023-11-30 04:42:24'),(55,1,'ပြည်ပသတင်းများ','2023-12-03 04:05:44','2023-12-03 04:05:44'),(56,2,'မြေယာကိစ္စရပ်များ','2023-12-04 03:45:30','2023-12-04 03:45:30'),(57,2,'ပြောင်းပေါက်ဈေး','2023-12-04 03:46:08','2023-12-04 03:46:08'),(58,2,'ရွှေ/ဒေါ်လာပေါက်ဈေး','2023-12-04 03:46:33','2023-12-04 03:46:33'),(59,2,'ကြေငြာချက်များ','2023-12-04 03:47:02','2023-12-04 03:47:02'),(60,2,'ဥပဒေများ','2023-12-04 03:48:57','2023-12-04 03:48:57'),(61,3,'ဥက္ကဌ','2023-12-04 04:15:05','2023-12-04 04:15:05'),(62,4,'ကုမ္ပဏီအကြောင်း','2023-12-04 04:55:51','2023-12-04 04:55:51'),(63,1,'','2023-12-04 04:55:51','2023-12-04 04:55:51');
/*!40000 ALTER TABLE `tbl_categories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-04 15:19:54
