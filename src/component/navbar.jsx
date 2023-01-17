import styles from '@/styles/Navbar.module.css'
import { logo } from '@/assets/img'
const Navbar = ({onClick}) =>{
    return(
        <div className={styles.container}>
            <img src={logo}>
            </img>
        </div>
    )
}

export default Navbar