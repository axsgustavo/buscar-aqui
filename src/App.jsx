import styled from './styles.module.scss';

import { useState } from 'react';

import { BiSearch, BiCopyAlt } from 'react-icons/bi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import InputMask from "react-input-mask";
import axios from 'axios';
import CopyToClipboard from 'react-copy-to-clipboard';

function App() {
  const [data, setData] = useState();
  const [dataFormat, setDataFormat] = useState('');
  const [cep, setCep] = useState('');
  
  async function handleSubmit(event) {
    event.preventDefault();
    const value = cep.replace(/\D/g, '')

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
      setData(response.data);
      setDataFormat(`${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade}, ${response.data.uf}`)
    } catch(error) {
      console.log(error);
    }
  }

  function notifyCopy() {
    toast.info('Copiado com sucesso', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <header>
        <h1>Buscar <span>aqui.</span></h1>
      </header>
      <main className={styled.container}>
        <form className={styled.box} onSubmit={handleSubmit}>
          <h2>Faça a sua busca pelo CEP</h2>
          <div className={styled.boxInput}>
            <InputMask
              placeholder="00000-000"
              mask="99999-999"
              onChangeCapture={event => setCep(event.target.value)}
            />
            <button><BiSearch size={20} color="#fff" /></button>
          </div>

          {data && (
            <div className={styled.boxInformation}>
              <CopyToClipboard text={dataFormat}>
                <button onClick={notifyCopy}>
                  <BiCopyAlt size={20} />
                </button>
              </CopyToClipboard>
              <div className={styled.information}>
                <span>Bairro:</span>
                <p>{data.bairro}</p>
              </div>
              <div className={styled.information}>
                <span>Rua:</span>
                <p>{data.logradouro}</p>
              </div>
              <div className={styled.information}>
                <span>Local:</span>
                <p>{data.localidade}, {data.uf}</p>
              </div>
            </div>
          )}
        </form>
      </main>
    </>
  );
}

export default App
