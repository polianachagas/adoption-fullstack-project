import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/AddAnimal.css'
import { AnimalFivFelv } from '../enums/AnimalFivFelv';
import { AnimalSex } from '../enums/AnimalSex';

export default function AddAnimal() {
  
    let navigate = useNavigate();

    const [animal, setAnimal] = useState({
        name: "",
        age: 0,
        color: "",
        animalSex: AnimalSex.UNKNOWN,
        animalFivFelv: AnimalFivFelv.UNKNOWN,
        history: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    const [file, setFile] = useState(null);

    const{name, age, color, animalSex, animalFivFelv, history} = animal;

    const onInputChange=(e)=>{
        setAnimal({ ...animal, [e.target.name]:e.target.value});
    }

    const onFileChange=(e)=>{
        setFile(e.target.files[0]);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!file || !name || !age || !color || !animalSex || !animalFivFelv || !history) {
                throw new Error("Please, fill all information!");
            }

            const formData = new FormData();
            formData.append('name', name);
            formData.append('age', age);
            formData.append('color', color);
            formData.append('animalSex', animalSex);
            formData.append('animalFivFelv', animalFivFelv);
            formData.append('history', history);
            formData.append('file', file);

            await axios.post("http://localhost:8080/animals", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate("/");
        } catch (error) {
            setErrorMessage(error.message || "Error trying to add animal. Please, try again.");
        }
    }

    return ( 
    <div className='container'>
        {errorMessage && (
            <div className='error-popup'>
                <p>{errorMessage}</p>
                <button onClick={() => setErrorMessage("")}>Close</button>
            </div>
        )}
        <div>
            <div className='forms'>
                <h2>Register Animal</h2>
                
                <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='var'>
                        <label htmlFor='Name' className='form-label'>Name</label>
                        <input
                            type={"text"}
                            className='form-control'
                            placeholder='Enter the animal name'
                            name='name'
                            value={name}
                            onChange={(e)=>onInputChange(e)}
                        />
                    </div>

                    <div className='var'>
                        <label htmlFor='Age' className='form-label'>Age</label>
                        <input
                            type={"number"}
                            className='form-control'
                            placeholder='Enter the age of the animal'
                            name='age'
                            value={age}
                            onChange={(e)=>onInputChange(e)}
                        />
                    </div>

                    <div className='var'>
                        <label htmlFor='Color' className='form-label'>Color</label>
                        <input
                            type={"text"}
                            className='form-control'
                            placeholder='Enter the color of the animal'
                            name='color'
                            value={color}
                            onChange={(e)=>onInputChange(e)}
                        />
                    </div>

                    <div className='var'>
                        <label htmlFor='Sex' className='form-label'>Sex</label>
                        <select
                            className='form-control'
                            name='animalSex'
                            value={animal.animalSex}
                            onChange={(e)=>onInputChange(e)}
                        >
                        <option value="" disabled>Select the sex</option>
                        {Object.entries(AnimalSex).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div className='var'>
                        <label htmlFor='fivFelv' className='form-label'>Fiv/Felv</label>
                        <select
                            className='form-control'
                            name='animalFivFelv'
                            value={animal.animalFivFelv}
                            onChange={(e) => onInputChange(e)}
                        >
                        <option value="" disabled>Fiv and/or Felv</option>
                        {Object.entries(AnimalFivFelv).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div className='var'>
                        <label htmlFor='History' className='form-label'>About me</label>
                        <input
                            type={"text"}
                            className='form-control'
                            placeholder='Enter the animal history'
                            name='history'
                            value={history}
                            onChange={(e)=>onInputChange(e)}
                        />
                    </div>

                    <div className='var'>
                        <label htmlFor='image' className='form-label'>Image</label>
                        <input
                            type={"file"}
                            className='form-control'
                            placeholder='Enter the image of the animal'
                            name='file'
                            onChange={(e)=>onFileChange(e)}
                        />
                    </div>
                
                    <button type='submit' className='submit-btn'>Submit</button>

                    <Link type='submit' className='cancel-btn' to="/">Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}