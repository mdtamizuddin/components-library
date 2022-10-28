import React, { useRef, useState } from "react";
import api from "../../components/Hooks/instance";
import { toast } from "react-hot-toast";
import routes1 from "../../components/Hooks/navigatons";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../components/Hooks/firebase.init";
import dynamic from "next/dynamic";
import RequireAuth from "../../components/Hooks/RequireAuth";
import Sidebar from "../../components/Bars/Sidebars";
import Navbar from "../../components/Bars/Navbar";
import Head from "next/head";
const importJodit = () => import('jodit-react')
const JoditEditor = dynamic(importJodit, {
    ssr: false
})

const Request = ({ }) => {
    const [user, loading] = useAuthState(auth)
    const [imageMobile, setImgMobile] = useState("");
    const [imageDesctop, setImgDesktop] = useState("");
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const url = `https://api.imgbb.com/1/upload?key=3c0561dfb179ef4d990d0826ae879956`;
    const uploadImage = (formData, type) => {
        fetch(url, {
            method: "Post",
            body: formData,
        })
            .then((res) => res.json())
            .then((json) => {
                if (type === "desktop") {
                    setImgDesktop(json.data.url);
                } else if (type === "mobile") {
                    setImgMobile(json.data.url);
                }
            });
    };

    const formhandler = (e) => {
        e.preventDefault();
        const code = e.target.code.value;
        const style = e.target.style.value;
        const category = e.target.category.value;
        if (imageDesctop && code && category) {
            const newComponent = {
                category,
                img: imageDesctop,
                imgMobile: imageMobile,
                desc: content,
                code,
                css: style,
                user: user.email,
                status: "pending"
            };

            api.post("/api/components", newComponent).then((res) => {
                if (res.status === 200) {
                    e.target.reset();
                    toast.success("Data Added");
                    setImgDesktop("");
                    setImgMobile("");
                } else {
                    toast.error(res.data.message);
                }
            });
        } else if (!imageDesctop) {
            toast.error("Select An image for view of component");
        } else {
            toast.error("Something wrong");
        }
    };
    const [showSidebar, setShowSidebar] = useState(true);
    if (loading) {
        return "Loading...."
    }
    return (
        <main className="home-container ">
            <Head>
                <title>Request For Adding Component</title>
            </Head>
            <Sidebar show={showSidebar} setShow={setShowSidebar} />
            <section className="container-right pb-10 px-5">
                <Navbar show={showSidebar} setShow={setShowSidebar} />
                <div className={`${!showSidebar && "h-[100px]"}`}></div>
                <RequireAuth>
                    <div>
                        <form className="comp-adding-form" onSubmit={formhandler}>
                            <h1 className="text-center text-3xl font-semibold">
                                Component Adding Form
                            </h1>
                            <p>Category</p>
                            <select
                                name="category"
                                className="w-full p-3 shadow mt-3 rounded-md focus:outline-primary"
                            >
                                <option>Select a Category</option>
                                {routes1.map((nav) => (
                                    <option value={nav.path.split("/")[1]} key={nav.name}>
                                        {nav.path.split("/")[1]}
                                    </option>
                                ))}
                            </select>
                            <p>About Component</p>
                            <JoditEditor
                                ref={editor}
                                value={content}
                                tabIndex={1} // tabIndex of textarea
                                onChange={newContent => setContent(newContent)}
                            />
                            <p>Code Html / JSX</p>
                            <textarea className="textarea h-400" name="code" required />

                            <p>Style Sheet</p>
                            <textarea className="textarea h-400" name="style" />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-5">
                                {imageDesctop ? (
                                    <img
                                        width={1280}
                                        height={720}
                                        src={imageDesctop}
                                        alt="ImageDesktop"
                                    />
                                ) : (
                                    <div>
                                        <p>Image Desctop</p>
                                        <input
                                            type={"file"}
                                            onChange={async (e) => {
                                                const formData = new FormData();
                                                formData.append("image", e.target.files[0]);
                                                uploadImage(formData, "desktop");
                                            }}
                                        />
                                    </div>
                                )}
                                {imageMobile ? (
                                    <img
                                        width={1280}
                                        height={720}
                                        src={imageMobile}
                                        alt="Imagemobile"
                                    />
                                ) : (
                                    <div>
                                        <p>Image Mobile</p>
                                        <input
                                            type={"file"}
                                            onChange={async (e) => {
                                                const formData = new FormData();
                                                formData.append("image", e.target.files[0]);
                                                uploadImage(formData, "mobile");
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <button className="btn btn-primary mt-8">Submit This Component</button>
                        </form>
                    </div>
                </RequireAuth>
            </section>
        </main>
    );
};

export default Request;
