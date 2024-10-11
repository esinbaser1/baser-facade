import AdminNavigation from "../AdminNavigation";
import AddSocialNetwork from "./AddSocialNetwork";
import DisplaySocialNetwork from "./DisplaySocialNetwork";

const SocialNetworkManager = () => {
  return (
    <div className="navigation-and-content">
      <AdminNavigation/>
      <div className="content-wrapper">
      <h1>Gestion des réseaux sociaux</h1>
      <div className="line"></div>
      <AddSocialNetwork/>
      <DisplaySocialNetwork/>
      </div>
    </div>
  );
};

export default SocialNetworkManager;