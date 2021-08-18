UPDATE people
SET
    first_name = $2,
    last_name = $3,
    email = $4,
    phone_number = $5
WHERE people_id = $1
RETURNING *;