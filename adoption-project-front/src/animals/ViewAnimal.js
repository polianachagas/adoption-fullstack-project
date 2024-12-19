import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/ViewAnimal.css'

export default function ViewAnimal() {
    const [animal, setAnimal] = useState({
        name:"",
        age: "",
        imageUrl: ""
    })

    const {id} = useParams();

    useEffect(() => {
        loadAnimals();
    }, []);

    const loadAnimals = async () => {
        const result = await axios.get(`http://localhost:8080/animals/${id}`, animal);
        setAnimal(result.data);
    }

    return (
        <div className="container">
            <div className="info-table">
                
                    <h1>{animal.name}</h1>

                    <div className='info'>
                        <ul>
                            <li>
                            <strong>Age:</strong> {animal.age}
                            </li>
                            <li>
                            {animal.imageUrl ? (
                                    <img 
                                        src={animal.imageUrl} 
                                        alt={animal.name} 
                                        
                                        className='animal-image-view'
                                    />
                                ) : (
                                    "Sem imagem"
                                )}
                            </li>
                        </ul>
                        
                    </div>
                
            </div>
            
        </div>  
    )
}
