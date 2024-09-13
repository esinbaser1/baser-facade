import { useState } from "react";
import { useMutation } from "react-query";

export const useFormManager = (
  initialValues,
  mutationFn,
  onSuccessCallback,
  onErrorCallback
) => {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const mutation = useMutation(mutationFn, {
    onSuccess: (data) => {
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
      setError(null);
      setSuccessMessage(data.message);
    },
    onError: (error) => {
      if (onErrorCallback) {
        onErrorCallback(error);
      }
      setError(error.message);
      setSuccessMessage(null);
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
    mutation.mutate(values); // déclenche l'exécution de la mutation
  };

  // - La mutation prend ces données et les envoie à l'API pour vérifier les informations de connexion
  // - Ensuite, selon la réponse de l'API, les callbacks onSuccess ou onError sont exécutés, gérant le succès ou l'échec de la tentative de connexion (comme stocker le token ou afficher un message d'erreur).
  return {
    values,
    error,
    successMessage,
    handleChange,
    handleSubmit,
  };
};
