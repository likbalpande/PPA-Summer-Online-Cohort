import { useParams } from "react-router";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const ViewPage = () => {
    const params = useParams();
    const { productId } = params;
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);

    const getProductInfo = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://dummyjson.com/products/${productId}`);
            const data = await response.json();
            setProduct(data);
            //...
        } catch (err) {
            alert(`Error getting product info: ${err.message}`);
            //...
        } finally {
            setTimeout(() => setLoading(false), 1500);
        }
    };

    useEffect(() => {
        getProductInfo();
    }, []);

    return (
        <>
            <Navbar />
            <main>
                {loading ? (
                    <div className="h-20 flex items-center justify-center">
                        <BeatLoader />
                    </div>
                ) : (
                    <>
                        <h1>{product.title}</h1>
                        <div className="flex flex-wrap gap-6 items-center justify-center">
                            {product.images?.map((elem) => {
                                return <img key={elem} src={elem} width="200" />;
                            })}
                        </div>
                    </>
                )}
            </main>
            <Footer />
        </>
    );
};

export { ViewPage };
