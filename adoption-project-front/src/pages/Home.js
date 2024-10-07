import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {

    const [animals, setAnimals] = useState([])

    useEffect(()=> {
        loadAnimals();
    }, []);

    const loadAnimals=async()=> {
        const result = await axios.get("http://localhost:8080/animals");
        setAnimals(result.data);
    }

  return (
    <table className="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Photo</th>
            </tr>
        </thead>
        <tbody>
            
            {
                animals.map((animal, index)=>(
                    <tr>
                        <th scope='row' key={index}>{index+1}</th>
                        <td>{animal.name}</td>
                        <td>{animal.age}</td>
                        <td>{animal.image}</td>

                        <td>
                        <button className="btn btn-primary mx-2">View</button>
                        <button className="btn btn-primary mx-2">Edit</button>
                        <button className="btn btn-primary mx-2">Delete</button>
                        </td>
                    </tr>
                ))
            }

        </tbody>
    </table>
  )
}
