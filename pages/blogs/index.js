import Head from 'next/head'
import Layout from '../../components/Layout'
import Pagination from '../../components/Pagination'
import styles from '../../styles/Layout.module.css'
import BlogItem from '../../components/BlogItem'
import { API_URL, PER_PAGE } from '../../config/index'
import Link from 'next/link'


export default function BlogsPage({blogs, page, total}) {


    return (
        <Layout title="Blog Posts"> 
            <h1>Blogs </h1>
            {blogs.length === 0 && <h3>No Blogs to show</h3> }

            {blogs.map((evt) => (
                <BlogItem key={evt.id} evt={evt}/>
            ))}
            
            <Pagination page={page} total={total}/>
        </Layout>
    )
}
// getServerSideProps(){}
export async function getServerSideProps({query: {page = 1}}){
    // calculate start page
    const start = +page === 1 ? 0 : (+page -1) * PER_PAGE

    // fetch total count
    const totalRes = await fetch(`${API_URL}/blogs/count`)  
    const total = await totalRes.json()
    // fetch blogs
    const blogsRes = await fetch(`${API_URL}/blogs?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)  
    const blogs = await blogsRes.json()

    return {
        props: {blogs, page: +page, total},
    }
}

// export async function getStaticProps(){
//     const res = await fetch(`${API_URL}/blogs?_sort=date:ASC`) 
//     const blogs = await res.json()

//     return {
//         props: {blogs},
//         revalidate: 1,
//     }
// }
