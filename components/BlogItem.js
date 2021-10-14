import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/BlogItem.module.css'

export default function BlogItem(evt) {
    return (
        <div className={styles.blog}>

        <div className={styles.img}>
            <Image src={evt.image ? evt.image :'/images/default_image.jpeg'} width={170} height={100}/>
        </div>
            
    </div> 
    )
}
 