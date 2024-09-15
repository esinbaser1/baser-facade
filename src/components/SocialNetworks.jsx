import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { URL } from "../api/urlServer";
import { AuthContext } from "../context/AuthContext";

const SocialNetworks = () => {
  const { auth } = useContext(AuthContext);
  const [networks, setNetworks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSocialNetworks = async () => {
        console.log("Token utilisé :", auth.token);
      try {
        const response = await axios.get(`${URL}getSocialNetworks`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (response.data.success) {
          setNetworks(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des réseaux sociaux:", error);
        setError("Erreur lors du chargement des réseaux sociaux.");
      }
    };

    fetchSocialNetworks();

  }, [auth]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Réseaux Sociaux</h2>
      frf
      <ul>
        {networks.map((network) => (
            <div key={network.id}>
            <p >{network.platform}</p>
            <p>social networks</p>
            </div>
      
       
        ))}
      </ul>
    </div>
  );
};

export default SocialNetworks;
