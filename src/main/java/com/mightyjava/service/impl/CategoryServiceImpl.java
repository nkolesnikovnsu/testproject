package com.mightyjava.service.impl;

import com.mightyjava.domain.Category;
import com.mightyjava.repository.CategoryRepository;
import com.mightyjava.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
	private final CategoryRepository categoryRepository;

	@Autowired
	CategoryServiceImpl(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	@Override
	public List<Category> getAll() {
		return categoryRepository.findAll();
	}

	@Override
	public Category updateCategory(Category category) {
		category.setDeleted(false);
		return categoryRepository.saveAndFlush(category);
	}

	@Override
	public void deactivateCategory(Category category) {
		if (category.getBanners().size() > 0) {
			throw new RuntimeException("Can not delete category with existing linked banners");
		}
		category.setDeleted(true);
		categoryRepository.saveAndFlush(category);
	}

	public List<Category> getCategoriesByNamePart(String namePart) {
		return categoryRepository.findByNamePart(namePart);
	}

	@Override
	public Category getCategoryById(Long id) {
		return categoryRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("No category with such id: " + id));
	}
}