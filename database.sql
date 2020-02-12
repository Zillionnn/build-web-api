CREATE TABLE public.t_app
(
    id serial,
    name text COLLATE pg_catalog."default",
    page_ids text[] COLLATE pg_catalog."default",
    update_time timestamp with time zone DEFAULT now(),
    menu_ids text[] COLLATE pg_catalog."default",
    CONSTRAINT t_app_pkey PRIMARY KEY (id)
);

CREATE TABLE public.t_page
(
    id serial,
    page_id integer,
    components text[] COLLATE pg_catalog."default",
    update_time timestamp with time zone DEFAULT now(),
    name text COLLATE pg_catalog."default",
    CONSTRAINT t_page_pkey PRIMARY KEY (id)
);

CREATE TABLE public.t_menu
(
    id serial,
    menu_id integer,
    name text COLLATE pg_catalog."default",
    CONSTRAINT t_menu_pkey PRIMARY KEY (id)
);

create table t_page_menu(
	id serial,
	page_id text,
	menu_id text,
	primary key (id)
);