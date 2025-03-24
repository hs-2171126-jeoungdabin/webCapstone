package com.backend.server.controller;

import com.backend.server.service.SignVideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/sign")
public class VideoController {
    //private final String VIDEO_DIRECTORY = "/Users/semi/webCapstone/videos/";
    @Autowired
    private SignVideoService signVideoService;

    @GetMapping("/{word}")
    public ResponseEntity<String> getSignVideo(@PathVariable String word) {
        String videoTitle = signVideoService.getVideoTitle(word);

        if (videoTitle.equals("영상이 존재하지 않음")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("영상 없음");
        }

        return ResponseEntity.ok(videoTitle);
    }

}

