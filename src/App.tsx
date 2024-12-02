import { useState, useEffect } from 'react';
import "./App.css";

import pencilIcon from './assets/pencil-square.svg';
import trashIcon from './assets/trash.svg';

export default function App() {

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
    localStorage.setItem("@app-lista", JSON.stringify([...tasks, input]));
   }

   function handleDelete(item: string) {
    const activeTasks = tasks.filter(task => task !== item);

    setTasks(activeTasks);
    localStorage.setItem("@app-lista", JSON.stringify(activeTasks));
   }

   function handleEdit(item: string) {
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
    localStorage.setItem("@app-lista", JSON.stringify(allTasks));
   }

  return (
    <main>
      <h1 className="title">Lista de tarefas</h1>
      <div className="input-wrapper">
        <input type="text" placeholder="Digite o nome da tarefa" value={input} onChange={ (e) => setInput(e.target.value) } className="task-input" />
        <button onClick={handleRegister} className="task-add-button">{editTask.enabled ? "Atualizar tarefa" : "Adicionar tarefa"}</button>
      </div>

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