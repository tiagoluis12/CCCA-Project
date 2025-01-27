drop schema if exists ccca cascade;


create schema ccca;


create table ccca.account (
  account_id uuid primary key, name text not null,
  email text not null,
  id text not null,
  car_plate text null,
  is_passenger boolean not nulldefault false,
  is_driver boolean not null default false,
  password text not null
  
);

