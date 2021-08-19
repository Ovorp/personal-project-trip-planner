SELECT phone_number, users_email, users_first_name, users_last_name, users_id FROM users
WHERE users_id = $1;