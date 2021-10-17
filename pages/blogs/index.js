import Head from 'next/head'
import Layout from '../../components/Layout'
import styles from '../../styles/Layout.module.css'
import BlogItem from '../../components/BlogItem'
import { API_URL } from '../../config/index'

export default function BlogsPage({blogs}) {
    return (
        <Layout title="Blog Posts"> 
            <h1>Blogs </h1>
            {blogs.length === 0 && <h3>No Blogs to show</h3> }

            {blogs.map((evt) => (
                <BlogItem key={evt.id} evt={evt}/>
            ))}
        </Layout>
    )
}
// getServerSideProps(){}
export async function getStaticProps(){
    const res = await fetch(`${API_URL}/blogs?_sort=date:ASC`) 
    const blogs = await res.json()

    return {
        props: {blogs},
        revalidate: 1,
    }
}
