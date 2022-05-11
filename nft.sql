-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 11, 2022 lúc 10:16 AM
-- Phiên bản máy phục vụ: 10.4.8-MariaDB
-- Phiên bản PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `nft`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `image` mediumtext NOT NULL,
  `price` mediumtext NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `item`
--

INSERT INTO `item` (`id`, `name`, `image`, `price`, `type`) VALUES
(1, 'Vật phẩm 1', '/arm/1.png', '0.1', 1),
(2, 'Vật phẩm 2', '/arm/2.png', '0.11', 1),
(3, 'Vật phẩm 3', '/arm/3.png', '0.5', 1),
(4, 'Vật phẩm 4', '/arm/4.png', '0.4', 1),
(5, 'Vật phẩm 5', '/arm/5.png', '0.3', 1),
(6, 'Vật phẩm 6', '/arm/6.png', '0.2', 1),
(7, 'Áo 1', '/cloth/1.png', '0.01', 4),
(8, 'Áo 2', '/cloth/2.png', '0.01', 4),
(9, 'Tóc 1', '/hair/1.png', '0.01', 3),
(10, 'Tóc 2', '/hair/2.png', '0.01', 3),
(11, 'Mũ 1', '/head/1.png', '0.01', 2),
(12, 'Mũ 2', '/head/2.png', '0.01', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shop`
--

CREATE TABLE `shop` (
  `id` int(11) NOT NULL,
  `idItem` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `address` varchar(256) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `shop`
--

INSERT INTO `shop` (`id`, `idItem`, `idUser`, `address`, `price`) VALUES
(8, 1, 2, '0x56b0b182f91dcb6badf7d615e868da0d637f08bb', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `address` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_item`
--

CREATE TABLE `user_item` (
  `id` int(11) NOT NULL,
  `address` varchar(256) NOT NULL,
  `idItem` int(11) NOT NULL,
  `isBind` int(11) NOT NULL,
  `isWear` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `user_item`
--

INSERT INTO `user_item` (`id`, `address`, `idItem`, `isBind`, `isWear`) VALUES
(2, '0x56b0b182f91dcb6badf7d615e868da0d637f08bb', 1, 1, 0),
(3, '0x56b0b182f91dcb6badf7d615e868da0d637f08bb', 2, 0, 0),
(4, '0x56b0b182f91dcb6badf7d615e868da0d637f08bb', 2, 0, 1),
(5, '0x56b0b182f91dcb6badf7d615e868da0d637f08bb', 2, 0, 0),
(6, '0x56b0b182f91dcb6badf7d615e868da0d637f08bb', 10, 0, 1),
(7, '0x56b0b182f91dcb6badf7d615e868da0d637f08bb', 7, 0, 1),
(8, '0x56b0b182f91dcb6badf7d615e868da0d637f08bb', 12, 0, 1),
(9, '0x56b0b182f91dcb6badf7d615e868da0d637f08bb', 8, 0, 0),
(10, '0x56b0b182f91dcb6badf7d615e868da0d637f08bb', 9, 0, 0),
(11, '0x56b0b182f91dcb6badf7d615e868da0d637f08bb', 9, 0, 0),
(12, '0x56b0b182f91dcb6badf7d615e868da0d637f08bb', 9, 0, 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user_item`
--
ALTER TABLE `user_item`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user_item`
--
ALTER TABLE `user_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
