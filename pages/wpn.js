import Head from "next/head";
import Layout from "../components/layout.js";
import utilStyles from "../styles/utils.module.css";
import { RemoveScroll } from "react-remove-scroll";
import {
  zeroRightClassName,
  fullWidthClassName,
  noScrollbarsClassName,
} from "react-remove-scroll-bar";

export default function Weapon() {
  return (
    <RemoveScroll>
      <body id="WeaponBody" className={utilStyles.weaponbody}>
        <div>
          <Head>
            <link rel="icon" href="images/forge.png" />
            <title>Item Generator</title>
          </Head>
        </div>

        <div className={fullWidthClassName} />
        <Layout>
          <div id="weapon" className={utilStyles.weapon}>
            <div id="textframe" className={utilStyles.textframe}>
            <div id="textBoard" className={utilStyles.textBoard}>
              <div id="titleframe" className={utilStyles.titleframe}>
                Vestibulum auctor dapibus neque.
              </div>
              <div
                id="descriptionframe"
                className={utilStyles.descriptionframe}
              >
                <p>
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Vestibulum tortor quam,
                  feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu
                  libero sit amet quam egestas semper. Aenean ultricies mi vitae
                  est. Mauris placerat eleifend leo. Quisque sit amet est et
                  sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum
                  sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum,
                  elit eget tincidunt condimentum, eros ipsum rutrum orci,
                  sagittis tempus lacus enim ac dui. Donec non enim in turpis
                  pulvinar facilisis. Ut felis. Praesent dapibus, neque id
                  cursus faucibus, tortor neque egestas augue, eu vulputate
                  magna eros eu erat. Aliquam erat volutpat. Nam dui mi,
                  tincidunt quis, accumsan porttitor, facilisis luctus, metus
                </p>
              </div>
              </div>
            </div>

            <div id="imageframe" className={utilStyles.imageframe}>
              <img
                id="image2"
                className={utilStyles.image2}
                src="/images/forge.png"
              ></img>
            </div>
          </div>
        </Layout>
      </body>
    </RemoveScroll>
  );
}
