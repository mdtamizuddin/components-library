import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Bars/Navbar";
import Sidebar from "../../../components/Bars/Sidebars";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import api from "../../../components/Hooks/instance";
import Loader from "../../../components/Loader/Loader";

const ReadMore = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { id } = router.query;

    const [codeData, setCodeDat] = useState({});

    useEffect(() => {
        if (id) {
            setLoading(true);
            api.get(`/api/development/one/${id}`).then((res) => {
                setLoading(false);
                setCodeDat(res.data);
            });
        }
    }, [id]);
    if (loading) {
        return <Loader />
    }
    return (
        <div className="home-container">
            <Head>
                <title>Component {id}</title>
            </Head>
            <Sidebar show={showSidebar} setShow={setShowSidebar} />
            <section className="container-right pb-10 lg:px-5">
                <Navbar show={showSidebar} setShow={setShowSidebar} />
                <div className={`${!showSidebar && "h-[100px]"}`}></div>
                <p className="flex items-center p-3">
                    <i className="fa-solid fa-eye mr-2"></i>
                    {codeData.visitor} Times
                </p>
                <CodeMirror
                    value={codeData.desc}
                    height="auto"
                    theme={oneDark}
                    extensions={[javascript({ jsx: true })]}
                    onChange={(value, viewUpdate) => {
                        // setCode(value)
                    }}
                />
            </section>
        </div>
    );
};

export default ReadMore;
