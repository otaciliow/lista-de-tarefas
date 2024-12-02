import { useState, useEffect, useRef, useMemo } from 'react';
import "./App.min.css";

import pencilIcon from './assets/pencil-square.svg';
import trashIcon from './assets/trash.svg';

export default function App() {

  const inputRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<string[]>([])
  const [editTask, setEditTask] = useState({
    enabled: false,
    task: ''
   });

   useEffect(() => {
    const savedTasks = localStorage.getItem("@app-lista");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
   }, [])

   useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem("@app-lista", JSON.stringify(tasks));
   }, [tasks]);

   function handleRegister() {
    if (!input) {
      alert('Você precisa digitar um nome para a tarefa!')
      return;
    }

    if (editTask.enabled) {
      handleSaveEdit();
      return;
    }

    setTasks(tarefas => [...tarefas, input]);
    setInput("");
   }

   function handleDelete(item: string) {
    const activeTasks = tasks.filter(task => task !== item);

    setTasks(activeTasks);
   }

   function handleEdit(item: string) {
     inputRef.current?.focus();

    setInput(item);
    setEditTask({
      enabled: true,
      task: item
    })

   }

   function handleSaveEdit() {
    const findIndexTask = tasks.findIndex(task => task === editTask.task);
    const allTasks = [...tasks];

    allTasks[findIndexTask] = input;
    setTasks(allTasks);
    
    setEditTask({
      enabled: false,
      task: ""
    });

    setInput("");
   }

  const totalTasks = useMemo(() => {
    return tasks.length;
  }, [tasks])

  return (
    <main>
      <h1 className="title">Lista de tarefas</h1>
      <div className="input-wrapper">
        <input type="text" placeholder="Digite o nome da tarefa" value={input} onChange={ (e) => setInput(e.target.value) } className="task-input" ref={inputRef} />
        <button onClick={handleRegister} className="task-add-button">{editTask.enabled ? "Atualizar tarefa" : "Adicionar tarefa"}</button>
      </div>

      <p><strong>Você tem {totalTasks} tarefas:</strong></p>

      <ul className="tasks-wrapper">
        {tasks.map( (item, index) => (
          <li key={index}>
            <span>{item}</span>
            <div className="buttons-wrapper">
              <button onClick={() => handleEdit(item)} title="Editar tarefa"><img src={pencilIcon} alt="icone de lápis" /></button>
              <button onClick={() => handleDelete(item)} title="Excluir tarefa"><img src={trashIcon} alt="icone de lixeira" /></button>
            </div>
          </li>
        ) )}
      </ul>

    </main>
  )
}