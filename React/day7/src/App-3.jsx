import { useState } from "react";

const App = () => {
    const [recipesArr, setRecipesArr] = useState("[]");
    console.log("🟡 : recipesArr:", recipesArr);

    const getData = async () => {
        try {
            const response = await fetch("https://dummyjson.com/recipes");
            const data = await response.json();
            console.log(data.recipes);
            setRecipesArr(JSON.stringify(data.recipes));
        } catch (err) {
            alert(`Api Error: ${err.message}`);
        }
    };

    getData();

    const arr = JSON.parse(recipesArr);

    return (
        <div>
            <h1>RECIPES...</h1>
            {arr.map((elem) => {
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
