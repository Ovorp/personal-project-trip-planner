import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import { loadDataToStore } from './../../../../duck/tripReducer';
import ToDoItems from './ToDoItems';

class ToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: '',
    };
  }

  addItem = async (tripId, itemName) => {
    await axios.post(`/api/todolist`, {
      tripId,
      itemName,
      isDone: false,
    });

    this.setState({
      userInput: '',
    });

    const userInfoForStore = await axios
      .get(`/api/all/${this.props.user.id}`)
      .catch((err) => console.log(err));

    this.props.loadDataToStore(userInfoForStore.data);
  };

  render() {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Enter to do list Item"
              onChange={(e) =>
                this.setState({
                  userInput: e.target.value,
                })
              }
              value={this.state.userInput}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              this.addItem(this.props.user.currentTripId, this.state.userInput);
            }}
          >
            Add item to list!!!
          </Button>
        </Form>
        <ToDoItems />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  loadDataToStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);

//Need to be able to view to do list
//Need to add to do list item
//need to complete to do list item
