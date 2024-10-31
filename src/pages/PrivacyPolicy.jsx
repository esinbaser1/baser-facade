import { useQuery } from "react-query";
import { getInformationContact } from "../api/informationContactApi";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
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
        <title>Politique de Confidentialité - Baser</title>
        <meta
          name="description"
          content=" Découvrez notre politique de confidentialité et les mesures que nous prenons pour protéger vos données personnelles sur le site de Baser, experts en travaux de façade."
        />
      </Helmet>
      <h1>Politique de Confidentialité</h1>
      <div className="legal__container">
        <article className="items">
          <h2>1. Collecte des données personnelles</h2>
          <hr className="line" />
          <p>
            Nous collectons vos données personnelles à travers notre formulaire
            de contact disponible sur le site afin de répondre à vos demandes et
            vous fournir des informations sur nos services. Les données
            collectées incluent votre nom, adresse email et numéro de téléphone.
          </p>
        </article>

        <article className="items">
          <h2>2. Finalité des données collectées</h2>
          <hr className="line" />
          <p>
            Les données personnelles que vous nous communiquez sont utilisées
            uniquement dans le cadre de la gestion de vos demandes via le
            formulaire de contact, et pour vous répondre ou vous fournir des
            informations supplémentaires concernant nos services.
          </p>
        </article>

        <article className="items">
          <h2>3. Durée de conservation des données</h2>
          <hr className="line" />
          <p>
            Nous conservons vos données personnelles uniquement pour la durée
            nécessaire au traitement de votre demande et conformément aux
            exigences légales. Une fois votre demande traitée, nous nous
            engageons à supprimer vos informations personnelles de nos bases de
            données dans un délai de 12 mois maximum.
          </p>
        </article>

        <article className="items">
          <h2>4. Partage des données personnelles</h2>
          <hr className="line" />
          <p>
            Les données collectées via notre formulaire de contact ne sont
            partagées avec aucune tierce partie à des fins commerciales ou
            publicitaires. Seules les équipes de BASER ayant besoin de ces
            informations dans le cadre de leur mission y ont accès.
          </p>
        </article>

        <article className="items">
          <h2>5. Sécurité des données</h2>
          <hr className="line" />
          <p>
            Nous mettons en place des mesures techniques et organisationnelles
            appropriées pour protéger vos données personnelles contre tout accès
            non autorisé, toute altération, divulgation ou destruction.
          </p>
        </article>

        <article className="items">
          <h2>6. Vos droits</h2>
          <hr className="line" />
          <p>
            Conformément à la réglementation sur la protection des données
            (RGPD), vous disposez d&apos;un droit d&apos;accès, de
            rectification, d&apos;opposition et de suppression de vos données
            personnelles. Vous pouvez exercer ces droits à tout moment en nous
            contactant à l&apos;adresse suivante :{" "}
            {information ? information.email : "Email non disponible"}.
          </p>
        </article>

        <article className="items full-width">
          <h2>7. Modifications de la Politique de Confidentialité</h2>
          <hr className="line" />
          <p>
            Nous nous réservons le droit de modifier cette Politique de
            Confidentialité à tout moment. Les modifications seront publiées sur
            cette page, et nous vous encourageons à la consulter régulièrement.
          </p>
        </article>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
