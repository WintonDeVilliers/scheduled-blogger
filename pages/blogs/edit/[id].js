import Layout from '../../../components/Layout'
import Modal from '../../../components/Modal'
import ImageUpload from '../../../components/ImageUpload'
// import styles from '../../styles/Layout.module.css'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { API_URL } from '../../../config/index'
import styles from '../../../styles/Form.module.css'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'
import Image from 'next/image'
import {FaImage} from 'react-icons/fa'

export default function EditBlogPage({evt}) {  
    const [values, setValues]= useState({
        name: evt.name,
        author: evt.author,
        category: evt.category,
        description: evt.description,
        location: evt.location,
        date: evt.date,
        time: evt.time,
    })

    const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.thumbnail.url : null)

    const [showModal, setShowModal] = useState(false)

    
    const router = useRouter ()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // validation
        const hasEmptyFields = Object.values(values).some((element) => element === '' )
        if(hasEmptyFields){
            toast.error('Please fill in all fields')
        }

        const res = await fetch(`${API_URL}/blogs/${evt.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        if(!res.ok){
            toast.error('Something went wrong')
        }else {
            const evt = await res.json() 
            router.push(`/blogs/${evt.slug}`)
        }
        // console.log(values)
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    const imageUploaded = async  (e) => {
        const res = await fetch(`${API_URL}/blogs/${evt.id}`)
        const data = await res.json()
        setImagePreview(data.image.formats.thumbnail.url)
        setShowModal(false) 
        // console.log('uploaded')
    }

    return (        
        <Layout title="Add New Blog Post">
            <Link href='/blogs'>Go Back</Link>
            <h1>Edit Blog</h1>

            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form} >
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Blog Name</label>
                        <input type="text" id="name" name="name" value={values.name} onChange={handleInputChange}/>
                    </div>
                     <div>
                        <label htmlFor="author">Author</label>
                        <input type="text" id="author" name="author" value={values.author} onChange={handleInputChange}/>
                    </div>
                     <div>
                        <label htmlFor="category">Category</label>
                        <input type="text" id="category" name="category" value={values.category} onChange={handleInputChange}/>
                    </div>
                     <div>
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date" name="date" value={moment(values.date).format('yyyy-MM-DD')} onChange={handleInputChange}/>
                    </div>
                     <div>
                            <label htmlFor="time">Time</label>
                            <input type="text" id="time" name="time" value={values.time} onChange={handleInputChange}/>
                     </div>
                </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea type="text" id="description" name="description" value={values.description} onChange={handleInputChange}></textarea>
                    </div>
                    <input type='submit' value='Update Blog' className='btn'/>
            </form>

            <h2> Blog Image</h2>
            {imagePreview ?(
                <Image src={imagePreview} height={100} width={170} />
            ): (
                <div>
                <p>No image uploaded</p>
               </div>
            )}

            <div>
                <button onClick={() => setShowModal(true)} className="btn-secondary btn-icon">
                <FaImage /> Set Image
                </button>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
            </Modal>
{/*         
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                IMAGE UPLOAD  
            </Modal> */}
  
        </Layout>
    )
}


export async function getServerSideProps({params: {id}}){
    const res = await fetch(`${API_URL}/blogs/${id}`)
    const evt = await res.json()

    return {
        props: {
            evt
        }
    }
}