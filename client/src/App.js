import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./component/clientside/FormSend";
import Home from "./component/clientside/Home";
import Register  from "./component/clientside/Register"; 
import Dashboard from "./component/adminside/Dashboard";
import Map from "./component/clientside/Map";
import View from "./component/clientside/360View";
import LocMap from "./component/clientside/LocMap";
import Login from "./component/clientside/Login";
import Tours from "./component/clientside/Tours";
import AllTours from "./component/adminside/AllTours";
import AddDest from "./component/adminside/AddDesPoint";
import AddTours from "./component/adminside/AddTours"
import ContactUs from "./component/clientside/ContactUs";
import ClientsDetails from "./component/adminside/ClientsDetails";
import UpdateTours from "./component/adminside/UpdateTours";
import Chatbot from "./component/clientside/Chatbot";
import AllContactUs from "./component/adminside/AllContactUs";
import ContactUsRes from "./component/adminside/ContactUsRes";
import AddVirtualTour from "./component/adminside/AddVirtualTour";
import FAQ from "./component/clientside/FAQ";






function App() {

  return (

    <div>

      <BrowserRouter>

      
        <Routes>
          {/* <Route path="/" element={<Test/>}></Route> */}

          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/map" element={<Map/>}></Route>
          <Route path="/view" element={<View/>}></Route>
          <Route path="/map2" element={<LocMap />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/tours" element={<Tours />}></Route>
          <Route path="/alltours" element={<AllTours />}></Route>
          <Route path="/adddes" element={<AddDest/>}></Route>
          <Route path="/addTours" element={<AddTours />}></Route>
          <Route path="/updateTours" element={<UpdateTours />}></Route>
          <Route path="/updateTours/:id" element={<UpdateTours />} />
          <Route path="/contactus" element={<ContactUs />}></Route>
          <Route path="/clientsdetails" element={<ClientsDetails/>}> </Route>
          <Route path="/chat" element={<Chatbot/>}></Route>

          <Route path="/contactus" element={<ContactUs />}></Route>
          <Route path="/allcontactus" element={<AllContactUs/>}></Route>
          <Route path="/contactusres" element={<ContactUsRes />} />
          
          <Route path="/faq" element={<FAQ/>}></Route>
          
          <Route path="/addvirtualtour" element={<AddVirtualTour />}></Route>
          <Route path="/clientsdetails" element={<ClientsDetails/>}> </Route>

        </Routes>

      </BrowserRouter>



    </div>

  );

}

export default App;
