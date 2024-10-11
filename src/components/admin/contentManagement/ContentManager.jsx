import AdminNavigation from "../AdminNavigation";
import AddContent from "./AddContent";
import DisplayContent from "./DisplayContent";
const ContentManager = () => {
    return (
        <div className="navigation-and-content">
            <AdminNavigation/>
            <div className="content-wrapper">
                <h1>Gestion du contenu</h1>
                <div className="line"></div>
                <AddContent/>
                <DisplayContent/>
            </div>
        </div>
    );
};

export default ContentManager;