UPDATE to_do_list_item
SET
    item_name = $2,
    is_done = $3
WHERE to_do_list_item_id = $1
RETURNING *;