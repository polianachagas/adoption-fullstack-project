import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Home.css'

export default function Home() {

    const [animals, setAnimals] = useState([]);

    useEffect(()=> {
        loadAnimals();
    }, []);

    const loadAnimals=async()=> {
        const result = await axios.get("http://localhost:8080/animals");
        setAnimals(result.data);
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
                            <button className="btn">View</button>
                            <button className="btn">Edit</button>
                            <button className="btn">Delete</button>
                            </td>
                        </tr>
                    ))
                }

            </tbody>
        </table>
    </div>
  )
}
