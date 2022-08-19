import '../styles/App.scss';
import localStorage from '../services/localStorage';
import phrases from '../api/data.json';
import { useState } from 'react';


function App() {

  const [data, setData] = useState(phrases);
  const [userQuote, setUserQuote] = useState({
    quote: '',
    character: '',
  });
  const [search, setSearch] = useState(localStorage.get('selection') || '');
  // const [pj, setPj] = useState('');

  const drawHtml = data

    .filter((phrase) => {
      return phrase.quote.toLowerCase().includes(search.toLowerCase())

    })

    .map((phrases, index) => {
      return (
        <li className='phrase-li' key={index}><p className='phrase-quote'>{phrases.quote}</p><span className='phrase-pj'>{phrases.character}</span></li>
      )
    })
  const hanleClick = (ev) => {
    ev.preventDefault();
    setData([...data, userQuote])
    localStorage.set('quote', 'character')
    setUserQuote({
      quote: '',
      character: '',
    })

  }
  const handleNewQuote = (ev) => {
    setUserQuote({
      ...userQuote,
      [ev.target.id]: ev.target.value
    })
  }
  const handleSearch = (ev) => {
    localStorage.set('selection', ev.target.value);
    setSearch(ev.target.value)

  }

  // funcion filtrar por pj - revisar planteamiento
  // const handlePj = (ev) => {
  // if (ev.currentTarget.value === phrases.character) {
  //  return drawHtml
  //}

  //};

  return (
    <div className='page'>
      <header className='header'><h1 className='title' title='frases de friends'>frases de friends</h1></header>
      <main>
        <form>
          <label className='filter1'>filtrar por frase</label>
          <input type='search' className='search-text' value={search} onChange={handleSearch}></input>
          <label className='filter1'>filtrar por personaje</label>
          <select type='select' id='pj' >
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

        <h2>añadir una nueva frase</h2>
        <form>
          <label>frase</label>
          <input type='text' clasName='phrase-add' name='quote'
            id='quote' onChange={handleNewQuote} value={userQuote.quote}></input>
          <label>personaje</label>
          <input type='text' clasName='pj-add' name='character'
            id='character' onChange={handleNewQuote} value={userQuote.character}></input>
          <input className='button-add' type='submit' value='Añadir' onClick={hanleClick}></input>
        </form>
      </main>

    </div >
  );
}

export default App;