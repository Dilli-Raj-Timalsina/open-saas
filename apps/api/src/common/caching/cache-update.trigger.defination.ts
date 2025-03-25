/** 
 * here nofify_cache_update is a trigger function name defination which is still not called ,
 * It should be called using create trigger command .
 * Trigger function code defination is defined in between BEGIN and END 
 * RETURNS trigger AS $$:
   Specifies that this function returns a trigger, meaning it will be used as a trigger function.
* TG_TABLE_NAME is placeholder for table name which will be returned by trigger on table update .
 * 'cache_update' is a channel name which the trigger notificationn will be published 
 * $$ LANGUAGE plpgsql;:
This specifies the language used for the function, in this case, PL/pgSQL.

In this modified function, the pg_notify function sends a notification containing the operation type (update, insert, or delete) concatenated with the table name when a row is updated, inserted, or deleted. The TG_OP variable represents the operation type (INSERT, UPDATE, DELETE), and TG_TABLE_NAME represents the name of the table on which the trigger is fired.

The middle ',' in the modified function represents a delimiter that separates the operation type (TG_OP) from the table name (TG_TABLE_NAME) when concatenating them into a single string to be passed to the pg_notify function.




CREATE OR REPLACE FUNCTION notify_cache_update()
RETURNS trigger AS $$
BEGIN
  PERFORM pg_notify('cache_update', TG_OP || ',' || TG_TABLE_NAME);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
 
*/
