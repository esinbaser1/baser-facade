import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { addContact, getContactTypeOfProject } from "../api/contactApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [typeOfProject, setTypeOfProject] = useState("");
  const [message, setMessage] = useState("");

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["test"],
    queryFn: getContactTypeOfProject,
    onSuccess: (data) => {
      if (data && data.length > 0) {
        setTypeOfProject(data[0].id); // Définit le premier type de projet comme sélectionné par défaut
      }
    },
  });

  // Mutation pour ajouter dans la base de donnée
  const mutation = useMutation({
    mutationFn: addContact,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries("test");
        setFirstname('');
        setLastname('');
        setEmail('');
        setMobile('');
        setCity('');
        setTypeOfProject(data.length > 0 ? data[0].id : "");
        setMessage('');

        toast.success(data.message);
      } else {
        toast.error(data.message || "Une erreur est survenue.");
      }
    },
    onError: (error) => {
      toast.error("Erreur de serveur : " + error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ firstname, lastname, email, mobile, city, type_of_project_id: typeOfProject, message });
  };

  if (isLoading) return "Chargement...";
  if (error) return "Une erreur s'est produite" + error.message;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">Prénom*</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <label htmlFor="lastname">Nom*</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

        <label htmlFor="email">Email*</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="mobile">Téléphone*</label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <label htmlFor="city">Ville*</label>
        <input
          type="text"
          id="city"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <label htmlFor="type_of_project">Type de projet*</label>

        <select
          name="type_of_project"
          id="type_of_project"
          value={typeOfProject}
          onChange={(e) => setTypeOfProject(e.target.value)}
        >
          {data &&
            data.map((top) => (
              <option key={top.id} value={top.id}>
                {top.name}
              </option>
            ))}
        </select>

        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button type="submit">Envoyer</button>
      </form>
      <ToastContainer />
    </>
  );
};

export default ContactUs;
