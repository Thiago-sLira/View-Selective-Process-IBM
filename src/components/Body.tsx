import { useState } from 'react';

function Body() {
  const [inputsValue, setInputsValue] = useState({
    name: '',
    id: 0,
  });
  // const [dataValue, setDataValue] = useState('');

  const handleButtonClick = (event: any) => {
    console.log(inputsValue);
    console.log(event.target.name);
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
    </div>
  );
}

export default Body;
