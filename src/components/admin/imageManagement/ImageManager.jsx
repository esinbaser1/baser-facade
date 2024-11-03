import { useEffect } from "react";
import AdminNavigation from "../AdminNavigation";
import AddImage from "./AddImage";
import DisplayImage from "./DisplayImage";

const ImageManager = () => {

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

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