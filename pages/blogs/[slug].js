import Layout from '../../components/Layout'
import { API_URL } from '../../config/index'
import styles from '../../styles/Blog.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes} from 'react-icons/fa'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter} from 'next/router'


export default function BlogsPage({evt}) {
    const router = useRouter()

    const deleteBlog = async (e) => {
        if (confirm('Are you sure ?')){

            const res = await fetch(`${API_URL}/blogs/${evt.id}`, {
                method: 'DELETE'
            })
            
            const data = await res.json() 

            if (!res.ok){
                toast.error(data.message)
            } else {
                router.push('/blogs')
            }
        }

    }
    return (
        <Layout> 
            <div className={styles.blog}>
                <div className={styles.controls}>
                    <Link href={`/blogs/edit/${evt.id}`}>
                        <a>
                            <FaPencilAlt /> Edit Blog
                        </a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteBlog}>
                        <FaTimes /> Delete Blog
                    </a>
                </div>

                <span>
                    {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
                </span>
                <h1>{evt.name} </h1>
                <ToastContainer />
                {evt.name && (
                    <div className={styles.image}>
                        {/* <Image src={evt.image.formats.medium.url} width={960} height={600} /> */}
                        <Image src={evt.image ? evt.image.formats.medium.url :'/images/default_image.jpeg'} width={170} height={100}/>
                    </div>
                )}

                <h3>Author:</h3>
                <p>{evt.author}</p>
                <h3>Description:</h3>
                <p>{evt.description}</p>
                <h3>Category</h3>
                <p>{evt.category}</p>
                <h3>Location: {evt.location}</h3>
                
                <Link href='/blogs'>
                    <a className={styles.back}>{'<'} Go Back </a>
                </Link>

            </div>
        </Layout>
    )
}


export async function getStaticPaths(){
    const res = await fetch(`${API_URL}/blogs`)
    const blogs = await res.json()
    const paths = blogs.map(evt => ({
        params: {slug: evt.slug}
    }))

    return {
        paths,
        fallback: true, //false
    }
}

export async function getStaticProps({params:
    {slug}}) {
        const res = await fetch(`${API_URL}/blogs?slug=${slug}`)
        const blogs = await res.json()


    return {
        props:{
            evt: blogs[0]
        },
        revalidate: 1
    }
}


// export async function getServerSideProps({query:
//     {slug}}) {
//         const res = await fetch(`${API_URL}/api/blogs/${slug}`)
//         const blogs = await res.json()


//     return {
//         props:{
//             evt: blogs[0]
//         },
//     }
// }