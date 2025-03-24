package com.backend.server.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import java.util.Map;

@Controller
public class KoreanCharacterWebSocketContorller {
    
    @MessageMapping("/korean-character")
    @SendTo("/topic/characters")
    public String broadcastCharacter(@Payload Map<String, String>message) {
        String recognizedText = message.get("recognizedText");
        System.out.println("수신된 메시지: " + recognizedText);
        return recognizedText;
    }
}