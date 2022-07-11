package com.mightyjava.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tbl_banner")
public class Banner {
	@Id
	@GeneratedValue
	private Long id;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private Boolean deleted;

	@Column(nullable = false)
	private Double price;

	@ManyToMany
	@JoinTable(
			name = "banner_category",
			joinColumns = {@JoinColumn(name = "banner_id")},
			inverseJoinColumns = {@JoinColumn(name = "category_id")}
	)
	Set<Category> categories = new HashSet<>();

	@Column(nullable = false)
	private String content;

	public void setId(Long id){
		this.id = id;
	}
	public void setName(String name){
		this.title = name;
	}
	public void setPrice(Double price){
		this.price = price;
	}
	public void setContent(String content){
		this.content = content;
	}
	public Long getId(){
		return id;
	}

	public String getName() {
		return title;
	}

	public Double getPrice() {
		return price;
	}

	public String getContent() {
		return content;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public void addCategory(Category category){
		this.categories.add(category);
		category.getBanners().add(this);
	}

	public void removeCategory(Category category){
		this.categories.remove(category);
		category.getBanners().remove(this);
	}
}
