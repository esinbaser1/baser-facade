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
      <td>{content.content}</td>
      <td>{content.section_name}</td>
      <td>{content.status_name}</td>
      <td>
        <button onClick={handleEditClick}>Modifier</button>
      </td>
      <td>
        <DeleteContent contentId={content.id} />
      </td>
      <td>
        {!content.is_archived && <ArchiveContent contentId={content.id} />}
      </td>
    </tr>
  );
};

export default DisplayContentCard;
