import Head from "next/head";

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Bars/Sidebars";
import Navbar from "../../components/Bars/Navbar";

import api from "../../components/Hooks/instance";

import Componentcard from "../../components/Cards/Componentcard";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../components/Hooks/firebase.init";
import Loader from "../../components/Loader/Loader";
const Index = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const [mycomp, setCOmp] = useState([])
    const [user, loading] = useAuthState(auth)

    useEffect(() => {
        if (user) {
            const url = `/api/components/my/${user.email}`;
            api.get(url).then(res => setCOmp(res.data))
        }
    }, [user]);
    if (loading) {
        return <Loader />
    }
    return (
        <main className="home-container ">
            <Head>
                <title>Modal</title>
            </Head>
            <Sidebar show={showSidebar} setShow={setShowSidebar} />
            <section className="container-right pb-10 px-5">
                <Navbar show={showSidebar} setShow={setShowSidebar} />
                <div className={`${!showSidebar && "h-[100px]"}`}></div>

                {
                    mycomp.length > 0 ? (
                        <Componentcard data={mycomp} />
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

