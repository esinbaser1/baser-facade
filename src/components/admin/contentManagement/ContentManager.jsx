import  AdminNavigation from "../AdminNavigation";
import AddContent from "./AddContent";
import DisplayContent from "./DisplayContent";
const ContentManager = () => {
    return (
        <div>
            <h1>Gestion du contenu</h1>
            <AdminNavigation/>

            <AddContent/>
            <DisplayContent/>
            
        </div>
    );
};

export default ContentManager;