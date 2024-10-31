import { useQuery } from "react-query";
import { getInformationContact } from "../api/informationContactApi";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const LegalNotice = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ["information"],
    queryFn: getInformationContact,
  });

  const informationList = data?.information ?? [];
  const information = informationList.length > 0 ? informationList[0] : null;

  if (isLoading) return "Chargement...";
  if (error) return "Une erreur s'est produite: " + error.message;

  return (
    <section className="legal">
      <Helmet>
        <title>Mentions Légales - Baser Travaux de Façade</title>
        <meta
          name="description"
          content="Consultez les mentions légales de Baser, entreprise spécialisée en rénovation et isolation de façades. Toutes les informations légales sur notre site et notre société"
        />
      </Helmet>
      <h1>Mentions Légales</h1>
      <div className="legal__container">
        <article className="items">
          <h2>1. Éditeur du site</h2>
          <hr className="line" />
          <p>Le présent site est édité par :</p>
          <ul>
            <li>
              <strong>Nom de l&apos;entreprise</strong> : BASER
            </li>
            <li>
              <strong>Forme juridique</strong> : Entrepreneur individuel
            </li>
            <li>
              <strong>Adresse du siège social</strong> :
              {information ? information.address : "Adresse non disponible"}
            </li>
            <li>
              <strong>Numéro de téléphone</strong> :
              {information ? information.mobile : "Numéro non disponible"}
            </li>
            <li>
              <strong>Email de contact</strong> :
              {information ? information.email : "Email non disponible"}
            </li>
            <li>
              <strong>Numéro SIRET</strong> : 94916979100017
            </li>
            <li>
              <strong>Directeur de la publication</strong> : Baser Yilmaz
            </li>
          </ul>
        </article>

        <article className="items">
          <h2>2. Hébergement du site</h2>
          <hr className="line" />
          <p>
            Les informations sur l&apos;hébergement du site seront disponibles
            prochainement.
          </p>
          <ul>
            <li>
              <strong>Hébergeur</strong> : À venir
            </li>
            <li>
              <strong>Adresse de l&apos;hébergeur</strong> : À venir
            </li>
            <li>
              <strong>Numéro de téléphone de l&apos;hébergeur</strong> : À venir
            </li>
          </ul>
        </article>

        <article className="items">
          <h2>3. Propriété intellectuelle</h2>
          <hr className="line" />
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, images,
            vidéos, logos, etc.) sont la propriété exclusive de BASER ou de ses
            partenaires. Toute reproduction, distribution, modification,
            adaptation, retransmission ou publication, même partielle, de ces
            contenus est strictement interdite sans l&apos;accord préalable
            écrit de BASER.
          </p>
        </article>

        <article className="items">
          <h2>4. Protection des données personnelles (RGPD)</h2>
          <hr className="line" />
          <p>
            BASER s&apos;engage à ce que la collecte et le traitement de vos
            données personnelles, effectués à partir de ce site, soient
            conformes au Règlement Général sur la Protection des Données (RGPD).
            Chaque formulaire limite la collecte de vos données personnelles au
            strict nécessaire et précise :
          </p>
          <ul>
            <li>Les objectifs pour lesquels ces données sont collectées,</li>
            <li>
              Le caractère obligatoire ou facultatif des informations demandées
              pour la gestion de votre demande,
            </li>
            <li>
              Les destinataires de ces informations (généralement, seules les
              équipes de BASER ont accès à ces données, sauf mention contraire).
            </li>
          </ul>
        </article>

        <article className="items">
          <h2>5. Confidentialité</h2>
          <hr className="line" />
          <p>
            BASER n&apos;enregistre pas d&apos;informations personnelles
            permettant l&apos;identification sans le consentement de
            l&apos;utilisateur, à l&apos;exception des formulaires que
            l&apos;utilisateur est libre de remplir. Ces informations ne seront
            utilisées qu&apos;avec votre accord pour vous adresser des
            courriers, brochures, devis, ou pour vous contacter.
          </p>
          <p>
            Les données personnelles recueillies sur ce site bénéficient de la
            protection de la loi &quot;Informatique et Libertés&quot; n° 78-17
            du 6 janvier 1978. Vous disposez d&apos;un droit d&apos;accès, de
            rectification, d&apos;opposition et de suppression de vos données
            personnelles sur simple demande à l&apos;adresse email suivante :{" "}
            {information ? information.email : "Email non disponible"}.
          </p>
        </article>

        <article className="items">
          <h2>6. Responsabilité</h2>
          <hr className="line" />
          <p>
            BASER décline toute responsabilité en cas de difficultés
            d&apos;accès au site ou d&apos;interruptions dans la connexion
            internet. BASER se réserve également le droit de modifier, suspendre
            ou interrompre temporairement ou définitivement tout ou partie du
            site sans préavis et sans que cela ne puisse engager sa
            responsabilité.
          </p>
        </article>

        <article className="items">
          <h2>7. Droit applicable</h2>
          <hr className="line" />
          <p>
            Le présent site ainsi que les présentes mentions légales sont soumis
            au droit français. En cas de litige relatif à l&apos;utilisation du
            site, les tribunaux français seront seuls compétents.
          </p>
        </article>

        <article className="items">
          <h2>8. Création du site</h2>
          <hr className="line" />
          <ul>
            <li>
              <strong>Créateur du site</strong> : Esin Baser
            </li>
            <li>
              <strong>Contact</strong> : esinbaser38@gmail.com
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
};

export default LegalNotice;
