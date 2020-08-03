CREATE TABLE public.t_app
(
    id integer NOT NULL DEFAULT nextval('t_app_id_seq'::regclass),
    name text COLLATE pg_catalog."default",
    page_ids text[] COLLATE pg_catalog."default",
    update_time timestamp with time zone DEFAULT now(),
    menu_ids text[] COLLATE pg_catalog."default",
    CONSTRAINT t_app_pkey PRIMARY KEY (id)
);

CREATE TABLE public.t_page
(
    id integer NOT NULL DEFAULT nextval('t_page_id_seq'::regclass),
    page_id integer NOT NULL DEFAULT nextval('t_page_page_id_seq'::regclass),
    components text[] COLLATE pg_catalog."default",
    update_time timestamp with time zone DEFAULT now(),
    name text COLLATE pg_catalog."default",
    CONSTRAINT t_page_pkey PRIMARY KEY (id)
);

CREATE TABLE public.t_menu
(
    id integer NOT NULL DEFAULT nextval('t_menu_id_seq'::regclass),
    menu_id integer NOT NULL DEFAULT nextval('t_menu_menu_id_seq'::regclass),
    name text COLLATE pg_catalog."default",
    link text ,
    CONSTRAINT t_menu_pkey PRIMARY KEY (id)
);

create table t_page_menu(
	id serial,
	page_id text,
	menu_id text,
	primary key (id)
);