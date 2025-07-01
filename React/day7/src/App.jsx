import { useEffect } from "react";
import { useState } from "react";

// re-render : re-run
const App = () => {
    console.log("A");
    const [recipesArr, setRecipesArr] = useState([]); // hook: special function given to us by react *

    console.log("B");
    const getData = async () => {
        try {
            console.log("H");
            const response = await fetch("https://dummyjson.com/recipes");
            const data = await response.json();
            console.log("G", data.recipes);
            setRecipesArr(data.recipes); // [] --> [...] !noted
        } catch (err) {
            alert(`Api Error: ${err.message}`);
        }
    };
    console.log("C");

    // useEffect(() => {
    //     // getData();
    // }); // 1. when you don't mention any dependency array --> the callback function will run every-time the component re-renders

    useEffect(() => {
        console.log("D");
        getData();
        console.log("E");
    }, []); // 2. when you mention EMPTY dependency array --> the callback function will run only on "INITIAL RENDER"

    // setTimeout(() => {
    //     getData();
    // }, 10000);

    console.log("F");
    return (
        <div>
            <h1>RECIPES...</h1>
            {recipesArr.map((elem) => {
                return (
                    <div key={elem.id}>
                        <h4>{elem.name}</h4>
                        <p>{elem.cuisine}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default App;
