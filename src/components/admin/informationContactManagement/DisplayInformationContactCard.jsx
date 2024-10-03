import { useNavigate } from "react-router-dom";
import DeleteInformationContact from "./DeleteInformationContact";

const DisplayInformationContactCard = ({information}) => {

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/modifierInformation/${information.id}`);
  };

  return (
    <tr>
      <td>{information.mobile}</td>
      <td>{information.email}</td>
      <td>{information.address}</td>
      <td>
        <button onClick={handleEditClick}>Modifier</button>
      </td>
      <td>
      <DeleteInformationContact informationId={information.id} />
      </td>
    </tr>
  );
};

export default DisplayInformationContactCard;