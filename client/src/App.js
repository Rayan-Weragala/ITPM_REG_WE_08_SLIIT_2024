import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./component/clientside/FormSend";
import Home from "./component/clientside/Home";
import Register  from "./component/clientside/Register"; 
import Dashboard from "./component/adminside/Dashboard";
import Map from "./component/clientside/Map";
import View from "./component/clientside/360View";
import LocMap from "./component/clientside/LocMap";
import Login from "./component/clientside/Login";
<<<<<<< Updated upstream
import Tours from "./component/clientside/Tours";
import AllTours from "./component/adminside/AllTours";
=======
import AddDest from "./component/adminside/AddDesPoint.jsx"




>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          <Route path="/tours" element={<Tours />}></Route>
          <Route path="/alltours" element={<AllTours />}></Route>
=======
          <Route path="/adddes" element={<AddDest/>}></Route>
>>>>>>> Stashed changes
        </Routes>

      </BrowserRouter>



    </div>

  );

}

export default App;
