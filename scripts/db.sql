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