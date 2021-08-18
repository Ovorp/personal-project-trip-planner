INSERT INTO people
(first_name, last_name, email, phone_number)
VALUES
($1, $2, $3, $4)
RETURNING *;