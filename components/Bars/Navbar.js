import Link from "next/link";
import auth from "../Hooks/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import RequireAdmin from "../Hooks/RequireAdmin";
import { signOut } from "firebase/auth";
const Navbar = ({ show, setShow }) => {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return;
  }
  return (
    <main className={`navbar-home navbar ${!show && "fixed"} z-50`}>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search"
          className="focus:outline-primary"
        />
        <button>
          <i className="fa-solid right-7 fa-magnifying-glass"></i>
        </button>
      </div>
      <div className="px-10 flex options-topbar">
        <div>
          <div className="avatar online placeholder cursor-pointer">
            <div className="text-neutral-content rounded-full w-9">
              <i className="fa-solid text-neutral fa-envelope"></i>
            </div>
          </div>
          <div className="avatar online placeholder cursor-pointer">
            <div className="text-neutral-content rounded-full w-9">
              <i className="fa-solid text-neutral fa-bell"></i>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          {user ? (
            <div className="dropdown ml-2 dropdown-end  ">
              <label tabIndex={0} className="rounded-btn cursor-pointer">
                <div className="avatar placeholder mx-3">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                    <span>
                      {user.displayName
                        ? user.displayName.slice(0, 1)
                        : user.email.slice(0, 1)}
                    </span>
                  </div>
                </div>
                {user.displayName ? user.displayName : user.email.slice(0, 15)}
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
              >
                <li>
                  <a>Profile</a>
                </li>
                <RequireAdmin>
                  <li>
                    <Link href={"/add-component"}>
                      <a>Add A Component</a>
                    </Link>
                  </li>
                </RequireAdmin>
                <li>
                  <a
                    onClick={() => {
                      signOut(auth);
                      window.location.reload();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <Link href={"/user/login"}>
              <button className="btn btn-sm mx-5">Log in</button>
            </Link>
          )}
          <i
            onClick={() => {
              show ? setShow(false) : setShow(true);
            }}
            className="fa-solid ml-5 text-2xl hover:text-primary cursor-pointer fa-bars"
          ></i>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
