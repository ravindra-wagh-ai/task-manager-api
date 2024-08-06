-- Database: taskdb
CREATE DATABASE taskdb;

-- Table: public.users
-- DROP TABLE IF EXISTS public.users;
CREATE TABLE IF NOT EXISTS public.users
(
    id bigserial PRIMARY KEY,
    first_name character varying(50) NOT NULL,
    last_name character varying(100) NOT NULL,
    type character varying(10) NOT NULL ,
    email character varying(255) NOT NULL,
    password character varying(100) NOT NULL,
    status character varying(25) NOT NULL DEFAULT 'ACTIVE'::character varying,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp without time zone
);

COMMENT ON COLUMN public.users.type
    IS 'ADMIN, USER';

-- Table: public.tasks
-- DROP TABLE IF EXISTS public.tasks;

CREATE TABLE tasks
(
	id bigserial PRIMARY KEY,
	userid bigint references users(id),
	title varchar(100) NOT NULL,
	description text,
	deadline date NOT NULL,
	startedat date,
	completedat date,
	status varchar(10) NOT NULL DEFAULT 'OPEN'
);

COMMENT ON COLUMN public.tasks.status
    IS 'OPEN, IN-PROGRESS, DONE';

-- Table: public.auditlogs
-- DROP TABLE IF EXISTS public.auditlogs;

CREATE TABLE IF NOT EXISTS public.auditlogs
(
    id character varying(8) NOT NULL,
    originator_type character varying(10),
    originator bigint,
    source character varying(10) NOT NULL,
    url text,
    referer text,
    type character varying(15),
    method text,
    device text,
    browser text,
    brand text,
    ip character varying(30),
    starttime timestamp without time zone,
    endtime timestamp without time zone,
    createdat timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status character varying(15) NOT NULL DEFAULT 'NONE'::character varying,
    duration numeric GENERATED ALWAYS AS (EXTRACT(epoch FROM (endtime - starttime))) STORED,
    comment text,
    CONSTRAINT auditlogs_pkey PRIMARY KEY (id),
    CONSTRAINT auditlogs_originator_fkey FOREIGN KEY (originator)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)