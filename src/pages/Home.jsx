import { useContext } from "react";
import { useQuery } from "react-query";
import { getContent } from "../api/contentApi";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  // Vérifier si l'utilisateur est connecté
  const { user } = useContext(AuthContext); // Utiliser le contexte pour vérifier la connexion

  // Récupérer les contenus
  const { isLoading, error, data } = useQuery({
    queryKey: ['contents'],
    queryFn: getContent,
  });

  // Si le contenu est en cours de chargement ou si une erreur survient
  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Une erreur sest produite: {error.message}</p>;

  // Récupérer la liste des contenus
  const contentList = data && data.content ? data.content : [];

  // Si l'utilisateur n'est pas connecté, afficher seulement les 3 premiers contenus
  const visibleContent = user ? contentList : contentList.slice(0, 3);

  return (
    <div>
      <h2>Accueil</h2>
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        {visibleContent.length > 0 ? (
          visibleContent.map((item) => (
            <div key={item.id} style={cardStyle}>
              <h4>{item.content}</h4>
            </div>
          ))
        ) : (
          <p>Il ny a pas de contenu à afficher.</p>
        )}
      </div>
    </div>
  );
};

// Style des cartes (simple pour l'exemple)
const cardStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  borderRadius: "8px",
  width: "200px",
  textAlign: "center",
};

export default Home;
