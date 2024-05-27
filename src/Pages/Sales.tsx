
import { useState } from 'react'
import '../Styles/Sales.css'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'


const Sales = () => {

  const initialstage={
    ChasisNo:"",
    EngineNo:"",
    Model:"",
    CustomerName:"",
    Native:"",
    PhoneNo:""
  }
  type SalesUpdateType = typeof initialstage;

  const [salesupdate,setSalesupdate]=useState<SalesUpdateType>(initialstage);
  const [error]=useState('')

  const handlechange =async(e: { target: { name: string; value: string } })=>{
    const {name,value}=e.target
      setSalesupdate({...salesupdate,[name]:value})
  }
  const handlesubmit = async (e: { preventDefault: () => void })=>{
    e.preventDefault()

    for(const key in salesupdate){
      if(salesupdate[key as keyof SalesUpdateType]===''){
        toast.error(`Please fill in ${key}`, { position: 'top-right' });
        return;
      }
    }

    try{
      const response = await axios.post("https://stock-e9md.onrender.com/api/salesupdate",salesupdate)
      toast.success(response.data.message,{position:'top-right'})
      setSalesupdate(initialstage)
    }catch(err){
    toast.error('An error occurred while creating the stock', { position: 'top-right' });
    console.log(err);
    }
  }


  return (
    <div className="sales">
      <div className="saleshead " >
        <h1 className=" shadow" style={{display:"flex",alignItems:"center",justifyContent:"center",height:"70px"}}>Sales Update</h1>
      </div>
      <div className=" container salesupdate ">
<form className="row g-3 form-div shadow" onSubmit={handlesubmit}>
  <div className="">
    <label htmlFor="inputChasisNo" className="form-label">Chasis No</label>
    <input 
    type="text" 
    className="form-control" 
    id="inputChasisNo"
    name='ChasisNo'
    value={salesupdate.ChasisNo}
    onChange={handlechange}
    />
  </div>
  <div className="">
    <label htmlFor="inputEngineNo" className="form-label">Engine No</label>
    <input type="text" 
    className="form-control" 
    id="inputEngineNo"
    name='EngineNo'
    value={salesupdate.EngineNo}
    onChange={handlechange}
    />
  </div>
  <div className="">
    <label htmlFor="inputModel" className="form-label">Model</label>
    <input 
    type="text" 
    className="form-control" 
    id="inputModel" 
    name='Model'
    value={salesupdate.Model}
    onChange={handlechange}
    />
  </div>
  <div className="">
    <label htmlFor="inputCustomerName" className="form-label">Customer Name</label>
    <input 
    type="text" 
    className="form-control" 
    id="inputCustomerName" 
    name='CustomerName'
    value={salesupdate.CustomerName}
    onChange={handlechange}
    />
  </div>

  <div className="">
    <label htmlFor="inputNative" className="form-label">Native</label>
    <input 
    type="text" 
    className="form-control" 
    id="inputNative"
    name='Native'
    value={salesupdate.Native}
    onChange={handlechange}
    />
  </div>
  <div className="">
    <label htmlFor="inputPhoneNo" className="form-label">PhoneNo</label>
    <input 
    type="text" 
    className="form-control" 
    id="inputPhoneNo"
    name='PhoneNo'
    value={salesupdate.PhoneNo}
    onChange={handlechange}
    />
  </div>
  <div className="">
    <button type="submit" className="btn btn-primary">Update</button>
  </div>
  {error && <div className='text-danger'>{error}</div>}
</form>

      </div>
      <Toaster/>
    </div>
  )
}

export default Sales