import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./component/clientside/FormSend";
import Home from "./component/clientside/Home";
import Register  from "./component/clientside/Register"; 
import Dashboard from "./component/adminside/Dashboard";

function App() {

  return (

    <div>

      <BrowserRouter>

      
        <Routes>
          {/* <Route path="/" element={<Test/>}></Route> */}

          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>

      </BrowserRouter>



    </div>

  );

}

export default App;
