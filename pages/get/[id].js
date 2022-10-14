import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Bars/Navbar";
import Sidebar from "../../components/Bars/Sidebars";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

const GetCode = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { id } = router.query;
  const [codeData, setCodeDat] = useState({});
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/api/components/${id}`)
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .then((data) => {
        setCodeDat(data);
      });
  }, [id]);

  if (loading) {
    return "Loading";
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

        <div className="content shadow p-3">
          <img src={codeData.img} alt="" />
          <p className=" p-3 mb-3">{codeData.desc}</p>
          <section
            className={`${
              codeData.css && "grid grid-cols-1 lg:grid-cols-2 ga-10"
            }`}
          >
            <div className="p-3">
              <h1 className="font-bold text-xl mb-3">Code Html / JSX</h1>
              <CodeMirror
                value={codeData.code}
                height="auto"
                theme={oneDark}
                extensions={[javascript({ jsx: true })]}
                onChange={(value, viewUpdate) => {
                  console.log("value:", value);
                }}
              />
            </div>
            {codeData.css && (
              <div className="p-3">
                <h1 className="font-bold text-xl mb-3">Code Style Sheet</h1>
                <CodeMirror
                  value={codeData.css}
                  height="auto"
                  theme={oneDark}
                  extensions={[javascript({ jsx: true })]}
                  onChange={(value, viewUpdate) => {
                    console.log("value:", value);
                  }}
                />
              </div>
            )}
          </section>
        </div>
      </section>
    </div>
  );
};

export default GetCode;
