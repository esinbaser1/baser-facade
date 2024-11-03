import { useEffect } from "react";
import AdminNavigation from "../AdminNavigation";
import DisplayContact from "./DisplayContact";

const ContactManager = () => {

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);
  
  return (
    <div className="navigation-and-content">
      <AdminNavigation />
      <div className="content-wrapper">
      <h1>Gestion des messages</h1>
      <div className="line"></div>
      <DisplayContact />
      </div>
    </div>
  );
};

export default ContactManager;
