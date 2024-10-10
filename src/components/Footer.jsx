import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useQuery } from "react-query";
import { getInformationContact } from "../api/informationContactApi";

const Footer = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['information'],
        queryFn: getInformationContact,
    });

    const informationList = data?.information ?? [];
    
    const contactInfo = informationList.length > 0 ? informationList[0] : null;
    
    if (isLoading) return "Chargement...";
    if (error) return "Une erreur s'est produite: " + error.message;

    return (
        <footer className="footer">
            <div className="footer__container">

                <div className="footer__logo">
                    <p className="logo">Baser</p>
                </div>

                <div className="footer__contact">
                    <h3>Coordonnées</h3>
                    <div className="line"></div>


                    <div className="contact-item">
                        <FaPhoneAlt aria-label="Téléphone" />
                        <p>{contactInfo ? contactInfo.mobile : "Numéro non disponible"}</p>
                    </div>

                    <div className="contact-item">
                        <MdEmail aria-label="Email" />
                        <p>{contactInfo ? contactInfo.email : "Email non disponible"}</p>
                    </div>

                    <div className="contact-item">
                        <FaLocationDot aria-label="Adresse" />
                        <p>{contactInfo ? contactInfo.address : "Adresse non disponible"}</p>
                    </div>

                </div>

                <nav className="footer__nav">
                    <h3>Navigation</h3>
                    <div className="line"></div>

                    {/* <div className="footer__links"> */}
                            <Link to="/">Accueil</Link>
                            <Link to="/nosServices">Nos Services</Link>
                            <Link to="/nosRealisations">Nos Réalisations</Link>
                            <Link to="/contactezNous">Contactez-nous</Link>
                    {/* </div> */}
                </nav>
            </div>

            <div className="footer__legal">

                <Link to="/politiqueConfidentialite">
                    Politique de confidentialité 
                </Link>
                <span>|</span>

                <Link to="/mentionsLegales">
                    Mentions légales
                </Link>
            </div>

            <div className="footer__copyright">
                &copy; 2024 Baser. Tous droits réservés.
            </div>
        </footer>
    );
};

export default Footer;
