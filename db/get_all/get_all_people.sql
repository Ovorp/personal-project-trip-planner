SELECT p.people_id, p.first_name, p.last_name, p.email, p.phone_number, pl.trip_id FROM people_list AS pl
JOIN people AS p ON pl.people_id = p.people_id
WHERE pl.trip_id = $1;