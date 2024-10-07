package com.polianachagas.adoption_project.exception;

public class AnimalNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public AnimalNotFoundException(Long id) {
		super("Could not find the animal with id " + id);
	}
}
