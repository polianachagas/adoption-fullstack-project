package com.polianachagas.adoption_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.polianachagas.adoption_project.model.Animal;

public interface AnimalRepository extends JpaRepository<Animal, Long> {

}
