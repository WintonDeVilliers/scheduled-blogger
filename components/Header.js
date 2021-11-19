import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import Link from 'next/link'
import styles from '../styles/Header.module.css'
import Search from './Search'

export default function Header() {
    return (
        <header className={styles.header}>
        <div className={styles.logo}>

            <Link href='/'>
                <a>SchedBlog</a>
            </Link>
        </div>

        <Search /> 

        <nav>
            <ul>
                <li>
                    <Link href='/blogs'>
                        <a>Blogs</a>
                    </Link>
                </li>
                <li>
                    <Link href='blogs/add'>
                        <a> Add Blog</a>
                    </Link>
                </li>
                <li>
                    <Link href='/account/login'>
                        <a className='btn-secondary btn-icon'>
                        <FaSignInAlt/>Login</a>
                    </Link>
                </li>
            </ul>
        </nav>
            
        </header>
    )
}