package com.mightyjava.resource.impl;

import com.mightyjava.domain.Category;
import com.mightyjava.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/")
public class CategoryResourceImpl {
	private final CategoryService categoryService;

	public CategoryResourceImpl(CategoryService categoryService) {
		this.categoryService = categoryService;
	}

	@GetMapping("/category")
	public List<Category> getCategories(@RequestParam(required = false) String namePart) {
		if (namePart != null) {
			return categoryService.getCategoriesByNamePart(namePart);
		}
		return categoryService.getAll();
	}

	@GetMapping("/category")
	public Category updateCategory(Category category) {
		return categoryService.updateCategory(category);
	}

	@DeleteMapping("/category/:{id}")
	public ResponseEntity<Category> deleteCategory(@PathVariable Long id) {
		Category category = categoryService.getCategoryById(id);
		categoryService.deactivateCategory(category);
		return ResponseEntity.ok(category);
	}

}




