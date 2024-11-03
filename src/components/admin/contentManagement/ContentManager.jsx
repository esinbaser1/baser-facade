import { useEffect } from "react";
import AdminNavigation from "../AdminNavigation";
import AddContent from "./AddContent";
import DisplayContent from "./DisplayContent";
const ContentManager = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

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