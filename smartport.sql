-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-06-2024 a las 18:50:38
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `smartport`
--

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS `SmartPort`;

-- Seleccionar la base de datos
USE `SmartPort`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bus`
--

CREATE TABLE `bus` (
  `idBus` int(11) NOT NULL,
  `registrationBus` varchar(100) NOT NULL,
  `hrStart` time NOT NULL,
  `hrEnd` time NOT NULL,
  `idDriver` int(11) NOT NULL,
  `Linea_idLine` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bus_parada`
--

CREATE TABLE `bus_parada` (
  `idBus_busStop` int(11) NOT NULL,
  `hrArrival` time NOT NULL,
  `velAverage` float NOT NULL,
  `Parada_idParada` int(11) NOT NULL,
  `Bus_idBus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--

CREATE TABLE `comentario` (
  `idComment` int(11) NOT NULL,
  `comment` varchar(1000) NOT NULL,
  `dateComment` datetime NOT NULL,
  `Linea_idLine` varchar(30) NOT NULL,
  `Usuario_email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `linea`
--

CREATE TABLE `linea` (
  `rutCompany` varchar(30) NOT NULL,
  `nameCompany` varchar(100) NOT NULL,
  `numLine` varchar(10) NOT NULL,
  `quantDone` int(11) NOT NULL,
  `quantNotDone` int(11) NOT NULL,
  `quantBuses` int(11) NOT NULL,
  `Ruta_idRuta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parada`
--

CREATE TABLE `parada` (
  `idParada` int(11) NOT NULL,
  `coordX` int(11) NOT NULL,
  `coordY` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte`
--

CREATE TABLE `reporte` (
  `idReport` int(11) NOT NULL,
  `dateReport` datetime NOT NULL,
  `numReport` int(11) NOT NULL,
  `Empresario_idUser` int(11) NOT NULL,
  `Linea_idLine` varchar(30) NOT NULL,
  `Empresario_email` varchar(100) NOT NULL,
  `Bus_Parada_idBus_busStop` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta`
--

CREATE TABLE `ruta` (
  `idRuta` int(11) NOT NULL,
  `dateCreate` datetime NOT NULL,
  `quantStops` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ruta_parada`
--

CREATE TABLE `ruta_parada` (
  `idRuta_Parada` int(11) NOT NULL,
  `timeToStops` int(11) NOT NULL,
  `timeStartBuses` int(11) NOT NULL,
  `Ruta_idRuta` int(11) NOT NULL,
  `Parada_idParada` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesiones`
--

CREATE TABLE `sesiones` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `fecha_expiracion` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `email` varchar(100) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `namePerson` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `isAdmin` tinyint(4) NOT NULL DEFAULT 1,
  `isBusiness` tinyint(4) NOT NULL,
  `isSuscribed` tinyint(4) NOT NULL,
  `fono` varchar(45) DEFAULT NULL,
  `rut` varchar(45) DEFAULT NULL,
  `Linea_rutCompany` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`email`, `userName`, `namePerson`, `password`, `isAdmin`, `isBusiness`, `isSuscribed`, `fono`, `rut`, `Linea_rutCompany`) VALUES
('example2@mail.com', 'exampleUser2', 'Example User', '$2b$12$PCGjtx/i2C5b/q0JfKFMTeO79qedjuykx.DRk6qesUcX8JerPt1YK', 0, 0, 1, NULL, NULL, NULL),
('example@mail.com', 'exampleUser1', 'Example Anonymous', '$2b$12$BSmg5u8DiZiy45rzbhJKXeaU0QLPma5dCFtAOancjr0Js7VILP4NC', 0, 0, 0, NULL, NULL, NULL),
('geraldespi45@mail.cl', 'GelEspi34', 'Gerald Espinoza', '$2b$12$QdJjNIx2KBVvst/fsott8eS8OR/Uvk/l51g1Dxk49NwpoyPcwvBAS', 1, 0, 0, NULL, NULL, NULL),
('lucasrobles23@mail.cl', 'luxRob23', 'Lucas Robles', '$2b$12$y7VUxsrY8wQb9L09uYuCx.wSU9Hyn7T9JJrsHMp2w1u6GWZiIXb/.', 1, 1, 1, NULL, '21365017-3', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bus`
--
ALTER TABLE `bus`
  ADD PRIMARY KEY (`idBus`),
  ADD KEY `fk_Bus_Linea1_idx` (`Linea_idLine`);

--
-- Indices de la tabla `bus_parada`
--
ALTER TABLE `bus_parada`
  ADD PRIMARY KEY (`idBus_busStop`),
  ADD KEY `fk_BusParada_Parada1_idx` (`Parada_idParada`),
  ADD KEY `fk_BusParada_Bus1_idx` (`Bus_idBus`);

--
-- Indices de la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`idComment`),
  ADD KEY `fk_Comentario_Linea1_idx` (`Linea_idLine`),
  ADD KEY `fk_Comentario_Usuario1_idx` (`Usuario_email`);

--
-- Indices de la tabla `linea`
--
ALTER TABLE `linea`
  ADD PRIMARY KEY (`rutCompany`),
  ADD KEY `fk_Linea_Ruta1_idx` (`Ruta_idRuta`);

--
-- Indices de la tabla `parada`
--
ALTER TABLE `parada`
  ADD PRIMARY KEY (`idParada`);

--
-- Indices de la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD PRIMARY KEY (`idReport`),
  ADD KEY `fk_Reporte_Linea1_idx` (`Linea_idLine`),
  ADD KEY `fk_Reporte_Bus_Parada1_idx` (`Bus_Parada_idBus_busStop`);

--
-- Indices de la tabla `ruta`
--
ALTER TABLE `ruta`
  ADD PRIMARY KEY (`idRuta`);

--
-- Indices de la tabla `ruta_parada`
--
ALTER TABLE `ruta_parada`
  ADD PRIMARY KEY (`idRuta_Parada`),
  ADD KEY `fk_Ruta_Parada_Ruta1_idx` (`Ruta_idRuta`),
  ADD KEY `fk_Ruta_Parada_Parada1_idx` (`Parada_idParada`);

--
-- Indices de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`email`),
  ADD KEY `fk_Usuario_Linea1_idx` (`Linea_rutCompany`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bus`
--
ALTER TABLE `bus`
  ADD CONSTRAINT `fk_Bus_Linea1` FOREIGN KEY (`Linea_idLine`) REFERENCES `linea` (`rutCompany`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `bus_parada`
--
ALTER TABLE `bus_parada`
  ADD CONSTRAINT `fk_BusParada_Bus1` FOREIGN KEY (`Bus_idBus`) REFERENCES `bus` (`idBus`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_BusParada_Parada1` FOREIGN KEY (`Parada_idParada`) REFERENCES `parada` (`idParada`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `fk_Comentario_Linea1` FOREIGN KEY (`Linea_idLine`) REFERENCES `linea` (`rutCompany`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Comentario_Usuario1` FOREIGN KEY (`Usuario_email`) REFERENCES `usuario` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `linea`
--
ALTER TABLE `linea`
  ADD CONSTRAINT `fk_Linea_Ruta1` FOREIGN KEY (`Ruta_idRuta`) REFERENCES `ruta` (`idRuta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD CONSTRAINT `fk_Reporte_Bus_Parada1` FOREIGN KEY (`Bus_Parada_idBus_busStop`) REFERENCES `bus_parada` (`idBus_busStop`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Reporte_Linea1` FOREIGN KEY (`Linea_idLine`) REFERENCES `linea` (`rutCompany`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ruta_parada`
--
ALTER TABLE `ruta_parada`
  ADD CONSTRAINT `fk_Ruta_Parada_Parada1` FOREIGN KEY (`Parada_idParada`) REFERENCES `parada` (`idParada`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Ruta_Parada_Ruta1` FOREIGN KEY (`Ruta_idRuta`) REFERENCES `ruta` (`idRuta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_Usuario_Linea1` FOREIGN KEY (`Linea_rutCompany`) REFERENCES `linea` (`rutCompany`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
