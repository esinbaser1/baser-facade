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
      <td data-label="Image"><img src={`${URL}assets/img/${image.path}`} width="100px" alt="" /></td>
      <td data-label="Nom de l'image">{image.name}</td>
      <td data-label="Section">{image.section_name}</td>

      
      <td data-label="Action">
      <div className="button-group">
        <button onClick={handleEditClick}>Modifier</button>
    <DeleteImage imageId={image.id}/>
    </div>
    
    </td>
    </tr>

  );
};

export default DisplayImageCard;