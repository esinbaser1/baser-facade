import AdminNavigation from "../AdminNavigation";
import DisplayContact from "./DisplayContact";

const ContactManager = () => {
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
