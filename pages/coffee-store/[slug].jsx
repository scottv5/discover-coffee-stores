import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import cls from "classnames";
import useSWR from "swr";

import styles from "@/styles/CoffeeStore.module.scss";

import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { StoreContext } from "../../context/store-contex";
import { isEmpty } from "../../utils/isEmpty";
import { fetcher } from "../../utils/fetcher";

export async function getStaticPaths() {
  const data = await fetchCoffeeStores();
  const paths = data.map((store) => {
    return { params: { slug: store.id } };
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const data = await fetchCoffeeStores();

  const foundCoffeeStoreById = data.find((store) => store.id === params.slug);

  return {
    props: {
      coffeeStore: foundCoffeeStoreById ? foundCoffeeStoreById : {},
    },
  };
}

const CoffeeStore = (initProps) => {
  const router = useRouter();

  const {
    state: { coffeeStoresInState },
  } = useContext(StoreContext);

  const [coffeeStore, setCoffeeStore] = useState(initProps.coffeeStore || {});
  const [voteCount, setVoteCount] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);

  const slug = router.query.slug;

  const fetchCoffeeStoreData = async (coffeeStore) => {
    const { image, locality, name, id, address } = coffeeStore;
    try {
      const res = await fetch(`/api/createCoffeeStore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          address,
          locality,
          imageUrl: image,
          voteCount: 0,
        }),
      });
      return await res.json();
    } catch (e) {
      console.log({ error: e });
    }
  };

  useEffect(() => {
    const asyncFunction = async () => {
      if (isEmpty(initProps.coffeeStore)) {
        if (coffeeStoresInState.length) {
          const foundCoffeeStoreById = coffeeStoresInState.find(
            (store) => store.id.toString() === slug
          );
          setCoffeeStore(foundCoffeeStoreById);
          fetchCoffeeStoreData(foundCoffeeStoreById);
        }
      } else fetchCoffeeStoreData(initProps.coffeeStore);
    };
    asyncFunction();
  }, [initProps, initProps.coffeeStore, coffeeStoresInState, slug]);

  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${slug}`, fetcher);

  useEffect(() => {
    if (!isEmpty(data) && !data.message) {
      setCoffeeStore({ ...data, image: data.imageUrl });
      setVoteCount(data.voteCount);
    }
    if (error)
      return console.log("something went wrong with finding coffee store data");
  }, [data, error]);

  const getNewVoteCount = async () => {
    const res = await fetch(`/api/favoriteCoffeeStoreById?id=${slug}`, {
      method: "PUT",
    });
    const data = await res.json();
    return data[0].voteCount;
  };

  if (router.isFallback) return <div>Loading...</div>;

  const { name = "", address = "", locality = "", image = "" } = coffeeStore;

  const handleUpvoteButton = async () => {
    setButtonLoading(true);
    const newVoteCount = await getNewVoteCount();
    setButtonLoading(false);
    setVoteCount(newVoteCount);
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">Back to Home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <div className={styles.storeImgWrapper}>
            <Image
              src={image || ""}
              alt={name}
              width={370}
              height={260}
              className={styles.storeImg}
            />
          </div>
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.sectionWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width={24}
              height={24}
              alt="paper airplane icon"
            />
            <div className={styles.text}>{address}</div>
          </div>
          <div className={styles.sectionWrapper}>
            <Image
              src="/static/icons/places.svg"
              width={24}
              height={24}
              alt="location icon"
            />
            <div className={styles.text}>{locality}</div>
          </div>
          <div className={styles.sectionWrapper}>
            <Image
              src="/static/icons/star.svg"
              width={24}
              height={24}
              alt="star icon"
            />
            <div className={styles.text}>{voteCount}</div>
          </div>
          <button onClick={handleUpvoteButton} className={styles.button}>
            {buttonLoading ? "Loading..." : " Upvote "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
