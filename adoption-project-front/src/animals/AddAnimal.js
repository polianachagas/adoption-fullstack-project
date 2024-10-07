import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AddAnimal() {
    
    const [animal, setAnimal]=useState({
        name:"",
        age:"",
        image:""
    })

    const{name, age, image} = animal

    const onInputChange=(e)=>{
        setAnimal({...animal,[e.target.name]:e.target.value})
    }

    return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Register Animal</h2>
                <div className='mb-3'>
                    <label htmlFor='Name' className='form-label'>Name</label>
                    <input
                        type={"text"}
                        className='form-control'
                        placeholder='Enter the animal name'
                        name='name'
                        value={name}
                        onChange={(e)=>onInputChange}
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
                        onChange={(e)=>onInputChange}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='Image' className='form-label'>Image</label>
                    <input
                        type={"text"}
                        className='form-control'
                        placeholder='Enter the image of the animal'
                        name='image'
                        value={image}
                        onChange={(e)=>onInputChange}
                    />
                </div>
                <button type='submite' className='btn btn-outline-primary'>Submit</button>

                <button type='submite' className='btn btn-outline-danger mx-2'>Cancel</button>
            </div>
        </div>
    </div>
  )
}
