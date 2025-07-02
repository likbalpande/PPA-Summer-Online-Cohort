import { useEffect, useState } from "react";

const App = () => {
    const [timeInSeconds, setTimeInSeconds] = useState(0);
    const [laps, setLaps] = useState([]);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    console.log("(outside) :  timeInSeconds:", timeInSeconds);
    console.log("(outside) : isTimerRunning:", isTimerRunning);

    useEffect(() => {
        let id = null;
        console.log("(inside) :  timeInSeconds:", timeInSeconds);
        console.log("(inside) : isTimerRunning:", isTimerRunning);

        if (isTimerRunning) {
            id = setTimeout(() => {
                setTimeInSeconds((prevTime) => {
                    return prevTime + 1;
                });
            }, 1000);
        }

        return () => {
            clearTimeout(id);
        };
    }, [isTimerRunning, timeInSeconds]); // if any of the dependency change --> then the callback function will run
    // every-time :: before running the callback function, react will always run the cleanup function from previous callback

    const seconds = timeInSeconds % 60; // derived variable (somehow dependent on state variable)
    const minutes = Math.floor(timeInSeconds / 60) % 60;
    const hours = Math.floor(timeInSeconds / 3600);

    const uniformSecondValue = seconds.toString().padStart(2, "0");

    const handleAddLap = () => {
        setLaps((prev) => {
            const newArr = [...prev];
            newArr.push(`${hours}:${minutes}:${uniformSecondValue}`);
            return newArr;
        });
    };

    const toggleTimer = () => {
        setIsTimerRunning((prev) => {
            return !prev;
        });
    };

    const handleReset = () => {
        setIsTimerRunning(false);
        setTimeInSeconds(0);
    };

    return (
        <div>
            <h2>
                {hours}:{minutes}:{uniformSecondValue}
            </h2>
            <button onClick={handleAddLap}>Lap</button>
            {isTimerRunning ? (
                <button onClick={toggleTimer}>PAUSE</button>
            ) : (
                <button onClick={toggleTimer}>PLAY</button>
            )}
            <button onClick={handleReset}>RESET</button>

            <ul>
                {laps.map((lap, idx) => {
                    return <li key={idx}>{lap}</li>;
                })}
            </ul>
        </div>
    );
};

export default App;
