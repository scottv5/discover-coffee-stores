import styles from "@/styles/Banner.module.scss";

const Banner = ({ buttonText, handleOnClick }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>My</span>
        <span className={styles.title2}>Title</span>
      </h1>
      <p className={styles.subTitle}>Description goes here here here!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleOnClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
