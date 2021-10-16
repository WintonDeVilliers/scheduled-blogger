import Head from 'next/head'
import styles from '../styles/Layout.module.css'
import Footer from './Footer'
import Header from './Header'

import Showcase from './Showcase'
import {useRouter} from 'next/router'

export default function Layout({title, keywords, description, children}) {
    const router = useRouter()
    return (
        <div>
        <Head>
            <title>{title}</title>
            <meta name="keywords" content={keywords}/>
        </Head>

        <Header />

        {router.pathname ==='/' && <Showcase/>}

        <div className={styles.container}>
        {children} 
        </div>

        <Footer/>
                    
        </div>

    )
}
Layout.defaultProps = {
    title: "schedblog",
    description: 'Post your blog and schedule your next one',
    keywords: 'blog, scheduled, tracking blog, news'
}