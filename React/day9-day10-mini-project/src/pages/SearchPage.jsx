import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useSearchParams } from "react-router";
import { ProductCard } from "../components/ProductCard";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const searchText = searchParams.get("text");

    const getSearchResults = async () => {
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchText}`);
        const data = await response.json();
        setProducts(data.products);
    };

    useEffect(() => {
        getSearchResults();
    }, [searchText]);

    return (
        <>
            <Navbar />
            <main className="flex flex-col gap-6">
                {products.map((elem) => {
                    // return <ProductCard title={elem.title} thumbnail={elem.thumbnail} />;
                    return <ProductCard key={elem.id} {...elem} />;
                })}
            </main>
            <Footer />
        </>
    );
};

export { SearchPage };
