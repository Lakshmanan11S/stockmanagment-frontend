import { SetStateAction, useEffect, useState } from "react";
import "../Styles/Stocklist.css";
import axios from "axios";
import Offcan from "../Components/Offcan";

interface StockData {
  _id:string;
  ChasisNo: string;
  EngineNo: string;
  MonthYear: string;
  Varient: string;
  Model: string;
  Option: string;
}

const StockList = () => {
  const [dataa, setData] = useState<StockData[]>([]);
  const [isopenoffcan, setIsopenoffcan] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedId, setSelectedId] = useState<string | null>(null); // Track selected ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://stock-e9md.onrender.com/api/getstockcreate"
        );
        if (response.data && Array.isArray(response.data.data)) {
          setData(response.data.data);
        } else {
          console.error("Unexpected API response structure:", response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const toggleoffcan = (id: string | null = null) => {
    setSelectedId(id);
    setIsopenoffcan(!isopenoffcan);
  };

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const filteredData = dataa.filter((data) => {
    return search.toLowerCase() === ''
      ? data
      : data.ChasisNo.toLowerCase().includes(search.toLowerCase()) ||
          data.EngineNo.toLowerCase().includes(search.toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="stocklist">
      <div className="listhead">
        <h1
          className="list shadow"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70px",
          }}
        >
          Stock List
        </h1>
      </div>
      <div className="container stocklistcontent">
        <input onChange={(e) => setSearch(e.target.value)} placeholder="search"></input>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Chasis No</th>
              <th>Engine No</th>
              <th>Month/Year</th>
              <th>Varient</th>
              <th>Model</th>
              <th>Option</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((data, index) => (
              <tr key={data._id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{data.ChasisNo}</td>
                <td>{data.EngineNo}</td>
                <td>{data.MonthYear}</td>
                <td>{data.Varient}</td>
                <td>{data.Model}</td>
                <td>{data.Option}</td>
                <td className="action">
                  <button onClick={() => toggleoffcan(data._id)}>Edit</button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      {isopenoffcan && <Offcan isOpen={isopenoffcan} toggle={toggleoffcan} id={selectedId ?? ''}/>}
    </div>
  );
};

export default StockList;
