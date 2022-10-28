import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import Sidebar from "../../components/Bars/Sidebars";
import Navbar from "../../components/Bars/Navbar";

import api from "../../components/Hooks/instance";
import RequireAdmin from "../../components/Hooks/RequireAdmin";
const Index = ({ data }) => {
    const [showSidebar, setShowSidebar] = useState(true);
    return (
        <RequireAdmin>
            <main className="home-container ">
                <Head>
                    <title>Navbars</title>
                </Head>
                <Sidebar show={showSidebar} setShow={setShowSidebar} />
                <section className="container-right pb-10 px-5">
                    <Navbar show={showSidebar} setShow={setShowSidebar} />
                    <div className={`${!showSidebar && "h-[100px]"}`}></div>

                    {
                        data.length > 0 ?
                            (
                                data.map((nav) => {
                                    function createMarkup() {
                                        return { __html: nav.desc };
                                    }
                                    return (
                                        <div key={nav._id} className="p-5 shadow mt-5">
                                            <h1 className="text-2xl font-bold text-primary mb-3">
                                                Navbar
                                            </h1>
                                            {
                                                nav.imgMobile
                                                &&
                                                <h2 className="hidden lg:block">Swithch to the mobile mode for preview of mobile navigation</h2>
                                            }
                                            <div className={` ${nav.imgMobile ? "lg:block hidden" : "block"}`}>
                                                <h2 className="py-2 text-red-500 font-bold">
                                                    Image Desktop View
                                                </h2>
                                                <img className="mx-auto max-h-[500px]" src={nav.img} />
                                            </div>
                                            <div className={` ${nav.imgMobile ? "lg:hidden block" : "hidden"}`}>
                                                <h2 className="py-2 text-red-500 font-bold">
                                                    Image Mobile View
                                                </h2>
                                                <img className="mx-auto max-h-[500px]" src={nav.imgMobile} />
                                            </div>
                                            <div dangerouslySetInnerHTML={createMarkup()}></div>
                                            <div className="flex justify-between">
                                                <Link href={`/get/${nav._id}`}>
                                                    <button className="btn btn-primary btn-sm mt-4">
                                                        Get Code
                                                    </button>
                                                </Link>
                                                <RequireAdmin>
                                                    <Link href={`/edit/${nav._id}`}>
                                                        <button className="btn btn-success text-white btn-sm mt-4">
                                                            Edit Component
                                                        </button>
                                                    </Link>
                                                </RequireAdmin>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <>
                                    <h1 className="text-center text-3xl mt-5 font-bold">No Component Found</h1>
                                </>
                            )}
                </section>
            </main>
        </RequireAdmin>
    );
};

export default Index;

export async function getServerSideProps() {
    const url = `/api/components/status/pending`;
    const data = await api.get(url).then((res) => res.data);
    return {
        props: { data }, // will be passed to the page component as props
    };
}
