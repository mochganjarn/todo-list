import { useRouter } from "next/router"
import { useEffect } from "react"
import styles from '@/styles/Home.module.css'
export default function Home() {
  const router = useRouter()
  
  useEffect(()=>{
    return () => router.push("/todo/list")
  })
  return (
    <div className={styles.main}>
      <img styles={{width:"100%",maxHeight:"100%"}} src="https://ci3.googleusercontent.com/mail-sig/AIorK4zJXwgpV15O51J2r6nNL6inCB5HEM8Ev-XxIK9xjUf1aUjo8G8_wbqRwUchLupoUK2u43vmfMQ">
      </img>
    </div>
  )
}
