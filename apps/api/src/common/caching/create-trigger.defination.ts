/**
Explanation :

Trigger Name:

contact_us_update_trigger: This is the name of the trigger. It's a user-defined identifier that you can use to refer to the trigger in your database.
Trigger Type:

AFTER UPDATE ON contact_us: This specifies the trigger's type and when it should be executed.
AFTER UPDATE means the trigger will fire after an UPDATE operation is performed on the specified table.
ON contact_us specifies the table (contact_us) on which the trigger will be activated.
Trigger Timing:

FOR EACH ROW: This indicates that the trigger will be executed once for each row affected by the UPDATE operation on the contact_us table. This is common for row-level triggers, where the trigger logic is applied to individual rows.
Trigger Function:

EXECUTE FUNCTION notify_cache_update(): This specifies the function (notify_cache_update()) that will be executed when the trigger conditions are met.
When an UPDATE operation is performed on a row in the contact_us table, this trigger will execute the notify_cache_update() function.

 */

/**
CREATE TRIGGER historicaldaily_update_trigger
AFTER INSERT OR UPDATE OR DELETE ON historicaldaily
FOR EACH ROW
EXECUTE FUNCTION notify_cache_update();
 */
