import { useState } from "react";
import {Button, ViewContainer} from "./Styles";

function WordInput({ word, setWord, fetchVideo }) {
    return (
        <div>
            <input
                type="text"
                placeholder="단어 입력 (예: 추억)"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                style={{
                    width: "300px",
                    height: "200px",
                    fontSize: "18px",
                    backgroundColor: "#f0f8ff",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    padding: "10px",
                    margin: "30px"
                }}
            />
            <button style={Button} onClick={fetchVideo}>확인</button>
        </div>
    );
}
function SignVideoPlayer() {
    const [word, setWord] = useState(""); // 입력한 단어
    const [videoFileName, setVideoFileName] = useState(""); // 파일명

    const fetchVideo = async () => {
        const encodedWord = encodeURIComponent(word); // 한글 인코딩 처리
        const response = await fetch(`http://localhost:8080/sign/${encodedWord}`);

        if (!response.ok) {
            console.error("서버에서 영상을 찾을 수 없음");
            return;
        }

        const videoTitle = await response.text();
        console.log("찾은 영상:", videoTitle);
        setVideoFileName(videoTitle);
    };


    return (
        <div>
        <h2>텍스트 - 수어</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={ViewContainer}>
            <WordInput word={word} setWord={setWord} fetchVideo={fetchVideo} />
            </div>
            <div style={ViewContainer}>
            {videoFileName ? (
                <div>
                    <h3>영상</h3>
                    <video style= {{ marginLeft: "30px"}} width="400" controls
                           muted autoPlay playsInline>
                        <source src={`http://localhost:8080/${videoFileName}`} type="video/mp4" />
                        브라우저가 비디오 태그를 지원하지 않습니다.
                    </video>
                </div>
            ) : (
                <p>영상이 존재하지 않습니다.</p>
            )}
            </div>
        </div>
        </div>
    );
}

export default SignVideoPlayer;