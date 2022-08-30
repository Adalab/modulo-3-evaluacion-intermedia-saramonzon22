import '../styles/App.scss';
import localStorage from '../services/localStorage';
import { useEffect, useState } from 'react';
import getDataApi from '../api/fetch';


function App() {

  useEffect(() => {
    getDataApi().then((data) => {
      setData(data);
    })
  }, []);


  const [data, setData] = useState([]);
  const [userQuote, setUserQuote] = useState({
    quote: '',
    character: '',
  });
  const [search, setSearch] = useState(localStorage.get('selection') || '');
  const [pjSelect, setPjSelect] = useState('all');

  const drawHtml = data

    .filter((phrase) => {
      return phrase.quote.toLowerCase().includes(search.toLowerCase())

    })
    .filter((phrase) => {
      if (pjSelect === 'all') {
        return true;
      }
      return phrase.character === pjSelect;
    })

    .map((phrases, index) => {
      return (
        <li className='phrase-li' key={index}><p className='phrase-quote'>{phrases.quote}</p>-<span className='phrase-pj'> {phrases.character}</span></li>
      )
    })
  const hanleClick = (ev) => {
    ev.preventDefault();
    setData([...data, userQuote])

    setUserQuote({
      quote: '',
      character: '',
    })
    setSearch('');
    setPjSelect('all');

  }
  const handleNewQuote = (ev) => {
    setUserQuote({
      ...userQuote,
      [ev.target.id]: ev.target.value
    })

  }
  const handleSearch = (ev) => {
    setSearch(ev.target.value)

  }


  const handleSearchSelect = (ev) => {
    setPjSelect(ev.target.value)
  }


  return (
    <div className='page'>
      <header className='header'><h1 className='title' title='frases de friends'>frases de friends</h1>
        <i class='fa-solid fa-tv fa-xl'></i></header>
      <main>
        <form className='form1'>
          <label className='filter1'>filtrar por frase</label>
          <input type='search' className='search-text' value={search} onChange={handleSearch}></input>
          <label className='filter1'>filtrar por personaje</label>
          <select type='select' id='pj' onChange={handleSearchSelect} value={pjSelect}>
            <option value='all'>Todos</option>
            <option value='Ross'>Ross</option>
            <option value='Monica'>Monica</option>
            <option value='Joey'>Joey</option>
            <option value='Phoebe'>Phoebe</option>
            <option value='Chandler'>Chandler</option>
            <option value='Rachel'>Rachel</option>
          </select>
        </form>
        <ul className='list'>{drawHtml}</ul>

        <h2 className='title2'>añadir una nueva frase</h2>
        <form className='form2'>
          <label>frase</label>
          <input type='text' className='phrase-add' name='quote'
            id='quote' onChange={handleNewQuote} value={userQuote.quote}></input>
          <label>personaje</label>
          <input type='text' className='pj-add' name='character'
            id='character' onChange={handleNewQuote} value={userQuote.character}></input>
          <input className='button-add' type='submit' value='Añadir' onClick={hanleClick}></input>
        </form>
      </main>

    </div >
  );
}

export default App;