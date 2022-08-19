import '../styles/App.scss';
import localStorage from '../services/localStorage';
import phrases from '../api/data.json';
import { useState } from 'react';

function App() {

  const [data, setData] = useState(phrases);

  const drawHtml = data.map((phrases, index) => {
    return (
      <li className='phrase-li' key={index}><p className='phrase-quote'>{phrases.quote}</p><p className='phrase-pj'>{phrases.character}</p></li>
    )
  })
  return (
    <div className='page'>
      <header><h1>frases de friends</h1></header>
      <main>
        <form>
          <label className='filter1'>filtrar por frase</label>
          <input type='text'></input>
          <label className='filter1'>filtrar por personaje</label>
          <select type='select'>
            <option>Todos</option>
            <option>Ross</option>
            <option>Monica</option>
            <option>Joey</option>
            <option>Phoebe</option>
            <option>Chandler</option>
            <option>Rachel</option>
          </select>
        </form>
        <ul>{drawHtml}</ul>
      </main>

    </div>
  );
}

export default App;