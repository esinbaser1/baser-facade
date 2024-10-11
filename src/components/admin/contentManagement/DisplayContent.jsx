import DisplayContentCard from "./DisplayContentCard";
import { useQuery } from "react-query";
import { getContent } from "../../../api/contentApi";

const DisplayContent = () => {
    const { isLoading, error, data } = useQuery({
      queryKey: ['contents'],
      queryFn: getContent,
    });

    const contentList = data?.content?.length > 0 ? data.content : [];
  
    if (isLoading) return "Chargement...";
    if (error) return "Une erreur s'est produite: " + error.message;
  
    return (
      <div>
        <h2>Liste des contenus</h2>
        <table>
          <thead>
            <tr>
              <th scope="col">Contenu</th>
              <th scope="col">Section</th>
              <th scope="col">Statut</th>
              <th scope="col" colSpan={3} className="action-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {contentList ? (
              contentList.map((item) => (
                <DisplayContentCard key={item.id} content={item} />
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }} role="alert">
                  Il n&lsquo;y a pas de contenu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  

export default DisplayContent;
