package com.backend.server.repository;

import com.backend.server.entity.SignVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SignVideoRepository extends JpaRepository<SignVideo, Long> {
    Optional<SignVideo> findByName(String name);
}

