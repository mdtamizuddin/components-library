import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = ({ show, setShow }) => {
  const router = useRouter();
  // console.log(router.pathname)
  return (
    <main className={`${show ? "sidebar" : "hidden"} `}>
      <div className="top-bar flex">
        <h2 className="text-xl font-bold flex flex-col text-center">
          <i className="fa-solid fa-user text-xl mr-2"></i>
          <span>Compo House</span>
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
              key={route.name}
              className={` ${router.pathname === route.path && "active-link"} `}
            >
              <Link href={route.path}>
                <a className="capitalize">
                  <i className={`fa-solid mr-2 ${route.icon}`}></i>
                  {route.name}
                </a>
              </Link>
            </li>
          ))}
          <hr className="bg-dark-white mt-4" />
          <li>
            <span className="text-sm">APPS</span>
          </li>

          {routes2.map((route) => (
            <li
              key={route.name}
              className={` ${router.pathname === route.path && "active-link"} `}
            >
              <Link href={route.path}>
                <a className="capitalize">
                  <i className={`fa-solid mr-2 ${route.icon}`}></i>
                  {route.name}
                </a>
              </Link>
            </li>
          ))}
          <hr className="bg-dark-white mt-4" />
          <li>
            <span className="text-sm uppercase">Pages</span>
          </li>
          {Pages.map((route) => (
            <li
              key={route.name}
              className={` ${router.pathname === route.path && "active-link"} `}
            >
              <Link href={route.path}>
                <a className="capitalize">
                  <i className={`fa-solid mr-2 ${route.icon}`}></i>
                  {route.name}
                </a>
              </Link>
            </li>
          ))}
          <hr className="bg-dark-white mt-4" />
          <li>
            <span className="text-sm uppercase">user interface</span>
          </li>
          {userInterFace.map((route) => (
            <li
              key={route.name}
              className={` ${router.pathname === route.path && "active-link"} `}
            >
              <Link href={route.path}>
                <a className="capitalize">
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

const routes1 = [
  {
    name: "Template",
    path: "/",
    icon: "fa-layer-group",
  },
  {
    name: "navbars",
    path: "/navbars",
    icon: "fa-bars",
  },
  {
    name: "Hero Area",
    path: "/layout",
    icon: "fa-layer-group",
  },
  {
    name: "mailbox",
    path: "/mailbox",
    icon: "fa-envelope",
  },
  {
    name: "ecommarce",
    path: "/ecommarce",
    icon: "fa-cart-shopping",
  },
];
const routes2 = [
  {
    name: "calander",
    path: "/calander",
    icon: "fa-calendar-days",
  },
  {
    name: "messanger",
    path: "/messanger",
    icon: "fa-comment-dots",
  },
  {
    name: "contact",
    path: "/contact",
    icon: "fa-address-book",
  },
  {
    name: "file manager",
    path: "/file-manager",
    icon: "fa-file-lines",
  },
  {
    name: "todo",
    path: "/todo",
    icon: "fa-clipboard",
  },
  {
    name: "News Feed",
    path: "/news",
    icon: "fa-newspaper",
  },
];
const Pages = [
  {
    name: "invoices",
    path: "/invoices",
    icon: "fa-file-invoice-dollar",
  },
  {
    name: "event",
    path: "/event",
    icon: "fa-calendar-check",
  },
  {
    name: "404 Page",
    path: "/notfound",
    icon: "fa-address-book",
  },
  {
    name: "Projects",
    path: "/projects",
    icon: "fa-diagram-project",
  },
  {
    name: "coming Soon",
    path: "/upcomming",
    icon: "fa-rocket",
  },
  {
    name: "Profile",
    path: "/profile",
    icon: "fa-user",
  },
];
const userInterFace = [
  {
    name: "elements",
    path: "/elements",
    icon: "fa-elementor",
  },
  {
    name: "Typography",
    path: "/typography",
    icon: "fa-font",
  },
  {
    name: "icons",
    path: "/icons",
    icon: "fa-icons",
  },
  {
    name: "tables",
    path: "/tables",
    icon: "fa-table",
  },
];
