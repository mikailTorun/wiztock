-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 27 May 2021, 19:29:40
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
  `is_inventroy_tracking` tinyint(1) NOT NULL DEFAULT '0',
  `initial_stock_amount` double NOT NULL DEFAULT '0',
  `is_notifying` tinyint(1) NOT NULL DEFAULT '0',
  `nofitication_amount` double NOT NULL DEFAULT '0',
  `purchasing_price` double NOT NULL DEFAULT '0',
  `selling_price` double NOT NULL DEFAULT '0',
  `tax_id` int(11) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `product_category_id` (`product_category_id`),
  KEY `uom_id` (`uom_id`),
  KEY `tax_id` (`tax_id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `product`
--

INSERT INTO `product` (`product_id`, `company_id`, `product_category_id`, `product_name`, `uom_id`, `code`, `barcode`, `img_url`, `is_inventroy_tracking`, `initial_stock_amount`, `is_notifying`, `nofitication_amount`, `purchasing_price`, `selling_price`, `tax_id`) VALUES
(1, 1, 9, 'firstProduct', 5, '55', '22', '', 0, 66, 1, 55, 8, 8.2844, 1);

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`product_category_id`) REFERENCES `product_category` (`product_category_id`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`uom_id`) REFERENCES `unit_of_measurement` (`uom_id`),
  ADD CONSTRAINT `product_ibfk_3` FOREIGN KEY (`tax_id`) REFERENCES `tax` (`tax_id`),
  ADD CONSTRAINT `product_ibfk_4` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
