-- MySQL dump 10.13  Distrib 5.7.44, for osx10.15 (x86_64)
--
-- Host: localhost    Database: SSSCIA
-- ------------------------------------------------------
-- Server version	5.7.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
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
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_categories`
--

LOCK TABLES `tbl_categories` WRITE;
/*!40000 ALTER TABLE `tbl_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_crop_factors`
--

DROP TABLE IF EXISTS `tbl_crop_factors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_crop_factors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `land_improvement` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `land_improvement_costs` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type_of_seed_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type_of_seed_beds_no` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type_of_seed_cost` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type_of_seed_buy_shop` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `manure_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `manure_beds_no` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `manure_cost` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `manure_manpower` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `manure_buy_shop` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pesticides_type` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pesticides_frequency_of_spraying` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pesticides_manpower` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pesticides_cost` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pesticides_buy_shop` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `types_of_crops_grown_and_acreage` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `harvesting_and_threshing_own` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `harvesting_and_threshing_rental` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `harvesting_and_threshing_type` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `harvesting_and_threshing_manpower` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `harvesting_and_threshing_savings_costs` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `harvesting_and_threshing_device_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `one_acre_output` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `total_yield` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sales_fair_or_dealer` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sales_fair_or_dealer_price_received` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isloan` int(11) DEFAULT NULL,
  `loan_person` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_seed_loan` int(11) DEFAULT NULL,
  `seen_loan_person` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_fertilizer_loan` int(11) DEFAULT NULL,
  `fertilizer_loan_person` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_crop_factors`
--

LOCK TABLES `tbl_crop_factors` WRITE;
/*!40000 ALTER TABLE `tbl_crop_factors` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_crop_factors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_land_factors`
--

DROP TABLE IF EXISTS `tbl_land_factors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_land_factors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `number_of_map` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `own` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rent` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `acreage` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pitch_no` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ownership_no` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `land_type` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `acres_of_land_owned` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `acres_of_land_ground` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `form_seven_form_onehundredfive_acres_of_contract` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `form_seven_acres_of_applied` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `names_of_neighbor_of_farm_east` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `names_of_neighbor_of_farm_west` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `names_of_neighbor_of_farm_south` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `names_of_neighbor_of_farm_north` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `number_of_family_members_by_grandparents` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apply_family_one_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apply_family_one_nrc` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apply_family_two_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apply_family_two_nrc` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `time_value` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `photo_form_seven` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `photo_form_onehundredfive` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `photo_contract` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `photo_ancestral_property` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `photo_other` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `photo_household_chart` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_land_factors`
--

LOCK TABLES `tbl_land_factors` WRITE;
/*!40000 ALTER TABLE `tbl_land_factors` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_land_factors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_loan_submittion`
--

DROP TABLE IF EXISTS `tbl_loan_submittion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_loan_submittion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loan_submit_date` datetime DEFAULT NULL,
  `loan_amount` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `land_value_and_acres_to_be_insured` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_apply_person` int(11) DEFAULT NULL,
  `relationship_with_supporters` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_current_crop_cultivation` int(11) DEFAULT NULL,
  `is_taken_loan` int(11) DEFAULT NULL,
  `proof_of_repayment` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_health_and_chronic_disease` int(11) DEFAULT NULL,
  `supporter_one_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supporter_one_nrc` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supporter_one_dob` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supporter_one_age` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supporter_one_place` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supporter_one_phone` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supporter_two_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supporter_two_nrc` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supporter_two_dob` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supporter_two_place` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supporter_two_phone` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `health_supporter` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `photograph_of_land_to_be_insured` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_loan_submittion`
--

LOCK TABLES `tbl_loan_submittion` WRITE;
/*!40000 ALTER TABLE `tbl_loan_submittion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_loan_submittion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_members`
--

DROP TABLE IF EXISTS `tbl_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) DEFAULT NULL,
  `userid` int(11) NOT NULL,
  `first_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `father_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `education` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ethnicity` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `religion` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nrc` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company_address` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `corn_business_life` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `home_address` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone_number` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email_address` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `photo` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `home_no` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `home_street` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `home_quater` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `home_village` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `home_township` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `home_division_state` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `number_of_siblings` int(11) DEFAULT NULL,
  `phone_no` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bank_acc_no` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bank_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `payment_app_number` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `payment_app_type` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nrc_f_photo` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nrc_b_photo` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_members`
--

LOCK TABLES `tbl_members` WRITE;
/*!40000 ALTER TABLE `tbl_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_posts`
--

DROP TABLE IF EXISTS `tbl_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `links` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `images` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_posts`
--

LOCK TABLES `tbl_posts` WRITE;
/*!40000 ALTER TABLE `tbl_posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_users` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `phone_no` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES `tbl_users` WRITE;
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-31 11:44:19
