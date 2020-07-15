-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: apt212
-- ------------------------------------------------------
-- Server version	5.7.25

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
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2016_06_01_000001_create_oauth_auth_codes_table',1),(4,'2016_06_01_000002_create_oauth_access_tokens_table',1),(5,'2016_06_01_000003_create_oauth_refresh_tokens_table',1),(6,'2016_06_01_000004_create_oauth_clients_table',1),(7,'2016_06_01_000005_create_oauth_personal_access_clients_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_access_tokens`
--

DROP TABLE IF EXISTS `oauth_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `client_id` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_access_tokens`
--

LOCK TABLES `oauth_access_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_auth_codes`
--

DROP TABLE IF EXISTS `oauth_auth_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `client_id` int(10) unsigned NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_auth_codes`
--

LOCK TABLES `oauth_auth_codes` WRITE;
/*!40000 ALTER TABLE `oauth_auth_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_auth_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_clients`
--

DROP TABLE IF EXISTS `oauth_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_clients`
--

LOCK TABLES `oauth_clients` WRITE;
/*!40000 ALTER TABLE `oauth_clients` DISABLE KEYS */;
INSERT INTO `oauth_clients` VALUES (1,NULL,'Apt212 Personal Access Client','L7kkbogLALBfyBQPsFsdcAsxiRnRnIQvIufg8q7c','http://localhost',1,0,0,'2019-10-09 17:01:47','2019-10-09 17:01:47'),(2,NULL,'Apt212 Password Grant Client','OKZQxLEuYuXAOU2sr3fiV4RTQ5rB5B78gmdp0ysS','http://localhost',0,1,0,'2019-10-09 17:01:47','2019-10-09 17:01:47');
/*!40000 ALTER TABLE `oauth_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_personal_access_clients`
--

DROP TABLE IF EXISTS `oauth_personal_access_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_personal_access_clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_personal_access_clients_client_id_index` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_personal_access_clients`
--

LOCK TABLES `oauth_personal_access_clients` WRITE;
/*!40000 ALTER TABLE `oauth_personal_access_clients` DISABLE KEYS */;
INSERT INTO `oauth_personal_access_clients` VALUES (1,1,'2019-10-09 17:01:47','2019-10-09 17:01:47');
/*!40000 ALTER TABLE `oauth_personal_access_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_refresh_tokens`
--

DROP TABLE IF EXISTS `oauth_refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_refresh_tokens`
--

LOCK TABLES `oauth_refresh_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_refresh_tokens` DISABLE KEYS */;
INSERT INTO `oauth_refresh_tokens` VALUES ('011f52491eae07ecef968f3469c746e44d4878eebcd89499ff984bc6b6ba37252460902480a477ac','26fc5cac7b911084d65bc81fb1b86e20303f199cc8db11317e2e808372501fb64872ecec863feb36',0,'2020-10-09 17:51:31'),('08fc40722197d1aa58afae032aa2a43c050eedf6d433543cca302b46fa9d92cb54055b84e6b7159d','c24e9a9f51718768320cd8f0124e893db10f71ebeb22bc56d1942a1702f08b8c2b9a79691bb2e35e',0,'2020-10-09 23:43:16'),('13a4c2446e579f1bef9bb1598b492b549197c684678667918915ce2cea196f28a7d15b9e0a4e803c','077675a00970c9750cbe1fcd7bb204ac4d250461748f70eb5ae1e004fe1b5ae322badf44d13727ae',0,'2020-10-09 22:49:25'),('1b19d00c555d7df8ee9b9dc6d6cbac9544282e2ac4d32acdc4e563320227b859637d31daed5f7e01','dd957bcc4037204ce825dfd18adf800db93e2e9ddb2724a7f64e25d9b571aa01319acea042cbd628',0,'2020-10-10 18:20:59'),('1edeee7f8c3e81fcce6b618418b2670fdbf11f50517da6a46a4d29cfd22fd9271197805dc5ffbbf4','b6ad1053af30eb8b9fbe7f6f2dc3c24c89b521ce59ef77f6c0550a64c51fce7391bea7a6b29566ab',0,'2020-10-10 18:18:36'),('265fd89bfbba62f422f807f6ed6ab94222963da05617c7ab0d88ff8dae8d06e73f11148400b87e66','350f0e0e802a6f9a38d9e39af674270d1ff27d3e1a08b2ed86667382bb5a71c3196c1ef362651469',0,'2020-10-10 18:22:20'),('2b825b509c6a9e500c8fc0ed6ad65beffcb94f0ea707c94fbe5c0824838b8a83c432cf36b096a56a','49bfc40ec4c781cc79463439158490669b2c0b1f7bfd5674c6a048b4d4b6b3554de9e25f8c16687d',0,'2020-10-10 17:27:40'),('3044e240c8d3c7ae66411dd8a85df6ec80b732ca35b66fa0e58eaa0d6b30abc71571d62a5c86a8b9','0b00b0981c01c1881d213f6c6046ccff6b033299539296d5e90c5530a677ca67552c09c7781938b4',0,'2020-10-10 18:21:10'),('375cbcb184c86006b73b242cbb36736b195c492d5ccbc88631b670130096a3413b795d81674100fd','ab07ac3d26721a341552001879ce531cc875968bb0618d51f96f726dbae61cfaf2124b25e447f400',0,'2020-10-09 18:33:41'),('3796fcb48d38de3e12843bbf79033f1f2c6e98a90b8848171420af7232dba9422d86f2ba76df49c9','0c88490965ca3c2e8f2ebde75f14e1ad418a7f236a4888fdcd8f959be486989229294171c3d9c8ff',0,'2020-10-09 18:36:12'),('3e05c64a7bf530ea76f6db11b955527389c988c623a4aa733f488eb02701a884e5e4016928fd1514','09a40c897ddd37351b38f9fdeace8b5e035120ad5299c339f297ca20f9e95f309b7fe5e214cbe68c',0,'2020-10-09 20:44:48'),('47278a52b6592c6a8e15d44ef0daa8f9ca5ddfbe60dc72f2a6e2e6b60367703040ce03462c45f367','d10b1c811d67e1541832a63a5251519eafd9090004e39a167a0814c5a7a2d3bd844d87c32fb2b11d',0,'2020-10-09 17:52:44'),('4aca486ea21d124704ce67b7dd561fc47e6b1b978bf7d60cfd2c75e880e990e9e066b9f1ed51dd29','d6b11bd9a14ebcf1c04d951adef1690db38130f26b8090acaf2b3e218933bb3f67b2179a0cb6c34a',0,'2020-10-09 18:43:08'),('4bb491935d59bb9093fe6238c6e1adcd23713032b9f73191fdf8cb3fe8a660b45a67f5cdc4e2a026','73fafd50ca8db7ec8af2bdf039e63d30c2a73a6c0a2ebbbcb85052ddf316b9d4824b866077b96fbf',0,'2020-10-09 18:42:43'),('557511216522f9e01b49e43fe5c6f27a6eb2a5e92d186364b133c220e2c904bef938829b7adc42fe','833a45b06a12c187b1d9b9f41b7937297b3be34003d0d776530cbc29e37c049be0f94865f1e3e45e',0,'2020-10-09 23:58:35'),('55d262157ec388fb42886c982c23c65a63e9736c425c4a1652fe9c1e54f6cc7435486e881cc41dbe','0cbd008429ea73dc1c88a97f37274e2104ba56a2ecead9a91cfda5974be634afcfda4c9e409164da',0,'2020-10-09 18:32:19'),('676c281cf74a91ed80bacc5dbf7f76e38528af641df1b874d24fffd939db74a8091e72a2861b09dc','875dfd72a0e0b73e130b9ebd01f5ffb471cbfd3cc24bfeb4d88c671da8a1532efd6132cf7a4ee4b4',0,'2020-10-09 20:34:57'),('67ea2174864ff04c60ab9e839c2e629a191eca4f05ed160dae80d2fee2b073f964befcc3699bdede','5f778cf42fe275f64c7f72ec5fead2000231a6ded983787fccff6ee5ac54826046bd143ea8a54862',0,'2020-10-10 06:40:29'),('6a2c85ebabfe1106a6734dedda67afc2746fe71eeef3b6eabdff2b4ef09d8bebc3951590df1fbbe2','1e482aad8d02ca17c342ea67174ba06a48394493de4a18eb0beea12fc5cf025674386a93879acf8b',0,'2020-10-09 20:35:03'),('6b9bcb0502bf77bf3729eccf1f4d9aa0f85a0057f0f7f14e588fc390eaa5ffe12d9d7225e10a2f30','37e18c27eb6e6a09009f837becc1e44498290f0af0e0a816250310087fcb90b2dd218088572aae7d',0,'2020-10-10 18:22:11'),('6de713bde06e2e8ecec6dc614f17926ac7fcbf4716bc7a4eb56853733b3273c0e3ef0fe3fb3731a6','d0f464cfd987542104a07357b3950b5b61d174ed060aa710284393cdee2a03856b2fa7b9662fd669',0,'2020-10-10 18:11:50'),('70820736a334808976a4a16e6eea7d75d7db5170cce90ec26e18596de958cee6c1116b9886158801','cac35437ed7f36a2c0ef2683e698576a18d4f2b7ab9eaa179b306583660c74e6694d3a99fd989e79',0,'2020-10-09 20:40:13'),('70c63acabc4b09e596ed6a7bf2f5fbfa020b422473bba0c4fb980503efc1cbd5e0bc9650a5593325','36a284bc5987797c78f10f876554a312798deed137e7a14bef6883f00ebb2ea6ec83c052844ab011',0,'2020-10-10 18:13:37'),('72c0a2efee8449e8cd312efde949a40acfecb96f8bfbf1ae65174b9de5c48d53d507a2f183248e5e','2e1210dcca065d3d5a4f47a68f2848c7027b20383fe1013b5bb0ee538caaa5553d63c6f12447ab81',0,'2020-10-10 06:40:27'),('7533f03f1f49f55eff59af89f10a09b7532ea54242f98303eb06a0c5bb9049a25bc60b3a86885bdd','7cd2aa816b4fe3d745a33b28d1e5bf249327734ac0fce3d1ead30564629a6ae0011dda750859fc6b',0,'2020-10-09 18:24:21'),('7dd8100b6ac098e0fe338517d64c4a82dc56176ca8622ff2904bf2f155499cab6c9de6c0616ebe82','91153ee1e6bd7f9df79c6ef532adf4874fe447ed650620963dad0a2cb1b84a1a62e15d2fffec317c',0,'2020-10-09 17:40:51'),('7fd5a0772c24dd6d687b5270895bfd4809acd9264ee21562443ae6e204a700d59b1affb894ee1d53','4e5fddbba66c51292a64bfb7ebf30098c73db01316d7898071cd9a16259feb6611982bb3350421bf',0,'2020-10-09 20:06:37'),('86799e5df9f7bfeb8780a6703e4a3c0121f602de7d6338693c0c35ad403b464eb78905d659b70f70','8f6c63cfb54df50484c47d6d7648cc7b05cc3883b5e7659a833fcc0ed170d3df77718dee9dac8bdb',0,'2020-10-09 18:47:09'),('887a1389fd81e58052dea67f930ddd8fc08c880bee0132c031c2983c325d8682151236c35b66cf9e','19242cfa41211631ca2dd919f5773c7b515d563cd8833c673f75edb41e89a8950aa0421c60d922d9',0,'2020-10-09 23:59:36'),('8c5934900d9242c6f1aa9656289382ac61f3747856553159e30b358d85924d296eb76b3ef116eba8','f8daf9bb9adbae6eb47c55aa20103d487f4b4726f5c7fa4edefc57dc01d73db0cfbbb95ff3f51404',0,'2020-10-09 23:34:26'),('8ef136cf500c606d5084b9bcc229b5c9b50096d7e712b5aebc5339ea6e56c93a49851baab0015da9','b3404f36487ad86ed6e7e65c6117a01410021adc7632f4a01795c0547a258d52132b4dfa32245170',0,'2020-10-09 18:40:43'),('94f012bc582e043c164f03cd38c036c1f7f7598f33025fef09c36da3a7f0976bd4528848678c738e','ba268948c77169cd11881c303058146c5e559770da757fa1863ebcff3d9f8d62d450de6d47a4f1e5',0,'2020-10-09 17:47:11'),('97350300d47fb05b342fb40677573ec217daea28bb0af2df949a64aae0d26e28010cf0c03274baa6','719d02af020b877bd6d9e8e31c456d59e70041efeea87a852308c8cc45fd016bd25bb3257e17e753',0,'2020-10-10 18:18:14'),('9b652954903078626c2eae3583a7435a60d5352c9fffb6276e13ee62fc0c82d4aa5de554ac6084ab','0e366c1b3f082ded81819a676157554421d68df33bef0dd1d0bdc4f233b8e72433c6b2a21c0244fa',0,'2020-10-09 20:40:02'),('a042e1a4175de2d45ca15698d2570ba15c27916deef747f25a1d70f9ad39ae8d4314ff0301d91768','a9c73bd04b60d13bcb0623ed4cfabdf295851bc3ed1d5bb608024db3b54654d6b6a3a638b1a64592',0,'2020-10-10 17:31:22'),('a449cbe613f759b1370bc5a9f46ab2b26de05e756709ea2a479ccff93613812275ac98734f2305a4','b3757dbbe6ed292c42c8404f6f839e348ccf28f5b7a07ba981a2e2b4f66dfada62faf99b6fcf7417',0,'2020-10-09 18:32:19'),('a510e4b7f3b483fd9fd11d488201058ea72c66087144adb9b3166cf8dd5fefddab51d6db953a5662','54b283373bd01f7e7dc9bc794fb248655caf7ad4712cdb77df368fe57c856d3027b47dfb03fea30f',0,'2020-10-09 23:35:56'),('b327ee2b993f93e82e6a645f41504f51d81e20b7f32ecb33c6576392ca77b2ec4039f7c53817e9ae','fe5c88fc9abc791f796f4a9ea92b253c16d5501ec6945f27dd1ab3d04a08694c5355aaa882ca0728',0,'2020-10-10 17:45:18'),('b6732da52717be2fec609ad8627062bfcfdd20b968908ba3295722da70011c8d100e6bac2478011f','1b3fe5bddeb25c7b32dac72251320d520afd1ef0ed9117032a1cd60a20bbe028c4550e99424e81dd',0,'2020-10-10 18:13:58'),('c0c564dfa77325263449bfb4dfa3890636096493b69a4c3d6a34551e47cdab5f20bff2c13aa212f8','9fa9c00c868166f3df770dbb295289d1ba0c6327bb7dad9d2d38aec3a43c9df348faf35724d19289',0,'2020-10-09 18:47:22'),('d0055f99eb4b5621f09f178e29b2df4e8434ee3d0072fedf2e5bf213166ab4af1a7447cae4895b13','4d0427979eebb69c641289c8621d3b5148b9570045d30b0719d1d3cee095c604c848ab4bc2a2a79b',0,'2020-10-09 18:39:03'),('d3b066f8b54fcd23ede97ee57bd834e97ffab3214f6d7b1ed98135943147422af3269c9fffb84886','aacacdb744a8da6d9ad512802e08b6c9863abf39ca9d4819354dc2da30d721b5609fb8909ce6921b',0,'2020-10-09 20:25:27'),('d46f2917174852f2fe903faa4c41eb8ac3a7483c53a5edbeb2781848f39036a4316fb62c4076dd46','66905d7430b976e670275f8541195338a771b9a59e9c7f5c91029b21209638f9d42b41377282893d',0,'2020-10-09 17:52:22'),('e5fe6af8c207e4f734a176751bb816d3139403dc427e11b1916fb19abf13d11aec895cb2e8749b9a','3fd99859dc7c638dddd8d2fc9e2b7db60058cd0045a7d77096252e85802294ecfba3eeff980bcde0',0,'2020-10-09 18:34:24'),('e8f47523b79877930ffd011ff67a1f7a706b3a6aedb09cb744429ddc4c5d016713150bee3edee6f8','f2b9ca8d63089ae1764a48f3b9e7faabe48a27cab223251fac823ec21131e4b85e20b14153f555d8',0,'2020-10-09 18:38:36'),('ead8434c9fdab8b18e7eba2d864c7af6657366e8f38cbf491b92f7251868dc89e6a3a2b375a23ed3','203fab5d981cb4e4029ed177a184a46bb3c483e5ce433c928752eefb7e32920ae45a410e21fbcf75',0,'2020-10-10 17:30:44'),('eb52d3b42065b2a0a5e0f9cc10045d987a0b957b54f7948a2b9aeb9b88832ff2e66ba4c1a52c8f3b','9af5abb9c8ee777d8b058a7a97a64171fc8e4a3c9c70f3a38a520cffca2718c997aa295d3f3619c0',0,'2020-10-10 18:14:04'),('f2cfda22ead2b12f109969f3d3437a3aab3104c1ddfa823bdc6278c45386484e7ba94c8743d224a9','91e34b08a0dbb4cbbf6c3530b409146517846b6399c51922c76fb1c746f0d33b722fb0dfbb5bd784',0,'2020-10-10 17:20:43'),('f454ec519893d8ad255017eec3ef894845f347b78a760058c7318c3fe7e14bace8ac1656857052b2','051d31b4e28ab98e8bf96d88904a686a4248419df5cfb266c9f27e5c4caa0ddac347a6322d197736',0,'2020-10-09 17:35:07'),('fc75fbfc9ee85348011b43f76667f30a084e37c186a71387a7d590e031abe063734596db1e2df32f','de0ce89f26f83fcd9c1c49be98629f4345ab76ea1b7e7dd156ace4a73bef09f2821aa36176e9075e',0,'2020-10-09 18:25:29');
/*!40000 ALTER TABLE `oauth_refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Matt Beckett','matt@arckinteractive.com',NULL,'$2y$10$zehlZqv4KK7fBVTd4qdULun/EAIpXqZKltN5QEVokaevwLcWbfXo.',NULL,'2019-10-09 17:08:46','2019-10-09 17:08:46');
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

-- Dump completed on 2019-11-19  1:55:10
