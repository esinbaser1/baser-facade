import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Home from "./pages/Home";
import OurServices from "./pages/OurServices";
import OurRealisations from "./pages/OurRealisations";
import ContactUs from "./pages/ContactUs";
import Admin from "./pages/admin/Admin";
import ContentManager from "./components/admin/contentManagement/ContentManager";
import UpdateContent from "./components/admin/contentManagement/UpdateContent";
import { AuthContext } from "./context/AuthContext";
import { setupInterceptors } from "./api/apiClient"; 
import ProtectedRoutes from "./components/ProtectedRoutes";
import ImageManager from "./components/admin/imageManagement/ImageManager";
import UpdateImage from "./components/admin/imageManagement/UpdateImage";
import SocialNetworkManager from "./components/admin/socialNetworkManagement/SocialNetworkManager";
import UpdateSocialNetwork from "./components/admin/socialNetworkManagement/UpdateSocialNetwork";
import InformationContactManager from "./components/admin/informationContactManagement/InformationContactManager";
import UpdateInformationContact from "./components/admin/informationContactManagement/UpdateInformationContact";
import ContactManager from "./components/admin/contactManagement/ContactManager";

const App = () => {
  const { logout } = useContext(AuthContext); 

  useEffect(() => {
    setupInterceptors(logout);
  }, [logout]);

  return (
    <div>
      <BrowserRouter>
        <Navigation/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/nosServices" element={<OurServices />} />
          <Route path="/nosRealisations" element={<OurRealisations />} />
          <Route path="/contactezNous" element={<ContactUs />} />


          <Route path="/admin" element={<ProtectedRoutes><Admin/></ProtectedRoutes>} />
          <Route path="/gestionContenu" element={<ProtectedRoutes><ContentManager/></ProtectedRoutes>}/>
          <Route path="/modifierContenu/:idContent" element={<ProtectedRoutes><UpdateContent/></ProtectedRoutes>} />
          <Route path="/modifierImage/:idImage" element={<ProtectedRoutes><UpdateImage/></ProtectedRoutes>} />
          <Route path="/gestionImage" element={<ProtectedRoutes><ImageManager/></ProtectedRoutes>} />
          <Route path="/gestionReseauSocial" element={<ProtectedRoutes><SocialNetworkManager/></ProtectedRoutes>} />
          <Route path="/gestionInformationContact" element={<ProtectedRoutes><InformationContactManager/></ProtectedRoutes>} />
          <Route path="/gestionContact" element={<ProtectedRoutes><ContactManager/></ProtectedRoutes>} />
          <Route path="/modifierReseauSocial/:idSocialNetwork" element={<ProtectedRoutes><UpdateSocialNetwork/></ProtectedRoutes>} />
          <Route path="/modifierInformation/:idInformation" element={<ProtectedRoutes><UpdateInformationContact/></ProtectedRoutes>} />

          {/* <Route path="/gestionImage" element={<ImageManager/>} /> */}
          {/* <Route path="/admin" element={<Admin/>} /> */}
          {/* <Route path="/gestionContenu" element={<ContentManager/>}/> */}
          {/* <Route path="/modifierContenu/:idContent" element={<UpdateContent/>} /> */}

        </Routes>

      </BrowserRouter>
    </div>
  );
};

export default App;
