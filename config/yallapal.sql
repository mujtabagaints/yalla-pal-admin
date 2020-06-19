-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2020 at 03:00 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yallapal`
--

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

CREATE TABLE `car` (
  `id` int(10) UNSIGNED NOT NULL,
  `model` varchar(100) DEFAULT NULL,
  `seat` int(10) DEFAULT NULL,
  `engine` enum('Manual','Auto') DEFAULT NULL,
  `pre_owned` enum('Yes','No') DEFAULT NULL,
  `description` text,
  `img` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`id`, `model`, `seat`, `engine`, `pre_owned`, `description`, `img`, `created_at`, `updated_at`) VALUES
(1, 'Obcaecati fuga Dolo', 87, 'Manual', 'Yes', 'Ea eos itaque alias dfsa asdf fasd fda fsad fsad sdfa', 'images.jpg', '2020-06-09 06:11:26', '2020-06-14 04:41:44'),
(2, 'Quam et officia repr', 80, 'Manual', 'Yes', 'Et qui adipisci haru d', '8560552146_6b50021122.jpg', '2020-06-09 06:19:55', '2020-06-09 06:20:03');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `tag` int(10) DEFAULT NULL,
  `img` text,
  `description` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `name`, `date`, `location`, `tag`, `img`, `description`, `created_at`, `updated_at`) VALUES
(3, 'Mohammed Kazem Replicates', '2020-07-01', 'Ritz Carlton Hotel Dubai', 5, 'event-2.png', 'Ritz Carlton Hotel Dubai\r\n', '2020-06-14 04:32:09', '2020-06-16 01:47:52'),
(4, 'Explore An Accentuated', '2020-08-01', 'Ritz Carlton Hotel Dubai', 2, 'event-3.png', 'Neque esse sit sun', '2020-06-16 01:18:08', '2020-06-16 01:48:25'),
(5, 'Virtual Exhibitions', '2020-09-06', 'Ritz Carlton Hotel Dubai', 1, 'event-1.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\r\n		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\r\n		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\r\n		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\r\n		proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2020-06-16 01:46:39', NULL),
(6, 'Virtual Exhibitions', '2020-09-09', 'Ritz Carlton Hotel Dubai', 1, 'event-1.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\r\n		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\r\n		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\r\n		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\r\n		proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2020-06-16 01:46:39', NULL),
(7, 'Virtual Exhibitions', '2020-09-24', 'Ritz Carlton Hotel Dubai', 1, 'event-1.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\r\n		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\r\n		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\r\n		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\r\n		proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2020-06-16 01:46:39', NULL),
(8, 'Explore An Accentuated', '2020-08-01', 'Ritz Carlton Hotel Dubai', 2, 'event-3.png', 'Neque esse sit sun', '2020-06-16 01:18:08', '2020-06-16 01:48:25'),
(9, 'Mohammed Kazem Replicates', '2020-07-01', 'Ritz Carlton Hotel Dubai', 5, 'event-2.png', 'Ritz Carlton Hotel Dubai\r\n', '2020-06-14 04:32:09', '2020-06-16 01:47:52'),
(10, 'Mohammed Kazem Replicates', '2020-07-01', 'Ritz Carlton Hotel Dubai', 5, 'event-2.png', 'Ritz Carlton Hotel Dubai\r\n', '2020-06-14 04:32:09', '2020-06-16 01:47:52'),
(11, 'Virtual Exhibitions', '2020-09-24', 'Ritz Carlton Hotel Dubai', 1, 'event-1.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\r\n		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\r\n		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\r\n		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\r\n		proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2020-06-16 01:46:39', NULL),
(12, 'Virtual Exhibitions', '2020-09-09', 'Ritz Carlton Hotel Dubai', 1, 'event-1.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\r\n		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\r\n		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\r\n		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\r\n		proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2020-06-16 01:46:39', NULL),
(13, 'Virtual Exhibitions', '2020-09-09', 'Ritz Carlton Hotel Dubai', 1, 'event-1.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\r\n		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\r\n		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\r\n		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\r\n		proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2020-06-16 01:46:39', NULL),
(14, 'Virtual Exhibitions', '2020-09-24', 'Ritz Carlton Hotel Dubai', 1, 'event-1.png', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\r\n		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\r\n		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\r\n		cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\r\n		proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2020-06-16 01:46:39', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `event_tag`
--

CREATE TABLE `event_tag` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event_tag`
--

INSERT INTO `event_tag` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Arts', '2020-06-08 09:20:38', '2020-06-09 01:37:55'),
(2, 'Community', '2020-06-08 09:20:51', '2020-06-09 01:37:41'),
(3, 'Family', '2020-06-08 09:21:42', '2020-06-09 01:38:09'),
(4, 'Lifestyle', '2020-06-08 09:39:56', '2020-06-09 01:36:48'),
(5, 'Experience', '2020-06-08 09:40:15', '2020-06-09 01:38:18'),
(6, 'Telecom', '2020-06-09 12:46:01', '2020-06-09 01:37:27');

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `id` int(11) UNSIGNED NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `job_industry` int(10) DEFAULT NULL,
  `description` text,
  `img` text,
  `career_level` enum('Junior','Senior','Executive','Management','Senior Executive','Senior Manager') DEFAULT NULL,
  `education_level` enum('High School','Bachelors','Masters','MPhill','Phd') DEFAULT NULL,
  `experience` enum('0-5','6-10','10-15') DEFAULT NULL,
  `employment_type` enum('Full Time','Part Time','Contract') DEFAULT NULL,
  `salary_range` enum('0-1999','2000-3999','4000-5999','6000-7999','8000-9999','9000-10000') DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`id`, `company_name`, `title`, `country`, `city`, `job_industry`, `description`, `img`, `career_level`, `education_level`, `experience`, `employment_type`, `salary_range`, `created_at`, `updated_at`) VALUES
(1, 'Cox Chan Traders', 'Deleniti obcaecati p', '31', '1', 4, 'Aperiam dicta sed li', '8560552146_6b50021122.jpg', 'Senior Executive', 'High School', '0-5', 'Full Time', '0-1999', '2020-06-09 01:53:20', '2020-06-18 03:10:54'),
(2, 'Mcfarland and Yang Co', 'Quae eos ipsa volup', '40', '1', 1, 'Sit sunt quia ea co tses fsda  fsd sd', '8560552146_6b50021122.jpg', 'Senior Manager', 'High School', '0-5', 'Full Time', '0-1999', '2020-06-09 01:55:42', '2020-06-18 03:11:06'),
(3, 'Burt Black Inc', 'Eum ex molestiae ius', '74', '93', 1, 'Earum pariatur Offi', '8560552146_6b50021122.jpg', 'Senior', 'High School', '0-5', 'Full Time', '0-1999', '2020-06-09 03:40:37', '2020-06-18 03:10:38'),
(4, 'Bryan and Chase Trading', 'Rem cum soluta sapie', '48', '50', 9, 'Fugiat voluptatum si 4', '8560552146_6b50021122.jpg', 'Senior Manager', 'MPhill', '0-5', 'Part Time', '8000-9999', '2020-06-09 03:42:36', '2020-06-14 04:26:12'),
(5, 'Spears and Patel Associates', 'Mollitia veniam vol', '20', '69', 9, 'Vitae nihil eu repel', '8560552146_6b50021122.jpg', 'Senior', 'Phd', '6-10', 'Part Time', '2000-3999', '2020-06-14 01:20:12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `job_industry`
--

CREATE TABLE `job_industry` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `job_industry`
--

INSERT INTO `job_industry` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Civil Engieering', '2020-06-08 09:20:38', '2020-06-09 01:37:55'),
(2, 'Education', '2020-06-08 09:20:51', '2020-06-09 01:37:41'),
(3, 'Hospital', '2020-06-08 09:21:42', '2020-06-09 01:38:09'),
(4, 'Healthcare', '2020-06-08 09:39:56', '2020-06-09 01:36:48'),
(5, 'Oil & Gas', '2020-06-08 09:40:15', '2020-06-09 01:38:18'),
(6, 'Telecom', '2020-06-09 12:46:01', '2020-06-09 01:37:27'),
(7, 'Accounting', NULL, NULL),
(8, 'Food', NULL, NULL),
(9, 'IT', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` varchar(50) DEFAULT NULL,
  `age` varchar(50) DEFAULT NULL,
  `condition` enum('Good','Poor','Satisfactory') DEFAULT NULL,
  `img` text,
  `category` enum('Athletic Bag','Bag','Briefcase','Mens Wallet','Women Handbag','Women Wallet') DEFAULT NULL,
  `description` text,
  `location` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `age`, `condition`, `img`, `category`, `description`, `location`, `created_at`, `updated_at`) VALUES
(1, 'Lacota Serran  fsda o', '8544', '10-15', 'Poor', '8560552146_6b50021122.jpg', 'Athletic Bag', 'Veniam quis digniss ggh ', NULL, '2020-06-09 09:07:59', '2020-06-09 09:09:42'),
(2, 'Jemima Jarvis', '703', '15-25', 'Poor', '8560552146_6b50021122.jpg', 'Briefcase', 'Et rerum mollitia in', NULL, '2020-06-09 09:12:06', '2020-06-17 01:06:42'),
(3, 'Eliana Bray', '609', '15-25', 'Poor', 'bag-3.png', 'Mens Wallet', 'Sed consectetur temp', 'Dubai', '2020-06-17 01:07:38', '2020-06-17 02:12:56'),
(4, 'Lynn Brown', '256', '25-35', 'Poor', 'bag-2.png', 'Briefcase', 'Dolores et architect', 'Dubai', '2020-06-17 02:10:35', NULL),
(5, 'Lacota Serran  fsda o', '8544', '10-15', 'Poor', '8560552146_6b50021122.jpg', 'Athletic Bag', 'Veniam quis digniss ggh ', NULL, '2020-06-09 09:07:59', '2020-06-09 09:09:42'),
(6, 'Lacota Serran  fsda o', '8544', '10-15', 'Poor', '8560552146_6b50021122.jpg', 'Bag', 'Veniam quis digniss ggh ', NULL, '2020-06-09 09:07:59', '2020-06-09 09:09:42'),
(7, 'Eliana Bray', '609', '15-25', 'Poor', 'bag-3.png', 'Mens Wallet', 'Sed consectetur temp', 'Dubai', '2020-06-17 01:07:38', '2020-06-17 02:12:56'),
(8, 'Jemima Jarvis', '703', '15-25', 'Poor', '8560552146_6b50021122.jpg', 'Briefcase', 'Et rerum mollitia in', NULL, '2020-06-09 09:12:06', '2020-06-17 01:06:42'),
(9, 'Lacota Serran  fsda o', '8544', '10-15', 'Poor', '8560552146_6b50021122.jpg', 'Bag', 'Veniam quis digniss ggh ', NULL, '2020-06-09 09:07:59', '2020-06-09 09:09:42'),
(10, 'Lacota Serran  fsda o', '8544', '10-15', 'Poor', '8560552146_6b50021122.jpg', 'Bag', 'Veniam quis digniss ggh ', NULL, '2020-06-09 09:07:59', '2020-06-09 09:09:42'),
(11, 'Lee Hays', '465', '35', 'Satisfactory', 'bag-3.png', 'Women Wallet', 'Qui hic doloremque l', 'Cillum animi est q', '2020-06-18 11:40:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `id` int(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `img` text,
  `price` varchar(5) DEFAULT NULL,
  `area` varchar(10) DEFAULT NULL,
  `bed` varchar(2) DEFAULT NULL,
  `bath` varchar(2) DEFAULT NULL,
  `type` enum('Vila','Flat','Apartment','House','Office','Commercial','Residential','Pent House','Studio') DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`id`, `name`, `description`, `img`, `price`, `area`, `bed`, `bath`, `type`, `created_at`, `updated_at`) VALUES
(1, 'Aiko Cox', 'Aut molestias conseq', '8560552146_6b50021122.jpg', '446', '46', '64', '0', 'Flat', '2020-06-07 05:30:01', '2020-06-19 04:35:06'),
(2, 'Rhea Wood', 'Consectetur sint dis', '8560552146_6b50021122.jpg', '698', '79', '37', '7', 'Flat', '2020-06-07 05:30:34', '2020-06-19 04:35:17'),
(3, 'Tucker Griffith', 'Nostrum id quam et q', '8560552146_6b50021122.jpg', '935', '70', '87', '13', 'Office', '2020-06-07 05:31:24', '2020-06-19 04:35:22'),
(4, 'Carl Barry4', 'Aut obcaecati elit 4', '8560552146_6b50021122.jpg', '434', '384', '4', '4', 'Vila', '2020-06-08 09:03:47', '2020-06-19 04:36:39'),
(5, 'Zachary Conway', 'Voluptatem Omnis qu', '8560552146_6b50021122.jpg', '296', '57', '23', '48', 'Studio', '2020-06-09 12:31:21', '2020-06-19 04:36:51'),
(6, 'Quamar Pitts', 'Qui omnis ea illum ', '8560552146_6b50021122.jpg', '959', '19', '45', '73', 'Commercial', '2020-06-09 03:40:06', '2020-06-19 04:36:57'),
(7, 'Alfonso Valenzuela', 'Ad non veniam quae ', '8560552146_6b50021122.jpg', '743', '68', '95', '13', 'Apartment', '2020-06-09 03:41:47', '2020-06-19 04:37:05'),
(8, 'Quamar Pitts', 'Qui omnis ea illum ', '8560552146_6b50021122.jpg', '959', '19', '45', '73', 'Vila', '2020-06-09 03:40:06', '2020-06-19 04:37:12'),
(9, 'Carl Barry4', 'Aut obcaecati elit 4', '8560552146_6b50021122.jpg', '434', '384', '4', '4', 'Commercial', '2020-06-08 09:03:47', '2020-06-19 04:37:17'),
(10, 'Tucker Griffith', 'Nostrum id quam et q', '8560552146_6b50021122.jpg', '935', '70', '87', '13', 'Studio', '2020-06-07 05:31:24', '2020-06-19 04:37:23'),
(11, 'Aiko Cox', 'Aut molestias conseq', '8560552146_6b50021122.jpg', '446', '46', '64', '0', 'House', '2020-06-07 05:30:01', '2020-06-19 04:37:30');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`) VALUES
(1, 'Mujtaba', 'test@gmail.com', '$2b$10$2ylOYnYPwRgdXhxKZdOhGOxtXsV3UIFAA.c/Sa6wDdvMX5A7LhqPW');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_tag`
--
ALTER TABLE `event_tag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_industry`
--
ALTER TABLE `job_industry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `car`
--
ALTER TABLE `car`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `event_tag`
--
ALTER TABLE `event_tag`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `job_industry`
--
ALTER TABLE `job_industry`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
