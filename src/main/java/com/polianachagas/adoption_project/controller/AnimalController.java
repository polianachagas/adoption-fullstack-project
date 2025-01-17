package com.polianachagas.adoption_project.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.polianachagas.adoption_project.enums.AnimalSex;
import com.polianachagas.adoption_project.enums.AnimalFivFelv;
import com.polianachagas.adoption_project.exception.AnimalNotFoundException;
import com.polianachagas.adoption_project.images.FileStorageProperties;
import com.polianachagas.adoption_project.model.Animal;
import com.polianachagas.adoption_project.repository.AnimalRepository;


@RestController
@CrossOrigin("http://localhost:3000")
public class AnimalController { 

	@Autowired
	private AnimalRepository animalRepository;
	
	private final Path fileStorageLocation;
	
	public AnimalController(FileStorageProperties fileStorageProperties) {
		this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
				.toAbsolutePath().normalize();
		try {
			Files.createDirectories(this.fileStorageLocation);
		} catch (IOException exception) {
			throw new RuntimeException("Could not create directory file upload " + exception);
		}
	}
	
	@PostMapping("/animals")
	public ResponseEntity<Animal> newAnimal(
			@RequestParam("file") MultipartFile file,
			@RequestParam("name") String name,
			@RequestParam("age") Double age,
			@RequestParam("color") String color,
			@RequestParam("animalSex") AnimalSex animalSex,
			@RequestParam("animalFivFelv") AnimalFivFelv animalFivFelv,
			@RequestParam("history") String history)
	{
		
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		
		try {
			Path targetLocation = fileStorageLocation.resolve(fileName);
			file.transferTo(targetLocation);
			
			String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
					.path("/api/files/upload/")
					.path(fileName)
					.toUriString();
			
			Animal newAnimal = new Animal();
			newAnimal.setName(name);
			newAnimal.setAge(age);
			newAnimal.setcolor(color);
			newAnimal.setAnimalSex(animalSex);
			newAnimal.setAnimalFivFelv(animalFivFelv);
			newAnimal.setHistory(history);
			newAnimal.setImageUrl(fileDownloadUri);
			
			Animal savedAnimal = animalRepository.save(newAnimal);
			
			return ResponseEntity.ok(savedAnimal);
		} catch (IOException exception) {
			return ResponseEntity.status(500).body(null);
		}
	}
	
	@GetMapping("/api/files/upload/{filename:.+}")
	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
	    try {
	        Path file = fileStorageLocation.resolve(filename).normalize();
	        Resource resource = new UrlResource(file.toUri());
	        if (resource.exists()) {
	            return ResponseEntity.ok()
	                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
	                    .body(resource);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    } catch (Exception e) {
	        return ResponseEntity.status(500).build();
	    }
	}
	
	//edit
	@PutMapping("/animals/{id}")
	public ResponseEntity<Animal> updateAnimal(@PathVariable Long id, @RequestParam("file") MultipartFile file,
			@RequestParam("name") String name, @RequestParam("age") Double age, @RequestParam("color") String color,
			@RequestParam("animalSex") AnimalSex animalSex, @RequestParam("animalFivFelv") AnimalFivFelv animalFivFelv,
			@RequestParam("history") String history) {

		Animal animal = animalRepository.findById(id).orElseThrow(() -> new AnimalNotFoundException(id));

		try {
			String fileName = StringUtils.cleanPath(file.getOriginalFilename());
			Path targetLocation = fileStorageLocation.resolve(fileName);
			file.transferTo(targetLocation);

			String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/files/upload/")
					.path(fileName).toUriString();

			animal.setName(name);
			animal.setAge(age);
			animal.setcolor(color);
			animal.setAnimalSex(animalSex);
			animal.setAnimalFivFelv(animalFivFelv);
			animal.setHistory(history);
			animal.setImageUrl(fileDownloadUri);

			Animal updatedAnimal = animalRepository.save(animal);
			return ResponseEntity.ok(updatedAnimal);
		} catch (IOException e) {
			return ResponseEntity.status(500).build();
		}
	}
	
	@DeleteMapping("/animals/{id}")
	String deleteAnimal(@PathVariable Long id) {
		if (!animalRepository.existsById(id)) {
			throw new AnimalNotFoundException(id);
		}
		animalRepository.deleteById(id);
		return "Animal with id " + id + " has been deleted!";
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