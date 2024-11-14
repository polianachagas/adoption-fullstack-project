import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/AddAnimal.css'

export default function AddAnimal() {
  
    let navigate = useNavigate();

    const [animal, setAnimal] = useState({
        name: "",
        age: "",
    });

    const [file, setFile] = useState(null);

    const{name, age} = animal;

    const onInputChange=(e)=>{
        setAnimal({ ...animal, [e.target.name]:e.target.value});
    }

    const onFileChange=(e)=>{
        setFile(e.target.files[0]);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('age', age);
        formData.append('file', file);

        await axios.post("http://localhost:8080/animals", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        navigate("/");
    }

    return ( 
    <div className='container'>
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