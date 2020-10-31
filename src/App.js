import "./App.css";
import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";

import Todo from "./component/Todo";
import { todosRef } from "./firebase/firebase-config";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //when the app loads, we need to listen the database and
  //fetch new totdos as they get added/removed
  useEffect(() => {
    // this code here... fires when the app.js loads
    todosRef.on("value", (snap) => {
      let data = [];
      snap.forEach((s) => {
        data.push(s.val());
      });
      setTodos(data);
    });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (todos.length === 0) {
      todosRef.push().set({
        id: 1,
        input,
        isComplete: false,
      });
    } else {
      const currentMaxIdTodo = todos.reduce((prev, current) => {
        return prev.id > current.id ? prev : current;
      });
      const id = currentMaxIdTodo.id + 1 + Math.floor(Math.random() * 100);
      todosRef.push().set({
        id,
        input,
        isComplete: false,
      });
    }

    setInput("");
  };

  const deleteTodo = (e) => {
    const id = parseInt(e.target.id);
    todosRef
      .orderByChild("id")
      .equalTo(id)
      .once("value", (snap) => {
        const updates = {};
        snap.forEach((s) => (updates[s.key] = null));
        todosRef.update(updates);
      });
  };

  const checkHandler = (e) => {
    const id = parseInt(e.target.id);
    todosRef
      .orderByChild("id")
      .equalTo(id)
      .once("value", (snap) => {
        const updates = {};
        snap.forEach((s) => {
          const isFalse = s.val().isComplete;
          updates[s.key] = { ...s.val(), isComplete: !isFalse };
          console.log((updates[s.key] = { ...s.val(), isComplete: !isFalse }));
        });
        todosRef.update(updates);
      });
  };

  const tasks = todos.sort((a, b) => {
    return b.id - a.id;
  });

  return (
    <div className="App">
      <h1>Firebase & React Todo list</h1>
      <form>
        <FormControl>
          <InputLabel>Write what to do</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
      </form>

      <div className="todo_lists">
        {tasks.map((task) => (
          <Todo
            deleteTodo={deleteTodo}
            checkHandler={checkHandler}
            task={task}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
