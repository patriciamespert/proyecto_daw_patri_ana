create database mydb;
use mydb;

CREATE TABLE productos(
   ID                         INTEGER  NOT NULL PRIMARY KEY 
  ,image                      VARCHAR(19) NOT NULL
  ,nameProd                   VARCHAR(38) NOT NULL
  ,categoriaProd0             VARCHAR(5) NOT NULL
  ,categoriaProd1             VARCHAR(13) NOT NULL
  ,alergenosProd0nameAlerg    VARCHAR(7) NOT NULL
  ,alergenosProd0imageAlerg   VARCHAR(18) NOT NULL
  ,alergenosProd1nameAlerg    VARCHAR(7)
  ,alergenosProd1imageAlerg   VARCHAR(18)
  ,alergenosProd2nameAlerg    VARCHAR(17)
  ,alergenosProd2imageAlerg   VARCHAR(25)
  ,price                      NUMERIC(4,2) NOT NULL
  ,unidades                   INTEGER  NOT NULL
);
INSERT INTO products(id,image,nameProd,categoriaProd0,categoriaProd1,alergenosProd0nameAlerg,alergenosProd0imageAlerg,alergenosProd1nameAlerg,alergenosProd1imageAlerg,alergenosProd2nameAlerg,alergenosProd2imageAlerg,price,unidades) VALUES (001,'img/prod_001.jpg','Cookies con pepitas de chocolate','Todos','Otros','Gluten','img/gluten.png','Lácteos','img/lacteos.png','Huevos','img/huevo.png',5.50,10);
INSERT INTO products(id,image,nameProd,categoriaProd0,categoriaProd1,alergenosProd0nameAlerg,alergenosProd0imageAlerg,alergenosProd1nameAlerg,alergenosProd1imageAlerg,alergenosProd2nameAlerg,alergenosProd2imageAlerg,price,unidades) VALUES (002,'img/prod_002.jpg','Tarta de queso con frutos rojos','Todos','Tartas','Gluten','img/gluten.png','Lácteos','img/lacteos.png','Huevos','img/huevo.png',12,1);
INSERT INTO products(id,image,nameProd,categoriaProd0,categoriaProd1,alergenosProd0nameAlerg,alergenosProd0imageAlerg,alergenosProd1nameAlerg,alergenosProd1imageAlerg,alergenosProd2nameAlerg,alergenosProd2imageAlerg,price,unidades) VALUES (003,'img/prod_003.jpg','Crema Catalana','Todos','Tradicionales','Lácteos','img/lacteos.png','Huevos','img/huevo.png',NULL,NULL,4,1);
INSERT INTO products(id,image,nameProd,categoriaProd0,categoriaProd1,alergenosProd0nameAlerg,alergenosProd0imageAlerg,alergenosProd1nameAlerg,alergenosProd1imageAlerg,alergenosProd2nameAlerg,alergenosProd2imageAlerg,price,unidades) VALUES (004,'img/prod_004.jpg','Bolas de Berlim','Todos','Otros','Gluten','img/gluten.png','Lácteos','img/lacteos.png','Huevos','img/huevo.png',1,1);
INSERT INTO products (id,image,nameProd,categoriaProd0,categoriaProd1,alergenosProd0nameAlerg,alergenosProd0imageAlerg,alergenosProd1nameAlerg,alergenosProd1imageAlerg,alergenosProd2nameAlerg,alergenosProd2imageAlerg,price,unidades) VALUES (005,'img/prod_005.jpg','Churros con 0.50l de chocolate','Todos','Otros','Gluten','img/gluten.png','Lácteos','img/lacteos.png','Huevos','img/huevo.png',4.50,10);
INSERT INTO products (id,image,nameProd,categoriaProd0,categoriaProd1,alergenosProd0nameAlerg,alergenosProd0imageAlerg,alergenosProd1nameAlerg,alergenosProd1imageAlerg,alergenosProd2nameAlerg,alergenosProd2imageAlerg,price,unidades) VALUES (006,'img/prod_006.jpg','Pastelitos de  queso con miel y nueces','Todos','Pasteles','Gluten','img/gluten.png','Lácteos','img/lacteos.png','Frutos de cáscara','img/frutos_cascara.png',5,10);
INSERT INTO products(id,image,nameProd,categoriaProd0,categoriaProd1,alergenosProd0nameAlerg,alergenosProd0imageAlerg,alergenosProd1nameAlerg,alergenosProd1imageAlerg,alergenosProd2nameAlerg,alergenosProd2imageAlerg,price,unidades) VALUES (007,'img/prod_007.jpg','Bizcocho de chocolate','Todos','Bizcocho','Gluten','img/gluten.png','Huevos','img/huevo.png',NULL,NULL,5,10);
INSERT INTO products(id,image,nameProd,categoriaProd0,categoriaProd1,alergenosProd0nameAlerg,alergenosProd0imageAlerg,alergenosProd1nameAlerg,alergenosProd1imageAlerg,alergenosProd2nameAlerg,alergenosProd2imageAlerg,price,unidades) VALUES (008,'img/prod_008.jpg','Torrijas','Todos','Tradicionales','Gluten','img/gluten.png','Lácteos','img/lacteos.png','Huevos','img/huevo.png',5,8);
INSERT INTO products(id,image,nameProd,categoriaProd0,categoriaProd1,alergenosProd0nameAlerg,alergenosProd0imageAlerg,alergenosProd1nameAlerg,alergenosProd1imageAlerg,alergenosProd2nameAlerg,alergenosProd2imageAlerg,price,unidades) VALUES (009,'img/prod_009.jpg','Arroz con Leche','Todos','Tradicionales','Lácteos','img/lacteos.png',NULL,NULL,NULL,NULL,4,1);
INSERT INTO products(id,image,nameProd,categoriaProd0,categoriaProd1,alergenosProd0nameAlerg,alergenosProd0imageAlerg,alergenosProd1nameAlerg,alergenosProd1imageAlerg,alergenosProd2nameAlerg,alergenosProd2imageAlerg,price,unidades) VALUES (010,'img/prod_010.jpg','Quesada','Todos','Tradicionales','Gluten','img/gluten.png','Lácteos','img/lacteos.png','Huevos','img/huevo.png',8,1);
INSERT INTO products(id,image,nameProd,categoriaProd0,categoriaProd1,alergenosProd0nameAlerg,alergenosProd0imageAlerg,alergenosProd1nameAlerg,alergenosProd1imageAlerg,alergenosProd2nameAlerg,alergenosProd2imageAlerg,price,unidades) VALUES (011,'img/prod_011.jpg','Tarta de yogur','Todos','Tartas','Gluten','img/gluten.png','Lácteos','img/lacteos.png','Huevos','img/huevo.png',6,1);
INSERT INTO products(id,image,nameProd,categoriaProd0,categoriaProd1,alergenosProd0nameAlerg,alergenosProd0imageAlerg,alergenosProd1nameAlerg,alergenosProd1imageAlerg,alergenosProd2nameAlerg,alergenosProd2imageAlerg,price,unidades) VALUES (012,'img/prod_012.jpg','Tarta de Oreo','Todos','Tartas','Gluten','img/gluten.png','Lácteos','img/lacteos.png','Huevos','img/huevo.png',8,1);
INSERT INTO products(id,image,nameProd,categoriaProd0,categoriaProd1,alergenosProd0nameAlerg,alergenosProd0imageAlerg,alergenosProd1nameAlerg,alergenosProd1imageAlerg,alergenosProd2nameAlerg,alergenosProd2imageAlerg,price,unidades) VALUES (013,'img/prod_013.jpg','Bizcocho de Canela','Todos','Bizcocho','Gluten','img/gluten.png','Lácteos','img/lacteos.png','Huevos','img/huevo.png',10,1);
INSERT INTO products(id,image,nameProd,categoriaProd0,categoriaProd1,alergenosProd0nameAlerg,alergenosProd0imageAlerg,alergenosProd1nameAlerg,alergenosProd1imageAlerg,alergenosProd2nameAlerg,alergenosProd2imageAlerg,price,unidades) VALUES (014,'img/prod_014.jpg','Pastelitos de nata y arándanos','Todos','Pasteles','Gluten','img/gluten.png','Lácteos','img/lacteos.png','Huevos','img/huevo.png',5,10);
