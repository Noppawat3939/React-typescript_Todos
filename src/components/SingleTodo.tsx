import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../modal/Modal";
import "../styles/SingleTodo.css";
import { BsTrash, BsCheckCircle, BsPen } from "react-icons/bs";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
};

const SingleTodo = ({ todos, todo, setTodos, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo?.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  useEffect(() => {
    inputRef.current?.select();
  }, [edit]);

  return (
    <Draggable draggableId={todo?.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, todo.id)}
          className={`formTodo ${snapshot.isDragging && "dragForm"}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className={` ${edit && "editInput"}`}
            />
          ) : todo.isDone ? (
            <span className={`${todo.isDone && "check"}`}>{todo.todo}</span>
          ) : (
            <span>{todo.todo}</span>
          )}
          <div className="buttons">
            <span onClick={() => handleDone(todo.id)}>
              <BsCheckCircle />
            </span>
            <span
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <BsPen />
            </span>
            <span onClick={() => handleDelete(todo.id)}>
              <BsTrash />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
