import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";

const Todo = ({ task, deleteTodo, checkHandler }) => {
  const { id, input, isComplete } = task;

  return (
    <List className="lists">
      <ListItem id="list__item">
        <ListItemText
          key={id}
          id="todo__list"
          className={isComplete ? "completed" : "incomplete"}
          primary={input}
        />
        <input
          id={id}
          checked={isComplete}
          className="check_box"
          type="checkbox"
          onClick={(e) => checkHandler(e)}
        />

        <button id={id} className="delete" onClick={(e) => deleteTodo(e)}>
          X
        </button>
      </ListItem>
    </List>
  );
};

export default Todo;
