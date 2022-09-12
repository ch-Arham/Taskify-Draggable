import React, { useState } from "react";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    } else {
      alert("Please enter a task");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if(source.droppableId === destination.droppableId && source.index === destination.index) return;

    let add, 
    active = todos,
    completed = completedTodos;

    // depending on the droppableId, we know will remove the item from the active or completed list
    if(source.droppableId === "ActiveTodosList") {
      add= active[source.index];
      active.splice(source.index, 1);
    } else {
      add= completed[source.index];
      completed.splice(source.index, 1);
    }

    // depending on the droppableId, we know will add the item to the active or completed list
    if(destination.droppableId === "ActiveTodosList") {
      active.splice(destination.index, 0, add);
    }else {
      completed.splice(destination.index, 0, add);
    }

    // update the state
    setTodos(active);
    setCompletedTodos(completed);

  }
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
