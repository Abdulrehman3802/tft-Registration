---------------------------Sequence Creation--------------------------------------------------
CREATE SEQUENCE tft.std_id_sequence
    INCREMENT 1
    START 1
    MINVALUE 1;

ALTER SEQUENCE tft.std_id_sequence
    OWNER TO postgres;

-----------------------------Table Creatoin----------------------------------------------------

CREATE TABLE IF NOT EXISTS tft.students
(
    std_id integer NOT NULL DEFAULT nextval('tft.std_id_sequence'::regclass),
    name character varying(50) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default",
    phone character varying(50) COLLATE pg_catalog."default",
    currently_wroking boolean,
    graduation_year integer,
    is_active boolean,
    date_created timestamp with time zone,
    date_updated timestamp with time zone,
    CONSTRAINT students_pkey PRIMARY KEY (std_id)
)

TABLESPACE pg_default;

--------------------Constraints on Fields-------------------------------------------------------
ALTER TABLE IF EXISTS tft.students
    OWNER to postgres;

ALTER TABLE IF EXISTS tft.students
    ALTER COLUMN email SET NOT NULL;

ALTER TABLE IF EXISTS tft.students
    ALTER COLUMN currently_wroking SET NOT NULL;

ALTER TABLE IF EXISTS tft.students
    ALTER COLUMN graduation_year SET NOT NULL;

ALTER TABLE IF EXISTS tft.students
    ALTER COLUMN is_active SET DEFAULT true;
ALTER TABLE IF EXISTS tft.students
    ADD CONSTRAINT email_unique UNIQUE (email);

ALTER TABLE IF EXISTS tft.students
    ALTER COLUMN name SET NOT NULL;