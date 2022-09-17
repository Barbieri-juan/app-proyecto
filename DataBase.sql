create database LaNonna;

create table contacto(
idContacto int not null auto_increment primary key,
Nombre varchar(100),
Apellido varchar(100),
Correo varchar(100) not null,
Telefono int,
Mensaje text
);
select * from lanonna.contacto;
