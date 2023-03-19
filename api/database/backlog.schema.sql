create table if not exists `users` (
    id int not null auto_increment primary key,
    user_name text not null,
    password text not null,
    full_name text not null,
    entity_code int not null,
    active tinyint not null default 1,
    date_created datetime not null default current_timestamp,
    date_updated datetime
);

create table if not exists `workloads` (
    id varchar(36) not null primary key,
    job_name text not null,
    work_priority varchar(2),
    progress varchar(50) not null,
    date_started datetime not null,
    date_completed datetime,
    pic int not null,
    note text,
    active tinyint default 1 not null,
    date_created datetime not null default current_timestamp,
    date_updated datetime
);

create table if not exists `work_details` (
    id int not null auto_increment primary key,
    work_load_id varchar(36) not null,
    content text,
    date_created datetime not null default current_timestamp,
    date_updated datetime
); 