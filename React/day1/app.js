// const domRoot = document.getElementById("root");

// const newListContainer = document.createElement("ul");
// domRoot.appendChild(newListContainer);

// const item1 = document.createElement("li");
// item1.innerText = "ITEM 1";
// const item2 = document.createElement("li");
// item2.innerText = "ITEM 2";

// newListContainer.appendChild(item1);
// newListContainer.appendChild(item2);

/* -----------------------------------------------

<ul>
    <li>Item - 1</li>
    <li>Item - 2</li>
</ul>
   ----------------------------------------------- */

// const domRoot = document.getElementById("root");
// const ReactRoot = ReactDOM.createRoot(domRoot);

// const item1 = React.createElement("li", {}, "Item - 1");

// const item2 = React.createElement("li", {}, "Item - 2");
// const listContainer = React.createElement("ul", {}, item1, item2);

// ReactRoot.render(listContainer);

// -------------------------------------------------

const domRoot = document.getElementById("root");
const ReactRoot = ReactDOM.createRoot(domRoot);

const item1 = {
    $$typeof: Symbol.for("react.element"),
    type: "li",
    key: null,
    ref: null,
    props: {
        children: "Item - 1",
    },
    _owner: null,
    _store: {},
};

const item2 = {
    $$typeof: Symbol.for("react.element"),
    type: "li",
    key: null,
    ref: null,
    props: {
        className: "fancy-text",
        children: "Item - 2",
    },
    _owner: null,
    _store: {},
};

const list = {
    $$typeof: Symbol.for("react.element"),
    type: "ul",
    key: null,
    ref: null,
    props: {
        children: [item1, item2],
    },
    _owner: null,
    _store: {},
};

ReactRoot.render(list);
