// 1 ---> 0.25rem --> 4px
// 4 ---> 1rem --> 16px
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSearchParams } from "react-router";

const Navbar = () => {
    const [searchParams] = useSearchParams();
    const [searchText, setSearchText] = useState(searchParams.get("text") || "");
    let navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/search?text=${searchText}`);
    };

    return (
        <nav className="flex px-6 py-4 justify-between items-center bg-black text-white">
            <Link to="/">Shopping App</Link>
            <div>
                <input
                    className="px-2 py-1 border-1 border-amber-800 rounded-lg mr-2"
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                />
                <button
                    onClick={handleSearch}
                    className="px-2 py-1 border-1 border-amber-800 rounded-lg bg-amber-700 text-white cursor-pointer"
                >
                    Search
                </button>
            </div>
            <div className="h-8 w-8 bg-blue-600 rounded-full"></div>
        </nav>
    );
};

export { Navbar };
