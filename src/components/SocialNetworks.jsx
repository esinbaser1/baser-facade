// src/components/SocialNetwork.jsx
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchSocialNetworks } from '../api/socialNetworkApi';


const SocialNetwork = () => {
  const { auth } = useContext(AuthContext);
  const [socialNetworks, setSocialNetworks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSocialNetworks = async () => {
      try {
        const data = await fetchSocialNetworks(auth.token);
        if (data.success) {
          setSocialNetworks(data.data);
        } else {
          throw new Error(data.message || 'Erreur inconnue.');
        }
      } catch (error) {
        console.error('Erreur lors de la requête API :', error);
        setError(error.message);
      }
    };

    loadSocialNetworks();
  }, [auth.token]);

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <div>
      <h2>Nos Réseaux Sociaux</h2>
      <ul>
        {socialNetworks.map(network => (
          <div key={network.id}>
            <p>{network.platform}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SocialNetwork;
