import React, {useState, useEffect} from 'react';
import Head from "next/head";
import Image from 'next/image';



//MY IMPORTS
import styles from '../../styles/Home.module.scss';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Response } from '../components/Response';

import api_openai from '../services/api_openai';

import iconSend from '../../../public/icone-enviar.png';
import iconMicrophone from '../../../public/icone-microphone.png';

export default function Conversation(){

    const [chatUser, setChatUser] = useState('');
    const [renderConversation, setRenderConversation] = useState('');
    const [responseGPT, setResponseGPT] = useState('');
    const [nameUser, setNameUser] = useState(`ZM`);

    const [gravando, setGravando] = useState(false);
    const [reconhecendo, setReconhecendo] = useState(false);

    const [isPressed, setIsPressed] = useState(false);


    async function generateText() {
        setResponseGPT('');

        setRenderConversation(chatUser);
        const prompt = `Hello, I would like to practice English with you. Let's hypothetically assume your name is Lingobotix, my American English study buddy. Let's have a fluent conversation where you will adapt to my level. Let's start: ${chatUser}`;
        
        // const prompt = chatUser;
        const model = 'text-davinci-002';
        const maxTokens = 2048;

        const REACT_APP_OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

        await api_openai.post('/completions', {
            prompt: prompt,
            model: model,
            max_tokens: maxTokens
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${REACT_APP_OPENAI_API_KEY}`
            }
        })
        .then(response => {
            //console.log(response.data.choices[0].text);
            setResponseGPT(response.data.choices[0].text);
            setChatUser('');

            // Passando texto para audio
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(response.data.choices[0].text);
            
            utterance.lang = 'en-US'; // Definir o idioma para inglês (EUA)
            
            synth.speak(utterance);
            
        })
        .catch(error => {
            console.error(error);
        })
        
    }

    const handleStartRecording = () => {
        setGravando(true);
        setIsPressed(true);

        const recognition = new window.webkitSpeechRecognition();
        recognition.onresult = handleRecognitionResult;
        recognition.start();
    };

    const handleStopRecording = () => {
        setGravando(false);
        setIsPressed(false);
        
        const recognition = new window.webkitSpeechRecognition();
        recognition.stop();
        
        generateText();
    };

    // @ts-ignore
    const handleRecognitionResult = (event) => {      
        const transcript = event.results[0][0].transcript;
        setChatUser(transcript);
        setReconhecendo(false);
    };

    return(
        <>
            <Head>
                <title>Lingobotix - Let's talk</title>
            </Head>

            <div className={styles.bodyContainer}>
                <Header />

                <div className={styles.container}>

                    <div className={styles.conversationContainer}> 
                        {
                            chatUser && <Response responseGPT={''} chatUser={chatUser} nameUser={nameUser}/>
                        }  
                        {
                            responseGPT && <Response responseGPT={responseGPT} chatUser={''} nameUser={''}/>
                        }                  
                    </div>
                    

                    <div className={styles.chatContainer}>
                        <textarea 
                            placeholder='Inicie a conversa...' 
                            className={styles.textAreaChat}
                            onChange={(e) => setChatUser(e.target.value)}
                            value={chatUser}
                        />
                        
                        {
                            chatUser ?                     
                                <button className={styles.buttonChat} onClick={generateText}>
                                     {/* @ts-ignore */}
                                    <ion-icon name="send-outline"></ion-icon>
                                </button>
                            :
                                <button
                                    className={styles.buttonChat}
                                    onMouseDown={handleStartRecording}
                                    onMouseUp={handleStopRecording}
                                    onTouchStart={handleStartRecording}
                                    onTouchEnd={handleStopRecording}
                                >
                                    {/* @ts-ignore */}
                                    <ion-icon name="mic-outline" ></ion-icon>
                                                                            
                                </button>
                        }

                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}