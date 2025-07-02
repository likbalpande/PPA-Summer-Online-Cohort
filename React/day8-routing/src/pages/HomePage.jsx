import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router";

const HomePage = () => {
    const [counter, setCounter] = useState(0); // hook: special given to you by react (facebook)
    const navigate = useNavigate(); // hook: special given to you by react-router ()

    const handleClick = () => {
        setCounter((prev) => prev + 1);
        if (counter >= 4) {
            navigate("/about");
        }
    };

    useEffect(() => {
        console.log("use-effect is running...");
        const id = setTimeout(() => {
            navigate("/about");
        }, 5000);

        return () => {
            console.log("removing homepage...");
            clearTimeout(id);
        };
    }, []);

    return (
        <div>
            <Navbar />
            <main>
                <h3 className={styles.heading_title}>Home Page :: {counter}</h3>
                <button onClick={handleClick}>Click Me</button>
            </main>
        </div>
    );
};

export { HomePage };
