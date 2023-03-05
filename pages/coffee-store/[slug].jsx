import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import cls from "classnames";

import { useRouter } from "next/router";

import COFFEE_STORES_DATA from "../../data/coffee-stores.json";
import styles from "@/styles/CoffeeStore.module.scss";

export async function getStaticPaths() {
  const paths = COFFEE_STORES_DATA.map((store) => {
    return { params: { slug: store.slug } };
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      coffeeStore: COFFEE_STORES_DATA.find((store) => {
        return store.slug === params.slug;
      }),
    },
  };
}

const CoffeeStore = ({ coffeeStore }) => {
  const router = useRouter();
  //const { slug } = router.query;

  if (router.isFallback) {
    return <div>...Loading</div>;
  }

  const { name, address, neighbourhood, imgUrl } = coffeeStore;

  const handleUpvoteButton = () => {
    console.log("clicked");
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{coffeeStore.name}</title>
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
              src={imgUrl}
              alt={name}
              width={600}
              height={360}
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
            <div className={styles.text}>{neighbourhood}</div>
          </div>
          <div className={styles.sectionWrapper}>
            <Image
              src="/static/icons/star.svg"
              width={24}
              height={24}
              alt="star icon"
            />
            <div className={styles.text}>5</div>
          </div>
          <button onClick={handleUpvoteButton} className={styles.button}>
            click
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
