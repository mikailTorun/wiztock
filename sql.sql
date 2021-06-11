-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 11 Haz 2021, 23:02:59
-- Sunucu sürümü: 5.7.26
-- PHP Sürümü: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `wiztock`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `company`
--

DROP TABLE IF EXISTS `company`;
CREATE TABLE IF NOT EXISTS `company` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
  `short_name` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `phone` varchar(11) COLLATE utf8_turkish_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `address` varchar(200) COLLATE utf8_turkish_ci DEFAULT NULL,
  `postal_code` varchar(5) COLLATE utf8_turkish_ci DEFAULT NULL,
  `tax_office` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `tax_number` varchar(11) COLLATE utf8_turkish_ci DEFAULT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `company`
--

INSERT INTO `company` (`company_id`, `title`, `short_name`, `phone`, `email`, `address`, `postal_code`, `tax_office`, `tax_number`) VALUES
(1, 'Ankara Mobilya Ltd Şti', 'Ankara Mobilya Ltd Şti', '12345678912', 'enver@enver.com', 'asdfad', '34160', 'update', '12345678912'),
(2, 'companyy', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'companyy', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'companyy', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `corporate`
--

DROP TABLE IF EXISTS `corporate`;
CREATE TABLE IF NOT EXISTS `corporate` (
  `corporate_id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
  `short_name` varchar(100) COLLATE utf8_turkish_ci DEFAULT NULL,
  `tax_office` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `tax_number` varchar(11) COLLATE utf8_turkish_ci DEFAULT NULL,
  PRIMARY KEY (`corporate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `corporate`
--

INSERT INTO `corporate` (`corporate_id`, `title`, `short_name`, `tax_office`, `tax_number`) VALUES
(16, 'FENİX YAZILIM', 'fenix', '45124', '45124'),
(17, 'T-SOFT', 'TSOFT', '2222222222', '2222222222'),
(18, 'dfgdfg', 'adsfsdgdfg', '2222222228', '2222222228'),
(19, 'EnverCompany', 'EnverAŞ', '2222254678', '2222254678'),
(23, 'corNAme', 'corShortName', 'taxOff', '5557845125'),
(27, 'corNAmeUPUP', 'corShortNameUP', 'taxOffUP', '5557845125');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `corporate_person`
--

DROP TABLE IF EXISTS `corporate_person`;
CREATE TABLE IF NOT EXISTS `corporate_person` (
  `person_id` int(11) NOT NULL AUTO_INCREMENT,
  `corporate_id` int(11) NOT NULL,
  `name_surname` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `phone` varchar(11) COLLATE utf8_turkish_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `description` varchar(100) COLLATE utf8_turkish_ci DEFAULT NULL,
  PRIMARY KEY (`person_id`),
  KEY `corporate_id` (`corporate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `email` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `phone` varchar(11) COLLATE utf8_turkish_ci DEFAULT NULL,
  `address` varchar(150) COLLATE utf8_turkish_ci DEFAULT NULL,
  `town` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL,
  `city` varchar(30) COLLATE utf8_turkish_ci DEFAULT NULL,
  `postal_code` varchar(5) COLLATE utf8_turkish_ci DEFAULT NULL,
  `is_corporate` tinyint(1) NOT NULL DEFAULT '1',
  `is_customer` tinyint(1) NOT NULL DEFAULT '1',
  `is_supplier` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `customer`
--

INSERT INTO `customer` (`customer_id`, `company_id`, `email`, `phone`, `address`, `town`, `city`, `postal_code`, `is_corporate`, `is_customer`, `is_supplier`) VALUES
(16, 1, 'fenix@gmail.com', '', 'fenix adress', 'adana', 'adana', '55544', 1, 1, 0),
(17, 1, 'TSOFT@gmail.com', '', 'adress', 'town', 'city', '88888', 1, 1, 0),
(18, 1, 'mikailtorun@marun.edu.tr', '', 'Ortabayır Mah. Mayıs Sok. Aziz Apartmanı no: 29A\nKağıthane/ISTANBUL', 'Kağıthane', 'Kağıthane', '34403', 1, 1, 0),
(19, 1, 'enver@enver', '05446678793', 'enver adress', 'town enver', 'enver city', '34403', 1, 1, 0),
(20, 1, 'a@v', '5555555555', 'adress', 'town', 'city', '99778', 0, 1, 0),
(21, 1, 'a@g', '7878787888', 'adres', 'toen', 'city', '77842', 0, 1, 0),
(22, 1, 'r@e.gmail.com', '7778884452', 'adress', 'town', 'city', '77884', 1, 1, 0),
(23, 1, 'r@e.gmail.com', '7778884452', 'adress', 'town', 'city', '77884', 1, 1, 0),
(24, 1, 'MAİL@MAİL.COM', '7788778845', 'ADRESS', 'town', 'Kağıthane', '34403', 0, 1, 0),
(25, 1, 'mail.com', '0000000000', 'adress', 'Kağıthane', 'Kağıthane', '34403', 0, 1, 0),
(26, 1, 'mail.comUP', '11111111111', 'adressUPDATE', 'KağıthaneUP', 'KağıthaneUP', '34403', 0, 0, 1),
(27, 1, 'A@A.COMUP', '4444444444', 'ADRESSUPUP', 'TWN', 'CTY', '77889', 1, 0, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `employee`
--

DROP TABLE IF EXISTS `employee`;
CREATE TABLE IF NOT EXISTS `employee` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name_surname` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `is_main_user` tinyint(1) NOT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `email_employee_index` (`email`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `employee`
--

INSERT INTO `employee` (`employee_id`, `company_id`, `name_surname`, `email`, `password`, `is_main_user`) VALUES
(1, 1, 'Enver ASLAN', 'a@a', '1', 1),
(2, 4, 'fullname', 'mail@mail.com', 'password', 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `individual`
--

DROP TABLE IF EXISTS `individual`;
CREATE TABLE IF NOT EXISTS `individual` (
  `individual_id` int(11) NOT NULL,
  `name_surname` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `ssn` varchar(11) COLLATE utf8_turkish_ci DEFAULT NULL,
  PRIMARY KEY (`individual_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `individual`
--

INSERT INTO `individual` (`individual_id`, `name_surname`, `ssn`) VALUES
(20, ' ', '7777777777'),
(21, 'testDene', '9999999999'),
(24, 'İNDİVİDUAL', ''),
(25, 'İNDİVİDUAL2', '0000000000'),
(26, 'suplierUP', '2222222222');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `product_category_id` int(11) NOT NULL,
  `product_name` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `uom_id` int(11) NOT NULL,
  `code` varchar(50) COLLATE utf8_turkish_ci DEFAULT NULL,
  `barcode` varchar(150) COLLATE utf8_turkish_ci DEFAULT NULL,
  `img_url` varchar(250) COLLATE utf8_turkish_ci DEFAULT NULL,
  `is_inventory_tracking` tinyint(1) NOT NULL DEFAULT '0',
  `initial_stock_amount` double NOT NULL DEFAULT '0',
  `is_notifying` tinyint(1) NOT NULL DEFAULT '0',
  `notification_amount` double NOT NULL DEFAULT '0',
  `purchasing_price` double NOT NULL DEFAULT '0',
  `selling_price` double NOT NULL DEFAULT '0',
  `tax_id` int(11) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `product_category_id` (`product_category_id`),
  KEY `uom_id` (`uom_id`),
  KEY `tax_id` (`tax_id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `product`
--

INSERT INTO `product` (`product_id`, `company_id`, `product_category_id`, `product_name`, `uom_id`, `code`, `barcode`, `img_url`, `is_inventory_tracking`, `initial_stock_amount`, `is_notifying`, `notification_amount`, `purchasing_price`, `selling_price`, `tax_id`) VALUES
(1, 1, 9, 'firstProduct', 5, '55', '22', '', 0, 66, 1, 55, 8, 8.2844, 1),
(2, 1, 1, 'dfpkgdjfklgd', 1, '559', '5566', '', 1, 66, 1, 55, 8, 8.2844, 1),
(3, 1, 1, 'dfpkgdjfklgd', 1, '559', '5566', '', 1, 66, 1, 55, 8, 8.2844, 1),
(4, 1, 1, 'dfpkgdjfklgd', 1, '559', '5566', '', 1, 66, 1, 55, 8, 8.2844, 1),
(5, 1, 10, 'dfpkgdjfklgd', 1, '559', '5566', '', 1, 66, 1, 55, 8, 8.2844, 1),
(6, 1, 7, 'dene', 2, '1', '1a', '', 1, 99, 1, 99, 99, 102.51944999999999, 1),
(7, 1, 7, 'secondProduct', 1, '', '', '', 0, 0, 0, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `product_category`
--

DROP TABLE IF EXISTS `product_category`;
CREATE TABLE IF NOT EXISTS `product_category` (
  `product_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `title` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `description` varchar(100) COLLATE utf8_turkish_ci DEFAULT NULL,
  PRIMARY KEY (`product_category_id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `product_category`
--

INSERT INTO `product_category` (`product_category_id`, `company_id`, `title`, `description`) VALUES
(1, 1, 'cat1', 'descCat1'),
(7, 1, 'cat2', 'descCat2'),
(8, 1, 'cat3', 'dewscCat3'),
(9, 1, 'unit1', 'unitdesc1'),
(10, 1, 'test', 'test'),
(11, 1, 'etst', 'test');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `product_warehouse`
--

DROP TABLE IF EXISTS `product_warehouse`;
CREATE TABLE IF NOT EXISTS `product_warehouse` (
  `product_warehouse_id` int(11) NOT NULL AUTO_INCREMENT,
  `warehouse_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity_in_stock` double NOT NULL,
  PRIMARY KEY (`product_warehouse_id`),
  KEY `warehouse_id` (`warehouse_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `product_warehouse`
--

INSERT INTO `product_warehouse` (`product_warehouse_id`, `warehouse_id`, `product_id`, `quantity_in_stock`) VALUES
(1, 1, 6, 66),
(2, 1, 5, 99),
(4, 1, 7, 55),
(5, 3, 7, 55),
(6, 3, 6, 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `shipment`
--

DROP TABLE IF EXISTS `shipment`;
CREATE TABLE IF NOT EXISTS `shipment` (
  `shipment_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `shipment_type_id` int(11) NOT NULL,
  `freight_bill_number` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `source_warehouse_id` int(11) DEFAULT NULL,
  `destination_warehouse_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `issue_date` datetime NOT NULL,
  `shipment_date` datetime NOT NULL,
  PRIMARY KEY (`shipment_id`),
  KEY `shipment_type_id` (`shipment_type_id`),
  KEY `company_id` (`company_id`),
  KEY `destination_warehouse_id` (`destination_warehouse_id`),
  KEY `source_warehouse_id` (`source_warehouse_id`),
  KEY `customer_id` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `shipment`
--

INSERT INTO `shipment` (`shipment_id`, `company_id`, `shipment_type_id`, `freight_bill_number`, `source_warehouse_id`, `destination_warehouse_id`, `customer_id`, `issue_date`, `shipment_date`) VALUES
(1, 1, 1, '5455', NULL, 3, 16, '2021-06-11 00:00:00', '2021-06-18 00:00:00'),
(2, 1, 1, '5455', NULL, 1, 16, '2021-06-11 00:00:00', '2021-06-18 00:00:00'),
(3, 1, 1, '5455', NULL, 1, 16, '2021-06-11 00:00:00', '2021-06-18 00:00:00'),
(4, 1, 1, '5455', NULL, 3, 16, '2021-06-11 00:00:00', '2021-06-18 00:00:00');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `shipment_detail`
--

DROP TABLE IF EXISTS `shipment_detail`;
CREATE TABLE IF NOT EXISTS `shipment_detail` (
  `product_id` int(11) NOT NULL,
  `shipment_id` int(11) NOT NULL,
  `amount` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`product_id`,`shipment_id`),
  KEY `shipment_id` (`shipment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `shipment_detail`
--

INSERT INTO `shipment_detail` (`product_id`, `shipment_id`, `amount`) VALUES
(6, 1, 0),
(6, 3, 0),
(6, 4, 0),
(7, 1, 55),
(7, 3, 55),
(7, 4, 55);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `shipment_type`
--

DROP TABLE IF EXISTS `shipment_type`;
CREATE TABLE IF NOT EXISTS `shipment_type` (
  `shipment_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `description` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`shipment_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `shipment_type`
--

INSERT INTO `shipment_type` (`shipment_type_id`, `title`, `description`) VALUES
(1, 'Tally In', 'desc'),
(2, 'Tally Out', 'desc'),
(3, 'Inter-Warehouse Transfer', 'desc');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tax`
--

DROP TABLE IF EXISTS `tax`;
CREATE TABLE IF NOT EXISTS `tax` (
  `tax_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `rate` double NOT NULL,
  `description` varchar(100) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`tax_id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `tax`
--

INSERT INTO `tax` (`tax_id`, `company_id`, `rate`, `description`) VALUES
(1, 1, 3.555, 'descllll'),
(2, 1, 3.14, 'desc');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `unit_of_measurement`
--

DROP TABLE IF EXISTS `unit_of_measurement`;
CREATE TABLE IF NOT EXISTS `unit_of_measurement` (
  `uom_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `title` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `description` varchar(100) COLLATE utf8_turkish_ci DEFAULT NULL,
  PRIMARY KEY (`uom_id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `unit_of_measurement`
--

INSERT INTO `unit_of_measurement` (`uom_id`, `company_id`, `title`, `description`) VALUES
(1, 1, 'testt', 'testt'),
(2, 1, 'test2', 'test2'),
(5, 1, 'd', 'f');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `warehouse`
--

DROP TABLE IF EXISTS `warehouse`;
CREATE TABLE IF NOT EXISTS `warehouse` (
  `warehouse_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `address` varchar(150) COLLATE utf8_turkish_ci NOT NULL,
  `town` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `city` varchar(50) COLLATE utf8_turkish_ci NOT NULL,
  `postal_code` varchar(5) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`warehouse_id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `warehouse`
--

INSERT INTO `warehouse` (`warehouse_id`, `company_id`, `name`, `address`, `town`, `city`, `postal_code`) VALUES
(1, 1, 'Ortabayır Ma', 'Ortabayır ', 'istanbul', 'kadıköy', '34407'),
(3, 1, 'name', 'adress', 'Adana', 'Kozan', '77');

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `corporate`
--
ALTER TABLE `corporate`
  ADD CONSTRAINT `corporate_ibfk_1` FOREIGN KEY (`corporate_id`) REFERENCES `customer` (`customer_id`);

--
-- Tablo kısıtlamaları `corporate_person`
--
ALTER TABLE `corporate_person`
  ADD CONSTRAINT `corporate_person_ibfk_1` FOREIGN KEY (`corporate_id`) REFERENCES `corporate` (`corporate_id`);

--
-- Tablo kısıtlamaları `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`);

--
-- Tablo kısıtlamaları `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`);

--
-- Tablo kısıtlamaları `individual`
--
ALTER TABLE `individual`
  ADD CONSTRAINT `individual_ibfk_1` FOREIGN KEY (`individual_id`) REFERENCES `customer` (`customer_id`);

--
-- Tablo kısıtlamaları `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`product_category_id`) REFERENCES `product_category` (`product_category_id`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`uom_id`) REFERENCES `unit_of_measurement` (`uom_id`),
  ADD CONSTRAINT `product_ibfk_3` FOREIGN KEY (`tax_id`) REFERENCES `tax` (`tax_id`),
  ADD CONSTRAINT `product_ibfk_4` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`);

--
-- Tablo kısıtlamaları `product_category`
--
ALTER TABLE `product_category`
  ADD CONSTRAINT `product_category_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`);

--
-- Tablo kısıtlamaları `product_warehouse`
--
ALTER TABLE `product_warehouse`
  ADD CONSTRAINT `product_warehouse_ibfk_1` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`warehouse_id`),
  ADD CONSTRAINT `product_warehouse_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Tablo kısıtlamaları `shipment`
--
ALTER TABLE `shipment`
  ADD CONSTRAINT `shipment_ibfk_1` FOREIGN KEY (`shipment_type_id`) REFERENCES `shipment_type` (`shipment_type_id`),
  ADD CONSTRAINT `shipment_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`),
  ADD CONSTRAINT `shipment_ibfk_3` FOREIGN KEY (`destination_warehouse_id`) REFERENCES `warehouse` (`warehouse_id`),
  ADD CONSTRAINT `shipment_ibfk_4` FOREIGN KEY (`source_warehouse_id`) REFERENCES `warehouse` (`warehouse_id`),
  ADD CONSTRAINT `shipment_ibfk_5` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`);

--
-- Tablo kısıtlamaları `shipment_detail`
--
ALTER TABLE `shipment_detail`
  ADD CONSTRAINT `shipment_detail_ibfk_2` FOREIGN KEY (`shipment_id`) REFERENCES `shipment` (`shipment_id`);

--
-- Tablo kısıtlamaları `tax`
--
ALTER TABLE `tax`
  ADD CONSTRAINT `tax_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`);

--
-- Tablo kısıtlamaları `unit_of_measurement`
--
ALTER TABLE `unit_of_measurement`
  ADD CONSTRAINT `unit_of_measurement_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`);

--
-- Tablo kısıtlamaları `warehouse`
--
ALTER TABLE `warehouse`
  ADD CONSTRAINT `warehouse_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
