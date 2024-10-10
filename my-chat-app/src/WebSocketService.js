// src/WebSocketService.js
import { Client } from '@stomp/stompjs';

class WebSocketService {
    constructor(url) {
        this.client = new Client({
            brokerURL: url,
            onConnect: (frame) => {
                console.log('Connected: ' + frame);
                this.client.subscribe('/topic/messages', (message) => {
                    if (message.body) {
                        console.log('Message received: ' + message.body);
                    }
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });
    }

    connect() {
        this.client.activate();
    }

    disconnect() {
        if (this.client.active) {
            this.client.deactivate();
        }
    }

    sendMessage(destination, message) {
        this.client.publish({ destination, body: message });
    }
}

export default WebSocketService;
