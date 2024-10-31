import { useContext, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthContext } from "./context/AuthContext";
import { setupInterceptors } from "./api/apiClient";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Footer from "./components/Footer";
import Accessibility from "./components/Accessibility";

// Composants différés
const OurServices = lazy(() => import("./pages/OurServices"));
const OurRealisations = lazy(() => import("./pages/OurRealisations"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const LegalNotice = lazy(() => import("./pages/LegalNotice"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const ContentManager = lazy(() => import("./components/admin/contentManagement/ContentManager"));
const UpdateContent = lazy(() => import("./components/admin/contentManagement/UpdateContent"));
const ImageManager = lazy(() => import("./components/admin/imageManagement/ImageManager"));
const UpdateImage = lazy(() => import("./components/admin/imageManagement/UpdateImage"));
const SocialNetworkManager = lazy(() => import("./components/admin/socialNetworkManagement/SocialNetworkManager"));
const UpdateSocialNetwork = lazy(() => import("./components/admin/socialNetworkManagement/UpdateSocialNetwork"));
const InformationContactManager = lazy(() => import("./components/admin/informationContactManagement/InformationContactManager"));
const UpdateInformationContact = lazy(() => import("./components/admin/informationContactManagement/UpdateInformationContact"));
const ContactManager = lazy(() => import("./components/admin/contactManagement/ContactManager"));

const App = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    setupInterceptors(logout);
  }, [logout]);

  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Accessibility />

        <Suspense fallback={<p>Chargement...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/nosServices" element={<OurServices />} />
            <Route path="/nosRealisations" element={<OurRealisations />} />
            <Route path="/contactezNous" element={<ContactUs />} />
            <Route path="/politiqueConfidentialite" element={<PrivacyPolicy />} />
            <Route path="/mentionsLegales" element={<LegalNotice />} />

            {/* Routes protégées */}
            <Route path="/admin" element={<ProtectedRoutes><Admin /></ProtectedRoutes>} />
            <Route path="/gestionContenu" element={<ProtectedRoutes><ContentManager /></ProtectedRoutes>} />
            <Route path="/modifierContenu/:idContent" element={<ProtectedRoutes><UpdateContent /></ProtectedRoutes>} />
            <Route path="/modifierImage/:idImage" element={<ProtectedRoutes><UpdateImage /></ProtectedRoutes>} />
            <Route path="/gestionImage" element={<ProtectedRoutes><ImageManager /></ProtectedRoutes>} />
            <Route path="/gestionReseauSocial" element={<ProtectedRoutes><SocialNetworkManager /></ProtectedRoutes>} />
            <Route path="/gestionInformationContact" element={<ProtectedRoutes><InformationContactManager /></ProtectedRoutes>} />
            <Route path="/gestionContact" element={<ProtectedRoutes><ContactManager /></ProtectedRoutes>} />
            <Route path="/modifierReseauSocial/:idSocialNetwork" element={<ProtectedRoutes><UpdateSocialNetwork /></ProtectedRoutes>} />
            <Route path="/modifierInformation/:idInformation" element={<ProtectedRoutes><UpdateInformationContact /></ProtectedRoutes>} />
          </Routes>
        </Suspense>

        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;