UPDATE trip
SET trip_name = $2
WHERE trip_id = $1
RETURNING *;