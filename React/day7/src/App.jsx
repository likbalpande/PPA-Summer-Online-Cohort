import { useEffect } from "react";
import { useState } from "react";

const App = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("Hello");

        return () => {
            console.log("Goodbye", count);
        };
    });

    console.log("... component rendered or re-rendered", count);

    return (
        <div className="App">
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            {console.log("done...")}
        </div>
    );
};

export default App;
