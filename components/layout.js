import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

const name = "Michael Maye";
export const siteTitle = "Michael Maye";

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="images/LogoDesign.svg" />
      </Head>

      {home ? (
        <div className={styles.icon}>
          <img
            id="imageHome"
            className={utilStyles.iconImage}
            src="/images/LogoDesign.svg"
          ></img>
        </div>
      ) : (
        <div className={styles.icon}>
          <Link href="/">
            <img
              id="imageHome"
              className={utilStyles.iconImage}
              src="/images/LogoDesign.svg"
            ></img>
          </Link>
        </div>
      )}
      <main>{children}</main>
    </div>
  );
}
