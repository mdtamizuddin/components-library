import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import Sidebar from "../components/Bars/Sidebars";
import Navbar from "../components/Bars/Navbar";

import api from "../components/Hooks/instance";
import RequireAdmin from "../components/Hooks/RequireAdmin";
import toast from "react-hot-toast";
import Tutorials from "../components/Tutorials/Tutorials";
const Index = ({ data }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const deleteComp = (id) => {
    const confirm = window.confirm("Are You Sure")
    if (confirm) {
      api.delete(`/api/components/${id}`)
        .then(res => {
          if (res.status === 200) {
            toast.success("Deleted")
            window.location.reload()
          }
          else {
            toast.error(res.data.message)
          }
        })
    }
  }
  return (
    <main className="home-container ">
      <Head>
        <title>All Components</title>
      </Head>
      <Sidebar show={showSidebar} setShow={setShowSidebar} />
      <section className="container-right pb-10 px-5">
        <Navbar show={showSidebar} setShow={setShowSidebar} />
        <div className={`${!showSidebar && "h-[100px]"}`}></div>
        <div className="grid lg:grid-cols-2 grid-cols-1 mt-10 lg:mt-0 gap-5">
          <div className="p-4 overflow-y-auto lg:max-h-[90vh]">
            <Tutorials />
          </div>
          {
            data.length > 0 ? (
              <div>
                <h1 className="text-center text-4xl py-5 text-primary font-bold">Components</h1>
                <div className="grid grid-cols-1 gap-8 overflow-y-auto max-h-[80vh]">
                  {
                    data.map((comp) => {
                      function createMarkup() {
                        return { __html: comp.desc };
                      }
                      return (
                        <div key={comp._id} className={`p-5 shadow mt-5`}>
                          <h1 className="text-2xl capitalize font-bold text-primary mb-3">
                            {comp.category}
                          </h1>
                          {
                            comp.visitor > 10
                            &&
                            <p className="flex items-center p-3">
                              <i className="fa-solid fa-eye mr-2"></i>
                              {comp.visitor} Times
                            </p>
                          }
                          <img className="mx-auto max-h-[400px]" src={comp.img} />
                          <div className='mt-5 max-h-24 overflow-y-auto' dangerouslySetInnerHTML={createMarkup()}></div>
                          <div className='mt-3 flex'>
                                <div className="avatar">
                                    <div className="w-6  rounded-full">
                                        <img src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" />
                                    </div>
                                </div>
                                <p className='ml-2'>{comp.user ? comp?.user?.slice(0, 10) : 'Md Tamiz Uddin'} ...</p>
                            </div>
                          <div className="flex justify-between">
                            <Link href={`/get/${comp._id}`}>
                              <button className="btn btn-primary btn-sm mt-4">
                                Get Code
                              </button>
                            </Link>
                            <RequireAdmin>
                              <Link href={`/edit/${comp._id}`}>
                                <button className="btn btn-success text-white btn-sm mt-4">
                                  Edit Component
                                </button>
                              </Link>
                              <button onClick={() => deleteComp(comp._id)} className="btn btn-error text-white btn-sm mt-4">
                                Delete
                              </button>
                            </RequireAdmin>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-center text-3xl mt-5 font-bold">No Component Found</h1>
              </>
            )}
        </div>
      </section>
    </main>
  );
};

export default Index;

export async function getServerSideProps() {
  const url = `/api/components/`;
  const data = await api.get(url).then((res) => res.data);
  return {
    props: { data }, // will be passed to the page component as props
  };
}
