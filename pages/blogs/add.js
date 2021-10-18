import Layout from '../../components/Layout'
// import styles from '../../styles/Layout.module.css'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { API_URL } from '../../config/index'
import styles from '../../styles/Form.module.css'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AddBlogsPage() {
    const [values, setValues]= useState({
        name: '',
        author: '',
        category: '',
        description: '',
        location: '',
        date:''
    })

    const router =useRouter ()
    const handleSubmit = async (e) => {
        e.preventDefault()
        // validation
        const hasEmptyFields = Object.values(values).some((element) => element === '' )
        if(hasEmptyFields){
            toast.error('Please fill in all fields')
        }

        const res = await fetch(`${API_URL}/blogs`, {
            method: 'POST',
            headers: {
                'Contenet-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        if(!res.ok){
            toast.error('Something went wrong')
        }else {
            const evt = await res.json()
            router.push(`/events/${evt.slug}`)
        }
        // console.log(values)
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    return (        
        <Layout title="Add New Blog Post">
            <Link href='/blogs'>Go Back</Link>
            <h1>Add Events</h1>

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
                        <input type="date" id="date" name="date" value={values.date} onChange={handleInputChange}/>
                    </div>
                </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea type="text" id="description" name="description" value={values.description} onChange={handleInputChange}></textarea>
                    </div>
                    <input type='submit' value='Add Blog' className='btn'/>
            </form>
        </Layout>
    )
}
