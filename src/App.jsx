import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Home from "./pages/Home";
import OurServices from "./pages/OurServices";
import OurRealisations from "./pages/OurRealisations";
import ContactUs from "./pages/ContactUs";
import SocialNetworks from "./components/SocialNetworks";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/admin/Admin";
import ContentManager from "./components/admin/contentManagement/ContentManager";
import UpdateContent from "./components/admin/contentManagement/UpdateContent";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/nosServices" element={<OurServices />} />
          <Route path="/nosRealisations" element={<OurRealisations />} />
          <Route path="/contactezNous" element={<ContactUs />} />

          
          {/* <Route path="/admin" element={<Admin />}/> */}
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>}/>
          <Route path="/socialNetwork" element={<ProtectedRoute><SocialNetworks/></ProtectedRoute>}/>
          <Route path="/gestionContenu" element={<ProtectedRoute><ContentManager/></ProtectedRoute>}/>
          <Route path="/modifierContenu/:id" element={<ProtectedRoute><UpdateContent/></ProtectedRoute>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
