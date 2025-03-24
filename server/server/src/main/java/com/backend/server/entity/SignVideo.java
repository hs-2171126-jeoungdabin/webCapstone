package com.backend.server.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "sign_videos")
@Getter
@Setter
@NoArgsConstructor
public class SignVideo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;    // int ~ long

    @Column
    private String url;    // 영상 url

    @Column
    private String title;  // 파일 제목

    @Column
    private String name;   // 수어 이름

    public SignVideo(String url, String title, String name) {
        this.url = url;
        this.title = title;
        this.name = name;
    }
}
