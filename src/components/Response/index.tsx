import React from 'react';
import Image from 'next/image';

//MY IMPORTS
import styles from './styles.module.scss';
import imgLingo from '../../../public/imgResponse.png';

// TYPES
interface ResponseProps{
    responseGPT: string;
    chatUser: string;
    nameUser: string;
}

export function Response({responseGPT, chatUser, nameUser}: ResponseProps){
    return(
        <div className={styles.container}>

            {
                chatUser && 
                    <>  
                        <div className={styles.nemeUserContainer}>
                            <span>{nameUser}</span>
                        </div>
                        <span className={styles.text}>
                            {chatUser}
                        </span>
                    </>
            }

            {
                responseGPT && 
                    <>
                        <Image src={imgLingo} alt='Imagem do Lingobotix' className={styles.imgLingobotix}/>

                        <span className={styles.text}>
                            {responseGPT}
                        </span>
                    </>
            }
            
        </div>
    );
}