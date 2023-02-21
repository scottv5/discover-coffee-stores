import Head from "next/head";
import styles from "@/styles/Home.module.css";
//import "tailwindcss/tailwind.css";
import Banner from "../components/banner/banner.component";

export default function Home() {
  const handleOnBannerButtonClick = () => {
    console.log("button clicked");
  };
  return (
    <>
      <Head>
        <title>my app</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.title}>my title</div>
        <Banner
          buttonText={"Click me"}
          handleOnClick={handleOnBannerButtonClick}
        />
      </div>
    </>
  );
}

// display: flex;
// flex-direction: column;
// justify-content: space-between;
// align-items: center;
// padding: 6rem;
// min-height: 100vh;
