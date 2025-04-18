package com.backend.server.repository;

import com.backend.server.entity.SignVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EducationRepository extends JpaRepository<SignVideo, Long> {
    // 이름 기반 검색
    List<SignVideo> findByNameContainingIgnoreCase(String name);

    // 카테고리로 필터링
    List<SignVideo> findByCategory(String category);
}
