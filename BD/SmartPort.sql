-- -----------------------------------------------------
-- Table `Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Usuario` (
  `email` VARCHAR(100) NOT NULL,
  `userName` VARCHAR(100) NOT NULL,
  `namePerson` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `isAdmin` BOOLEAN NOT NULL,
  `isSuscribed` BOOLEAN NOT NULL,
  `isBusiness` BOOLEAN NOT NULL,
  `rut` VARCHAR(20) UNIQUE,
  PRIMARY KEY (`email`))

-- -----------------------------------------------------
-- Table `Ruta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Ruta` (
  `idRuta` INT NOT NULL,
  `idCreator` INT NOT NULL,
  PRIMARY KEY (`idRuta`))


-- -----------------------------------------------------
-- Table `Linea`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Linea` (
  `idLine` INT NOT NULL,
  `quantDone` INT NOT NULL,
  `quantNotDone` INT NOT NULL,
  `quantBuses` INT NOT NULL,
  `Ruta_idRuta` INT NOT NULL,
  PRIMARY KEY (`idLine`),
  INDEX `fk_Linea_Ruta1_idx` (`Ruta_idRuta` ASC) VISIBLE,
  CONSTRAINT `fk_Linea_Ruta1`
    FOREIGN KEY (`Ruta_idRuta`)
    REFERENCES `Ruta` (`idRuta`))


-- -----------------------------------------------------
-- Table `Comentario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Comentario` (
  `idComment` INT NOT NULL,
  `comment` VARCHAR(1000) NOT NULL,
  `dateComment` DATETIME NOT NULL,
  `Empresario_idUser` INT NULL,
  `Usuario_idUser` INT NULL,
  `Linea_idLine` INT NOT NULL,
  PRIMARY KEY (`idComment`),
  INDEX `fk_Comentario_Empresario1_idx` (`Empresario_idUser` ASC) VISIBLE,
  INDEX `fk_Comentario_Usuario1_idx` (`Usuario_idUser` ASC) VISIBLE,
  INDEX `fk_Comentario_Linea1_idx` (`Linea_idLine` ASC) VISIBLE,
  CONSTRAINT `fk_Comentario_Empresario1`
    FOREIGN KEY (`Empresario_idUser`)
    REFERENCES `Empresario` (`idUser`),
  CONSTRAINT `fk_Comentario_Usuario1`
    FOREIGN KEY (`Usuario_idUser`)
    REFERENCES `Usuario` (`idUser`),
  CONSTRAINT `fk_Comentario_Linea1`
    FOREIGN KEY (`Linea_idLine`)
    REFERENCES `Linea` (`idLine`))


-- -----------------------------------------------------
-- Table `Reporte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Reporte` (
  `idReport` INT NOT NULL,
  `dateReport` DATETIME NOT NULL,
  `numReport` INT NOT NULL,
  `Empresario_idUser` INT NOT NULL,
  `Linea_idLine` INT NOT NULL,
  PRIMARY KEY (`idReport`),
  INDEX `fk_Reporte_Empresario1_idx` (`Empresario_idUser` ASC) VISIBLE,
  INDEX `fk_Reporte_Linea1_idx` (`Linea_idLine` ASC) VISIBLE,
  CONSTRAINT `fk_Reporte_Empresario1`
    FOREIGN KEY (`Empresario_idUser`)
    REFERENCES `Empresario` (`idUser`),
  CONSTRAINT `fk_Reporte_Linea1`
    FOREIGN KEY (`Linea_idLine`)
    REFERENCES `Linea` (`idLine`))


-- -----------------------------------------------------
-- Table `Bus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bus` (
  `idBus` INT NOT NULL,
  `registrationBus` VARCHAR(100) NOT NULL,
  `hrStart` TIME NOT NULL,
  `hrEnd` TIME NOT NULL,
  `idDriver` INT NOT NULL,
  `Linea_idLine` INT NOT NULL,
  PRIMARY KEY (`idBus`),
  INDEX `fk_Bus_Linea1_idx` (`Linea_idLine` ASC) VISIBLE,
  CONSTRAINT `fk_Bus_Linea1`
    FOREIGN KEY (`Linea_idLine`)
    REFERENCES `Linea` (`idLine`))


-- -----------------------------------------------------
-- Table `Parada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Parada` (
  `idParada` INT NOT NULL,
  `coordX` INT NOT NULL,
  `coordY` INT NOT NULL,
  PRIMARY KEY (`idParada`))


-- -----------------------------------------------------
-- Table `Ruta_Parada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Ruta_Parada` (
  `idRuta_Parada` INT NOT NULL,
  `timeToStops` INT NOT NULL,
  `timeStartBuses` INT NOT NULL,
  `Ruta_idRuta` INT NOT NULL,
  `Parada_idParada` INT NOT NULL,
  PRIMARY KEY (`idRuta_Parada`),
  INDEX `fk_Ruta_Parada_Ruta1_idx` (`Ruta_idRuta` ASC) VISIBLE,
  INDEX `fk_Ruta_Parada_Parada1_idx` (`Parada_idParada` ASC) VISIBLE,
  CONSTRAINT `fk_Ruta_Parada_Ruta1`
    FOREIGN KEY (`Ruta_idRuta`)
    REFERENCES `Ruta` (`idRuta`),
  CONSTRAINT `fk_Ruta_Parada_Parada1`
    FOREIGN KEY (`Parada_idParada`)
    REFERENCES `Parada` (`idParada`))


-- -----------------------------------------------------
-- Table `BusParada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BusParada` (
  `idBus_busStop` INT NOT NULL,
  `hrArrival` TIME NOT NULL,
  `velAverage` FLOAT NOT NULL,
  `Parada_idParada` INT NOT NULL,
  `Bus_idBus` INT NOT NULL,
  `Reporte_idReport` INT NOT NULL,
  PRIMARY KEY (`idBus_busStop`),
  INDEX `fk_BusParada_Parada1_idx` (`Parada_idParada` ASC) VISIBLE,
  INDEX `fk_BusParada_Bus1_idx` (`Bus_idBus` ASC) VISIBLE,
  INDEX `fk_BusParada_Reporte1_idx` (`Reporte_idReport` ASC) VISIBLE,
  CONSTRAINT `fk_BusParada_Parada1`
    FOREIGN KEY (`Parada_idParada`)
    REFERENCES `Parada` (`idParada`),
  CONSTRAINT `fk_BusParada_Bus1`
    FOREIGN KEY (`Bus_idBus`)
    REFERENCES `Bus` (`idBus`),
  CONSTRAINT `fk_BusParada_Reporte1`
    FOREIGN KEY (`Reporte_idReport`)
    REFERENCES `Reporte` (`idReport`))