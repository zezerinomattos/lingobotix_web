import React, {useState, useEffect} from 'react';
import Head from "next/head";

//MY IMPORTS
import styles from './styles.module.scss';

import { Header } from '../../components/Header';
import { Response } from '../../components/Response';

export default function Conversation(){

    const [chatUser, setChatUser] = useState('');
    const [renderConversation, setRenderConversation] = useState('');
    const [responseGPT, setResponseGPT] = useState('');

    return(
        <>
            <Head>
                <title>Lingobotix - Let's talk</title>
            </Head>

            <div>
                <Header />

                <div className={styles.bodyContainer}>
                    <div className={styles.titles}>
                        <h1>Level one - Iniciantes</h1>
                    </div>

                    <div className={styles.conversationContainer}>
                        <Response />
                    </div>
                </div>
            </div>
        </>
    )
}