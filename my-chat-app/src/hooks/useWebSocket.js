// src/hooks/useWebSocket.js
import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';

const useWebSocket = (url) => {
    const clientRef = useRef(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const client = new Client({
            brokerURL: url,
            debug: (str) => {
                console.log(new Date(), str);
            },
            onConnect: () => {
                console.log('Connected to WebSocket');
                // Subscribe to the broadcast topic (adjust the topic to match your server's broadcast topic)
                client.subscribe('/topic/messages', (message) => {
                    if (message.body) {
                        const newMessage = JSON.parse(message.body);
                        setMessages((prevMessages) => [...prevMessages, newMessage]); // Add message to the state
                    }
                });
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
            },
        });

        clientRef.current = client;
        client.activate();

        return () => {
            client.deactivate();
        };
    }, [url]);

    const sendMessage = (topic, message) => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination: topic,
                body: JSON.stringify(message),
            });
            console.log('Sent message:', message);
        } else {
            console.log('Client not connected');
        }
    };

    return { messages, sendMessage };
};

export default useWebSocket;
