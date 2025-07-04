const ProductCard = (props) => {
    const { title, price, thumbnail } = props;
    return (
        <div className="p-5 bg-amber-400 rounded-xl max-w-200">
            <p>{title}</p>
            <p>Rs. {price * 85}</p>
            <img src={thumbnail} />
        </div>
    );
};

export { ProductCard };
