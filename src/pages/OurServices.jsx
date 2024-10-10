import { useQuery } from "react-query";
import { getImage } from "../api/imageApi";
import { URL } from "../api/urlServer";
import { HashLink as Link } from "react-router-hash-link"; 
import { useEffect } from "react";

const scrollWithOffset = (e) => {
  const yOffset = -100; 
  const y = e.getBoundingClientRect().top + window.scrollY + yOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
};

const OurServices = () => {

  useEffect(( ) => {
    window.scrollTo(0,0);
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ['images'],
    queryFn: getImage
  });

  // Liste des images filtrées par la section slug "page-nos-services"
  const imageList = data?.image?.filter(img => img.section_slug === 'page-nos-services') ?? [];
  
  // Obtenir les trois premières images
  const firstThreeImages = imageList.slice(0, 3);
  
  if (isLoading) return "Chargement...";
  if (error) return "Une erreur s'est produite: " + error.message;

  return (
    <div className="ourServices ourServices-container">
      <h1>
        Nos Prestations - Rénovation, Isolation Thermique, et Peinture Extérieure à Bourgoin-Jallieu (Isère)
      </h1>

      <nav className="ourServices__links">
        <Link  to="#article1" scroll={scrollWithOffset}>Rénovation de Façade</Link>
        <Link  to="#article2" scroll={scrollWithOffset}>Isolation Thermique par l’Extérieur (ITE)</Link>
        <Link  to="#article3" scroll={scrollWithOffset}>Peinture Extérieure pour Façades</Link>
      </nav>

      <main>
        <article className="article first-article" id="article1">
          <div className="block1">
            <h2>Rénovation & Ravalement de Façade à Bourgoin-Jallieu (Isère)</h2>
            <div className="line"></div>
            <p>Nous savons que vos façades subissent les assauts du temps et des éléments. C’est pourquoi nous intervenons pour les protéger, les décorer, et leur redonner leur éclat d&apos;origine. Et rassurez-vous, nous respectons toutes les normes en vigueur avec un souci du détail qui fait toute la différence.</p>
            <p>Vous envisagez un projet de rénovation ou ravalement de façade à Bourgoin-Jallieu ou en Isère ? Chez Baser, nous redonnons vie à vos façades, qu&apos;elles soient anciennes ou neuves, en utilisant des techniques adaptées à chaque type de bâtiment. Nos services augmentent non seulement l&apos;esthétique, mais aussi la valeur de votre maison.</p>
            <div className="spacer">
              <h3>Nos services incluent :</h3>
              <ul>
                <li>Maisons neuves : Pose d&apos;enduits sur parpaings, briques, béton cellulaire, maisons en bois, et plus encore.</li>
                <li>Maisons anciennes : Ravalement de façades en pierre, torchis, enduits anciens, ciments peints, et travaux d&apos;étanchéité.</li>
              </ul>
            </div>
          </div>

          <div className="block2">
            {firstThreeImages[0] && (
              <img src={`${URL}assets/img/${firstThreeImages[0].path}`} alt={firstThreeImages[0].altText} />
            )}
          </div>

          <div className="block4">
            <h3>Pour embellir et protéger vos façades, nous utilisons :</h3>
            <ul>
              <li>Peinture</li>
              <li>Enduit décoratif</li>
              <li>Enduit protecteur (minéral ou organique)</li>
              <li>Enduit de redressage</li>
              <li>Entoilage</li>
            </ul>
          </div>

          <div className="block5">
            <p>En plus des services de rénovation, Baser réalise des enduits de différentes finitions (grain, écrasée, grattée...) sur les maisons neuves, selon vos préférences. Nous utilisons des produits de marques réputées comme Parexlanko, ainsi que d&apos;autres leaders du marché, reconnus pour leur qualité et leur durabilité.</p>
          </div>
        </article>

        <article className="article secondary-article" id="article2">
          <div className="block1">
            <h2>Isolation Thermique par l’Extérieur (ITE) - Améliorez la performance énergétique de votre maison</h2>
            <div className="line"></div>
            <p>Vous en avez assez de voir vos factures de chauffage grimper ? L&apos;Isolation Thermique par l&apos;Extérieur (ITE) est la solution idéale pour améliorer la performance énergétique de votre maison.</p>
            <p>En réduisant les ponts thermiques et les déperditions de chaleur, cette technique vous permet de faire des économies d&apos;énergie tout en augmentant le confort de votre habitation.</p>

            <div className="spacer">
              <h3>Pourquoi choisir Isolation Thermique par l’Extérieur ?</h3>
              <ul>
                <li>Économies d&apos;énergie : Réduisez vos déperditions de chaleur et gardez votre maison bien au chaud.</li>
                <li>Confort optimal : Dites adieu aux ponts thermiques responsables de l&apos;humidité et des moisissures.</li>
                <li>Esthétique améliorée : Embellissez votre façade tout en augmentant la valeur de votre bien.</li>
              </ul>
            </div>
          </div>

          <div className="block2">
            {firstThreeImages[1] && (
              <img src={`${URL}assets/img/${firstThreeImages[1].path}`} alt={firstThreeImages[1].altText} />
            )}
          </div>
        </article>

        <article className="third-article" id="article3">
          <div className="block1">
            <h2>Peinture Extérieure pour Façades - Bourgoin-Jallieu & Isère</h2>
            <div className="line"></div>
            <p>Vous trouvez que vos murs extérieurs ont perdu de leur éclat au fil des ans ? Un coup de peinture peut faire des merveilles pour redonner vie à votre maison !</p>
            <p>Chez Baser, nous proposons une gamme de peintures pour façade, y compris des peintures anti-salissures, décoratives et à effets, adaptées à tous les types de bâtiments.</p>

            <div className="spacer">
              <h3>Nos services incluent :</h3>
              <ul>
                <li>Peinture anti-salissures</li>
                <li>Peinture décorative</li>
                <li>Peinture à effets</li>
                <li>Traitement des fissures</li>
              </ul>
            </div>
          </div>

          <div className="block2">
            {firstThreeImages[2] && (
              <img src={`${URL}assets/img/${firstThreeImages[2].path}`} alt={firstThreeImages[2].altText} />
            )}
          </div>
        </article>
      </main>
    </div>
  );
};

export default OurServices;
