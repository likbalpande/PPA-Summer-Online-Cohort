import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { ViewPage } from "./pages/ViewPage";
import { CategoryViewPage } from "./pages/CategoryViewPage";
import { ProfilePage } from "./pages/ProfilePage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/:productId/view" element={<ViewPage />} />
                <Route path="/category" element={<CategoryViewPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<p>Oops... Page Not Found!</p>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
