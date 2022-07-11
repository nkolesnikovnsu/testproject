package com.mightyjava.resource.impl;

import com.mightyjava.domain.Banner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mightyjava.resource.Resource;
import com.mightyjava.service.IPageService;
import com.mightyjava.service.IService;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins="http://localhost:3000")
public class BannerResourceImpl implements Resource<Banner> {

	@Autowired
	private IService<Banner> bannerIService;
	
	@Autowired
	private IPageService<Banner> bannerIPageService;

	@GetMapping("/bid")
	public ResponseEntity<Banner> getBanner(@RequestParam Map<String, String> categoryMap, HttpServletRequest request){
		List<String> categoryList = new ArrayList<>(categoryMap.values());
		return new ResponseEntity<>(bannerIPageService.findAll(categoryList, request.getRemoteAddr(), request.getHeader("User-Agent")), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Page<Banner>> findAll(Pageable pageable, String searchText) {
		return new ResponseEntity<>(bannerIPageService.findAll(pageable, searchText), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Page<Banner>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
		return new ResponseEntity<>(bannerIPageService.findAll(
				PageRequest.of(
						pageNumber, pageSize,
						sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
				)
		), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Banner> findById(Long id) {
		return new ResponseEntity<>(bannerIService.findById(id).get(), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Banner> save(Banner banner) {
		return new ResponseEntity<>(bannerIService.saveOrUpdate(banner), HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<Banner> update(Banner banner) {
		return new ResponseEntity<>(bannerIService.saveOrUpdate(banner), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteById(Long id) {
		return new ResponseEntity<>(bannerIService.deleteById(id), HttpStatus.OK);
	}
}
