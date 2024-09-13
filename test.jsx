import { useState } from "react";
import { useMutation } from "react-query";
import { loginUser } from "../api/loginAPi";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const mutation = useMutation(loginUser, {
        onSuccess: (data) => { // data contient la réponse de l'API
            if (data.success) {
                localStorage.setItem('token', data.token);
                setError(false);
            } else {
            setError(data.message);
            }
        },
        onError: (error) => {
            setError(error.message);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ // déclenche l'exécution de la mutation
            email, // Ces objets sont passés à la fonction loginUser pour l'authentification
            password });
    };

// - La mutation prend ces données et les envoie à l'API pour vérifier les informations de connexion
// - Ensuite, selon la réponse de l'API, les callbacks onSuccess ou onError sont exécutés, gérant le succès ou l'échec de la tentative de connexion (comme stocker le token ou afficher un message d'erreur).

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    value={email}
                    placeholder="exemple@domaine.com"
                    aria-required="true" 
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    value={password}
                    placeholder="Entrez votre mot de passe"
                    aria-required="true" 
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </section>
    );
};

export default Login;

