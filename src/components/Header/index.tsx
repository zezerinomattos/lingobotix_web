import Image from 'next/image';

//MY IMPORTS
import styles from './styles.module.scss';

import usaFlag from '../../../public/iconebandeiraEUA1.png';
import lingobotix from '../../../public/LingoP.png';

export function Header(){
    return(
        <>
            <div className={styles.container}>
                <Image src={usaFlag} alt='Imagem da Bandeira americana' className={styles.imgLogo}/>
                <h1 className={styles.title}>Lingobotix</h1>
                <Image src={lingobotix} alt='Imagem da Bandeira americana' className={styles.imgLogo}/>
            </div>
        </>
    )
}