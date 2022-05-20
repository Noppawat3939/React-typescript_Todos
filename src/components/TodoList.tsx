import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../modal/Modal";
import "../styles/TodoList.css";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className="todoList">
      <div className="container">
        <Droppable droppableId="TodosList">
          {(provided, snapshot) => (
            <div
              className={`tasks active ${
                snapshot.isDraggingOver && " dragActive"
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h3>Active tasks</h3>
              {todos.map((todo, index) => (
                <SingleTodo
                  key={todo.id}
                  index={index}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="TodoRemove">
          {(provided, snapshot) => (
            <div
              className={`tasks complete ${
                snapshot.isDraggingOver && " dragComplete"
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h3>Complete tasks</h3>
              {completedTodos.map((todo, index) => (
                <SingleTodo
                  key={todo.id}
                  index={index}
                  todo={todo}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default TodoList;
