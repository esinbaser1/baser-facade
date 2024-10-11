import AdminNavigation from "../AdminNavigation";
import AddImage from "./AddImage";
import DisplayImage from "./DisplayImage";

const ImageManager = () => {
  return (
    <div className="navigation-and-content">
      <AdminNavigation/>
      <div className="content-wrapper">
      <h1>Gestion des images</h1>
      <div className="line"></div>
      <AddImage/>
      <DisplayImage/>
      </div>
      
    </div>
  );
};

export default ImageManager;