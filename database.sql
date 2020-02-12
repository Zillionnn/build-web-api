CREATE TABLE public.t_app
(
    id serial,
    layout text,
    top_bg_color text,
    logo text,
    side_bg_color text,
       show_app_name BOOLEAN,
         app_name text,
         side_text_color text,
          side_text_active_color text,
          app_name_color text,
    name text COLLATE pg_catalog."default",
    page_ids text[] COLLATE pg_catalog."default",
    update_time timestamp with time zone DEFAULT now(),
    menu_ids text[] COLLATE pg_catalog."default",
    CONSTRAINT t_app_pkey PRIMARY KEY (id)
);

CREATE TABLE public.t_page
(
    id serial,
    page_id serial,
    components text[] COLLATE pg_catalog."default",
    update_time timestamp with time zone DEFAULT now(),
    name text COLLATE pg_catalog."default",
    CONSTRAINT t_page_pkey PRIMARY KEY (id)
);

CREATE TABLE public.t_menu
(
    id serial,
    app_id INTEGER,
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