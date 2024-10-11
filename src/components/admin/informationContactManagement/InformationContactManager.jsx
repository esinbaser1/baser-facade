import AdminNavigation from "../AdminNavigation";
import AddinformationContact from "./AddinformationContact";
import DisplayInformationContact from "./DisplayInformationContact";

const InformationContactManager = () => {
  return (
    <div className="navigation-and-content">
      <AdminNavigation/>
      <div className="content-wrapper">
      <h1>Gestion des informations de contact</h1>
      <div className="line"></div>
      <AddinformationContact/>
      <DisplayInformationContact/>
      </div>
    </div>
  );
};

export default InformationContactManager;