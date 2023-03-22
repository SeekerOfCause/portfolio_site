import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/date";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={utilStyles.homeContainer}>
        <div className={utilStyles.homeTextFrame}>
          <div className={utilStyles.titleframe}>
            <Link className={utilStyles.titleframe} href={"/wpn"}>Weapon Generator</Link>
          </div>
          <div className={utilStyles.descriptionFrame}>
            <ul className={utilStyles.descriptionFrame}>
                {allPostsData.map(({ id, date, title }) => (
                  <li className={utilStyles.descriptionFrame} key={id}>
                    <Link className={utilStyles.descriptionframe} href={`/posts/${id}`}>{title}</Link>
                    <br />
                    <small className={utilStyles.lightText}>
                      <Date dateString={date} />
                    </small>
                  </li>
                ))}
              </ul>
          </div> 
        </div>
      </div>
    </Layout>
  );
}


