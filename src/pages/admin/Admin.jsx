import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavigation from "../../components/admin/AdminNavigation";
import { checkAdminAccess } from "../../api/adminApi";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const data = await checkAdminAccess();
        if (!data.success) {
          navigate("/"); // Rediriger si l'accès est refusé
        }
      } catch {
        navigate("/"); // Rediriger en cas d'erreur de la requête (ex: 401 Unauthorized)
      }
    };

    verifyAccess();
  }, [navigate]);

  return (
    <div>
      <h1>Administration</h1>
      <AdminNavigation />
    </div>
  );
};

export default Admin;
