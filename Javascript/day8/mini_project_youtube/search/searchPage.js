const searchQuery = window.location.search;
const queryArray = searchQuery.split("=");
const encodedSearchText = queryArray[queryArray.length - 1];
console.log("search text-->", decodeURI(encodedSearchText));

const rootElem = document.getElementById("search-cards-container");

const getSearchResults = () => {
    const request = fetch(`https://youtube138.p.rapidapi.com/search/?q=${encodedSearchText}&hl=en&gl=US`, {
        method: "GET",
        headers: {
            "x-rapidapi-host": "youtube138.p.rapidapi.com",
            "x-rapidapi-key": "1a1ab9338bmsh4bfff8e240b3a37p16e373jsn99f4b6020162",
        },
    });

    request
        .then((response) => {
            const pr2 = response.json();
            pr2.then((data) => {
                renderSearchResults(data);
            });
        })
        .catch((err) => {
            alert("Failed to get search results::", err.message);
        });
};

const renderSearchResults = (data) => {
    const { contents } = data;

    contents.forEach((obj) => {
        const { video } = obj;
        console.log("🟡 : video:", video);
        const { thumbnails, title, descriptionSnippet, publishedTimeText, stats, videoId } = video || {};

        const newDiv = document.createElement("div");
        newDiv.className = "search-result-video-card";

        newDiv.innerHTML = `
            <div class='thumbnail-container'>
                <img src='${thumbnails?.pop().url}' width='100%'>
            </div>
            <div class='video-data-container'>
                <p>${title}</p>
                <p>${stats?.views}</p>
                <p>${publishedTimeText}</p>
                <p>${descriptionSnippet}</p>
            </div>
        `;

        newDiv.addEventListener("click", () => {
            window.open(`../view/index.html?videoId=${videoId}`, "_self");
        });

        rootElem.append(newDiv);
    });
};

getSearchResults();
