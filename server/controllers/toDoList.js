async function getToDoListItem(req, res) {
  const { tripId } = req.params;
  const db = req.app.get('db');
  const result = await db.to_do_list.get_to_do_list_item(tripId);
  console.log(tripId);
  res.status(200).json(result);
}

function addToDoListItem(req, res) {
  const { tripId, itemName, isDone } = req.body;
  const db = req.app.get('db');
  db.to_do_list
    .add_to_do_list_item(tripId, itemName, isDone)
    .then(() => res.status(200).json('Item has been added to the to do list'))
    .catch((err) => console.log(err));
}

async function updateToDoListItem(req, res) {
  const { toDoListItemId, itemName, isDone } = req.body;
  const db = req.app.get('db');
  // const result = await db.to_do_list.get_to_do_list_item(toDoListItemId);
  // const oldItem = result[0];
  // I changed the db sql to go off of trip id need to write a new one if I want to use this
  // const newItem = {
  //   newItemName: itemName || oldItem.item_name,
  //   newIsDone: isDone || oldItem.is_done,
  // };
  const newItem = {
    newItemName: itemName,
    newIsDone: isDone,
  };

  const updatedItem = await db.to_do_list
    .update_to_do_list_item([
      toDoListItemId,
      newItem.newItemName,
      newItem.newIsDone,
    ])
    .catch((err) => console.log(err));

  res.status(200).json(updatedItem[0]);
}

function deleteToDoListItem(req, res) {
  const { toDoListItemId } = req.body;
  const db = req.app.get('db');

  db.to_do_list
    .delete_to_do_list_item(toDoListItemId)
    .then(() =>
      res.status(200).json('Item has been deleted from the to do list')
    )
    .catch((err) => console.log(err));
}

function resetToDo(req, res) {
  const db = req.app.get('db');
  db.to_do_list
    .reset_to_do_list()
    .then(() => res.status(200).json('To do has been reset'))
    .catch((err) => console.log(err));
}

module.exports = {
  addToDoListItem,
  updateToDoListItem,
  deleteToDoListItem,
  resetToDo,
  getToDoListItem,
};
