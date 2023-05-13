-- migrate:up
CREATE TABLE user_account (
	usr_act_id int8 NOT NULL DEFAULT nextval('seq_wordle_user_wus_id'::regclass),
	usr_act_name varchar(20) NOT NULL,
	usr_act_password varchar(150) NOT NULL,
	usr_act_creation_date timestamp NOT NULL DEFAULT now(),
	usr_act_update_date timestamp NOT NULL DEFAULT now(),
	usr_act_delete_date timestamp NULL,
	CONSTRAINT pk_usr_act_id PRIMARY KEY (usr_act_id),
	CONSTRAINT user_unique UNIQUE (usr_act_name)
);
COMMENT ON COLUMN "user_account"."usr_act_id" IS 'This column represent the id of the entity. It composes the primary key of the table.';
CREATE INDEX usr_act_name_idx ON user_account USING btree (usr_act_name);
CREATE INDEX usr_act_delete_date_idx ON user_account USING btree (usr_act_delete_date);

-- migrate:down
ALTER TABLE "user_account" DROP CONSTRAINT "pk_usr_act_id";
DROP INDEX "usr_act_name_idx";
DROP INDEX "usr_act_delete_date_idx";
DROP TABLE "user_account";
