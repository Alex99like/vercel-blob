import Image from 'next/image'
import styles from './page.module.css'
import AvatarUploadPage from './components/form'

export default function Home() {
  return (
    <main className={styles.main}>
      <AvatarUploadPage />
    </main>
  )
}
