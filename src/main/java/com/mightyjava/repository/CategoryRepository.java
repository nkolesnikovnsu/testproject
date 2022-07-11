package com.mightyjava.repository;

import com.mightyjava.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
    List<Category> findAllByIdIn(Collection<Long> id);
    List<Category> findAllByNameIn(Collection<String> id);
    List<Category> findByNamePart(String namePart);
}
