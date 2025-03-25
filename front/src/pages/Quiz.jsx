import {Button, Container, ViewContainer} from './Styles';
import { useEffect, useState } from 'react';

function Answer() {
    return (
        <div>
            <input
                type="text"
                placeholder="정답입력"
                style={{
                    width: "300px",
                    height: "100px",
                    fontSize: "18px",
                    backgroundColor: "#f0f8ff",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    padding: "10px",
                    margin: "30px"
                }}/>
        </div>
    );
}

function SignView({videoFileName}) {
    return(
        <div style={{backgroundColor: "#f0f8ff",}}>
            <video style={{marginLeft: "30px"}} width="400" muted autoPlay playsInline loop>
                <source src={`http://localhost:8080/${videoFileName}`} type="video/mp4"/>
                브라우저가 비디오 태그를 지원하지 않습니다.
            </video>

        </div>
    );
}

export default function Quiz() {
    const [videoFileName, setVideoFileName] = useState(""); // 파일명

    const [word, setWord] = useState('');

    useEffect(() => {
        // API로부터 랜덤 영상 정보를 가져오는 부분
        fetch('http://localhost:8080/api/quiz')
            .then((response) => response.json())
            .then((data) => {
                setWord(data.word);
                setVideoFileName(data.title);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div style={Container}>

            <div style={ViewContainer}>
            <h2>수어 맞추기</h2>
            <SignView videoFileName={videoFileName}></SignView>
            </div>

            <div style={ViewContainer} >
            <h2>정답 입력</h2>
            <Answer></Answer>
            <button style={Button}>확인</button>
            </div>
        </div>

    );
}

