// useEffect é usado para carregar a lista de repositórios
import React, { useEffect, useState }  from "react";
import api from './services/api';

import "./styles.css";

function App() {

  // Local para salvar os repositórios
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    // Chamada à api
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);
  
  async function handleAddRepository() {
    // TAdição de um novo repositório
    const response = await api.post('repositories', {
      title: 'desafio1',
      url: 'https://github.com/ftaguchi/desafio1.git',
      techs: ['Node.js']
    })
    //
    setRepositories([ ... repositories, response.data ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete (`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id != id
    ))
  }

  // Exibição de respositórios em tela
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}> Remover </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
