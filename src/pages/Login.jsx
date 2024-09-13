import { useContext } from 'react';
import { useFormManager } from '../hooks/useFormManager';
import { loginUser } from '../api/loginAPi';
import { AuthContext } from '../context/AuthContext';


const Login = () => {
    const { login } = useContext(AuthContext
    );

    const initialValues = { email: "", password: "" };

    const onSuccess = (data) => {
        console.log("Login successful, received data:", data);
        if (data.success) {
            login(data.token, data.role); // Mise à jour du contexte avec les données d'authentification
        }
    };

    const { values, error, successMessage, handleChange, handleSubmit } = useFormManager(initialValues, loginUser, onSuccess);

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
