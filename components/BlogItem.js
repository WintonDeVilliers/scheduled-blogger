import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/BlogItem.module.css'

export default function BlogItem({evt}) {
    return (
        
        <div className={styles.blog}>
        

        <div className={styles.img}>
            <Image src={evt.image ? evt.image.formats.thumbnail.url :'/images/default_image.jpeg'} width={170} height={100}/>
        </div>

        <div className={styles.info}>
            <span>
                {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
            </span>
            <h3>{evt.name}</h3>
        </div>
        <div className={styles.link}>
            <Link href={`/blogs/${evt.slug}`}>
                <a className= 'btn'>Details</a>
            </Link>

        </div>
             
    </div> 
    )
}
 