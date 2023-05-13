-- migrate:up
CREATE SEQUENCE seq_wordle_user_wus_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- migrate:down
DROP SEQUENCE seq_wordle_user_wus_id;
