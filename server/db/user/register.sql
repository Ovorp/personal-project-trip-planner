INSERT INTO users
(users_first_name, users_last_name, users_password, phone_number, users_email)
VALUES
($1, $2, $3, $4, $5)
returning *;