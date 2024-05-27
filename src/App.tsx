


import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./Components/Sidebar";
import StockCreate from "./Pages/StockCreate";
import StockList from "./Pages/StockList";
import Sales from "./Pages/Sales";
import Customerlist from "./Pages/Customerlist";

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home />} />
            <Route path="/stockcreate" element={<StockCreate />} />
            <Route path="/stocklist" element={<StockList />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/customerlist" element={<Customerlist />} />
       

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
