--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    name character varying(255),
    phone character varying(255),
    role character varying(255),
    photo character varying(255) DEFAULT ''::character varying,
    createdat timestamp with time zone NOT NULL,
    updatedat timestamp with time zone NOT NULL,
    "eventId" integer
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.employees_id_seq OWNER TO postgres;

--
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    title character varying(255),
    description text,
    start character varying(255),
    "end" character varying(255),
    domain character varying(255),
    completion integer,
    profit double precision DEFAULT '0'::double precision NOT NULL,
    createdat timestamp with time zone NOT NULL,
    updatedat timestamp with time zone NOT NULL
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_id_seq OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    photo character varying(255) DEFAULT ''::character varying,
    hash character varying(255) NOT NULL,
    email character varying(255) DEFAULT ''::character varying,
    password character varying(255) NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    createdat timestamp with time zone NOT NULL,
    updatedat timestamp with time zone NOT NULL,
    templatecolor character varying(255) DEFAULT 'bg-gradient-info'::character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: employees id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id, name, phone, role, photo, createdat, updatedat, "eventId") FROM stdin;
19	name shut		role 1	Acceptable_photo_5.jpg1721771498773	2024-07-23 22:51:38.779+01	2024-07-23 22:53:51.074+01	24
17	employee 1	phone 1		3.jpg1721771342486	2024-07-23 22:49:02.502+01	2024-07-23 22:53:57.672+01	23
18	employee 2			source355x388_ar.jpg1721771458451	2024-07-23 22:50:58.458+01	2024-07-23 22:53:57.672+01	23
20	women	07 54 76 33 86	manager	passport+photo+specifications+iraq+ireland+poland+romania+zambia+greece+china+belarus+germany+usa - Copy (2).jpg1721771597042	2024-07-23 22:53:17.05+01	2024-07-23 22:53:57.672+01	23
21	bbb		qweqwe	1000_F_397196289_byWg5OgvIhwiPRgwT6CzwbZxV5CdxDBP.jpg1721771659065	2024-07-23 22:54:19.075+01	2024-07-23 22:57:06.808+01	22
22	444444444444	bb bb bb bb bb	dssss	passport+photo+specifications+iraq+ireland+poland+romania+zambia+greece+china+belarus+germany+usa - Copy.jpg1721771692482	2024-07-23 22:54:52.49+01	2024-07-23 22:57:06.808+01	22
23	new employee	phone number	new Role	1000_F_543523668_XyqVW0aYXpURowSqNNE4WhdvjO4IWDqR.jpg1721771786257	2024-07-23 22:56:26.268+01	2024-10-17 23:44:11.304+01	21
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, title, description, start, "end", domain, completion, profit, createdat, updatedat) FROM stdin;
13	rrrrrrr		2024-08-12	2024-08-12	blue	0	20	2024-07-12 11:37:15.339+01	2024-07-12 11:37:15.339+01
22	Déjeuner scolaire		2024-10-08	2024-10-08	green	90	200	2024-07-12 13:20:32.912+01	2024-10-17 23:41:48.753+01
23	Mariage		2024-10-10T23:00:00.000Z	2024-10-10T23:00:00.000Z	green	20	700	2024-07-12 13:20:49.824+01	2024-10-17 23:42:07.649+01
17	green 2		2024-08-12	2024-08-12	green	0	10	2024-07-12 12:25:45.147+01	2024-07-12 12:25:45.147+01
14	zzzzzz		2024-09-12	2024-09-12	blue	0	50	2024-07-12 11:46:38.456+01	2024-07-12 13:22:44.905+01
24	Après mariage		2024-10-13	2024-10-13	blue	60	480	2024-07-12 23:10:08.54+01	2024-10-18 00:02:22.758+01
19	9 green 9		2024-09-12	2024-10-12	green	0	50	2024-07-12 12:42:40.286+01	2024-07-12 12:42:40.286+01
21	Sushi oulfa		2024-10-17	2024-10-17	orange	100	300	2024-07-12 13:20:22.627+01	2024-10-18 00:03:46.628+01
20	fdg		2024-05-09	2024-05-09	orange	0	300	2024-07-12 13:20:04.618+01	2024-10-18 00:05:19.853+01
26	Réunion		2024-10-01	2024-10-01	gray	0	0	2024-10-17 23:03:30.389+01	2024-10-18 00:11:27.317+01
12	eeeeeeee		2024-08-12	2024-08-12	gray	0	200	2024-07-12 11:36:14.178+01	2024-10-18 00:11:53.532+01
18	zzzzzz		2024-05-31T23:00:00.000Z	2024-05-31T23:00:00.000Z	green	0	60	2024-07-12 12:32:49.057+01	2024-07-13 17:06:38.006+01
15	werwr		2024-07-09T23:00:00.000Z	2024-07-09T23:00:00.000Z	blue	0	70	2024-07-12 11:51:59.853+01	2024-07-23 16:07:04.281+01
16	green		2024-07-07T23:00:00.000Z	2024-07-07T23:00:00.000Z	green	0	50	2024-07-12 12:24:44.557+01	2024-07-23 17:16:32.884+01
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, photo, hash, email, password, firstname, lastname, createdat, updatedat, templatecolor) FROM stdin;
9	zzzzzzzzz	profile.jpg	$2b$10$GSaP6spDMBU8pp1568nVMuAv9.NEAcq6QA7D.Ew6kjuVOSTdJ6vsu		eeeee	\N	\N	2024-10-19 01:48:47.422+01	2024-10-19 01:48:47.422+01	bg-gradient-info
10	fwefwfwefe	profile.jpg	$2b$10$CsbHnez3VuupwMvkgP6Zjea4cX2CM.I3WAfFu1Lpo3Dx.MjZNUPae		aaaaa	\N	\N	2024-10-19 01:53:59.564+01	2024-10-19 01:53:59.564+01	bg-gradient-info
7	bonson	1000_F_397196289_byWg5OgvIhwiPRgwT6CzwbZxV5CdxDBP.jpg1729292221301	$2b$10$zXMZmFZLcji4qMP9vnvU5OZBbmcN7OZUbTv/6gUtSBMBueIcWnGTG	bonson	fatima	bonson	bonson	2024-10-18 23:48:49.242+01	2024-10-18 23:57:17.783+01	bg-gradient-danger
5	fatima22	Acceptable_photo_4.jpg1729290077131	$2b$10$bDlZyJO4sKPpRbQ41bpNDOUeEP2g7i6bUUb1DNkSsGgSCPem4VDb.	email22	aaaaa	fatima22 prenom	jendar22	2024-07-24 13:15:39.851+01	2024-10-19 01:21:54.971+01	bg-gradient-success
8	eeeee	1000_F_99771374_7SsOAbJfE4chxvJ3spOg5MEOIXdij1Mg.jpg1729297954238	$2b$10$q860i8FS71cIMFhNAYJFPOElg6TuLXtYzUFLHVtD6RXEAnaUxveAO	eeeee	rrrrr	eeeee	eeeee	2024-10-19 01:22:30.14+01	2024-10-19 01:32:39.998+01	bg-gradient-success
6	123123	oh crap meme face.jpg1729288608950	$2b$10$AMIuyTF/ejyUFNwkv2lEBeFINOrgzQab1BTmwor8kPVvsodaHhHde	rrrrrrrrrrrrrrrrrr	123123	00000000000000	0000000000000	2024-10-18 22:37:32.984+01	2024-10-18 22:56:49.067+01	bg-gradient-danger
\.


--
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_id_seq', 35, true);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 26, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: employees employees_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "employees_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public.events(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

