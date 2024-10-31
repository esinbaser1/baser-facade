import { useState, useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/loginApi";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { auth, login } = useContext(AuthContext);
  const [values, setValues] = useState({ email: "", password: "" });
  // Redirection si l'utilisateur est déjà connecté
  useEffect(() => {
    if (auth.token) {
      navigate("/");
    }
  }, [auth.token, navigate]);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.success) {
        login(data.token, data.role, data.user_id); 
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error("Erreur de serveur : " + error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(values);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login__form">
        <h1>Connexion</h1>
        <div className="line"></div>
        <label htmlFor="email">Email*</label>
        <input
          id="email"
          type="text"
          onChange={handleChange}
          name="email"
          value={values.email}
          placeholder="exemple@domaine.com"
          aria-required="true"
        />

        <label htmlFor="password">Mot de passe*</label>
        <input
          id="password"
          type="password"
          onChange={handleChange}
          name="password"
          value={values.password}
          placeholder="Entrez votre mot de passe"
          aria-required="true"
        />
        <div className="button-container">
          <button type="submit">Connexion</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
