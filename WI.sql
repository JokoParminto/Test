/*
SQLyog Ultimate v11.2 (64 bit)
MySQL - 10.3.30-MariaDB-0ubuntu0.20.04.1 : Database - WI
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`WI` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `WI`;

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(150) DEFAULT NULL,
  `product_price` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `product` */

insert  into `product`(`product_id`,`product_name`,`product_price`) values (1,'Semangka',49000),(2,'Durian',150000),(3,'Nanas 1 kg',30000),(4,'Manggis 1 kg',50000),(5,'Jeruk China 1 kg',200000);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(150) NOT NULL,
  `user_password` varchar(250) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_phone_number` varchar(30) NOT NULL,
  `user_roles` enum('admin','user') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`user_id`,`user_name`,`user_password`,`user_email`,`user_phone_number`,`user_roles`) values (1,'admin','$2a$12$fGUuG0jjJmw9/Dxi6I.kLu8Ba23.7L4zxEBY9sBCHpnfk01fnJrgW','admin@admin.com','0256485454','admin'),(2,'user','$2a$12$QTj7QMqsIKni19fDhrdgJeTSC/4doPuwh1HIK6rEbeSF/UKGsRikS','user@user.com','0256485454','user');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
