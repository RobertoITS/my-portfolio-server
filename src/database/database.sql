create table works (
	id int(5) primary key not null auto_increment,
    title varchar(50) not null,
    descrip varchar(100) not null,
    url varchar(100) not null,
	img_id varchar(50) not null
)

create table teammates (
	id int(5) primary key not null auto_increment,
    link varchar(50) not null,
    facebook varchar(50) not null,
    twitter varchar(50) not null,
    instagram varchar(50) not null,
    linkedin varchar(50) not null,
    github varchar(50) not null,
    name varchar(20) not null,
    profession varchar(20) not null,
    locate varchar(20) not null,
	img_id varchar(50) not null,
    last_name varchar(50) not null
)

create table message (
	id int(5) primary key not null auto_increment,
    name varchar(20) not null,
    last_name varchar(20) not null,
    email varchar(20) not null,
    message varchar(100) not null,
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