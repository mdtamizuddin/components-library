import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Bars/Navbar";
import Sidebar from "../../components/Bars/Sidebars";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import api from "../../components/Hooks/instance";
import Loader from "../../components/Loader/Loader";

const GetCode = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { id } = router.query;

  const [codeData, setCodeDat] = useState({});

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get(`/api/components/one/${id}`).then((res) => {
        setLoading(false);
        setCodeDat(res.data);
      });
    }
  }, [id]);
  function createMarkup() {
    return { __html: codeData.desc };
  }
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
        <div className="content shadow p-3">
          <img src={codeData.img} alt="" />
          <p dangerouslySetInnerHTML={createMarkup()} className="text-xl text-secondary font-bold p-3 mb-3">

          </p>

          <section
            className={`${codeData.css && "grid grid-cols-1 lg:grid-cols-2 ga-10"
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
