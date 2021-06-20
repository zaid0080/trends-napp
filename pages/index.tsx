import Head from 'next/head'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.landing_page}>
        <Header />
        {/* {data.map(d => {
          return (
            <h2>{d.title}</h2>
          )
        })} */}
    </div>
  )
}


