import { useNavigate } from "react-router-dom";
import DeleteSocialNetwork from "./DeleteSocialNetwork";
const DisplaySocialNetworkCard = ({ socialNetwork }) => {

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/modifierReseauSocial/${socialNetwork.id}`)
  }
  return (
    <tr>
      <td data-label="Nom du réseau social">{socialNetwork.platform}</td>
      <td data-label="Url">{socialNetwork.url}</td>
      <td data-label="Action">

      <div className="button-group">

        <button onClick={handleEditClick}>Modifier</button>
        <DeleteSocialNetwork socialNetworkId={socialNetwork.id} />

      </div>
    </td>

    </tr>
  );
};

export default DisplaySocialNetworkCard;