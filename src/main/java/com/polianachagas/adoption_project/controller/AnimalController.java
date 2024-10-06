package com.polianachagas.adoption_project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.polianachagas.adoption_project.model.Animal;
import com.polianachagas.adoption_project.repository.AnimalRepository;

@RestController
public class AnimalController {

	@Autowired
	private AnimalRepository animalRepository;
	
	@PostMapping("/animals")
	Animal newAnimal(@RequestBody Animal newAnimal) {
		return animalRepository.save(newAnimal);
	}
	
}
