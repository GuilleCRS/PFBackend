-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Mesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Mesa` (
  `id_Mesa` INT NOT NULL,
  `Desc_Mesa` VARCHAR(50) NULL,
  PRIMARY KEY (`id_Mesa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Menu` (
  `id_Item` INT NOT NULL,
  `Tipo_Item` VARCHAR(45) NULL,
  `Desc_Item` VARCHAR(45) NULL,
  `Precio_Item` DECIMAL(6,2) NULL,
  PRIMARY KEY (`id_Item`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Cliente` (
  `id_RFC` INT NOT NULL,
  `Nom_Cliente` VARCHAR(45) NULL,
  `Ap_Cliente` VARCHAR(45) NULL,
  PRIMARY KEY (`id_RFC`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Order_Detalles_Menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Order_Detalles_Menu` (
  `id_Order` INT NOT NULL AUTO_INCREMENT,
  `id_Item` INT NOT NULL,
  `Cantidad` INT NULL,
  `id_RFC` INT NOT NULL,
  INDEX `fk_Order_Detalles_Menu_Menu1_idx` (`id_Item` ASC) ,
  PRIMARY KEY (`id_Order`),
  INDEX `fk_Order_Detalles_Menu_Cliente1_idx` (`id_RFC` ASC) ,
  CONSTRAINT `fk_Order_Detalles_Menu_Menu1`
    FOREIGN KEY (`id_Item`)
    REFERENCES `mydb`.`Menu` (`id_Item`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Order_Detalles_Menu_Cliente1`
    FOREIGN KEY (`id_RFC`)
    REFERENCES `mydb`.`Cliente` (`id_RFC`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Factura` (
  `id_Factura` INT NOT NULL AUTO_INCREMENT,
  `Total` DECIMAL(6,2) NULL,
  `Fecha_Hora` DATETIME NULL,
  `id_RFC` INT NOT NULL,
  PRIMARY KEY (`id_Factura`),
  INDEX `fk_Factura_Cliente1_idx` (`id_RFC` ASC) ,
  CONSTRAINT `fk_Factura_Cliente1`
    FOREIGN KEY (`id_RFC`)
    REFERENCES `mydb`.`Cliente` (`id_RFC`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Cliente_Mesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Cliente_Mesa` (
  `id_RFC` INT NOT NULL,
  `id_Mesa` INT NOT NULL,
  INDEX `fk_Cliente_Mesa_Mesa_idx` (`id_Mesa` ASC) ,
  INDEX `fk_Cliente_Mesa_Cliente1_idx` (`id_RFC` ASC) ,
  CONSTRAINT `fk_Cliente_Mesa_Mesa`
    FOREIGN KEY (`id_Mesa`)
    REFERENCES `mydb`.`Mesa` (`id_Mesa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cliente_Mesa_Cliente1`
    FOREIGN KEY (`id_RFC`)
    REFERENCES `mydb`.`Cliente` (`id_RFC`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
