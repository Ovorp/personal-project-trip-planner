UPDATE users
SET
users_first_name = $2,
users_last_name = $3,
phone_number = $4,
users_email = $5
WHERE users_id = $1