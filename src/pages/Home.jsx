import { Link } from "react-router-dom";
import { FaCalendar, FaTools, FaHandshake } from "react-icons/fa";
import { useEffect } from "react";

const Home = () => {
  useEffect(( ) => {
    window.scrollTo(0,0);
  }, []);

  return (
    <>
      <header className="home-header">
        <div className="home-header__info">
          <h1> BASER - Spécialiste en Ravalement et Rénovation de Façade à Bourgoin-Jallieu (Isère) </h1>
          <p> 22 ans d&apos;expérience pour embellir et protéger vos façades avec passion et savoir-faire.</p>
          <Link to="/nosServices" className="button-primary"> Nos services </Link>
        </div>
      </header>

      <section className="promise">
        <div className="promise__content">
          <h2>Notre promesse</h2>
          <p>Une promesse solide, tout comme  <Link to="/nosRealisations" className="realisation-link"> nos réalisations.</Link></p>
        </div>
        <div className="promise__grid">

          <div className="promise__card">
            <FaCalendar className="icon" />
            <h3>La longévité</h3>
            <p>22 ans d&apos;expertise dans ce domaine : un parcours qui inspire confiance.</p>
          </div>

          <div className="promise__card">
            <FaTools className="icon" />
            <h3>Expertise polyvalente</h3>
            <p>
              Ravalement de façade, isolation thermique extérieure, peinture, projection, talochage : des compétences variées au service de vos projets.
            </p>
          </div>

          <div className="promise__card">
            <FaHandshake className="icon" />
            <h3>Un suivi personnalisé</h3>
            <p>On vous accompagne à chaque étape, en proposant des solutions adaptées à vos besoins et à votre vision.</p>
          </div>

        </div>
      </section>

      <main className="main-content">
        <section>
          <h2>L&apos;Artisan de Confiance pour Vos Travaux de Façade à Bourgoin-Jallieu (Isère)</h2>
          <div className="line"></div>
          <p>
            Avec plus de 22 ans d&apos;expérience, nous avons fondé notre entreprise en 2023 pour offrir des solutions sur-mesure en ravalement de façade, isolation thermique, et peinture extérieure à Bourgoin-Jallieu et dans toute l&apos;Isère.
          </p>
          <br />
          <p>Chaque projet est réalisé avec soin pour garantir des résultats durables et esthétiques.</p>
        </section>

        <section>
          <h2>Nos savoir-faire</h2>
          <div className="line"></div>
          <ul>
            <li>Ravalement de façade</li>
            <li>Isolation thermique extérieure (ITE)</li>
            <li>Peinture extérieure</li>
            <li>Travaux de projection</li>
            <li>Talochage</li>
          </ul>
        </section>

        <section>
          <h2>Travaux de Façade en Isère et Rhône-Alpes - Lieu d&apos;Intervention</h2>
          <div className="line"></div>
          <p>
            Basés à Bourgoin-Jallieu, nous intervenons principalement en Isère et dans la région Rhône-Alpes, mais nous pouvons également nous déplacer au-delà pour tous types de travaux de façade, selon vos besoins.
          </p>
        </section>

        <section>
          <h2>Contactez-nous pour un Devis de Travaux de Façade</h2>
          <div className="line"></div>
          <p>
            Pour un diagnostic personnalisé ou une demande de devis, contactez-nous dès aujourd&apos;hui. Nous trouverons ensemble la meilleure solution pour vos travaux de façade.
          </p>
          <Link to="/contactezNous"> Contactez-nous </Link>
        </section>

      </main>
    </>
  );
};

export default Home;