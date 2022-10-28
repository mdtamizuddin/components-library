
import React, { useRef, useState } from "react";
import api from "../../components/Hooks/instance";
import { toast } from "react-hot-toast";
import routes1 from "../../components/Hooks/navigatons";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../components/Hooks/firebase.init";
import dynamic from "next/dynamic";
import Loader from "../../components/Loader/Loader";
import Head from "next/head";
import Sidebar from "../../components/Bars/Sidebars";
import Navbar from "../../components/Bars/Navbar";
const importJodit = () => import('jodit-react')
const JoditEditor = dynamic(importJodit, {
    ssr: false
})

const AddPost = ({ }) => {
    const [user, loading] = useAuthState(auth)
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [showSidebar, setShowSidebar] = useState(true);
    const formhandler = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const category = e.target.category.value;
        if (content && title && category) {
            const newComponent = {
                category,
                title,
                desc: content,
                user: user.email,
            };

            api.post("/api/development", newComponent).then((res) => {
                if (res.status === 200) {
                    e.target.reset();
                    toast.success("Data Added");
                    setContent("")
                } else {
                    toast.error(res.data.message);
                }
            });
            console.log(newComponent)
        }
        else {
            toast.error("Something wrong");
        }
    };
    if (loading) {
        return <Loader />
    }
    return (
        <main className="home-container ">
            <Head>
                <title>Add A Development Tips</title>
            </Head>
            <Sidebar show={showSidebar} setShow={setShowSidebar} />
            <section className="container-right pb-10 px-5">
                <Navbar show={showSidebar} setShow={setShowSidebar} />
                <div className={`${!showSidebar && "h-[100px]"}`}></div>
                <form className="comp-adding-form" onSubmit={formhandler}>
                    <h1 className="text-center text-3xl font-semibold">
                        Add A Development Tips
                    </h1>
                    <p>Category</p>
                    <select
                        name="category"
                        className="w-full p-3 shadow mt-3 rounded-md focus:outline-primary"
                    >
                        <option value={''}>Select a Category</option>
                        <option value={'react'}>React.js</option>
                        <option value={'next'}>Next.js</option>
                        <option value={'node'}>Node.js</option>
                        <option value={'mongodb'}>MongoDB</option>
                        <option value={'mongoose'}>Mongoose</option>

                    </select>
                    <p>Title</p>
                    <input className="textarea" name="title" required />
                    <p>About Component</p>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        tabIndex={1} // tabIndex of textarea
                        onChange={newContent => setContent(newContent)}
                    />
                    <button className="btn btn-primary mt-8">Submit This Component</button>
                </form>
            </section>

        </main>
    );
};

export default AddPost;
