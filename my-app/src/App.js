import React, { useState } from 'react';
import './App.css';
import './style.css';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completion_date, setCompletionDate] = useState('');
  const [priority, setPriority] = useState('');

  const setTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const setDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const setCompletionDateChange = (e) => {
    setCompletionDate(e.target.value);
  }

  const setPriorityChange = (e) => {
    setPriority(e.target.value);
  }


  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async () => {
    let full = await fetch('http://127.0.0.1:5000/criar_tarefa', {
      method : "POST",
      headers:{
        "Content-Type": "application/json"
    },
    body:JSON.stringify ({
      "title":title,
      "description": description,
      "completion_date": completion_date,
      "priority": priority
    })
  })

  if (full.ok){
    return alert("ok")
  } else {
    return alert("erro")
  }

  
   
  };

  if (formSubmitted) {
    return (
      <div className="App">
        <h1>Formulário Enviado com Sucesso!</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>TAREFAS</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" style={{ width: 10 }}>Título</label> <br/>
          <input type="text" id="title" name="title" placeholder="title" value={title} onChange={setTitleChange} required/>
        </div><br/>
        <div className="form-group">
          <label htmlFor="description" style={{ width: 10 }}>Descrição</label><br/>
          <input type="text" id="description" name="description" placeholder="description" value={description} onChange={setDescriptionChange} required />
        </div><br/>
        <div className="form-group">
          <label htmlFor="completion_date" style={{ width: 10 }}>Data</label><br/>
          <input type="text" id="completion_date" name="completion_date" placeholder="AAAA/MM/DD" pattern="\d{4}/\d{2}/\d{2}" title="Por favor, insira uma data válida no formato DD/MM/AAAA" value={completion_date} onChange={setCompletionDateChange} required />
        </div><br />
        <div className="form-group">
          <label htmlFor="priority" style={{ width: 10 }}>Prioridade</label><br/>
          <input type="text" id="priority" name="priority" placeholder="priority" value={priority} onChange={setPriorityChange} required />
        </div><br />
      </form>
      <button type="submit" className="submit" onClick={handleSubmit}>Enviar</button>
    </div>
  );
}

export default App;