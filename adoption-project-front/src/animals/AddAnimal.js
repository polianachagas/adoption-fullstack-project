import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddAnimal() {
    
    const [animal, setAnimal]=useState({
        name:"",
        age:"",
    });

    const [imageFile, setImageFile] = useState(null);
    const{name, age, image} = animal;

    let navigate= useNavigate();

    const onInputChange=(e)=>{
        setAnimal({...animal,[e.target.name]:e.target.value})
    }

    //func para capturar imagem
    const onImageChange=(e)=>{
        setImageFile(e.target.files[0]); //armazena imagem
    }

    const onSubmit = async(e)=> {
        e.preventDefault();

        //usa formdata para enviar os dados e a imagem
        const formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);
        formData.append("image", imageFile);

        try {
            await axios.post("http://localhost:8080/animals", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/");
        } catch (error) {
            console.error("Error registering animal: ", error);
        }
    };

    return (
    <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter the animal name"
            name="name"
            value={name}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Age" className="form-label">
            Age
          </label>
          <input
            type={"number"}
            className="form-control"
            placeholder="Enter the animal age"
            name="age"
            value={age}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type={"file"}
            className="form-control"
            placeholder="Enter the image of the animal"
            name="image"
            value={image}
            onChange={(e) => onImageChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Submit
        </button>
        <Link className="btn btn-outline-danger mx-2" to="/">
          Cancel
        </Link>
    </form>
  )
}
