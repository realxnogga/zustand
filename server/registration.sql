-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 20, 2024 at 04:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `registration`
--

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `dataID` int(11) NOT NULL,
  `firstname` varchar(225) NOT NULL,
  `lastname` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`dataID`, `firstname`, `lastname`) VALUES
(1, 'realx', 'nogga'),
(2, 'warren', 'larios'),
(3, 'manolo', 'larios'),
(4, 'michael', 'jordan'),
(5, 'michael', 'jordan'),
(6, 'Warrren', 'nogga'),
(7, 'Warrren', 'nogga'),
(8, 'fgfdg', 'fdgfdg'),
(9, 'realx', 'fgdfg'),
(10, 'fgdfg', 'fdg'),
(11, 'fggdfg', 'dfg'),
(12, 'dffg', 'fdg'),
(13, 'fgdfg', 'dfgfg'),
(14, 'fdgdfg', 'dfg'),
(15, 'df', 'sdf'),
(16, 'dfg', 'dfg'),
(17, 'fgfg', 'dfg'),
(18, 'fdg', 'fdg'),
(19, 'dff', 'sdf'),
(20, 'fgg', 'dfg'),
(21, 'dfsdf', 'sdf'),
(22, 'dsfdf', 'sdf'),
(23, 'dsfdsf', 'sdffs'),
(24, 'dsgfg', 'fdg'),
(25, 'dfg', 'dfg'),
(45, 'realx', 'dff'),
(46, 'realx', 'Larios'),
(47, 'michael', 'df'),
(48, 'realx', 'nogga'),
(49, 'hatdog', 'Larios'),
(50, 'dsf', 'sdf'),
(51, 'netoy', 'dffdg'),
(52, 'df', 'df'),
(53, 'realx', 'fdg'),
(54, 'fgfg', 'fdg'),
(55, '', ''),
(56, 'realx', 'Larios'),
(57, 'manolo', 'fdg'),
(58, 'gghj', 'ghj');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `username` varchar(225) NOT NULL,
  `useremail` varchar(225) NOT NULL,
  `userpassword` varchar(225) NOT NULL,
  `usertoken` varchar(225) NOT NULL DEFAULT 'usertoken',
  `userphoto` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `username`, `useremail`, `userpassword`, `usertoken`, `userphoto`) VALUES
(1, 'warren', 'larioswarren5@gmail.com', 'wawa', '6631a7c2a8', 'drink_20240720045234.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`dataID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data`
--
ALTER TABLE `data`
  MODIFY `dataID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
