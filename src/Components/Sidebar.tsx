import { TfiMoney } from "react-icons/tfi";
import { CiViewList } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { IoCreateSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { VscListOrdered } from "react-icons/vsc";
import '../Styles/Sidebar.css'

const Sidebar = () => {
  const location = useLocation();
  const items = [
    {
      path: "/home",
      name: "Home",
      icon: <IoHomeOutline />,
    },
    {
      path: "/stockcreate",
      name: "StockCreate",
      icon: <IoCreateSharp />,
    },
    {
      path: "/stocklist",
      name: "StockList",
      icon: <CiViewList />,
    },
    {
      path: "/sales",
      name: "SalesUpdate",
      icon: <TfiMoney />,
    },
    {
      path: "/customerlist",
      name: "Customerlist",
      icon: <VscListOrdered />,
    },
  ];

  return (
    <div className="sidebar">
      <div className="menudetails">
        <ul className="list">
          {items.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? "active-link" : ""}
                aria-label={item.name}
              >
                {item.icon}
                <span className="menu-text">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
