UPDATE people_list
SET
  trip_id = $3
WHERE trip_id = $1 AND people_id = $2
RETURING *;
