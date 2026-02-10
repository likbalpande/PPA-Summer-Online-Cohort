const getTrendingVideos = () => {
    const request = fetch("https://youtube138.p.rapidapi.com/v2/trending", {
        method: "GET",
        headers: {
            "x-rapidapi-host": "youtube138.p.rapidapi.com",
            "x-rapidapi-key": "59cef08928msh10810e6f3f58241p13fe36jsneaf0bb86af62",
        },
    });

    request.then((resp) => {
        const pr2 = resp.json();
        pr2.then((data) => {
            showTrendingVideos(data);
        });
    });
};

const showTrendingVideos = (data) => {
    const { list } = data;
    list.forEach((video) => {
        const { author, title, publishedText, viewCountText, authorThumbnails, videoThumbnails, videoId } = video;

        const newDiv = document.createElement("div");
        newDiv.className = "video-card";
        newDiv.innerHTML = `
        <div>
            <img class='video-thumbnail' src="${videoThumbnails[3].url}" >
        </div>
        <div class='card-footer-container'>
            <div class='video-author-img-container'>
                <img src="${authorThumbnails[1].url}" >
            </div>
            <div class='video-info-container'>
                <p>${title}</p>
                <div class='video-metadata-container'>
                    <p>${author}</p>
                    <div class='dot-v1'></div>
                    <p>${viewCountText}</p>
                    <div class='dot-v1'></div>
                    <p>${publishedText}</p>
                </div>
            </div>
        </div>
        `;

        newDiv.addEventListener("click", () => {
            window.open(`./view/index.html?videoId=${videoId}`, "_blank");
        });

        rootElem.appendChild(newDiv);
    });
};

const getSuggestionAPI = (searchText) => {
    console.log("API called", searchText);
    const request = fetch(`https://youtube138.p.rapidapi.com/auto-complete/?q=${searchText}&hl=en&gl=US`, {
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
                renderSuggestionsList(data);
            });
        })
        .catch((err) => {
            alert("Sugesstions Error:", err.message);
        });
};

let id = null;

const getSmartSuggestionAPI = (txt) => {
    clearTimeout(id);

    id = setTimeout(() => {
        getSuggestionAPI(txt);
    }, 600);
};

const rootElem = document.getElementById("root");
const searchSuggestionsContainerElement = document.getElementById("search-suggestions-container");
const searchInputElem = document.getElementById("search-text-input");

const handleAutoSuggest = (e) => {
    const searchText = e.target.value;

    getSmartSuggestionAPI(searchText);
};

const renderSuggestionsList = (obj) => {
    searchSuggestionsContainerElement.innerHTML = "";

    const { query, results } = obj;
    results.slice(0, 10).forEach((result) => {
        const newText = document.createElement("p");
        newText.innerHTML = `<b>${result.substring(0, query.length)}</b>${result.substring(query.length)}`;
        newText.addEventListener("click", (e) => {
            // console.log("click", e.target.innerText);
            searchInputElem.value = e.target.innerText;
            searchSuggestionsContainerElement.innerHTML = "";
        });

        searchSuggestionsContainerElement.appendChild(newText);
    });
};

const handleSearch = () => {
    const val = searchInputElem.value;
    window.open(`./search/?searchText=${val}`, "_self");
};

getTrendingVideos();
