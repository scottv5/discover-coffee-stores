import Head from "next/head";
import Image from "next/image";

import Banner from "../components/banner.component";
import Card from "../components/card.component";
import styles from "@/styles/Home.module.css";
import COFFEE_STORES_DATA from "../data/coffee-stores.json";
import { fetchCoffeeStores } from "../lib/coffee-stores";

//import "tailwindcss/tailwind.css";

export async function getStaticProps(context) {
  const data = await fetchCoffeeStores();
  return {
    props: { coffeeStores: data },
  };
}

export default function Home({ coffeeStores }) {
  const handleOnBannerButtonClick = () => {
    console.log("button clicked");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>my app</title>
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={"Click me"}
          handleOnClick={handleOnBannerButtonClick}
        />
        <div className={styles.heroImage}>
          <Image
            src="/static/coffee.png"
            alt="coffee"
            width={440}
            height={440}
            className={styles.heroImage}
          />
        </div>

        {coffeeStores && coffeeStores.length ? (
          <>
            <div className={styles.heading2}>Lorem Ipsum Dolor</div>
            <div className={styles.cardLayout}>
              {coffeeStores.map(({ fsq_id, name, imgUrl, slug }) => {
                return (
                  <Card
                    name={name}
                    imgUrl={imgUrl}
                    slug={slug}
                    className={styles.card}
                    key={fsq_id}
                  ></Card>
                );
              })}
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
