import React, { useContext, useState, useEffect } from "react";
import { Button, Input } from "antd";
import { TodoContext } from "../context/TodoContextProvider";
import { deleteTodo, updateTodo, setTodos } from "../context/todo.actions";
import { firebaseApi } from "../services/firebaseApi"

const TodoTask = (props) => {
  const [inputValue, setInputValue] = useState(props.description);
  const [readMode, setReadMode] = useState(false);

  return (
    <div className="todo-task">
      {
        readMode ? (
          <Input
            value={inputValue}
            onChange={({ target: { value } }) => setInputValue(value)}
        placeholder="Add a TODO"
        size="large"
            className="todo-task__name"
            data-cy="todo-task__name"
          />
        ) : (
          <div className="todo-task__name" data-cy="todo-task__name">
              {inputValue}
          </div>
        )
      }
      <Button
        type="primary"
        shape="round"
        className="todo-task__button"
        data-cy="todo-task__button-update"
        onClick={() => {
          if (readMode) {
            props.update(props.id, inputValue);
            setReadMode(false);
          } else {
            setReadMode(true);
          }
        }}
      >
        Update
      </Button>
      <Button
        type="primary"
        shape="round"
        className="todo-task__button"
        data-cy="todo-task__button-delete"
        onClick={() => props.delete(props.id)}
        disabled={readMode}
      >
        Delete
      </Button>
    </div>
  );
};

export const TodoList = () => {
  const { state, dispatch } = useContext(TodoContext);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await firebaseApi.fetchTodos();
      dispatch(setTodos(todos));
    }

    fetchTodos();
  }, [dispatch]);

  const handleDeleteTodo = (id) => {
    firebaseApi.deleteTodo(id)
    dispatch(deleteTodo(id));
  };

  const handleUpdateTodo = (id, description) => {
    firebaseApi.updateTodo(id, description)
    dispatch(updateTodo(id, description));
  };

  return (
    <div className="todo-list" data-cy="todo-list">
      {Object.entries(state.todos).map(([id, todo]) => (
        <TodoTask
          key={id}
          description={todo.description}
          delete={handleDeleteTodo}
          update={ handleUpdateTodo }
          id={id}
        />
      ))}
    </div>
  );
};
