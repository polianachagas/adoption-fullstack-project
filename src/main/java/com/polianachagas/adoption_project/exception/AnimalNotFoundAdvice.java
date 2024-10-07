package com.polianachagas.adoption_project.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

public class AnimalNotFoundAdvice {

	@ResponseBody
	@ExceptionHandler(AnimalNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public Map<String, String> exceptionHandler(AnimalNotFoundException exception) {
		Map<String, String> errorMap = new HashMap<>();
		errorMap.put("Error message: ", exception.getMessage());
		
		return errorMap;
	}
	
}
