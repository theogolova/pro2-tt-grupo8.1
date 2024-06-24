CREATE DATABASE IF NOT EXISTS databaseproyecto;
USE databaseproyecto;

CREATE TABLE usuarios (
/* Nombrecolumna   Tipodato     Restricciones */
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
mail VARCHAR(250) NOT NULL,
contrasenia VARCHAR(250) NOT NULL,
usuario VARCHAR(250) NOT NULL,
fechaNacimiento DATE NOT NULL,
numeroDocumento INT NOT NULL,
foto VARCHAR(250) NOT NULL,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE productos (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    clienteId INT UNSIGNED,
    imagenProd VARCHAR(250) NOT NULL,
    nombreProd VARCHAR(250) NOT NULL,
    descripcion VARCHAR(250) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (clienteId) REFERENCES usuarios(id)
);

CREATE TABLE comentarios (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    productoId INT UNSIGNED,
    clienteId INT UNSIGNED,
    comentario VARCHAR(250) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (clienteId) REFERENCES usuarios(id),
    FOREIGN KEY (productoId) REFERENCES productos(id) ON DELETE CASCADE
);



INSERT INTO usuarios (id, mail, contrasenia, usuario, fechaNacimiento, numeroDocumento, foto)
VALUES 
(default, 'pepito@udesa.edu.ar', '123', "pepito", '1940-05-07', 46123804, 'https://peru21.pe/resizer/yNu6EZADMOnCY-YGevBD84tCoSM=/1200x1200/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/6RDFP4F6QNCN7FYPLOTLM2IQ5M.jpg'),
(default, 'messi@gmail.com', '456', "messi", '2010-10-10', 10294852, 'https://img.a.transfermarkt.technology/portrait/big/28003-1710080339.jpg?lm=1'),
(default, 'julian@udesa.edu.ar', '789', "julian", '2011-11-11', 46223904, 'https://s.hs-data.com/bilder/spieler/gross/445514.jpg?fallback=png'),
(default, 'enzo@udesa.edu.ar', '181', "enzof", '1990-01-01', 9987204, 'https://b.fssta.com/uploads/application/soccer/headshots/73453.vresize.350.350.medium.84.png'),
(default, 'gallardo@udesa.edu.ar', '912', "gallardo", '2018-09-12', 4612304, 'https://images.pagina12.com.ar/styles/focal_3_2_960x640/public/2023-06/737041-gallardo-0.jpg?h=b3660f0d&itok=APM0im41');

INSERT INTO productos (id, clienteId, nombreProd, imagenProd, descripcion)
VALUES 
(default, 4, 'Nike Jordan', 'https://images.footlocker.com/is/image/EBFL2/N5031100_01?wid=504&hei=504&fmt=png-alpha', 'Zapatillas Nike Air Jordan');

INSERT INTO productos (id, clienteId, nombreProd, imagenProd, descripcion)
VALUES
(default, 3, 'Nike SB', 'https://images.footlocker.com/is/image/EBFL2/N7175630_a1?wid=504&hei=504&fmt=png-alpha',  'Zapatillas Nike SB');

INSERT INTO productos (id, clienteId, nombreProd, imagenProd, descripcion)
VALUES
(default, 2, 'Nike Air Max Plus', 'https://images.footlocker.com/is/image/EBFL2/8480002_a1?wid=504&hei=504&fmt=png-alpha',  'Zapatillas Nike Air Max Plus');

INSERT INTO productos (id, clienteId, nombreProd, imagenProd, descripcion)
VALUES
(default, 4, 'Nike Air Max Plus Black', 'https://images.footlocker.com/is/image/EBFL2/04133050_a1?wid=504&hei=504&fmt=png-alpha',  'Zapatillas Nike SB');

INSERT INTO productos (id, clienteId, nombreProd, imagenProd, descripcion)
VALUES
(default, 1, 'Nike Air Max Plus Blue', 'https://images.footlocker.com/is/image/EBFL2/M0032402_a1?wid=504&hei=504&fmt=png-alpha',  'Zapatillas Nike SB');

INSERT INTO productos (id, clienteId, nombreProd, imagenProd, descripcion)
VALUES
(default, 1, 'Adidas Samba', 'https://images.footlocker.com/is/image/EBFL2/IG9030_a1?wid=504&hei=504&fmt=png-alpha',  'Zapatillas Adidas Samba');

INSERT INTO productos (id, clienteId, nombreProd, imagenProd, descripcion)
VALUES
(default, 3, 'Adidas Gazelle','https://images.footlocker.com/is/image/EBFL2/IF7161_a1?wid=504&hei=504&fmt=png-alpha',  'Zapatillas Adidas Gazelle');

INSERT INTO productos (id, clienteId, nombreProd, imagenProd, descripcion)
VALUES
(default, 5, 'On Running', 'https://images.footlocker.com/is/image/EBFL2/2698494_a1?wid=504&hei=504&fmt=png-alpha',  'Zapatillas On Running');

INSERT INTO productos (id, clienteId, nombreProd, imagenProd, descripcion)
VALUES
(default, 3, 'Nike Airforce 1', 'https://images.footlocker.com/is/image/EBFL2/W2288111_a1?wid=504&hei=504&fmt=png-alpha',  'Zapatillas Nike Airforce One');

INSERT INTO productos (id, clienteId, nombreProd, imagenProd, descripcion)
VALUES
(default, 1, 'Puma Palermo', 'https://images.footlocker.com/is/image/EBFL2/39764703_a1?wid=504&hei=504&fmt=png-alpha',  'Zapatillas Puma Palermo');



insert into comentarios (id, productoId, clienteId, comentario)
values (default, 1, 5, '¡Estas zapatillas son increíbles!');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 1, 1, 'Me encanta el diseño de estas zapatillas');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 1, 3, 'Espectaculares zapatillas!');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 2, 5, 'No me gustó mucho su diseño');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 2, 1, 'Maravillosas y comodas');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 2, 3, 'A pesar del precio y su diseño antiguo, muy buenas!');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 3, 5, '¡Estas zapatillas son increíbles!');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 3, 1, 'Me encanta el diseño de estas zapatillas');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 3, 3, 'Espectaculares zapatillas!');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 4, 5, 'Bonito diseño');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 4, 1, 'Buena calidad');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 4, 3, 'Estas zapatillas son muy cómodas');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 5, 5, 'Me encanta el color');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 5, 1, 'Zapatillas muy versátiles');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 5, 3, 'Muy cómodas');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 6, 5, 'Excelente calidad');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 6, 1, 'Estas zapatillas son perfectas para mí');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 6, 3, 'Estas zapatillas son clásicas');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 7, 5, 'Me gustaría tenerlas en todos los colores');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 7, 1, 'Son muy cómodas');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 7, 3, 'Buenas zapatillas para correr');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 8, 5, 'Excelente amortiguación');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 8, 1, 'Me encanta el diseño');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 8, 3, 'Estas zapatillas son muy versátiles');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 9, 5, 'Perfectas para cualquier ocasión');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 9, 1, 'Las recomiendo');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 9, 3, 'Muy cómodas');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 10, 5, 'Buen diseño');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 10, 1, 'Excelente calidad');

insert into comentarios (id, productoId, clienteId, comentario)
values (default, 10, 3, 'me fascinaron');
