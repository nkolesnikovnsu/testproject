package com.mightyjava.service.impl;

import java.util.*;
import java.util.stream.Collectors;

import com.mightyjava.domain.Banner;
import com.mightyjava.domain.Category;
import com.mightyjava.domain.LogRecord;
import com.mightyjava.repository.CategoryRepository;
import com.mightyjava.service.LogRecordService;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mightyjava.repository.BannerRepository;
import com.mightyjava.service.IPageService;
import com.mightyjava.service.IService;

@Service
public class BannerServiceImpl implements IService<Banner>, IPageService<Banner> {

	@Autowired
	private BannerRepository bannerRepository;

	private final CategoryRepository categoryRepository;

	@Autowired
	private LogRecordService logRecordService;

	public BannerServiceImpl(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	@Override
	public Collection<Banner> findAll() {
		return (Collection<Banner>) bannerRepository.findAll();
	}

	@Override
	public Page<Banner> findAll(Pageable pageable, String searchText) {
		return bannerRepository.findAllBanners(pageable, searchText);
	}

	@Override
	public Page<Banner> findAll(Pageable pageable) {
		return bannerRepository.findAll(pageable);
	}

	@Override
	public Banner findAll(List<String> categoryList, String ipAddress, String userAgent) {
		Set<Category> categorySet = new HashSet<>(categoryRepository.findAllByNameIn(categoryList));
		if (categorySet.size() != categoryList.size()) {
			throw new RuntimeException("No banners found with given categories");
		}
		Set<Banner> shownBanners = logRecordService.getTodayRecords(ipAddress, userAgent)
				.stream().map(LogRecord::getBanner).collect(Collectors.toSet());
		List<Banner> banners = bannerRepository.findBidBanner(categorySet, (long) categorySet.size());
		if (banners.size() == 0) {
			throw new RuntimeException("No banners found with given categories");
		}
		banners = banners.stream().filter((banner -> !shownBanners.contains(banner))).collect(Collectors.toList());
		try {
			return banners.get(0);
		} catch (IndexOutOfBoundsException ignored) {
			throw new RuntimeException("This user has seen all the banners with given categories");
		}
	}

	@Override
	public Optional<Banner> findById(Long id) {
		return bannerRepository.findById(id);
	}

	@Override
	public Banner saveOrUpdate(Banner banner) {
		return bannerRepository.save(banner);
	}

	@Override
	public String deleteById(Long id) {
		JSONObject jsonObject = new JSONObject();
		try {
			bannerRepository.deleteById(id);
			jsonObject.put("message", "Banner deleted successfully");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}


}
