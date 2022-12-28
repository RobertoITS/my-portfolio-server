create database robertodb

create table works (
	id int(5) primary key not null auto_increment,
    title varchar(50) not null,
    descrip varchar(200) not null,
    url varchar(200) not null,
	img_id varchar(200) not null
)

create table teammates (
	id int(5) primary key not null auto_increment,
    link varchar(200) not null,
    facebook varchar(200) not null,
    twitter varchar(200) not null,
    instagram varchar(200) not null,
    linkedin varchar(200) not null,
    github varchar(200) not null,
    name varchar(50) not null,
    profession varchar(50) not null,
    locate varchar(50) not null,
	img_id varchar(200) not null,
    last_name varchar(50) not null
)

create table message (
	id int(5) primary key not null auto_increment,
    name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(50) not null,
    message varchar(200) not null,
    date datetime not null
)


/* Insert statements */
insert into teammates(
    link, 
    facebook, 
    twitter, 
    instagram, 
    linkedin, 
    github, 
    name, 
    profession, 
    locate, 
    img_id) 
    value(
        'null', 
        'https://www.facebook.com/matias.orellana.75436', 
        'null', 
        'null', 
        'null', 
        'https://github.com/unknowncode44', 
        'Matías', 
        'Frontend developer', 
        'Gral. Roca', 
        ''
        )