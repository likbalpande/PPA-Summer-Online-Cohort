import { useNavigate } from "react-router";

const ProductCard = (props) => {
    const { title, price, thumbnail, id } = props;
    const navigate = useNavigate();

    const handleViewProduct = () => {
        navigate(`/${id}/view`);
    };

    return (
        <div className="mb-4 p-5 grid grid-cols-[200px_1fr] bg-amber-400/50 rounded-xl " onClick={handleViewProduct}>
            <div className=" h-40">
                <img src={thumbnail} className="h-full" />
            </div>
            <div>
                <p>{title}</p>
                <p>Rs. {price * 85}</p>
            </div>
        </div>
    );
};

export { ProductCard };
