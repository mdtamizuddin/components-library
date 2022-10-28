import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Navbar from "../../components/Bars/Navbar";
import Sidebar from "../../components/Bars/Sidebars";
import RequireAdmin from "../../components/Hooks/RequireAdmin";
import EditComponent from "./../../components/Form/EditComponent";
const Add = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const { id } = useRouter().query;
  return (
    <div>
      <Head>
        <title>Editing Component {id}</title>
      </Head>
      <RequireAdmin>
        <main className="home-container ">
          <Sidebar show={showSidebar} setShow={setShowSidebar} />
          <section className="container-right pb-10 px-5">
            <Navbar show={showSidebar} setShow={setShowSidebar} />
            <div className={`${!showSidebar && "h-[100px]"}`}></div>
            <EditComponent />
          </section>
        </main>
      </RequireAdmin>
    </div>
  );
};

export default Add;
