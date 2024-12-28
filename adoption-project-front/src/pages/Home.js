import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Home.css'
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const [animals, setAnimals] = useState([]);

    const {id} = useParams();

    useEffect(()=> {
        loadAnimals();
    }, []);

    const loadAnimals=async()=> {
        const result = await axios.get("http://localhost:8080/animals");
        setAnimals(result.data);
    }

    const deleteAnimal = async(id) => {
        await axios.delete(`http://localhost:8080/animals/${id}`)
        loadAnimals();
    }

  return (
    <div className='table-container'>
        <h1 className='title-home'>Our cats</h1>
        <table className="table">
            <div>
                {
                    animals.map((animal, index)=>(
                        <div className='animal-info'>
                            <h2 className='animal-name'>{animal.name}</h2>
                                {animal.imageUrl ? (
                                    <Link to={`/viewanimal/${animal.id}`}>
                                        <img
                                            src={animal.imageUrl} 
                                            alt={animal.name} 
                                            
                                            className='animal-image'
                                        />
                                    </Link>
                                ) : (
                                    "Sem imagem"
                                )}

                            <div className='options'>
                                <Link className="btn" to={`/viewanimal/${animal.id}`}>More</Link>
                                <Link className="btn" to={`/editanimal/${animal.id}`}>Edit</Link>
                                <button className="btn" onClick={()=> deleteAnimal(animal.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </table>
    </div>
  )
}
