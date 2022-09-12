import React, { useState, useEffect, useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../model";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

// ------------------ SingleTodo Component ------------------
const SingleTodo: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
  index,
}: Props) => {
  // ------------------ useStates ------------------ //
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  // ------------------ useRef ------------------ //
  const inputRef = useRef<HTMLInputElement>(null);

  // ------------------ useEffect ------------------ //
  useEffect(() => {
    inputRef?.current?.focus();
  }, [edit]);

  // ------------------ Functions ------------------ //
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
  };

  // ------------------ JSX ------------------ //
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form 
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`} 
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              type="text"
              value={editTodo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditTodo(e.target.value)
              }
              className="todos__single--text"
              ref={inputRef}
            />
          ) : (
            <>
              {todo.isDone ? (
                <s className="todos__single--text">{todo.todo}</s>
              ) : (
                <span className="todos__single--text">{todo.todo}</span>
              )}
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
      )}
    </Draggable>
  );
};

export default SingleTodo;
