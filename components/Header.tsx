import React from 'react';
import styles from '../styles/Header.module.scss';
import Image from 'next/image';

function Header() {

    return (
        <>
            {/* <p className='page-title'>Top Twitter Trends in {city === undefined ? country : city}</p> */}
        <div className={styles.header_container}>
            <h1 className={styles.tag_line}>Know<span>What's</span><span>Trending?</span></h1>
            <Image src='/Social.svg' width='726' height='494' alt='Social' className={styles.head_image} />
        </div>
        </>
    )
}

export default Header
