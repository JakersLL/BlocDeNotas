import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Form from '../components/Form'
import ListGroup from '../components/ListGroup'
import './App.css';
import Notas from '../components/Notas';
import "bootstrap/dist/css/bootstrap.min.css";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Index() {

  const [notas, setNotas] = useState([])
  const [oldNota, setOldNota] = useState({})
  const [search, setSearch] = useState("")
  const getNotas = async () => {
    const response = await fetch('http://localhost:5000/api/notas')
    const result = await response.json()
    setNotas(result)
  }
  useEffect(() => {
    getNotas();

  }, [notas])

  const deleteNota = async (id) => {
    await fetch('http://localhost:5000/api/notas/' + id, {
      method: 'DELETE',
      mode: 'cors'
    })
  }
  const getNota = async (id) => {
    const nota = await fetch('http://localhost:5000/api/notas/' + id)
    const result = await nota.json()
    setOldNota(result)
  }
  const searcher = (e) =>{
    setSearch(e.target.value);
  }
  //metodo de filtrado-1
    
    let results = []
    if(!search)
    {
      results = notas
    }else{
      results = notas.filter( (dato) =>
        dato.title.toLowerCase().includes(search.toLowerCase())
        )
    }
    return (
    <div className='content-app'>
      <header className='content-app-title'>
        <h1>Notas</h1>
        <strong>{notas.length} Notas</strong>
      </header>
      <div className="App">
        <div className="containerInput">
          <input
            className="form-control inputBuscar"
            value={search}
            placeholder="Buscar notas por titulo"
          onChange={searcher}
          />
          <button className='btn btn-success'>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-12 col-md-4'>
          <Form oldNota={oldNota} />
        </div>
        <div className='col-sm-12 col-md-8'>
          <ListGroup>
            {results.map((nota, index) => (
              <Notas key={index} deleteNota={deleteNota} getNota={getNota} id={nota._id} title={nota.title} content={nota.content} />
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  )
}
