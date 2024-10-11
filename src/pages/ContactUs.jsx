import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { addContact, getContactTypeOfProject } from "../api/contactApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { getInformationContact } from "../api/informationContactApi";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [typeOfProject, setTypeOfProject] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["contactTypeOfProject"],
    queryFn: getContactTypeOfProject,
    onSuccess: (data) => {
      if (data && data.length > 0) {
        setTypeOfProject(data[0].id);
      }
    },
  });

  // Mutation pour ajouter dans la base de donnée
  const mutation = useMutation({
    mutationFn: addContact,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries("contact");
        setFirstname("");
        setLastname("");
        setEmail("");
        setMobile("");
        setCity("");
        setTypeOfProject(data.length > 0 ? data[0].id : "");
        setMessage("");
        setConsent(false);

        toast.success(data.message);
      } else {
        toast.error(data.message || "Une erreur est survenue.");
      }
    },
    onError: (error) => {
      toast.error("Erreur de serveur : " + error.message);
    },
  });

  const { data: informationData } = useQuery({
    queryKey: ["information"],
    queryFn: getInformationContact,
  });

  const informationList = informationData?.information?.length > 0 ? informationData.information[0] :  [];

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      firstname,
      lastname,
      email,
      mobile,
      city,
      type_of_project_id: typeOfProject,
      message,
      consent,
    });
  };

  if (isLoading) return "Chargement...";
  if (error) return "Une erreur s'est produite" + error.message;

  return (
    <div className="contact">
      <div className="contact__container">
      <div className="contact__content">
        <h1>Contactez-nous</h1>
        <div className="line"></div>
        <p className="text">
          Que vous soyez particulier ou entreprise, à la recherche d&apos;une
          société spécialisée dans la rénovation de façade à Bourgoin-Jallieu ou
          en Isère, Baser est à votre écoute.
        </p>

        <div className="contact__icon">
          <div className="contact-item">
            <FaPhoneAlt aria-label="Téléphone" className="icon" />
            <p>{informationList ? informationList.mobile : "Numéro non disponible"}</p>
          </div>

          <div className="contact-item">
            <MdEmail aria-label="Email" className="icon" />
            <p>{informationList ? informationList.email : "Email non disponible"}</p>
          </div>
        </div>
      </div>

      <form className="contact__form" onSubmit={handleSubmit}>
        <div className="contact__form-container">
          <div className="contact__form-group">
            <label htmlFor="lastname">Nom*</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <div className="contact__form-group">
            <label htmlFor="firstname">Prénom*</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div className="contact__form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="contact__form-group">
            <label htmlFor="mobile">Téléphone*</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div className="contact__form-group">
            <label htmlFor="typeOfProject">Type de projet*</label>
            <select
              name="typeOfProject"
              id="typeOfProject"
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
          </div>

          <div className="contact__form-group">
            <label htmlFor="city">Ville*</label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="contact__form-group contact__form-group--full-width">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="contact__form-footer">
          <div className="contact__form-checkbox">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />

            <label htmlFor="consent">
              J’accepte que les données saisies soient utilisées par www.baser.com pour me recontacter.
            </label>
          </div>
          <Link to="/politiqueConfidentialite">
            Voir la politique de confidentialité.
          </Link>
        </div>

        <div className="contact__button-container">
          <button type="submit">Envoyer</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ContactUs;
