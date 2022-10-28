import Head from "next/head";
import React, { useState } from "react";
import Sidebar from "../../components/Bars/Sidebars";
import Navbar from "../../components/Bars/Navbar";
import api from "../../components/Hooks/instance";
import Componentcard from "../../components/Cards/BlogCard";
const Index = ({ data }) => {
    const [showSidebar, setShowSidebar] = useState(true);
    return (
        <main className="home-container ">
            <Head>
                <title>Next Js</title>
            </Head>
            <Sidebar show={showSidebar} setShow={setShowSidebar} />
            <section className="container-right pb-10 px-5">
                <Navbar show={showSidebar} setShow={setShowSidebar} />
                <div className={`${!showSidebar && "h-[100px]"}`}></div>
                <div style={{
                    backgroundImage: `url(https://camo.githubusercontent.com/54d64f1260052c96ce70c540bd64ee83edbe865aa765941bbc012821744fe265/68747470733a2f2f6173736574732e7a6569742e636f2f696d6167652f75706c6f61642f76313533383336313039312f7265706f7369746f726965732f6e6578742d6a732f6e6578742d6a732e706e67)`,
                    backgroundPosition: "center",
                    backgroundSize: "contain"
                }} className="card card-overlay h-28 mt-10 shadow">

                </div>
                {
                    data.length > 0 ?
                        <Componentcard data={data} />
                        : (
                            <>
                                <h1 className="text-center text-3xl mt-5 font-bold">No Post Found</h1>
                            </>
                        )}
            </section>
        </main>
    );
};

export default Index;

export async function getServerSideProps() {
    const url = `/api/development/next`;
    const data = await api.get(url).then((res) => res.data);
    return {
        props: { data }, // will be passed to the page component as props
    };
}
