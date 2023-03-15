import Head from "next/head";
import Image from "next/image";

import Banner from "../components/banner.component";
import Card from "../components/card.component";
import styles from "@/styles/Home.module.css";
import useTrackLocation from "../hooks/use-track-location.js";

import { useEffect, useContext, useState } from "react";

import { fetchCoffeeStores } from "../lib/coffee-stores";
import { StoreContext, ACTION_TYPES } from "../context/store-contex";

export async function getStaticProps() {
  const data = await fetchCoffeeStores();
  return {
    props: { coffeeStores: data },
  };
}

export default function Home({ coffeeStores }) {
  const [coffeeStoresErr, setCoffeeStoresErr] = useState(null);
  const {
    state: { latLong, coffeeStoresInState },
    dispatch,
  } = useContext(StoreContext);

  const { handleTrackLocation, locErrMessage, isLoading } = useTrackLocation();

  useEffect(() => {
    const asyncFetchCoffeeStores = async () => {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetch(
            `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=6`
          ).then((res) => res.json());

          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: fetchedCoffeeStores,
          });
          setCoffeeStoresErr("");
        } catch (e) {
          console.log(e);
          setCoffeeStoresErr(e.message);
        }
      }
    };
    asyncFetchCoffeeStores();
  }, [latLong, dispatch]);

  const handleOnBannerButtonClick = () => {
    handleTrackLocation();
    if (locErrMessage) setCoffeeStoresErr(locErrMessage);
    console.log(coffeeStoresErr);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>my app</title>
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={isLoading ? "...Loading" : "Click me"}
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

        {coffeeStoresInState && coffeeStoresInState.length ? (
          <>
            <div className={styles.heading2}>Near You</div>
            <div className={styles.cardLayout}>
              {coffeeStoresInState.map(({ id, name, image }) => {
                return (
                  <Card
                    name={name}
                    imgUrl={image}
                    slug={id}
                    className={styles.card}
                    key={id}
                  ></Card>
                );
              })}
            </div>
          </>
        ) : null}

        {coffeeStores && coffeeStores.length ? (
          <>
            <div className={styles.heading2}>New York</div>
            <div className={styles.cardLayout}>
              {coffeeStores.map(({ id, name, image }) => {
                return (
                  <Card
                    name={name}
                    imgUrl={image}
                    slug={id}
                    className={styles.card}
                    key={id}
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
