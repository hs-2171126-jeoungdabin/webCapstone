package com.backend.server.controller;

import com.backend.server.entity.SignVideo;
import com.backend.server.service.EducationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/education")
@CrossOrigin(origins = "http://localhost:3000")
public class EducationController {

    private final EducationService educationService;

    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }

    @GetMapping
    public List<SignVideo> getAll() {
        return educationService.getAllVideos();
    }

    @GetMapping("/search")
    public List<SignVideo> searchByName(@RequestParam String name) {
        return educationService.searchByName(name);
    }

    @GetMapping("/category")
    public List<SignVideo> filterByCategory(@RequestParam String category) {
        return educationService.filterByCategory(category);
    }

}
