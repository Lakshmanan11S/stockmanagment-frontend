import { SetStateAction, useEffect, useState } from "react";
import "../Styles/Customerlist.css";
import axios from "axios";


interface SalesData {
  _id: string;
  CustomerName: string;
  Native: string;
  PhoneNo: string;
  ChasisNo: string;
  EngineNo: string;
  Model: string;
}
const Customerlist = () => {
  const [salesdata, setSalesdata] = useState<SalesData[]>([]);
  const [search,setSearch]=useState('')
  const [cutomercurrentpage,setCustomerCurrentpage]=useState(1)
  const [itemsPerpage]=useState(10)

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          "https://stock-e9md.onrender.com/api/getallsalesupdate"
        );
        if (response.data && Array.isArray(response.data.data)) {
          setSalesdata(response.data.data);
        } else {
          console.error("Unexpected API response structure:", response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchdata();
  }, []);

  const customerhandlePageChange=(PageNumber: SetStateAction<number>)=>{
    setCustomerCurrentpage(PageNumber)
  }

  const customerfilterData = salesdata.filter((data)=>{
    return search.toLowerCase()===''
    ? data
    :data.CustomerName.toLowerCase().includes(search.toLowerCase())||
    data.PhoneNo.toLowerCase().includes(search.toLowerCase())||
    data.Native.toLowerCase().includes(search.toLowerCase())||
    data.EngineNo.toLowerCase().includes(search.toLowerCase())||
    data.Model.toLowerCase().includes(search.toLowerCase())||
    data.Native.toLowerCase().includes(search.toLowerCase())||
    data.ChasisNo.toLowerCase().includes(search.toLowerCase())

   

})

     const indexofLastitem = cutomercurrentpage * itemsPerpage
     const indexofFirstitem = indexofLastitem - itemsPerpage
     const curtomercurrentData = customerfilterData.slice(indexofFirstitem,indexofLastitem)
     const totalPages = Math.ceil(customerfilterData.length /itemsPerpage)



  return (
    <div className="customerlist">
      <div className="customerlist head">
        <h1
          className="shadow"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70px",
          }}
        >
          Customer List
        </h1>
      </div>
      <div className="container customerlistcontent">
        <input placeholder="search" onChange={(e)=>setSearch(e.target.value)}></input>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Customer Name</th>
              <th>Native</th>
              <th>Phone No</th>
              <th>Chasis No</th>
              <th>Engine No</th>
              <th>Model</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>{
            curtomercurrentData.map((sale,index)=>(
              <tr key={sale._id}>
                <td>{indexofFirstitem+index + 1}</td>
                <td>{sale.CustomerName}</td>
                <td>{sale.Native}</td>
                <td>{sale.PhoneNo}</td>
                <td>{sale.ChasisNo}</td>
                <td>{sale.EngineNo}</td>
                <td>{sale.Model}</td>
                {/* <td className="customeraction">
                  <button>Edit</button>
                </td> */}
              </tr>
            ))
            }</tbody>
        </table>
        <div className="customerpageination gap-2">
          {[...Array(totalPages)].map((_,index)=>(
            <button key={index}
            onClick={()=>customerhandlePageChange(index+1)}
            className={cutomercurrentpage=== index + 1 ? "active":''}
            >{index +1}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customerlist;
