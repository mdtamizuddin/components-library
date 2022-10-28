import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import routes1 from "../Hooks/navigatons";
import Loader from '../Loader/Loader'
const Sidebar = ({ show, setShow }) => {
  const router = useRouter();
  const [load, setLoading] = useState(false)
  const loading = () => {
    setLoading(true)
  }
  setTimeout(() => {
    setLoading(false)
  }, 3000);
  return (
    <main className={`${show ? "sidebar" : "hidden"} `}>
      {
        load && <div className="absolute w-full bg-white h-full">
          <Loader />
        </div>
      }
      <div className="top-bar flex">
        <h2 className="text-xl font-bold flex flex-col text-center">
          <i className="fa-solid fa-user text-xl mr-2"></i>
          <span>Code House</span>
        </h2>
        {show ? (
          <div title="Show Sidebar" onClick={() => setShow(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 mt-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
              />
            </svg>
          </div>
        ) : (
          <div title="Hide " onClick={() => setShow(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 mt-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="font-circular dark-white side-bar-link-container overflow-y-auto">
        <h5 className="uppercase text-[12px] font-bold container-80 mt-10">
          Navigations
        </h5>
        <ul className="mt-5 sm-text side-bar-link">
          {routes1.map((route) => (
            <li
              onClick={loading}
              key={route.name}
              className={` ${router.pathname === route.path && "active-link"} `}
            >
              <Link href={route.path}>
                <a className="capitalize" >
                  <i className={`fa-solid mr-2 ${route.icon}`}></i>
                  {route.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Sidebar;


