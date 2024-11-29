import { useState } from 'react';

export default function App() {

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<string[]>([])
  const [editTask, setEditTask] = useState({
    enabled: false,
    task: ''
   });

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

  return (
    <div>
      <h1>Lista de tarefas</h1>
      <input type="text" placeholder="Digite o nome da tarefa" value={input} onChange={ (e) => setInput(e.target.value) } />
      <button onClick={handleRegister}>{editTask.enabled ? "Atualizar tarefa" : "Adicionar tarefa"}</button>
      <hr />

    {tasks.map( (item, index) => (
      <section key={index}>
        <span>{item}</span>
        <button onClick={() => handleEdit(item)}>Editar</button>
        <button onClick={() => handleDelete(item)}>Excluir</button>
      </section>
    ) )}

    </div>
  )
}