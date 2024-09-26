import { useState, useEffect } from 'react';
import { checkAdminAccess } from '../api/adminApi'; 
import PropTypes from 'prop-types';

const ProtectedRoutes = ({ children }) => {

  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccess = async () => {
      try {
        const response = await checkAdminAccess(); 
  
        // Vérifier si l'accès est accordé selon la réponse renvoyé par la case admin
        if (response.success && response.role === 'admin') {
          setHasAccess(true);
        } else {
          setHasAccess(false);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchAccess();
  }, []);
  

  if (isLoading) return <p>Vérification des droits d&apos;accès...</p>;

  if (error || !hasAccess) return <p>Accès refusé. Vous n&apos;avez pas les droits pour accéder à cette page.</p>;

  return children;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default ProtectedRoutes;
