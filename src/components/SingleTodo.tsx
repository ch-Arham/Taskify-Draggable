import React, { useState, useEffect, useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../model";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [edit]);

  const handleDone = (id: number): void => {
    setTodos(
      todos.map((todo: Todo) =>
        id === todo.id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number): void => {
    setTodos(todos.filter((todo: Todo) => id !== todo.id));
  };

  const handleEdit = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(
      todos.map((todo: Todo) =>
        id === todo.id ? { ...todo, todo: editTodo } : todo
      )
    );
    setEdit(false);
  }

  return (
    <form 
        className="todos__single"
        onSubmit={e=> handleEdit(e, todo.id)}
    >
      {edit ? (
        <input 
            type="text"
            value={editTodo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditTodo(e.target.value)}
            className="todos__single--text"
            ref={inputRef}
        />
      ) : (
        <>
          {todo.isDone ? (<s className="todos__single--text">{todo.todo}</s>) : (
          <span className="todos__single--text">{todo.todo}</span>)}
        </>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
