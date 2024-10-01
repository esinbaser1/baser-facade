import { useNavigate } from "react-router-dom";
import {URL} from "../../../api/urlServer";
import DeleteImage from "./DeleteImage";

const DisplayImageCard = ({ image }) => {

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/modifierImage/${image.id}`);
  }

  return (
    <tr>
      <td><img src={`${URL}assets/img/${image.path}`} width="100px" alt="" /></td>
      <td>{image.name}</td>
      <td>{image.section_name}</td>
      <td><button onClick={handleEditClick}>Modifier</button></td>
      <td><DeleteImage imageId={image.id}/></td>
    </tr>

  );
};

export default DisplayImageCard;