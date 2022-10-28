import Head from "next/head";
import React, { useState } from "react";
import Sidebar from "../../components/Bars/Sidebars";
import Navbar from "../../components/Bars/Navbar";

import api from "../../components/Hooks/instance";
import Componentcard from "../../components/Cards/Componentcard";
const Index = ({ data }) => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <main className="home-container ">
      <Head>
        <title>Contents Component</title>
      </Head>
      <Sidebar show={showSidebar} setShow={setShowSidebar} />
      <section className="container-right pb-10 px-5">
        <Navbar show={showSidebar} setShow={setShowSidebar} />
        <div className={`${!showSidebar && "h-[100px]"}`}></div>

        {
          data.length > 0 ? (
            <Componentcard data={data} />
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
  const url = `/api/components/content`;
  const data = await api.get(url).then((res) => res.data);
  return {
    props: { data }, // will be passed to the page component as props
  };
}
