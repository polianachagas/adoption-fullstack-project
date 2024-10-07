package com.polianachagas.adoption_project.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.polianachagas.adoption_project.model.Animal;
import com.polianachagas.adoption_project.repository.AnimalRepository;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin("http://localhost:3000")
public class AnimalController {

	@Autowired
	private AnimalRepository animalRepository;
	
	//imagens serão salvas nesse diretorio
	private static final String UPLOAD_DIR = "uploads/";
	
	@PostMapping("/animals")
	public ResponseEntity<Animal> newAnimal(
			@RequestParam("name") String name,
            @RequestParam("age") int age,
            @RequestParam("image") MultipartFile imageFile) {
		
		try {
			String fileName = imageFile.getOriginalFilename();
			Path filePath = Paths.get(UPLOAD_DIR + fileName);
			Files.write(filePath, imageFile.getBytes());
			
			Animal newAnimal = new Animal();
			newAnimal.setName(name);
			newAnimal.setAge(age);
			newAnimal.setImage(filePath.toString()); // armazena o caminho da imagem
			
			//salva no bd
			Animal savedAnimal = animalRepository.save(newAnimal);
			
			return new ResponseEntity<>(savedAnimal, HttpStatus.CREATED);
			
		} catch (IOException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//@PostMapping("/animals")
	//Animal newAnimal(@RequestBody Animal newAnimal) {
	//	return animalRepository.save(newAnimal);
	//}
	
	@GetMapping("/animals")
	List<Animal> getAllAnimals() {
		return animalRepository.findAll();
	}
	
}
