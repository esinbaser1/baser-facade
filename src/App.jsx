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
          <Route path="/gestionImage" element={<ProtectedRoutes><ImageManager/></ProtectedRoutes>} />
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
