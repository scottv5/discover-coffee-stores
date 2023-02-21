import styles from "./banner.module.scss";

const Banner = ({ buttonText, handleOnClick }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>My </span>
        <span className={styles.title2}>Title</span>
      </h1>
      <p className={styles.subTitle}>Description goes here here here!</p>
      <button className={styles.button} onClick={handleOnClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default Banner;
