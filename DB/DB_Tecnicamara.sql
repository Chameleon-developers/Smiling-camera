-- Eliminar base de datos si ya existe
DROP DATABASE IF EXISTS tecnicam_shop;
-- Crear base de datos
CREATE DATABASE tecnicam_shop/*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
-- Usar base de datos
USE tecnicam_shop;
-- Activar planificador de eventos 
SET GLOBAL event_scheduler = ON;
-- Tablas
-- Tabla molduras
CREATE TABLE moldings(
    idMolding varchar(4) NOT NULL, 
    widthMolding DOUBLE NOT NULL, 
    wasteMolding DOUBLE NOT NULL,
    PRIMARY KEY (idMolding)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla refuerzos
CREATE TABLE reinforcements(
    idReinforcement INT NOT NULL AUTO_INCREMENT,
    nameReinforcement varchar(45) NOT NULL,
    quantityReinforcement DOUBLE NOT NULL,
    PRIMARY KEY (idReinforcement)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla lineas
CREATE TABLE productlines(
    idLine INT NOT NULL AUTO_INCREMENT, 
    nameLine varchar(45) NOT NULL,
    PRIMARY KEY (idLine)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla sublineas
CREATE TABLE sublines(
    idSubline INT NOT NULL,
    nameSubline varchar(45) NOT NULL,
    idLine INT NOT NULL,
    PRIMARY KEY (idLine, idSubline),
    FOREIGN KEY (idLine) REFERENCES productlines (idLine) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla subsublineas
CREATE TABLE subsublines(
    idSubsubline INT NOT NULL,
    nameSubsubline varchar(60) NOT NULL,
    idLine INT NOT NULL,
    idSubline INT NOT NULL,
    PRIMARY KEY (idSubline, idSubsubline),
    FOREIGN KEY (idLine, idSubline) REFERENCES sublines (idLine, idSubline) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla categorias
CREATE TABLE categories(
    idCategory INT NOT NULL, 
    nameCategory varchar(60) NOT NULL,
    imageCategory varchar(100) DEFAULT "files/categories/defaultc.jpg",
    statusCategory tinyint(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (idCategory)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla subcategorias
CREATE TABLE subcategories(
    idSubcategory INT NOT NULL, 
    nameSubcategory varchar(60) NOT NULL,
    imageSubcategory varchar(100) DEFAULT "files/subcategories/defaultc.jpg",
    idCategory INT NOT NULL, 
    importantSubcategory tinyint(1) NOT NULL DEFAULT 0,
    statusSubcategory tinyint(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (idCategory, idSubcategory),
    FOREIGN KEY (idCategory) REFERENCES categories (idCategory) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla marcas
CREATE TABLE brands(
    idBrand INT NOT NULL AUTO_INCREMENT, 
    nameBrand varchar(45) NOT NULL,
    PRIMARY KEY (idBrand)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla dimensiones
CREATE TABLE dimensions(
    idDimension INT NOT NULL AUTO_INCREMENT,
    widthDimension DOUBLE NOT NULL, 
    heightDimension DOUBLE NOT NULL,
    PRIMARY KEY (idDimension)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla unidades
CREATE TABLE units(
    idUnit INT NOT NULL AUTO_INCREMENT, 
    nameUnit varchar(45) NOT NULL,
    PRIMARY KEY (idUnit)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla insumos
CREATE TABLE supplies(
    idSupply INT NOT NULL, 
    nameSupply varchar(150) NOT NULL,
    costSupply DOUBLE NOT NULL,
    quantitySupply DOUBLE NOT NULL DEFAULT 1,
    unitCostSupply DOUBLE NOT NULL,
    statusSupply tinyint(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (idSupply)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla productos
CREATE TABLE products(
    idProduct INT NOT NULL, 
    nameProduct varchar(150) NOT NULL,
    imageProduct varchar(100) NOT NULL DEFAULT "files/products/defaultp.jpg",
    enableProduct tinyint(1) NOT NULL DEFAULT 1,
    featuresProduct JSON NOT NULL, 
    statusProduct tinyint(1) NOT NULL DEFAULT 1,
    idCategory INT NOT NULL,
    idSubcategory INT NOT NULL,
    idDimension INT, -- Not null?
    idBrand INT NOT NULL,
    idSubsubline INT NOT NULL,
    idSubline INT NOT NULL,
    idUnit INT, -- Not null?
    PRIMARY KEY (idProduct),
    FOREIGN KEY (idCategory, idSubcategory) REFERENCES subcategories (idCategory, idSubcategory) ON DELETE NO ACTION ON UPDATE CASCADE,
    FOREIGN KEY (idDimension) REFERENCES dimensions (idDimension) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idBrand) REFERENCES brands (idBrand) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idSubline, idSubsubline) REFERENCES subsublines (idSubline, idSubsubline) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idUnit) REFERENCES units (idUnit) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla costeo de productos
CREATE TABLE productscost(
    idProduct INT NOT NULL, 
    idSupply INT NOT NULL, 
    typeSupply varchar(50), -- Not null?
    quantityProductCost DOUBLE NOT NULL,
    idUnit INT NOT NULL,
    PRIMARY KEY (idProduct, idSupply),
    FOREIGN KEY (idProduct) REFERENCES products (idProduct) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idSupply) REFERENCES supplies (idSupply) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idUnit) REFERENCES units (idUnit) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla precio de productos
CREATE TABLE productsprice(
    idProduct INT NOT NULL, 
    publicUtilityPrice DOUBLE NOT NULL,
    publicPrice DOUBLE NOT NULL, 
    associatedUtilityPrice DOUBLE NOT NULL,
    associatedPrice DOUBLE NOT NULL, 
    wholesaleDiscountPrice DOUBLE NOT NULL,
    wholesalePrice DOUBLE NOT NULL, 
    wholesaleUtilityPrice DOUBLE NOT NULL,
    distributorDiscountPrice DOUBLE NOT NULL,
    distributorPrice DOUBLE NOT NULL, 
    distributorUtilityPrice DOUBLE NOT NULL,
    distinguishedDiscountPrice DOUBLE NOT NULL,
    distinguishedPrice DOUBLE NOT NULL, 
    distinguishedUtilityPrice DOUBLE NOT NULL,
    PRIMARY KEY (idProduct),
    FOREIGN KEY (idProduct) REFERENCES products (idProduct) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla tecnipacks
CREATE TABLE tecnipacks(
    idTecnipack INT NOT NULL,
    nameTecnipack varchar(50) NOT NULL,
    importantTecnipack tinyint(1) NOT NULL DEFAULT 0,
    imageTecnipack varchar(100) NOT NULL DEFAULT "files/tecnipacks/defaultt.jpg",
    enableTecnipack tinyint(1) NOT NULL DEFAULT 1,
    statusTecnipack tinyint(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (idTecnipack)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla costeo de tecnipacks
CREATE TABLE tecnipackscost(
    idTecnipack INT NOT NULL,
    idProduct INT NOT NULL,
    quantityTecnipackCost DOUBLE NOT NULL,
    PRIMARY KEY (idTecnipack, idProduct),
    FOREIGN KEY (idTecnipack) REFERENCES tecnipacks (idTecnipack) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idProduct) REFERENCES products (idProduct) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla precio de tecnipacks
CREATE TABLE tecnipacksprice(
    idTecnipack INT NOT NULL, 
    publicUtilityPrice DOUBLE NOT NULL,
    publicPrice DOUBLE NOT NULL, 
    associatedUtilityPrice DOUBLE NOT NULL,
    associatedPrice DOUBLE NOT NULL, 
    wholesaleDiscountPrice DOUBLE NOT NULL,
    wholesalePrice DOUBLE NOT NULL, 
    wholesaleUtilityPrice DOUBLE NOT NULL,
    distributorDiscountPrice DOUBLE NOT NULL,
    distributorPrice DOUBLE NOT NULL, 
    distributorUtilityPrice DOUBLE NOT NULL,
    distinguishedDiscountPrice DOUBLE NOT NULL,
    distinguishedPrice DOUBLE NOT NULL, 
    distinguishedUtilityPrice DOUBLE NOT NULL,
    PRIMARY KEY (idTecnipack),
    FOREIGN KEY (idTecnipack) REFERENCES tecnipacks (idTecnipack) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla paises
CREATE TABLE countries(
    idCountry VARCHAR(2) NOT NULL, 
    nameCountry varchar(45) NOT NULL,
    PRIMARY KEY (idCountry)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla estados
CREATE TABLE states(
    idState INT NOT NULL,
    nameState varchar(45) NOT NULL,
    idCountry varchar(2) NOT NULL,
    PRIMARY KEY (idState),
    FOREIGN KEY (idCountry) REFERENCES countries (idCountry) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla ciudades
CREATE TABLE cities(
    idCity INT NOT NULL,
    numberCity INT NOT NULL,
    nameCity varchar(100) NOT NULL,
    idState INT NOT NULL,
    PRIMARY KEY (idCity),
    FOREIGN KEY (idState) REFERENCES states (idState) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla tipo de usuario
CREATE TABLE typeusers(
    idTypeUser INT NOT NULL AUTO_INCREMENT,
    typeUser varchar(45) NOT NULL,
    users tinyint(1) NOT NULL DEFAULT 0,
    orders tinyint(1) NOT NULL DEFAULT 0,
    roles tinyint(1) NOT NULL DEFAULT 0,
    reports tinyint(1) NOT NULL DEFAULT 0,
    records tinyint(1) NOT NULL DEFAULT 0,
    supplies tinyint(1) NOT NULL DEFAULT 0,
    products tinyint(1) NOT NULL DEFAULT 0,
    configurations tinyint(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (idTypeUser)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla usuarios pagina adminitrativa 
CREATE TABLE managerusers(
    idManagerUser INT NOT NULL AUTO_INCREMENT,
    nameUser varchar(45) NOT NULL,
    passwordUser varchar(45) NOT NULL, -- longitud?
    idTypeUser INT NOT NULL,
    statusUser tinyint(1) not null DEFAULT 1,
    PRIMARY KEY (idManagerUser),
    FOREIGN KEY (idTypeUser) REFERENCES typeusers (idTypeUser) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla notificaciones
CREATE TABLE notifications(
    idNotification INT NOT NULL AUTO_INCREMENT, 
    idUser INT NOT NULL,
    idCreator INT NOT NULL,
    messageNotification varchar(150) NOT NULL,
    PRIMARY KEY (idNotification),
    FOREIGN KEY (idUser) REFERENCES managerusers (idManagerUser) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idCreator) REFERENCES managerusers (idManagerUser) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla empleados
CREATE TABLE employes(
    idEmployee INT NOT NULL, 
    nameEmployee varchar(55) NOT NULL,
    rfcEmployee varchar(14) NOT NULL,
    curpEmployee varchar(18),
    birthdateEmployee DATE NOT NULL,
    streetEmployee varchar(45) NOT NULL,
    suburbEmployee varchar(45) NOT NULL,
    zipcodeEmployee varchar(5) NOT NULL,
    extNumberEmployee INT NOT NULL,
    intNumberEmployee INT,
    telephoneEmployee varchar(14),
    emailEmployee varchar(45),
    idCity INT NOT NULL ,
    PRIMARY KEY (idEmployee),
    FOREIGN KEY (idEmployee) REFERENCES managerusers (idManagerUser) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idCity) REFERENCES cities (idCity) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla de empleados y sus lineas de producción
CREATE TABLE employesubline(
    idEmployee INT NOT NULL,
    idSubsubline INT NOT NULL,
    idSubline INT NOT NULL,
    PRIMARY KEY (idEmployee, idSubsubline),
    FOREIGN KEY (idSubline, idSubsubline) REFERENCES subsublines (idSubline, idSubsubline) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla tipos de pago
CREATE TABLE paymenttypes(
    idPaymentType INT NOT NULL AUTO_INCREMENT,
    namePaymentType varchar(45) NOT NULL,
    PRIMARY KEY (idPaymentType)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla provedores
CREATE TABLE providers(
    idProvider INT NOT NULL, -- autoincrement?
    nameProvider varchar(45) NOT NULL,
    rfcProvider varchar(14) NOT NULL,
    streetProvider varchar(45) NOT NULL,
    suburbProvider varchar(45) NOT NULL,
    zipcodeProvider varchar(5),
    extNumberProvider INT NOT NULL,
    intNumberProvider INT,
    telephoneProvider varchar(14),
    emailProvider varchar(45),
    webPageProvider varchar(45),
    idCity INT NOT NULL,
    idPaymentType INT NOT NULL,
    PRIMARY KEY (idProvider),
    FOREIGN KEY (idCity) REFERENCES cities (idCity) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idPaymentType) REFERENCES paymenttypes (idPaymentType) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla tipos de cliente
CREATE TABLE typeclient(
    idTypeClient INT NOT NULL AUTO_INCREMENT,
    nameTypeClient varchar(45) NOT NULL,
    PRIMARY KEY (idTypeClient)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla usuarios carrito
CREATE TABLE shopusers(
    idShopUser INT NOT NULL AUTO_INCREMENT,
    nameUser varchar(45) NOT NULL,
    passwordUser varchar(45) NOT NULL,
    tecnipunntos DOUBLE NOT NULL DEFAULT 0,
    statusUser tinyint(1) not null DEFAULT 1,
    PRIMARY KEY (idShopUser)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla clientes
CREATE TABLE clients(
    idClient INT NOT NULL, 
    nameClient varchar(45) NOT NULL,
    rfcClient varchar(14) NOT NULL,
    streetClient varchar(45) NOT NULL,
    suburbClient varchar(45) NOT NULL,
    zipcodeClient varchar(5) NOT NULL,
    extNumberClient INT NOT NULL,
    intNumberClient INT,
    telephone1Client varchar(14),
    telephone2Client varchar(14),
    celphone1Client varchar(14),
    celphone2Client varchar(14),
    emailClient varchar(45),
    dischargeDateClient timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    idCity INT NOT NULL,
    idTypeClient INT NOT NULL,
    PRIMARY KEY (idClient),
    FOREIGN KEY (idClient) REFERENCES shopusers (idShopUser) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idCity) REFERENCES cities (idCity) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idTypeClient) REFERENCES typeclient (idTypeClient)ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla afiliados
CREATE TABLE subsidiaries(
    idSubsidiary INT NOT NULL AUTO_INCREMENT,
    nameSubsidiary varchar(45) NOT NULL,
    streetSubsidiary varchar(45) NOT NULL,
    zipcodeSubsidiary varchar(5) NOT NULL,
    idClient INT NOT NULL,
    idCity INT NOT NULL,
    PRIMARY KEY (idSubsidiary),
    FOREIGN KEY (idClient) REFERENCES clients (idClient) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idCity) REFERENCES cities (idCity) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla carrito
CREATE TABLE shop(
    idShop INT NOT NULL AUTO_INCREMENT,
    quantityShop INT NOT NULL,
    zipNameShop varchar(45),
    idUser INT NOT NULL,
    idProduct INT,
    idTecnipack INT,
    PRIMARY KEY (idShop),
    FOREIGN KEY (idUser) REFERENCES shopusers (idShopUser) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idProduct) REFERENCES products (idProduct) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idTecnipack) REFERENCES tecnipacks (idTecnipack) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla ventas
CREATE TABLE sellings(
    idSelling INT NOT NULL AUTO_INCREMENT,
    idArticle INT NOT NULL, -- para que sirve
    dateSelling timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    price DOUBLE NOT NULL,
    zipNameSelling varchar(45),
    quantity INT NOT NULL,
    street varchar(45),
    idUser INT NOT NULL,
    idProduct INT,
    idTecnipack INT,
    idPaymentType INT,
    idCity INT,
    idSubsidiary INT,
    PRIMARY KEY (idSelling),
    FOREIGN KEY (idUser) REFERENCES shopusers (idShopUser) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idProduct) REFERENCES products (idProduct) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idTecnipack) REFERENCES tecnipacks (idTecnipack) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idPaymentType) REFERENCES paymenttypes (idPaymentType) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idCity) REFERENCES cities (idCity) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idSubsidiary) REFERENCES subsidiaries (idSubsidiary) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla ordenes
CREATE TABLE orders(
    idSelling INT NOT NULL,
    idArticle INT NOT NULL,
    idEmployee INT NOT NULL,
    comment varchar(45),
    statusOrder varchar(15) NOT NULL,
    PRIMARY KEY (idSelling, idArticle),
    FOREIGN KEY (idSelling) REFERENCES sellings (idSelling) ON DELETE NO ACTION ON UPDATE NO ACTION,
    -- FOREIGN KEY (idArticle) REFERENCES sellings (idArticle) ON DELETE NO ACTION ON UPDATE NO ACTION, hipotesis: no permite hacer llave secundaria de campo que no es llave primaria
    FOREIGN KEY (idEmployee) REFERENCES employes (idEmployee) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla solicitudes
CREATE TABLE request(
    idRequest INT NOT NULL AUTO_INCREMENT,
    idUser INT NOT NULL,
    idEmployee INT NOT NULL,
    comment varchar(45),
    statusRequest tinyint(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (idRequest),
    FOREIGN KEY (idUser) REFERENCES shopusers (idShopUser) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idEmployee) REFERENCES employes (idEmployee) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla ofertas
CREATE TABLE offerts(
    idOffer INT NOT NULL AUTO_INCREMENT,
    nameOffer varchar(100) NOT NULL,
    idProduct INT,
    idTecnipack INT,
    quantity DOUBLE NOT NULL,
    discount DOUBLE NOT NULL,
    imageOffer varchar(100) NOT NULL DEFAULT "files/promotions/defaultc.jpg",
    enableOffer tinyint(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (idOffer),
    FOREIGN KEY (idProduct) REFERENCES products (idProduct) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idTecnipack) REFERENCES tecnipacks (idTecnipack) ON DELETE NO ACTION ON UPDATE NO ACTION 
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;



-- Procedimientos
-- Procedimiento para obtener propiedades de un producto
DELIMITER //
CREATE OR REPLACE PROCEDURE showsproductproperties(idprod int)
    BEGIN
        SELECT p.idProduct, p.nameProduct, p.idBrand, sl.idLine, sl.idSubline, p.idSubsubline, p.idUnit, d.widthDimension, d.heightDimension, p.idCategory, p.idSubcategory, p.imageProduct, p.enableProduct, p.featuresProduct
        FROM products AS p
        INNER JOIN subsublines AS ssbl ON p.idSubsubline=ssbl.idSubsubline
        INNER JOIN sublines AS sl ON ssbl.idSubline=sl.idSubline
        LEFT JOIN dimensions AS d ON p.idDimension=d.idDimension
        WHERE p.statusProduct=1 AND p.idProduct=idprod;
    END//
DELIMITER ;
-- Procedimiento para obtener costeo de un producto
DELIMITER //
CREATE OR REPLACE PROCEDURE showsproductcost(idprod int)
    BEGIN
        SELECT pc.idProduct, pc.idSupply, sp.nameSupply, pc.typeSupply, sp.unitCostSupply, pc.quantityProductCost, pc.idUnit
        FROM productscost AS pc
        INNER JOIN supplies AS sp ON pc.idSupply=sp.idSupply
        INNER JOIN products AS p ON pc.idProduct=p.idProduct
        WHERE p.statusProduct=1 AND p.idProduct=idprod;
    END//
DELIMITER ;
-- Procedimiento para obtener precio de un producto
DELIMITER //
CREATE OR REPLACE PROCEDURE showsproductprice(idprod int)
    BEGIN
        SELECT pp.idProduct, pp.publicUtilityPrice, pp.publicPrice, pp.associatedUtilityPrice, pp.associatedPrice, pp.wholesaleDiscountPrice, pp.wholesalePrice, pp.wholesaleUtilityPrice, pp.distributorDiscountPrice, pp.distributorPrice, pp.distributorUtilityPrice, pp.distinguishedDiscountPrice, pp.distinguishedPrice, pp.distinguishedUtilityPrice
        FROM productsprice AS pp
        INNER JOIN products AS p ON pp.idProduct=p.idProduct
        WHERE p.statusProduct=1 AND p.idProduct=idprod;
    END//
DELIMITER ;
-- Procedimiento para obtener propiedades de un tecnipack
DELIMITER //
CREATE OR REPLACE PROCEDURE showstecnipackproperties(idtec int)
    BEGIN
        SELECT t.idTecnipack, t.nameTecnipack, t.enableTecnipack, t.importantTecnipack, t.imageTecnipack
        FROM tecnipacks AS t
        WHERE t.statusTecnipack=1 AND t.idTecnipack=idtec;
    END//
DELIMITER ;
-- Procedimiento para obtener costeo de un tecnipack
DELIMITER //
CREATE OR REPLACE PROCEDURE showstecnipackcost(idtec int)
    BEGIN
        SELECT tc.idTecnipack, tc.idProduct, p.nameProduct, tc.quantityTecnipackCost, pp.publicPrice
        FROM tecnipackscost AS tc
        INNER JOIN products AS p ON tc.idProduct=p.idProduct
        INNER JOIN productsprice AS pp ON p.idProduct=pp.idProduct
        INNER JOIN tecnipacks AS t ON tc.idTecnipack=t.idTecnipack
        WHERE t.statusTecnipack=1 AND t.idTecnipack=idtec;
    END//
DELIMITER ;
-- Procedimiento para obtener precio de un tecnipack
DELIMITER //
CREATE OR REPLACE PROCEDURE showstecnipackprice(idtec int)
    BEGIN
        SELECT tp.idTecnipack, tp.publicUtilityPrice, tp.publicPrice, tp.associatedUtilityPrice, tp.associatedPrice, tp.wholesaleDiscountPrice, tp.wholesalePrice, tp.wholesaleUtilityPrice, tp.distributorDiscountPrice, tp.distributorPrice, tp.distributorUtilityPrice, tp.distinguishedDiscountPrice, tp.distinguishedPrice, tp.distinguishedUtilityPrice
        FROM tecnipacksprice AS tp
        INNER JOIN tecnipacks AS t ON tp.idTecnipack=t.idTecnipack
        WHERE t.statusTecnipack=1 AND t.idTecnipack=idtec;
    END//
DELIMITER ;
-- Procedimiento para insertar producto con precio
DELIMITER //
CREATE OR REPLACE PROCEDURE insertproduct (idProd INT, nameProd varchar(150), imageProd varchar(100), enableProd INT, featuresProd JSON, width DOUBLE, height DOUBLE, idCat INT, idSubcat INT, idSubl INT, idSubsubl INT, idBra INT, idU INT, pup DOUBLE, pp DOUBLE, aup DOUBLE, ap DOUBLE, wdp DOUBLE, wp DOUBLE, wup DOUBLE, dbdp DOUBLE, dbp DOUBLE, dbup DOUBLE, dgdp DOUBLE, dgp DOUBLE, dgup DOUBLE)
    BEGIN
        DECLARE idD integer;
        DECLARE EXIT HANDLER FOR SQLSTATE '23000' SELECT 203 AS "203";
        SELECT d.idDimension FROM dimensions as d WHERE d.widthDimension=width AND d.heightDimension=height INTO idD;
        IF imageProd="" THEN
            UPDATE products
            SET 
                nameProduct=nameProd,
                enableProduct=enableProd, 
                featuresProduct=featuresProd, 
                idDimension=idD, 
                idCategory=idCat,
                idSubcategory=idSubcat,
                idSubline=idSubl,
                idSubsubline=idSubsubl, 
                idBrand=idBra, 
                idUnit=idU
            WHERE idProduct=idProd;
        ELSE
            INSERT INTO products (idProduct, nameProduct, imageProduct, enableProduct, featuresProduct, idDimension, idCategory,idSubcategory, idSubline, idSubsubline, idBrand, idUnit) VALUES (
                idProd, 
                nameProd,
                imageProd,
                enableProd,
                featuresProd,
                idD,
                idCat,
                idSubcat,
                idSubl,
                idSubsubl,
                idBra,
                idU
            ) ON DUPLICATE KEY UPDATE 
                nameProduct=nameProd, 
                imageProduct=imageProd,
                enableProduct=enableProd, 
                featuresProduct=featuresProd, 
                idDimension=idD, 
                idCategory=idCat,
                idSubcategory=idSubcat, 
                idSubline=idSubl,
                idSubsubline=idSubsubl, 
                idBrand=idBra, 
                idUnit=idU,
                statusProduct=1;
        END IF;
        INSERT INTO productsprice VALUES (
            idProd,
            pup, 
            pp, 
            aup, 
            ap, 
            wdp,
            wp, 
            wup,
            dbdp,
            dbp,
            dbup, 
            dgdp, 
            dgp, 
            dgup
        ) ON DUPLICATE KEY UPDATE
            publicUtilityPrice=pup, 
            publicPrice=pp, 
            associatedUtilityPrice=aup, 
            associatedPrice=ap, 
            wholesaleDiscountPrice=wdp,
            wholesalePrice=wp, 
            wholesaleUtilityPrice=wup,
            distributorDiscountPrice=dbdp,
            distributorPrice=dbp,
            distributorUtilityPrice=dbup, 
            distinguishedDiscountPrice=dgdp, 
            distinguishedPrice=dgp, 
            distinguishedUtilityPrice=dgup;
    SELECT 200 AS "200";           
    END//
DELIMITER ;
-- Procedimiento para insertar tecnipack con precio
DELIMITER //
CREATE OR REPLACE PROCEDURE inserttecnipack (idTec INT, nameTec varchar(150), importTec INT, enableTec INT, imgTec varchar(100), pup DOUBLE, pp DOUBLE, aup DOUBLE, ap DOUBLE, wdp DOUBLE, wp DOUBLE, wup DOUBLE, dbdp DOUBLE, dbp DOUBLE, dbup DOUBLE, dgdp DOUBLE, dgp DOUBLE, dgup DOUBLE)
    BEGIN
        DECLARE EXIT HANDLER FOR SQLSTATE '23000' SELECT 203 AS "203";
        IF imgTec="" THEN
            UPDATE tecnipacks
            SET 
                nameTecnipack=nameTec, 
                enableTecnipack=enableTec,
                importantTecnipack=importTec
            WHERE idTecnipack=idTec;
        ELSE
            INSERT INTO tecnipacks (idTecnipack, nameTecnipack, enableTecnipack, importantTecnipack, imageTecnipack) VALUES (
                idTec, 
                nameTec,
                enableTec,
                importTec,
                imgTec
            ) ON DUPLICATE KEY UPDATE 
                nameTecnipack=nameTec, 
                enableTecnipack=enableTec,
                importantTecnipack=importTec,
                imageTecnipack=imgTec,
                statusTecnipack=1;
        END IF;
        INSERT INTO tecnipacksprice VALUES (
            idTec,
            pup, 
            pp, 
            aup, 
            ap, 
            wdp,
            wp, 
            wup,
            dbdp,
            dbp,
            dbup, 
            dgdp, 
            dgp, 
            dgup
        ) ON DUPLICATE KEY UPDATE
            publicUtilityPrice=pup, 
            publicPrice=pp, 
            associatedUtilityPrice=aup, 
            associatedPrice=ap, 
            wholesaleDiscountPrice=wdp,
            wholesalePrice=wp, 
            wholesaleUtilityPrice=wup,
            distributorDiscountPrice=dbdp,
            distributorPrice=dbp,
            distributorUtilityPrice=dbup, 
            distinguishedDiscountPrice=dgdp, 
            distinguishedPrice=dgp, 
            distinguishedUtilityPrice=dgup;
        SELECT 200 AS "200";  
    END//
DELIMITER ;

-- Funciones
-- Funcion para formulaciones usadas en costeo de productos
DELIMITER //
CREATE OR REPLACE FUNCTION showformulation(ancho DOUBLE, largo DOUBLE, idRef INT, idSup INT)
    RETURNS DOUBLE
    BEGIN
        DECLARE refuerzo DOUBLE;
        DECLARE desperdicio DOUBLE;
        DECLARE modelo VARCHAR(4);
        DECLARE area DOUBLE;
        DECLARE fotos DOUBLE;
        IF idRef=0 THEN
            SELECT SUBSTRING(s.nameSupply, -4, 4) as nm FROM supplies as s WHERE s.idSupply=idSup INTO modelo;
            SELECT m.wasteMolding FROM moldings as m WHERE m.idMolding=modelo INTO desperdicio;
            RETURN ROUND(((((ancho*2.54)*2)+((largo*2.54)*2))+desperdicio)/100, 2);
        ELSE
            SELECT r.quantityReinforcement FROM reinforcements as r WHERE r.idReinforcement=idRef INTO refuerzo;
            IF idRef<=4 THEN
                SELECT (ancho*2.54)*(largo*2.54) INTO area;
                SELECT 10000/area INTO fotos;
                RETURN ROUND((refuerzo/fotos)/1000, 4);
            END IF;
            IF idRef=5 THEN
                RETURN ROUND(refuerzo*largo, 4);
            END IF;
            IF idRef=6 THEN
                IF ancho>largo THEN
                    IF ancho<=24 THEN
                        RETURN largo;
                    ELSE
                        RETURN ancho;
                    END IF;
                ELSE
                    IF largo<=24 THEN
                        RETURN ancho;
                    ELSE
                        RETURN largo;
                    END IF;
                END IF;
            END IF;
            IF idRef=7 OR idRef=9 OR idRef=10 THEN
                RETURN ROUND(ancho*largo*refuerzo, 4);
            END IF;
            IF idRef=8 THEN
                RETURN ROUND(((((ancho*2.54)-refuerzo)/2.54)*2)+((((largo*2.54)-refuerzo)/2.54)*2), 4);
            END IF;
        END IF;
        RETURN null;
    END//
DELIMITER ;