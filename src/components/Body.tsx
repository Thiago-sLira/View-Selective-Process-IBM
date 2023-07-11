import { useState } from 'react';

import axios from 'axios';

function Body() {
  const [inputsValue, setInputsValue] = useState({
    name: '',
    id: 0,
  });
  const [dataValue, setDataValue] = useState('');

  const requisitionAxios = async (
    url: string,
    method: string,
  ) => {
    if (method === 'POST') {
      try {
        const dataPost = url.includes('start') ? {
          nome: inputsValue.name,
        } : {
          codCandidato: Number(inputsValue.id),
        };
        const response = await axios.post(url, dataPost);
        setDataValue(response.data);
      } catch (error: any) {
        setDataValue(error.response.data);
      }
    } else {
      try {
        const response = await axios.get(url);
        setDataValue(response.data);
        console.log(response.data);
      } catch (error: any) {
        setDataValue(error.response.data);
      }
    }
  };

  const resetInputsValue = () => {
    setInputsValue({
      name: '',
      id: 0,
    });
  };

  const handleButtonClick = async (event: any) => {
    resetInputsValue();
    switch (event.target.name) {
      case 'start':
        requisitionAxios(
          'http://localhost:8080/api/v1/hiring/start',
          'POST',
        );
        break;
      case 'schedule':
        requisitionAxios(
          'http://localhost:8080/api/v1/hiring/schedule',
          'POST',
        );
        break;
      case 'disqualify':
        requisitionAxios(
          'http://localhost:8080/api/v1/hiring/disqualify',
          'POST',
        );
        break;
      case 'approve':
        requisitionAxios(
          'http://localhost:8080/api/v1/hiring/approve',
          'POST',
        );
        break;
      case 'status/candidate':
        requisitionAxios(
          `http://localhost:8080/api/v1/hiring/status/candidate/${inputsValue.id}`,
          'GET',
        );
        break;
      case 'approved':
        requisitionAxios(
          'http://localhost:8080/api/v1/hiring/approved',
          'GET',
        );
        break;
      default:
        break;
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setInputsValue({ ...inputsValue, [name]: value });
  };

  return (
    <div>
      <section className="initiate">
        <h2>Iniciar Processo</h2>
        <button
          onClick={ handleButtonClick }
          name="start"
          disabled={ inputsValue.name.length < 3 }
          className="button-start"
        >
          Iniciar Processo
        </button>
        <label htmlFor="input-name">
          <input
            id="input-name"
            type="text"
            onChange={ handleInputChange }
            name="name"
            minLength={ 3 }
            value={ inputsValue.name }
            placeholder="Nome do Candidato"
          />
        </label>
      </section>
      <section className="actions">
        <h2>Ações</h2>
        <button
          onClick={ handleButtonClick }
          name="schedule"
          className="button-schedule"
        >
          Marcar Entrevista
        </button>
        <button
          onClick={ handleButtonClick }
          name="disqualify"
          className="button-disqualify"
        >
          Desqualificar Candidato
        </button>
        <button
          onClick={ handleButtonClick }
          name="approve"
          className="button-approve"
        >
          Aprovar Candidato
        </button>
      </section>
      <section className="input-id-section">
        <label htmlFor="input-codCandidate">
          <input
            id="input-codCandidate"
            type="number"
            onChange={ handleInputChange }
            name="id"
            value={ inputsValue.id }
            min={ 0 }
          />
        </label>
      </section>
      <section className="data">
        <h2>Dados</h2>
        <button
          onClick={ handleButtonClick }
          name="status/candidate"
          disabled={ inputsValue.id < 0 }
          className="button-status"
        >
          Verificar Status
        </button>
        <button
          onClick={ handleButtonClick }
          name="approved"
          className="button-approved"
        >
          Ver Aprovados
        </button>
      </section>
      <section className="response">
        <h2>Resposta</h2>
        {Array.isArray(dataValue) ? (
          <ul>
            {dataValue.map((item, index) => (
              <li key={ index }>{item}</li>
            ))}
          </ul>
        ) : (
          <p>{dataValue}</p>
        )}
      </section>
    </div>
  );
}

export default Body;
