import { useNavigate } from "react-router-dom";
import DeleteInformationContact from "./DeleteInformationContact";

const DisplayInformationContactCard = ({information}) => {

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/modifierInformation/${information.id}`);
  };

  return (
    <tr>
      <td data-label="Numéro de téléphone">{information.mobile}</td>
      <td data-label="Email">{information.email}</td>
      <td data-label="Adresse">{information.address}</td>
      <td data-label="Action">
      <div className="button-group">
        <button onClick={handleEditClick}>Modifier</button>
      <DeleteInformationContact informationId={information.id} />
        </div>
      </td>
    </tr>
  );
};

export default DisplayInformationContactCard;