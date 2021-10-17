import Head from 'next/head'
import Layout from '../../components/Layout'
import styles from '../../styles/Layout.module.css'
import BlogItem from '../../components/BlogItem'
import { API_URL } from '../../config/index'
import qs from 'qs'
import router, {useRouter} from 'next/router'
import Link from 'next/link'

 
export default function SearchPage({blogs}) {
    return (
        <Layout title="Search Results"> 
        <Link href='/blogs'>Go Back </Link>
            <h1>Search Results for {router.query.term}  </h1>
            {blogs.length === 0 && <h3>No Blogs to show</h3> }

            {blogs.map((evt) => (
                <BlogItem key={evt.id} evt={evt}/>
            ))}
        </Layout>
    )
}
// getServerSideProps(){}
export async function getServerSideProps({query:{term}}){
    const query = qs.stringify({
        _where: {
            _or:[
                {name_contains: term},
                {author_contains: term},
                {description_contains: term},
                {category_contains: term},
                {location_contains: term}
            ]
        }
    })

    const res = await fetch(`${API_URL}/blogs?=${query}`) 
    const blogs = await res.json()

    return {
        props: {blogs},
    }
}
