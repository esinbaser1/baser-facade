import { useState, useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/loginAPi';

const Login = () => {
    const navigate = useNavigate();
    const { auth, login } = useContext(AuthContext); // Ajout de `auth` pour vérifier l'état d'authentification
    const [values, setValues] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Redirection si l'utilisateur est déjà connecté
    useEffect(() => {
        if (auth.token) {
            navigate("/");
        }
    }, [auth.token, navigate]);

    const mutation = useMutation(loginUser, {
        onSuccess: (data) => {
            if (data.success) {
                login(data.token, data.role); // Mise à jour du contexte avec les données d'authentification
                setSuccessMessage(data.message); // Utiliser le message de succès provenant du serveur
                setError(null);
                navigate("/");
            } else {
                setError(data.message);
                setSuccessMessage(null);
            }
        },
        onError: () => {
            setError("Erreur lors de la connexion. Veuillez réessayer.");
            setSuccessMessage(null);
        },
    });

    // Gestion des changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(values); // Déclenche l'exécution de la mutation
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    onChange={handleChange}
                    name="email"
                    value={values.email}
                    placeholder="exemple@domaine.com"
                    aria-required="true"
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={values.password}
                    placeholder="Entrez votre mot de passe"
                    aria-required="true"
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
        </section>
    );
};

export default Login;
