import React, { useRef } from "react";
import "../styles/InputField.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }: Props) => {
  const inputref = useRef<HTMLInputElement>(null);

  return (
    <form className="formInput" onSubmit={(e) => handleAdd(e)}>
      <div>
        <input
          ref={inputref}
          type="input"
          placeholder="add your todos"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit">Add task</button>
      </div>
    </form>
  );
};

export default InputField;
