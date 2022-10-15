import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import Sidebar from "../components/Bars/Sidebars";
import Navbar from "../components/Bars/Navbar";

import api from "../components/Hooks/instance";
import RequireAdmin from "../components/Hooks/RequireAdmin";
const Index = ({ data }) => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <main className="home-container ">
      <Head>
        <title>All Components</title>
      </Head>
      <Sidebar show={showSidebar} setShow={setShowSidebar} />
      <section className="container-right pb-10 px-5">
        <Navbar show={showSidebar} setShow={setShowSidebar} />
        <div className={`${!showSidebar && "h-[100px]"}`}></div>

        {
        data.length > 0 ? (
         <div className="grid grid-cols-2 gap-8">
         {
           data.map((comp) => (
            <div key={comp._id} className="p-5 shadow mt-5">
              <h1 className="text-2xl capitalize font-bold text-primary mb-3">
               {comp.category}
              </h1>
              <img className="mx-auto max-h-[400px]" src={comp.img} />
              <p className="mt-4 text-xl">{comp.desc}</p>
              <div className="flex justify-between">
                <Link href={`/get/${comp._id}`}>
                  <button className="btn btn-primary btn-sm mt-4">
                    Get Code
                  </button>
                </Link>
                <RequireAdmin>
                  <Link href={`/get/${comp._id}`}>
                    <button className="btn btn-success text-white btn-sm mt-4">
                      Edit Component
                    </button>
                  </Link>
                </RequireAdmin>
              </div>
            </div>
          ))
         }
         </div>
        ) : (
          <>
            <h1 className="text-center text-3xl mt-5 font-bold">No Component Found</h1>
          </>
        )}
      </section>
    </main>
  );
};

export default Index;

export async function getServerSideProps() {
  const url = `/api/components/`;
  const data = await api.get(url).then((res) => res.data);
  return {
    props: { data }, // will be passed to the page component as props
  };
}
