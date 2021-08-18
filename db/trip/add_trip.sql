INSERT INTO trip
(users_id, trip_name)
VALUES
($1, $2)
RETURNING *;