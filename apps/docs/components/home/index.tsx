import { Logo } from "@components/logoHome";
import styles from "./hero.module.css";

export default function Hero() {
  const data = {
    subtitleOne: "Next Design Labs UI library that gives you the foundation ",
    subtitleTwo:
      "to build high-quality digital products faster and consistently.",
  };

  return (
    <div className={styles.root}>
      <div className={styles.tilesBg} />
      <div className={styles.tiles} />
      <div className={styles.content}>
        <div className={styles.headline}>
          <div className={styles.head}>
            <span>
              <Logo style={{ width: 300, height: 100 }} />
              <span className={styles.pops}>
                <span className={styles.pop} />
                <span className={styles.pop} />
                <span className={styles.pop} />
                <span className={styles.pop} />
                <span className={styles.pop} />
              </span>
            </span>
          </div>
        </div>
        <p className={styles.subtitle}>
          {data.subtitleOne}
          <br className="max-md:_hidden" />
          {data.subtitleTwo}
        </p>
      </div>
    </div>
  );
}
