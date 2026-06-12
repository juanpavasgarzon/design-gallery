import styles from "./GalleryHero.module.css";

export function GalleryHero() {
  return (
    <header className={styles.hero}>
      <div className="wrap">
        <h1 className={styles.title}>
          A curated library of <em>design</em> work.
        </h1>
        <p className={styles.desc}>
          A personal archive of design work, organized by category — open any piece to explore it in a live, interactive viewer.
        </p>
        <div className={styles.rule} />
      </div>
    </header>
  );
}
