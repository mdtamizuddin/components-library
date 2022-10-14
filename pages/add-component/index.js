import React, { useState } from "react";
import Navbar from "../../components/Bars/Navbar";
import Sidebar from "../../components/Bars/Sidebars";
import Addcomponent from "./../../components/Form/Addcomponent";
const Add = () => {
    const [showSidebar, setShowSidebar] = useState(true)
  return (
    <div>
      <main className="home-container ">
        <Sidebar show={showSidebar} setShow={setShowSidebar} />
        <section className="container-right pb-10 px-5">
          <Navbar show={showSidebar} setShow={setShowSidebar} />
          <div className={`${!showSidebar && "h-[100px]"}`}></div>
          <Addcomponent />
        </section>
      </main>
    </div>
  );
};

export default Add;
