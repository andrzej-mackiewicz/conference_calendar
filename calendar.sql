-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 04 Sie 2021, 14:53
-- Wersja serwera: 10.4.14-MariaDB
-- Wersja PHP: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `pomocnik`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `calendar`
--

CREATE TABLE `calendar` (
  `id` int(11) NOT NULL,
  `user` varchar(30) NOT NULL,
  `judge` varchar(30) NOT NULL,
  `signature` varchar(50) NOT NULL,
  `date` varchar(10) NOT NULL,
  `time_from` varchar(5) NOT NULL,
  `time_to` varchar(5) NOT NULL,
  `room` int(11) NOT NULL,
  `emails` longtext NOT NULL,
  `status` int(11) NOT NULL,
  `link` text NOT NULL,
  `add_date` varchar(10) NOT NULL,
  `last_accept` varchar(10) NOT NULL,
  `confirm` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `calendar`
--

INSERT INTO `calendar` (`id`, `user`, `judge`, `signature`, `date`, `time_from`, `time_to`, `room`, `emails`, `status`, `link`, `add_date`, `last_accept`, `confirm`) VALUES
(106, 'test', 'Dagmara Gałuszko', 'testowa', '2021-07-20', '08:45', '09:45', 3, '[\n    \"test\"\n]', 0, '', '2021-07-27', '', ''),
(107, 'test', 'Dariusz Jastszębski', 'testowa', '2021-09-07', '11:30', '12:30', 3, '[\n    \"test\"\n]', 4, '', '2021-07-27', '', '');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `calendar`
--
ALTER TABLE `calendar`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `calendar`
--
ALTER TABLE `calendar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
