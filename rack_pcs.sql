-- MariaDB dump 10.19  Distrib 10.5.23-MariaDB, for debian-linux-gnueabihf (armv8l)
--
-- Host: localhost    Database: rack_pcs
-- ------------------------------------------------------
-- Server version	10.5.23-MariaDB-0+deb11u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (2,'admin','123456','2024-05-12 10:55:44','2024-05-12 10:55:44');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientid`
--

DROP TABLE IF EXISTS `clientid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientid` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientid`
--

LOCK TABLES `clientid` WRITE;
/*!40000 ALTER TABLE `clientid` DISABLE KEYS */;
INSERT INTO `clientid` VALUES (1,1,'PCS-13 - PCS 29'),(2,2,'PCS-29 - PCS 46'),(3,3,'PCS-46 - PCS 61');
/*!40000 ALTER TABLE `clientid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `container`
--

DROP TABLE IF EXISTS `container`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `container` (
  `containerId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `station` varchar(100) NOT NULL,
  `IdWaste` int(11) NOT NULL,
  `weightbin` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `type` varchar(100) NOT NULL,
  `line` varchar(45) NOT NULL,
  PRIMARY KEY (`containerId`),
  KEY `container_ibfk_1` (`IdWaste`),
  CONSTRAINT `container_ibfk_1` FOREIGN KEY (`IdWaste`) REFERENCES `waste` (`wasteId`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `container`
--

LOCK TABLES `container` WRITE;
/*!40000 ALTER TABLE `container` DISABLE KEYS */;
INSERT INTO `container` VALUES (4,'1-PCL-SP-SR-3-1','2-PCL-SP',3,0,'0','Dispose','3'),(5,'1-PCL-SP-SR-4-1','2-PCL-SP',3,0,'0','Dispose','4'),(6,'1-PCL-SP-SR-5-1','2-PCL-SP',3,0,'0','Dispose','5'),(7,'1-PCL-SP-SR-6-1','2-PCL-SP',3,0,'0','Dispose','6'),(8,'1-PCL-SP-SR-7-1','2-PCL-SP',3,0,'0','Dispose','7'),(9,'1-PCL-SP-SR-8-1','2-PCL-SP',3,0,'0','Dispose','8'),(10,'1-PCL-SP-SR-9-1','2-PCL-SP',3,0,'0','Dispose','9'),(11,'1-PCL-SP-SR-10-1','2-PCL-SP',3,0,'0','Dispose','10'),(12,'1-PCL-SP-SR-11-1','2-PCL-SP',3,0,'0','Dispose','11'),(13,'1-PCL-SP-SR-12-1','2-PCL-SP',3,0,'0','Dispose','12'),(14,'1-PCL-SP-SR-13-1','2-PCL-SP',3,0,'0','Dispose','13'),(15,'1-PCL-SP-SR-14-1','2-PCL-SP',3,0,'0','Dispose','14'),(16,'1-PCL-SP-SR-15-1','2-PCL-SP',3,0,'0','Dispose','15'),(17,'1-PCL-SP-SR-16-1','2-PCL-SP',3,0,'0','Dispose','16'),(18,'2-PCL-SP-3','2-PCL-SP',3,0,'0','Collection','3'),(19,'2-PCL-SP-4','2-PCL-SP',3,0,'0','Collection','4'),(20,'2-PCL-SP-5','2-PCL-SP',3,0,'0','Collection','5'),(21,'2-PCL-SP-6','2-PCL-SP',3,0,'0','Collection','6'),(22,'2-PCL-SP-7','2-PCL-SP',3,0,'0','Collection','7'),(23,'2-PCL-SP-8','2-PCL-SP',3,0,'0','Collection','8'),(24,'2-PCL-SP-9','2-PCL-SP',3,0,'0','Collection','9'),(25,'2-PCL-SP-10','2-PCL-SP',3,0,'0','Collection','10'),(26,'2-PCL-SP-11','2-PCL-SP',3,0,'0','Collection','11'),(27,'2-PCL-SP-12','2-PCL-SP',3,0,'0','Collection','12'),(28,'2-PCL-SP-13','2-PCL-SP',3,0,'0','Collection','13'),(29,'2-PCL-SP-14','2-PCL-SP',3,0,'0','Collection','14'),(30,'2-PCL-SP-15','2-PCL-SP',3,0,'0','Collection','15'),(31,'2-PCL-SP-16','2-PCL-SP',3,0,'0','Collection','16');
/*!40000 ALTER TABLE `container` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `badgeId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `active` int(11) NOT NULL,
  PRIMARY KEY (`badgeId`)
) ENGINE=InnoDB AUTO_INCREMENT=941902 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Jaya Sirait',1),(123,'Test',1),(200010,'YANU DWIYANTORO',1),(200141,'NANA WIYATNA',1),(200150,'AHMAD ECHSANUDIN ALUTFI',1),(200151,'AKBAR SULAEMAN',1),(200154,'JOKO SUPRIYANTO',1),(902290,'LINDA ESRA GINTING',1),(903068,'SURYATI SAMOSIR',1),(908739,'REHULINA',1),(920151,'HERTI MELIANA SIAGIAN',1),(921380,'KORLINA GURNING',1),(922776,'LASTIAR SITORUS',1),(924211,'NELIDA',1),(925048,'DELPINA',1),(925073,'SAINUR DONGORAN',1),(925142,'YANTI SAMOSIR',1),(925156,'BIMA SURYA I.F. SIMANULLANG',1),(928266,'DONI PARULIAN',1),(928279,'ELISABETH JULIANI SIANTURI',1),(931058,'YANUK RAHMAT',1),(935674,'SUMARLINA',1),(936921,'WELMAN VICTOR SILITONGA',1),(937119,'INDRA FRANS MANURUNG',1),(937130,'JIDEN',1),(938013,'ARIF BUDI SANTOSO',1),(938287,'ALDIER GRAHITOLAKSONO',1),(938295,'MUHAMMAD JEMI SANDRA PUTRA',1),(938414,'RAVINO AMANDA',1),(938617,'GERRY MARTIN HAREFA',1),(938653,'GOKLAS NABABAN',1),(938837,'OPEN RIKSON SIMANULLANG',1),(938892,'PEBRI RADIANSYAH',1),(938894,'TONY AFRIADI',1),(938999,'JULIAN RINJANI PUTRA',1),(939063,'EFRAIM FAHRIANSYAH',1),(939106,'RIZAL AGUS ARIANTO',1),(939143,'DOLI SILITONGA',1),(939177,'NICO PRIBADI SINAGA',1),(939270,'Rizky',1),(939639,'VITO WIJAYA',1),(939675,'KRISMAN ZOARA ZEBUA',1),(939676,'NOVAL RISWANDI PUTRA',1),(939722,'CANDRA MARZUKI HUTAGAOL',1),(939881,'LEONARDO MANULLANG',1),(939976,'ARJUNI PASKALIS HASUGIAN',1),(939998,'AHSAN SIDIQ',1),(940108,'ERVAN AGUNG WIBAWA',1),(940201,'ABDUL AHDI',1),(940318,'BUSTAMI A. SIMAMORA',1),(940320,'JEFRIYANTO',1),(940321,'JIMMI HENDRO HARIANJA',1),(940322,'MARULI TUA PASARIBU',1),(940323,'RIO AFRIANSYAH',1),(940324,'UNTUNG PASKA LUMBAN GAOL',1),(940590,'CHARLIN BRILLIANT GEA',1),(940591,'DEDY GALEH PAMUNGKAS',1),(940593,'WAWAN FAUZI TAMAMI',1),(940594,'ANGGA MUDA PERSADA SINAGA',1),(940650,'RYAN LEONAR SAPUTRA GINTING',1),(940689,'STEVANUS JOHANNES PARDEDE',1),(940761,'FENDI PRADANA',1),(940762,'INDRA LEO CANDRA SIMANJUNTAK',1),(940764,'RICKY SAPUTRA SIHOMBING',1),(940790,'MAULANA MACHRUS',1),(940855,'PALENTINA ULI BR SIMANUNGKALIT',1),(940858,'FERNANDO AUKILA SIAGIAN',1),(940860,'JOSUA CRISTIAN TAMBUNAN',1),(940862,'ROBYANTO',1),(940927,'ILMINAFIAN KHAZANAH',1),(940948,'MUHAMMAD ARYA GUMA NAIRO',1),(940949,'IKSAN MAULANA',1),(940991,'AYU AKSARI SIANTURI',1),(940993,'FAIQAL ADITYA RAMADHAN',1),(941005,'A. LIAT',1),(941010,'MUHAMMAD ROSYID AR RIDHO',1),(941011,'RICHAL AHMAD',1),(941012,'RISWADI SILABAN',1),(941124,'MUHAMMAD ABDUR ROHMAN',1),(941158,'ABIELL ARSYIL NABAWI',1),(941162,'M. DENDI OKTORA',1),(941193,'FARHATTA ADE AULIA',1),(941194,'IRFAN RIZKY ARTA HARISON',1),(941198,'JOY CALVIN ALEXANDER TAMBUNAN',1),(941204,'NANANG ANDRIANA',1),(941223,'ANDRY HIDAYAT',1),(941224,'BAGUS DEDI PAMUNGKAS',1),(941225,'NANANG SETIYAWAN',1),(941226,'REVA INDRIA SUHADA',1),(941233,'TITO RELY CHRISTO S',1),(941253,'ANDIKAYUZANO',1),(941282,'RAMDAN WAHYU SYAH PUTRA',1),(941283,'RIZQI ARSY AKBARI DITA PUTRA',1),(941336,'ALFANDY NURRAHMAN',1),(941546,'AHMAD FADEL',1),(941547,'IRFAN KENEDI',1),(941548,'KELVIN LEE',1),(941549,'MICHAEL LUMBAN TOBING',1),(941550,'ROLAS CALVIN SIREGAR',1),(941551,'INDRA ARDISON TAMBA',1),(941579,'DANUR TOTOK PAMUNGKAS',1),(941581,'PERSUS NAINGGOLAN',1),(941593,'AGUS SETIAWAN',1),(941594,'BRELLIANT KAUTSAR',1),(941595,'EFFRAT DERIUX BEUHARNAIS LIUSTIN M.',1),(941596,'RIYAD RAMADAN',1),(941640,'ALIF IKHSAN HERIYADI',1),(941641,'FANTONI JULIANTO',1),(941642,'FELIX LABORA JYMY THEY',1),(941643,'GEOVANI RAHMAD',1),(941644,'GHUFRON PRIANGGORO',1),(941645,'JHONATAN SITUMEANG',1),(941646,'MUHAMMAD RAMADHAN PULUNGAN',1),(941647,'MUHAMMAD SYAIF WILDAN ALIF KHAN',1),(941648,'RESMAN SIMANJUNTAK',1),(941749,'RAHMAD AFRIZO',1),(941751,'REVI LIANDRI',1),(941752,'SYAFRI MARDANI',1),(941761,'FALMER ANDRIAN FRANSISCO SIANIPAR',1),(941762,'FREDRIK IVAN PESAKH NAINGGOLAN',1),(941763,'JHON SATRIA TURNIP',1),(941764,'RAINHART SITOHANG',1),(941768,'GADZA FAHREZA',1),(941776,'BINSAR PARSAULIAN SIMANJUNTAK',1),(941777,'CHANDRA PRATAMA SEMBIRING',1),(941824,'KARLOS MANGIRING TUA PASARIBU',1),(941825,'LUKI SUMANTRI',1),(941834,'KRISNA PRASETIAWAN',1),(941901,'JUAN ANANDA SIMATUPANG',1);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rack`
--

DROP TABLE IF EXISTS `rack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rack` (
  `rackId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `clientId` int(11) NOT NULL,
  `weight` decimal(10,0) NOT NULL,
  `weightbin` decimal(11,0) NOT NULL,
  `wasteId` int(11) NOT NULL,
  `address` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `max_weight` float(18,2) DEFAULT 0.00,
  `line` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `sensor` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`rackId`),
  KEY `clientId` (`clientId`),
  KEY `wasteId` (`wasteId`),
  CONSTRAINT `rack_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `clientid` (`id`),
  CONSTRAINT `rack_ibfk_2` FOREIGN KEY (`wasteId`) REFERENCES `waste` (`wasteId`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rack`
--

LOCK TABLES `rack` WRITE;
/*!40000 ALTER TABLE `rack` DISABLE KEYS */;
INSERT INTO `rack` VALUES (1,'2-PCL-SP-3',1,11,0,1,30,1,30.00,'3','10'),(2,'2-PCL-SP-4',1,2,0,1,42,1,30.00,'4','22'),(3,'2-PCL-SP-5',2,0,0,1,54,1,30.00,'5','34'),(4,'2-PCL-SP-6',3,14,0,1,66,1,30.00,'6','46'),(5,'2-PCL-SP-7',1,11,0,1,31,1,30.00,'7','13'),(6,'2-PCL-SP-8',1,10,0,1,43,1,30.00,'8','23'),(7,'2-PCL-SP-9',2,0,0,1,55,1,30.00,'9','35'),(8,'2-PCL-SP-10',3,0,0,1,67,1,30.00,'10','47'),(9,'2-PCL-SP-11',1,0,0,1,32,1,30.00,'11','12'),(10,'2-PCL-SP-12',1,0,0,1,44,1,30.00,'12','24'),(11,'2-PCL-SP-13',2,0,0,1,56,1,30.00,'13','36'),(12,'2-PCL-SP-14',3,10,0,1,68,1,30.00,'14','48'),(13,'2-PCL-SP-15',1,0,0,1,33,1,30.00,'15','13'),(14,'2-PCL-SP-16',1,9,0,1,45,1,30.00,'16','25');
/*!40000 ALTER TABLE `rack` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `badgeId` int(11) NOT NULL,
  `idContainer` int(11) NOT NULL,
  `idWaste` int(11) NOT NULL,
  `recordDate` datetime NOT NULL DEFAULT current_timestamp(),
  `weight` decimal(18,2) NOT NULL,
  `type` varchar(100) NOT NULL,
  `idqrmachine` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `badgeId` (`badgeId`),
  KEY `idContainer` (`idContainer`),
  KEY `idWaste` (`idWaste`),
  CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`idWaste`) REFERENCES `waste` (`wasteId`),
  CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`idContainer`) REFERENCES `container` (`containerId`),
  CONSTRAINT `transaction_ibfk_3` FOREIGN KEY (`badgeId`) REFERENCES `employee` (`badgeId`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (47,123,6,3,'2024-07-02 12:59:27',2.87,'Dispose','2-PCL-SP-5'),(48,123,6,3,'2024-07-02 12:59:27',5.74,'Dispose','2-PCL-SP-5'),(49,123,6,3,'2024-07-02 13:02:46',0.64,'Dispose','2-PCL-SP-5'),(50,123,6,3,'2024-07-03 01:59:08',0.83,'Dispose','2-PCL-SP-5'),(51,123,6,3,'2024-07-03 02:18:53',0.79,'Dispose','2-PCL-SP-5'),(52,123,6,3,'2024-07-03 03:15:18',2.49,'Dispose','2-PCL-SP-5'),(53,123,6,3,'2024-07-03 03:29:49',2.09,'Dispose','2-PCL-SP-5'),(54,123,6,3,'2024-07-03 03:30:35',2.09,'Dispose','2-PCL-SP-5'),(55,123,6,3,'2024-07-03 03:40:36',4.07,'Dispose','2-PCL-SP-5'),(56,123,6,3,'2024-07-03 04:22:51',2.13,'Dispose','2-PCL-SP-5'),(57,123,6,3,'2024-07-03 07:35:08',4.00,'Dispose','2-PCL-SP-5'),(58,123,6,3,'2024-07-03 07:37:36',5.74,'Dispose','2-PCL-SP-5'),(59,123,6,3,'2024-07-03 08:11:53',6.96,'Dispose','2-PCL-SP-5'),(61,939270,5,3,'2024-07-04 10:21:41',7.21,'Dispose','2-PCL-SP-4'),(62,939270,19,3,'2024-07-04 11:11:57',7.00,'Collection',''),(63,939270,7,3,'2024-07-04 11:42:10',2.46,'Dispose','2-PCL-SP-6'),(64,939270,4,3,'2024-07-05 08:26:59',3.38,'Dispose','2-PCL-SP-3'),(65,123,19,3,'2024-07-05 08:42:38',8.38,'Collection',''),(66,123,18,3,'2024-07-05 09:56:17',3.00,'Collection',''),(67,123,19,3,'2024-07-05 09:56:58',8.00,'Collection',''),(68,123,18,3,'2024-07-05 09:57:42',3.00,'Collection',''),(69,123,18,3,'2024-07-05 10:08:31',0.00,'Collection',''),(70,123,19,3,'2024-07-05 10:09:11',0.00,'Collection',''),(71,123,20,3,'2024-07-07 11:13:13',0.00,'Collection',''),(72,939270,6,3,'2024-07-08 03:11:00',0.00,'Dispose','2-PCL-SP-5'),(73,939270,4,3,'2024-07-08 03:13:35',0.00,'Dispose','2-PCL-SP-3'),(74,939270,5,3,'2024-07-08 03:28:43',1.38,'Dispose','2-PCL-SP-4'),(75,939270,4,3,'2024-07-08 08:07:41',1.36,'Dispose','2-PCL-SP-3'),(76,939270,5,3,'2024-07-08 08:18:37',2.36,'Dispose','2-PCL-SP-4'),(77,939270,7,3,'2024-07-08 08:30:37',3.07,'Dispose','2-PCL-SP-6'),(78,939270,4,3,'2024-07-08 10:28:18',10.93,'Dispose','2-PCL-SP-3'),(79,939270,8,3,'2024-07-08 10:37:27',11.00,'Dispose','2-PCL-SP-7'),(80,939270,9,3,'2024-07-08 12:17:50',9.78,'Dispose','2-PCL-SP-8'),(81,939270,7,3,'2024-07-09 00:51:38',13.59,'Dispose','2-PCL-SP-6'),(82,939270,15,3,'2024-07-09 00:55:03',0.24,'Dispose','2-PCL-SP-14'),(83,123,6,3,'2024-07-09 05:27:03',0.02,'Dispose','2-PCL-SP-5'),(84,939270,15,3,'2024-07-09 06:56:11',9.51,'Dispose','2-PCL-SP-14'),(85,938999,17,3,'2024-07-09 08:22:41',9.14,'Dispose','2-PCL-SP-16');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `waste`
--

DROP TABLE IF EXISTS `waste`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `waste` (
  `wasteId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`wasteId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waste`
--

LOCK TABLES `waste` WRITE;
/*!40000 ALTER TABLE `waste` DISABLE KEYS */;
INSERT INTO `waste` VALUES (1,'Coil'),(2,'Product'),(3,'Solder Paste');
/*!40000 ALTER TABLE `waste` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-10 12:49:20
