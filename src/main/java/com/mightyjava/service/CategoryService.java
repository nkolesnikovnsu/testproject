package com.mightyjava.service;

import com.mightyjava.domain.Category;

import java.util.List;

public interface CategoryService {

    List<Category> getAll();

    Category updateCategory(Category category);

    void deactivateCategory(Category category);

    List<Category> getCategoriesByNamePart(String namePart);

    Category getCategoryById(Long id);

}