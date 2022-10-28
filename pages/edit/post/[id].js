import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../../components/Bars/Navbar";
import Sidebar from "../../../components/Bars/Sidebars";
import api from "../../../components/Hooks/instance";
import RequireAdmin from "../../../components/Hooks/RequireAdmin";
import dynamic from "next/dynamic";
import Loader from "../../../components/Loader/Loader";
import toast from "react-hot-toast";

const importJodit = () => import('jodit-react')
const JoditEditor = dynamic(importJodit, {
    ssr: false
})

const Edit = () => {
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
                        <Addcomponent />
                    </section>
                </main>
            </RequireAdmin>
        </div>
    );
};

export default Edit;


const Addcomponent = ({ }) => {
    const [loading1, setLoading] = useState(false);
    const { id } = useRouter().query;
    const [refach, setrefach] = useState({})
    const editor = useRef(null);

    const [data, setData] = useState({});
    useEffect(() => {
        if (id) {
            setLoading(true);
            api.get(`/api/development/one/${id}`).then((res) => {
                setLoading(false);
                setData(res.data);
            });
        }
    }, [id]);
    useEffect(() => {
        if (refach) {
            setLoading(true);
            api.get(`/api/development/one/${id}`).then((res) => {
                setLoading(false);
                setData(res.data);
            });
        }
    }, [refach]);
    const formhandler = (e) => {
        e.preventDefault();
        const title = e.target.title.value

        const category = e.target.category.value;
        const newComponent = {
            title,
            category,
            desc: content ? content : data.desc,
        };
        api.put(`/api/development/${id}`, newComponent).then((res) => {
            if (res.status === 200) {
                setrefach(res.data)
                toast.success("Data Updated Done");
            } else {
                toast.error("Something went Wrong");
            }
        });
    };
    const [content, setContent] = useState("");
    if (loading1) {
        return <Loader />
    }
    return (
        <RequireAdmin>
            <div>
                <form className="comp-adding-form" onSubmit={formhandler}>
                    <h1 className="text-center text-3xl font-semibold">
                        Component Editing Form
                    </h1>
                    <p>Title </p>
                    <input
                        defaultValue={data.title}
                        className="textarea"
                        name="status"
                        required
                    />
                    <p>Category </p>
                    <input
                        defaultValue={data.category}
                        className="textarea "
                        name="category"
                        required
                    />
                    <div className="overflow-hidden">
                        <p>About Component</p>
                        <JoditEditor
                            ref={editor}
                            value={content ? content : data.desc}
                            onChange={newContent => setContent(newContent)}
                            tabIndex={1}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary mt-8">
                        Submit This Component
                    </button>
                </form>
            </div>
        </RequireAdmin>
    );
};

