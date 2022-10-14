import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import Sidebar from "../../components/Bars/Sidebars";
import Navbar from "../../components/Bars/Navbar";
import Addcomponent from "../../components/Form/Addcomponent";
import api from "../../components/Hooks/instance";
const Index = ({ data }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [show, setShow] = useState(false);
  return (
    <main className="home-container ">
      <Head>
        <title>Navbars</title>
      </Head>
      <Sidebar show={showSidebar} setShow={setShowSidebar} />
      <section className="container-right pb-10 px-5">
        <Navbar show={showSidebar} setShow={setShowSidebar} />
        <div className={`${!showSidebar && "h-[100px]"}`}></div>
        <button
          onClick={() => {
            show ? setShow(false) : setShow(true);
          }}
          className="btn btn-primary mx-auto block mt-5"
        >
          Add A Navbar
        </button>
        {show && <Addcomponent category={"navbar"} />}
        {data.map((nav) => (
          <div key={nav._id} className="p-5 shadow mt-5">
            <h1 className="text-2xl font-bold text-primary mb-3">Navbar</h1>
            <img className="mx-auto max-h-[500px]" src={nav.img} />
            <p className="mt-4 text-xl">{"Description"}</p>
            <Link href={`/get/${nav._id}`}>
              <button className="btn btn-primary btn-sm mt-4">Get Code</button>
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Index;

export async function getStaticProps() {
  const url = `/api/components/navbar`;
  const data = await api.get(url).then((res) => res.data);
  return {
    props: { data }, // will be passed to the page component as props
  };
}
