import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h4 className={styles.heading}>Categories</h4>
      <ul className={styles.list}>
        <li className={styles.active}>AI/ML</li>
        <li>Web3</li>
        <li>FinTech</li>
        <li>Sustainability</li>
        <li>HealthTech</li>
        <li>EdTech</li>
      </ul>

      <button className={styles.clearBtn}>Clear All Filters</button>
    </aside>
  );
};

export default Sidebar;
