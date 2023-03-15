import Image from "next/image";
import Link from "next/link";
import cls from "classnames";

import styles from "@/styles/Card.module.scss";

const Card = ({ name, imgUrl, slug }) => {
  return (
    <Link href={`/coffee-store/${slug}`} className={styles.cardLink}>
      <div className={cls("glass", styles.container)}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{name}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            className={styles.cardImage}
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={200}
            height={200}
            alt={name}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
