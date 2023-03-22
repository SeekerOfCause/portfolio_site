import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Michael Maye';
export const siteTitle = 'Michael Maye';


export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="images/logodesign.svg" />
        
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
          <img
              id="imageHome"
              className={utilStyles.iconImage}
              src="/images/logodesign.svg"
            ></img>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
            <img
              id="imageHome"
              className={utilStyles.iconImage}
              src="/images/logodesign.svg"
            ></img>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}

