package com.polianachagas.adoption_project.model;

import com.polianachagas.adoption_project.enums.AnimalSex;
import com.polianachagas.adoption_project.enums.AnimalFivFelv;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Animal {

	@Id
	@GeneratedValue
	private Long id;
	private String name;
	private Double age;
	private String color;
	private AnimalSex animalSex;
	private AnimalFivFelv animalFivFelv;
	private String history;
	private String imageUrl;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Double getAge() {
		return age;
	}
	public void setAge(Double age) {
		this.age = age;
	}
	public String getcolor() {
		return color;
	}
	public void setcolor(String color) {
		this.color = color;
	}
	
	public AnimalSex getAnimalSex() {
		return animalSex;
	}
	public void setAnimalSex(AnimalSex animalSex) {
		this.animalSex = animalSex;
	}
	public AnimalFivFelv getAnimalFivFelv() {
		return animalFivFelv;
	}
	public void setAnimalFivFelv(AnimalFivFelv animalFivFelv) {
		this.animalFivFelv = animalFivFelv;
	}
	
	public String getHistory() {
		return history;
	}
	public void setHistory(String history) {
		this.history = history;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	

	
	
	
}
