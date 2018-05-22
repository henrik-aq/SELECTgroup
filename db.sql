-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 22, 2018 at 11:58 AM
-- Server version: 5.6.34-log
-- PHP Version: 7.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `commentID` int(11) NOT NULL,
  `entryID` int(11) NOT NULL,
  `content` varchar(250) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`commentID`, `entryID`, `content`, `createdBy`, `createdAt`) VALUES
(3, 1, 'Blogg1', 1, '2018-05-06 00:00:03'),
(5, 2, 'Blogg2', 1, '2018-05-06 00:00:06'),
(6, 1, 'Blogg3', 1, '2018-05-06 00:00:06'),
(7, 3, 'Blogg4', 1, '2018-05-06 00:00:06'),
(8, 5, 'Blogg5', 2, '0000-00-00 00:00:00'),
(9, 2, 'Blogg6', 2, '2018-05-06 00:00:08'),
(10, 4, 'Blogg7', 2, '2018-05-06 00:00:23');

-- --------------------------------------------------------

--
-- Table structure for table `entries`
--

CREATE TABLE `entries` (
  `entryID` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `entries`
--

INSERT INTO `entries` (`entryID`, `title`, `content`, `createdBy`, `createdAt`) VALUES
(1, 'Hej1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', 2, '0000-00-00 00:00:00'),
(2, 'Hej2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 2', 1, '0000-00-00 00:00:00'),
(3, 'Hej3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 3', 2, '2018-04-16 00:00:00'),
(4, 'Hej4', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 4', 30, '2018-04-16 00:00:00'),
(5, 'datumtest', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 5', 1, '2018-05-15 13:35:22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `username`, `password`, `createdAt`) VALUES
(1, 'henrik', 'henrik', '2018-05-06 00:00:00'),
(2, 'hei', '$2y$10$Zr0u/ekcewEy/tMkEwglweS5dDySsxOgLXPiYbidsasumoIEKs3yC', '2018-05-15 17:39:32'),
(28, 'jesper', '$2y$10$/URusidGMuUB4eBkNyD2eO4zoQgaClS7a5045jiogMlU0upQun842', '2018-05-16 10:10:17'),
(29, 'henrik', '$2y$10$DNIpZo2q0O9Jo6m8/toANOJNDCc8LRcwesVehUMge9B9LY6Iqvf4K', '2018-05-16 12:50:30'),
(30, 'elvis', '$2y$10$X8Lt3kmJtQGjvyfrXA0zgu/BnQ6ceuwtUtqFrxXoFCcjt.mJGk1a6', '2018-05-16 12:57:29'),
(31, 'lasse', '$2y$10$M3XPW0Hji2nGMcF6bZDUxupjbhzu.8tJgcm0zN6omncvO9Pfe7pfG', '2018-05-16 13:39:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentID`);

--
-- Indexes for table `entries`
--
ALTER TABLE `entries`
  ADD PRIMARY KEY (`entryID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `commentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `entries`
--
ALTER TABLE `entries`
  MODIFY `entryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
