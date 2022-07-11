package com.mightyjava.repository;

import com.mightyjava.domain.Banner;
import com.mightyjava.domain.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface BannerRepository extends PagingAndSortingRepository<Banner, Long> {
    @Query("FROM Banner b WHERE b.title LIKE %:searchText% ORDER BY b.price ASC")
    Page<Banner> findAllBanners(Pageable pageable, @Param("searchText") String searchText);

    @Query(value = "select b from Banner b join b.categories c " +
            "where c in :categories group by b.id having count(b.id) = :categoriesCount order by b.price desc")
    List<Banner> findBidBanner(@Param("categories")Collection<Category> categories, @Param("categoriesCount") Long categoriesCount);
}
