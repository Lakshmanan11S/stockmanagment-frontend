
import { useState } from 'react';
import '../Styles/StockCreate.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const StockCreate = () => {
  const initialstate = {
    ChasisNo: '',
    EngineNo: '',
    MonthYear: '',
    Varient: '',
    Model: '',
    Option: ''
  };

  type SalesUpdateType = typeof initialstate;

  const [stockcreate, setStockcreate] = useState<SalesUpdateType>(initialstate);
  const [error,setError]=useState('')

  const inputhandler = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setStockcreate({ ...stockcreate, [name]: value });
  };

  const handlesubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    for(const key in stockcreate){
      if(stockcreate[key as keyof SalesUpdateType]===''){
        toast.error(`please fill in ${key}`,{position:'top-right'})
        return
      }
    }

    try {
      const response = await axios.post('https://stock-e9md.onrender.com/api/stockcreate', stockcreate);
      toast.success(response.data.message, { position: 'top-right' });
      setStockcreate(initialstate); 
      setError('')
    } catch (err) {
      toast.error('An error occurred while creating the stock', { position: 'top-right' });
      console.log(err);
    }
  };

  return (
    <div className="stockcreate">
      <div className="stockhead">
        <h1 className="create " style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70px' }}>
          Stock Creation
        </h1>
      </div>
      <div className="container maincontent">
        <form className="row g-3 form-div shadow" onSubmit={handlesubmit}>
          <div className="">
            <label htmlFor="inputChasisNo" className="form-label">Chasis No</label>
            <input
              type="text"
              className="form-control"
              id="ChasisNo"
              name="ChasisNo"
              value={stockcreate.ChasisNo}
              onChange={inputhandler}
            />
          </div>
          <div className="">
            <label htmlFor="inputEngineNo" className="form-label">Engine No</label>
            <input
              type="text"
              className="form-control"
              id="EngineNo"
              name="EngineNo"
              value={stockcreate.EngineNo}
              onChange={inputhandler}
            />
          </div>
          <div className="">
            <label htmlFor="inputMonthYear" className="form-label">Month/Year</label>
            <input
              type="text"
              className="form-control"
              id="MonthYear"
              placeholder="10/24"
              name="MonthYear"
              value={stockcreate.MonthYear}
              onChange={inputhandler}
            />
          </div>
          <div className="">
            <label htmlFor="inputVarient" className="form-label">Varient</label>
            <input
              type="text"
              className="form-control"
              id="Varient"
              name="Varient"
              value={stockcreate.Varient}
              onChange={inputhandler}
            />
          </div>
          <div className="">
            <label htmlFor="inputModel" className="form-label">Model</label>
            <input
              type="text"
              className="form-control"
              id="Model"
              name="Model"
              value={stockcreate.Model}
              onChange={inputhandler}
            />
          </div>
          <div className="">
            <label htmlFor="inputOption" className="form-label">Option</label>
            <select id="Option" className="form-select" name="Option" value={stockcreate.Option} onChange={inputhandler}>
              <option value="">Choose...</option>
              <option value="2 Wheel Drive">2 Wheel Drive</option>
              <option value="4 Wheel Drive">4 Wheel Drive</option>
            </select>
          </div>
          <div className="">
            <button type="submit" className="btn btn-primary">Update</button>
          </div>
          {error && <div className='text-danger'>{error}</div>}
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default StockCreate;
