import '../css/Quiz.css';
import { useEffect, useState } from 'react';

function Answer() {
    return (
        <div>
            <input
                type="text"
                placeholder="정답입력"
                className="quiz-input"
            />
        </div>
    );
}

function SignView({ videoFileName }) {
    return (
        <div className="video-box">
            <video className="sign-video" width="400" muted autoPlay playsInline loop>
                <source src={`http://localhost:8080/${videoFileName}`} type="video/mp4" />
                브라우저가 비디오 태그를 지원하지 않습니다.
            </video>
        </div>
    );
}

export default function Quiz() {
    const [videoFileName, setVideoFileName] = useState("");
    const [word, setWord] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/quiz')
            .then((response) => response.json())
            .then((data) => {
                setWord(data.word);
                setVideoFileName(data.title);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
    <div className="quiz-container">
        <h1>수어 맞추기 게임</h1>
        <div className="quiz-section">
            <div className="quiz-video">
                <SignView videoFileName={videoFileName} />
            </div>

            <div className="quiz-answer">
                <h2>정답 입력</h2>
                <Answer />
                <button className="quiz-button">확인</button>
            </div>
        </div>
    </div>
    );
}
