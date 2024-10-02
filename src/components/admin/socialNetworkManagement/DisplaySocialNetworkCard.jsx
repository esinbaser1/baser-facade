import { useNavigate } from "react-router-dom";
import DeleteSocialNetwork from "./DeleteSocialNetwork";
const DisplaySocialNetworkCard = ({ socialNetwork }) => {

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/modifierReseauSocial/${socialNetwork.id}`)
  }
  return (
    <tr>
      <td>{socialNetwork.platform}</td>
      <td>{socialNetwork.url}</td>
      <td><button onClick={handleEditClick}>Modifier</button></td>
      <td><DeleteSocialNetwork socialNetworkId={socialNetwork.id} /></td>
    </tr>
  );
};

export default DisplaySocialNetworkCard;