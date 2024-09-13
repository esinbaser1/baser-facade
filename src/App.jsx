import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Home from "./pages/Home";
import OurServices from "./pages/OurServices";
import OurRealisations from "./pages/OurRealisations";
import ContactUs from "./pages/ContactUs";

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/connexion" element={<Login/>}/>
        <Route path="/nosServices" element={<OurServices/>}/>
        <Route path="/nosRealisations" element={<OurRealisations/>}/>
        <Route path="/contactezNous" element={<ContactUs/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
};

export default App;