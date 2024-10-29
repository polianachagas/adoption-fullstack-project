import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddAnimal() {
  
    let navigate = useNavigate();

    const [animal, setAnimal] = useState({
        name: "",
        age: "",
    });

    const{name, age} = animal;

    const onInputChange=(e)=>{
        setAnimal({ ...animal, [e.target.name]:e.target.value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/animals", animal);
        navigate("/");
    }

    return ( 
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Register Animal</h2>
                
                <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='mb-3'>
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

                    <div className='mb-3'>
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
                
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>

                    <Link type='submit' className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}