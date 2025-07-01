const App = () => {
    console.log("A");

    // const getData = () => {
    //     console.log("B");
    //     const request = fetch("https://dummyjson.com/recipes");
    //     console.log("C");
    //     request
    //         .then((response) => {
    //             console.log("D");
    //             const pr = response.json();
    //             console.log("E");
    //             pr.then((data) => {
    //                 console.log("F");
    //                 console.log(data);
    //             });
    //         })
    //         .catch((err) => {
    //             console.log("G");
    //             alert(`Api Error: ${err.message}`);
    //         });
    //     console.log("H");
    // };

    // const getData = () => {
    //     console.log("B");
    //     const request = fetch("https://dummyjson.com/recipes");
    //     console.log("C");
    //     request
    //         .then((response) => {
    //             console.log("D");
    //             console.log("E");
    //             return response.json();
    //         })
    //         .catch((err) => {
    //             console.log("G");
    //             alert(`Api Error: ${err.message}`);
    //         })
    //         .then((data) => {
    //             console.log("F");
    //             console.log(data);
    //         });
    //     console.log("H");
    // };

    const getData = async () => {
        try {
            console.log("B");
            const response = await fetch("https://dummyjson.com/recipes");
            console.log("C");
            const data = await response.json();
            console.log("D");
            console.log(data);
        } catch (err) {
            console.log("G");
            alert(`Api Error: ${err.message}`);
        }
    };

    console.log("E");
    getData();
    console.log("F");

    return (
        <div>
            <h1>Hello!</h1>
        </div>
    );
};

export default App;
