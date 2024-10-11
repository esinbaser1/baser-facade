import { useNavigate } from "react-router-dom";
import DeleteContent from "./DeleteContent";
import ArchiveContent from "./ArchiveContent";

const DisplayContentCard = ({ content }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/modifierContenu/${content.id}`);
  };

  return (
    <tr>
      <td data-label="Contenu">{content.content}</td>
      <td data-label="Section">{content.section_name}</td>
      <td data-label="Statut">{content.status_name}</td>
      <td data-label="Action">

        <div className="button-group">

          <button onClick={handleEditClick}>Modifier</button>
          <DeleteContent contentId={content.id} />
          {!content.is_archived && <ArchiveContent contentId={content.id} />}

        </div>

        
      </td>
    </tr>
  );
};

export default DisplayContentCard;
