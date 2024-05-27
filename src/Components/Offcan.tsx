


import axios from 'axios';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link} from 'react-router-dom';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';

interface OffcanProps {
  isOpen: boolean;
  toggle: () => void;
  id?: string;
}

const Offcan: React.FC<OffcanProps> = ({ isOpen, toggle, id }) => {
  const stock = {
    ChasisNo: '',
    EngineNo: '',
    MonthYear: '',
    Varient: '',
    Model: '',
    Option: ''
  };

  const [stocks, setStock] = useState(stock);



  const inputhandler = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setStock({ ...stocks, [name]: value });
  };

  useEffect(() => {
    if (id) {
      axios.get(`https://stock-e9md.onrender.com/api/stockcreategetone/${id}`)
        .then((response) => {
          setStock(response.data);
        })
        .catch((error) => {
          console.error('Error fetching stock:', error);
        });
    }
  }, [id]);

  const updatesubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://stock-e9md.onrender.com/api/stockcreateupdate/${id}`, stocks);
     
      toast.success(response.data.message, { position: 'top-right' });
      console.log(response);
    } catch (error) {
      console.error('Error updating stock:', error);
      console.error('Error updating stock:', error);
    }
  };

  return (
    <Offcanvas isOpen={isOpen} toggle={toggle} placement="end">
      <OffcanvasHeader toggle={toggle}>
        <div>
          <h5>Stock Edit</h5>
        </div>
      </OffcanvasHeader>
      <hr />
      <OffcanvasBody>
        <form onSubmit={updatesubmit}>
          <div className="">
            <label htmlFor="inputChasisNo" className="form-label">Chasis No</label>
            <input
              type="text"
              className="form-control"
              id="ChasisNo"
              name="ChasisNo"
              value={stocks.ChasisNo}
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
              value={stocks.EngineNo}
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
              value={stocks.MonthYear}
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
              value={stocks.Varient}
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
              value={stocks.Model}
              onChange={inputhandler}
            />
          </div>
          <div className="">
            <label htmlFor="inputOption" className="form-label">Option</label>
            <select id="Option" className="form-select" name="Option" value={stocks.Option} onChange={inputhandler}>
              <option value="">Choose...</option>
              <option value="2 Wheel Drive">2 Wheel Drive</option>
              <option value="4 Wheel Drive">4 Wheel Drive</option>
            </select>
          </div>
          <br></br>
          <div className="">
            <button type="submit" className="btn btn-primary">Update</button>
            <Link to={'/stocklist'}></Link>
          </div>
        </form>
        <Toaster/>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default Offcan;
