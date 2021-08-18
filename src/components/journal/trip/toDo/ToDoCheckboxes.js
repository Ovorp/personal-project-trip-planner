import React, { useState, useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import { connect } from 'react-redux';
import axios from 'axios';
import { loadDataToStore } from './../../../../duck/tripReducer';

function ToDoCheckboxes(props) {
  const [check, setCheck] = useState(props.val.is_done);
  useEffect(() => {
    async function getInfo(userId) {
      const userInfoForStore = await axios
        .get(`/api/all/${userId}`)
        .catch((err) => console.log(err));

      props.loadDataToStore(userInfoForStore.data);
    }
    getInfo(props.user.id);
  }, [check]);

  async function updateIsDone(toDoListItemId, itemName, isDone) {
    await axios.put(`/api/todolist/`, {
      toDoListItemId,
      itemName: itemName,
      isDone,
    });
  }

  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Checkbox
          checked={check}
          onChange={() => {
            updateIsDone(
              props.val.to_do_list_item_id,
              props.val.item_name,
              !props.val.is_done
            );

            setCheck(!check);
          }}
        />
        <p key={props.val.to_do_list_item_id}>{props.val.item_name}</p>
      </InputGroup>
    </div>
  );
}

const mapDispatchToProps = {
  loadDataToStore,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoCheckboxes);
