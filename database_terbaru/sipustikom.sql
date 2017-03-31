-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2017 at 06:08 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sipustikom`
--

-- --------------------------------------------------------

--
-- Table structure for table `ref_jenis_aplikasi`
--

CREATE TABLE `ref_jenis_aplikasi` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ref_jenis_aplikasi`
--

INSERT INTO `ref_jenis_aplikasi` (`id`, `nama`) VALUES
(1, 'Fullstack'),
(2, 'Front End'),
(3, 'Back End'),
(4, 'Android App'),
(5, 'iOS App'),
(6, 'Mobile App');

-- --------------------------------------------------------

--
-- Table structure for table `ref_jenis_perangkat`
--

CREATE TABLE `ref_jenis_perangkat` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ref_jenis_perangkat`
--

INSERT INTO `ref_jenis_perangkat` (`id`, `nama`) VALUES
(1, 'Switch'),
(2, 'Router'),
(3, 'Access Point'),
(4, 'Server'),
(5, 'CCTV'),
(6, 'Firewall');

-- --------------------------------------------------------

--
-- Table structure for table `ref_lokasi`
--

CREATE TABLE `ref_lokasi` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `alamat` text NOT NULL,
  `telp` varchar(20) NOT NULL,
  `jumlah_lantai` varchar(3) DEFAULT NULL,
  `jumlah_ruangan` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ref_lokasi`
--

INSERT INTO `ref_lokasi` (`id`, `nama`, `alamat`, `telp`, `jumlah_lantai`, `jumlah_ruangan`) VALUES
(1, 'Pustikom UNJ', 'Gedung D Kampus A UNJ', '', '', NULL),
(2, 'Gd. Dewi Sartika', 'IDB II', '021-444556688', NULL, NULL),
(4, 'Teknik Elektro', 'Gedung L2 Fakultas Teknik', '021-0001110011', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ref_merk`
--

CREATE TABLE `ref_merk` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ref_merk`
--

INSERT INTO `ref_merk` (`id`, `nama`) VALUES
(1, 'Asus'),
(2, 'Acer'),
(3, 'Lenovo');

-- --------------------------------------------------------

--
-- Table structure for table `tb_aplikasi`
--

CREATE TABLE `tb_aplikasi` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `ip_lokal` varchar(100) NOT NULL,
  `ip_public` varchar(100) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `jenis_aplikasi` int(1) NOT NULL,
  `db` int(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_aplikasi`
--

INSERT INTO `tb_aplikasi` (`id`, `nama`, `ip_lokal`, `ip_public`, `username`, `password`, `jenis_aplikasi`, `db`, `created_at`, `updated_at`) VALUES
(1, 'PSB Labschool', '192.168.1.111', NULL, 'hanifa', 'fissalma', 3, 2, '2017-03-24 01:12:24', '2017-03-30 20:51:44');

-- --------------------------------------------------------

--
-- Table structure for table `tb_database`
--

CREATE TABLE `tb_database` (
  `id` int(11) NOT NULL,
  `ip_address` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `keterangan` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_database`
--

INSERT INTO `tb_database` (`id`, `ip_address`, `username`, `password`, `keterangan`, `created_at`, `updated_at`) VALUES
(2, '192.168.3.100', 'pustikom', 'pustikom123', 'untuk database simas', '2017-03-23 08:22:27', '2017-03-23 02:49:46'),
(4, '192.168.4.114', 'pustikomdev', 'pustikom', 'database untuk penmaba pasca dan penmaba S1', '2017-03-30 20:54:20', '2017-03-30 20:54:32');

-- --------------------------------------------------------

--
-- Table structure for table `tb_perangkat`
--

CREATE TABLE `tb_perangkat` (
  `id` int(11) NOT NULL,
  `tipe` varchar(50) NOT NULL,
  `merk` int(1) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `jenis` int(1) NOT NULL,
  `ssid` varchar(100) DEFAULT NULL,
  `ip_address` varchar(100) NOT NULL,
  `ip_alternatif` varchar(100) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `lokasi` int(11) NOT NULL,
  `lantai` int(11) NOT NULL,
  `ruang` int(11) NOT NULL,
  `keterangan` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_perangkat`
--

INSERT INTO `tb_perangkat` (`id`, `tipe`, `merk`, `nama`, `jenis`, `ssid`, `ip_address`, `ip_alternatif`, `username`, `password`, `lokasi`, `lantai`, `ruang`, `keterangan`, `created_at`, `updated_at`) VALUES
(1, 'aaa', 1, 'Switch 1', 1, NULL, '192.168.6.100', NULL, 'hani', 'hanihani', 2, 2, 201, NULL, '2017-03-21 09:39:13', '2017-03-23 22:32:16'),
(3, '123bc', 3, 'cctv lantai 2 Pustikom', 5, NULL, '192.168.4.123', NULL, 'pustikom', 'pustikom123', 1, 2, 201, NULL, '2017-03-23 00:56:09', '2017-03-23 20:36:48'),
(4, 'HP2011x', 2, 'Laptop HP Atas', 1, NULL, '192.168.4.123', NULL, 'haihani', 'haijamo', 1, 1, 101, NULL, '2017-03-30 20:58:23', '2017-03-30 20:58:34');

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `role` enum('net','app','super') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`id`, `username`, `password`, `role`, `created_at`, `updated_at`) VALUES
(26, 'hendrik', '$2y$10$Mf.x5Iz38BmOd1/3hOk9feUhszifjLXtWLujDCc9GxapobtbJKEva', 'app', '2017-03-21 22:06:08', '2017-03-21 22:06:08'),
(32, 'hani', '$2y$10$kRh9og/uYbVxH9QcblDG2uIT0rHBy4Xao2Q4895cp4hT/bPBQru7i', 'app', '2017-03-22 23:46:25', '2017-03-22 23:46:25'),
(33, 'fissalma', '$2y$10$GrPIOIpWsi1FYxXAXCP/UeEuuJ6/nzLiOZykHdzQjINAd6vlFx1MK', 'net', '2017-03-26 21:36:36', '2017-03-26 21:36:36'),
(35, 'pakficky', '$2y$10$n/jrMTK3Qjtu7e/ny5XB0Oo3/PRUhiY.1/EP2a31bOhk74qe6ZO3y', 'super', '2017-03-30 21:06:16', '2017-03-30 21:06:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ref_jenis_aplikasi`
--
ALTER TABLE `ref_jenis_aplikasi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ref_jenis_perangkat`
--
ALTER TABLE `ref_jenis_perangkat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ref_lokasi`
--
ALTER TABLE `ref_lokasi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ref_merk`
--
ALTER TABLE `ref_merk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_aplikasi`
--
ALTER TABLE `tb_aplikasi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_database`
--
ALTER TABLE `tb_database`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_perangkat`
--
ALTER TABLE `tb_perangkat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ref_jenis_aplikasi`
--
ALTER TABLE `ref_jenis_aplikasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `ref_jenis_perangkat`
--
ALTER TABLE `ref_jenis_perangkat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `ref_lokasi`
--
ALTER TABLE `ref_lokasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `ref_merk`
--
ALTER TABLE `ref_merk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tb_aplikasi`
--
ALTER TABLE `tb_aplikasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tb_database`
--
ALTER TABLE `tb_database`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tb_perangkat`
--
ALTER TABLE `tb_perangkat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
