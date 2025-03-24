import React, { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import Hangul from 'hangul-js';

function KoreanCharacterDisplay() {
  const [inputLetters, setInputLetters] = useState([]);
  const [finalWord, setFinalWord] = useState('');
  const videoRef = useRef(null);

  // 웹캠 스트림 설정
  useEffect(() => {
    async function setupWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('웹캠 접근 에러:', err);
      }
    }
    setupWebcam();
  }, []);

  // STOMP 클라이언트를 통한 메시지 수신 (한글 자모가 한 글자씩 전달됨)
  useEffect(() => {
    const socketUrl = 'ws://localhost:8080/ws';
    const stompClient = new Client({
      webSocketFactory: () => new WebSocket(socketUrl),
      reconnectDelay: 5000, // 연결이 끊기면 5초 후 자동 재연결
      debug: (str) => console.log(str),
    });

    stompClient.onConnect = () => {
      console.log("웹소켓 연결 성공");
      // 서버에서 발행한 '/topic/characters' 주제를 구독하여 메시지 수신
      stompClient.subscribe('/topic/characters', (message) => {
        if (message.body) {
          console.log("수신된 메시지:", message.body);
          // 인식된 한 글자를 누적
          setInputLetters(prev => [...prev, message.body]);
        }
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  // 잘못 입력된 글자 삭제: 글자를 클릭하면 해당 글자 제거
  const handleLetterRemove = (index) => {
    setInputLetters(prev => prev.filter((_, i) => i !== index));
  };

  // 제출 버튼 클릭 시, 누적된 글자들을 조합하여 최종 단어로 변환
  const handleSubmit = () => {
    const composed = Hangul.assemble(inputLetters);
    setFinalWord(composed);
    // 원한다면 제출 후 입력 글자 초기화
    setInputLetters([]);
  };

  // 음성읽기 버튼 클릭 시, 브라우저 TTS API를 이용해 최종 단어를 읽어줌
  const handleReadAloud = () => {
    if (!finalWord) return;
    const utterance = new SpeechSynthesisUtterance(finalWord);
    utterance.lang = 'ko-KR';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>수어 인식 및 단어 조합</h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'flex-start' }}>
        {/* 웹캠 영상 영역 */}
        <div style={{ width: '640px', height: '480px', background: '#000' }}>
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        {/* 인식된 자모 및 제출 영역 */}
        <div style={{ width: '300px', background: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
          <h2>입력된 자모</h2>
          <div style={{
            minHeight: '50px',
            marginBottom: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px'
          }}>
            {inputLetters.map((letter, index) => (
              <span key={index}
                onClick={() => handleLetterRemove(index)}
                style={{
                  padding: '5px 10px',
                  background: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                {letter}
              </span>
            ))}
          </div>
          <button onClick={handleSubmit} style={{ padding: '10px 20px', fontSize: '16px', marginRight: '10px' }}>
            제출
          </button>
          <button onClick={handleReadAloud} style={{ padding: '10px 20px', fontSize: '16px' }}>
            음성읽기
          </button>
        </div>
      </div>
      {finalWord && (
        <div style={{ marginTop: '20px', fontSize: '32px', color: '#333' }}>
          <h2>최종 단어</h2>
          <p>{finalWord}</p>
        </div>
      )}
    </div>
  );
}

export default KoreanCharacterDisplay;
