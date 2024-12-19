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
            <thead className='info-header'>
                <tr className='headers'>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Photo</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody className='info-body'>
                {
                    animals.map((animal, index)=>(
                        <tr key={index}>
                            <th scope='row' key={index}>{index+1}</th>
                            <td>{animal.name}</td>
                            <td>{animal.age}</td>
                            <td>
                                {animal.imageUrl ? (
                                    <img 
                                        src={animal.imageUrl} 
                                        alt={animal.name} 
                                        
                                        className='animal-image'
                                    />
                                ) : (
                                    "Sem imagem"
                                )}
                            </td>

                            <td>
                            <Link className="btn" to={`/viewanimal/${animal.id}`}>View</Link>
                            <Link className="btn" to={`/editanimal/${animal.id}`}>Edit</Link>
                            <button className="btn" onClick={()=> deleteAnimal(animal.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }

            </tbody>
        </table>
    </div>
  )
}
