package com.polianachagas.adoption_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.polianachagas.adoption_project.exception.AnimalNotFoundException;
import com.polianachagas.adoption_project.model.Animal;
import com.polianachagas.adoption_project.repository.AnimalRepository;

@RestController
@CrossOrigin("http://localhost:3000")
public class AnimalController {

	@Autowired
	private AnimalRepository animalRepository;
	
	@PostMapping("/animals")
	Animal newAnimal(@RequestBody Animal newAnimal) {
		return animalRepository.save(newAnimal);
	}
	
	@GetMapping("/animals")
	List<Animal> getAllAnimals() {
		return animalRepository.findAll();
	}
	
	@GetMapping("/animals/{id}")
	Animal getAnimalById(@PathVariable Long id) {
		return animalRepository.findById(id).
				orElseThrow(()-> new AnimalNotFoundException(id));
	}
	
}