import styles from "./Navbar.module.css";
import { Link } from "react-router";

const Navbar = () => {
    return (
        <nav className={styles.main_container}>
            <h3 className={styles.heading_title}>My App</h3>
            {/* <div className={styles.right_container}>
                <a href="/">Home:a</a>
                <a href="/search">Search:a</a>
                <a href="/about">About:a</a>
            </div> */}
            <div className={styles.right_container}>
                <Link to="/">Home</Link>
                <Link to="/search">Search</Link>
                <Link to="/about">About</Link>
            </div>
        </nav>
    );
};

export { Navbar };
