import { useState } from 'react';

import axios from 'axios';

function Body() {
  const [inputsValue, setInputsValue] = useState({
    name: '',
    id: 0,
  });
  const [dataValue, setDataValue] = useState('');
  const [errorValue, setErrorValue] = useState('');

  const requisitionAxios = async (
    url: string,
    method: string,
  ) => {
    if (method === 'POST') {
      try {
        const response = await axios.post(url, {
          nome: inputsValue.name,
        });
        setDataValue(response.data);
        console.log(response.data);
      } catch (error: any) {
        setErrorValue(error.response.data);
        console.error(errorValue);
      }
    } else {
      try {
        const response = await axios.get(url);
        setDataValue(response.data);
        console.log(response.data);
      } catch (error: any) {
        setErrorValue(error.response.data);
        console.error(errorValue);
      }
    }
  };

  const handleButtonClick = async (event: any) => {
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
      <section>
        <h2>Iniciar Processo</h2>
        <button
          onClick={ handleButtonClick }
          name="start"
        >
          Iniciar Processo
        </button>
        <input
          type="text"
          onChange={ handleInputChange }
          name="name"
        />
      </section>
      <section>
        <h2>Ações</h2>
        <input
          type="number"
          onChange={ handleInputChange }
          name="id"
        />
        <button
          onClick={ handleButtonClick }
          name="schedule"
        >
          Marcar Entrevista
        </button>
        <button
          onClick={ handleButtonClick }
          name="disqualify"
        >
          Desqualificar Candidato
        </button>
        <button
          onClick={ handleButtonClick }
          name="approve"
        >
          Aprovar Candidato
        </button>
      </section>
      <section>
        <h2>Dados</h2>
        <input
          type="number"
          onChange={ handleInputChange }
          name="id"
        />
        <button
          onClick={ handleButtonClick }
          name="status/candidate"
        >
          Verificar Status
        </button>
        <button
          onClick={ handleButtonClick }
          name="approved"
        >
          Ver Aprovados
        </button>
      </section>
      <section>
        <h2>Resposta</h2>
        <p>{ dataValue }</p>
        { errorValue && <p>{ errorValue }</p>}
      </section>
    </div>
  );
}

export default Body;
