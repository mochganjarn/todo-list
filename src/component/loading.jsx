import { loading } from "@/assets/img"
import styles from "@/styles/Loading.module.css"
const ModalLoading = () =>{
    return (
        <div className={styles.loadingBody}>
            <img src={loading}></img>
        </div>
    )
}

export default ModalLoading