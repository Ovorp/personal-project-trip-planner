SELECT t.trip_id, t.trip_name FROM users AS u
JOIN trip AS t ON u.users_id = t.users_id
WHERE u.users_id = $1;