// import Head from "next/head";
// import utilStyles from "../../styles/utils.module.css";
// import Layout, { siteTitle } from "../components/layout";

// export default function Weapon() {
//   return (
//    <Layout wpn>
//     <title>Weapon Generator</title>
//    </Layout>
//   );
// }

import Link from 'next/link';

export default function FirstPost() {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}
