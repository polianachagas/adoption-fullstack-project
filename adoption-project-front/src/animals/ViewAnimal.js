import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '../styles/ViewAnimal.css'
import { AnimalSex } from '../enums/AnimalSex';
import { AnimalFivFelv } from '../enums/AnimalFivFelv';
import JSConfetti from 'js-confetti';

export default function ViewAnimal() {

    let navigate = useNavigate();

    const [animal, setAnimal] = useState({
        name:"",
        age: 0,
        color: "",
        animalSex: AnimalSex.UNKNOWN,
        animalFivFelv: AnimalFivFelv.UNKNOWN,
        history: "",
        imageUrl: ""
    })

    const {id} = useParams();

    useEffect(() => {
        loadAnimals();
    }, []);

    const onAdopt = async (e) => {
        const container = document.getElementById('button')
        const jsConfetti = new JSConfetti({container});

        jsConfetti.addConfetti({
            confettiColors: [
            '#FFBF00', '#FF6600', '#66C7F4', '#FB62F6', '#02FF8D',
            ],
            confettiRadius: 6,
            confettiNumber: 500
        }).then(() => navigate("/"));
    }

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
                            <strong>Color:</strong> {animal.color}
                            </li>

                            <li>
                            <strong>Sex:</strong> {animal.animalSex}
                            </li>

                            <li>
                            <strong>Fiv and/or Felv:</strong> {animal.animalFivFelv}
                            </li>

                            <li>
                            <strong>History:</strong> {animal.history}
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
                    <button className='btn-adopt' onClick={() => onAdopt()}>Quero adotar! 🥳</button>
            </div>
            
        </div>  
    )
}
