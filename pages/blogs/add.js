import Layout from '../../components/Layout'
// import styles from '../../styles/Layout.module.css'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { API_URL } from '../../config/index'
import styles from '../../styles/Form.module.css'

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
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value})
    }

    return (        
        <Layout title="Add New Blog Post">
            <Link href='/blogs'>Go Back</Link>
            <h1>Add Events</h1>

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
