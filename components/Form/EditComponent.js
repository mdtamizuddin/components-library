import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../Hooks/instance";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Hooks/firebase.init";
import RequireAdmin from "../Hooks/RequireAdmin";

const Addcomponent = ({}) => {
  const [loading1, setLoading] = useState(false);
  const { id } = useRouter().query;
  const [data, setData] = useState({});
  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get(`/api/components/one/${id}`).then((res) => {
        setLoading(false);
        setData(res.data);
      });
    }
  }, [id]);

  const formhandler = (e) => {
    e.preventDefault();
    const desc = e.target.desc.value;
    const code = e.target.code.value;
    const style = e.target.style.value;
    const imgMobile = e.target.imgMobile.value;
    const img = e.target.img.value;
    const category = e.target.category.value;
    const newComponent = {
      category,
      img,
      imgMobile,
      desc,
      code,
      css: style,
    };
    api.put(`/api/components/${id}`, newComponent).then((res) => {
      if (res.status === 200) {
        toast.success("Data Updated Done");
      } else {
        toast.error("Something went Wrong");
      }
    });
  };

  if (loading1) {
    return "Loading data ...........";
  }
  return (
    <RequireAdmin>
      <div>
        <form className="comp-adding-form" onSubmit={formhandler}>
          <h1 className="text-center text-3xl font-semibold">
            Component Editing Form
          </h1>

          <p>Category </p>
          <input
            defaultValue={data.category}
            className="textarea "
            name="category"
            required
          />
          <p>About Component</p>
          <textarea
            defaultValue={data.desc}
            className="textarea "
            name="desc"
            required
          />
          <p>Code Html / JSX</p>
          <textarea
            defaultValue={data.code}
            className="textarea h-400"
            name="code"
            required
          />

          <p>Style Sheet</p>
          <textarea
            defaultValue={data.css}
            className="textarea h-400"
            name="style"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-5">
            {!"ami ki manus" ? (
              <></>
            ) : (
              <div>
                <p>Image Desctop</p>
                <input defaultValue={data.img} type={"text"} name="img" />
              </div>
            )}
            {!"454" ? (
              <></>
            ) : (
              <div>
                <p>Image Mobile</p>
                <input
                  defaultValue={data.imgMobile}
                  type={"text"}
                  name="imgMobile"
                />
              </div>
            )}
          </div>
          <button className="btn btn-primary mt-8">
            Submit This Component
          </button>
        </form>
      </div>
    </RequireAdmin>
  );
};

export default Addcomponent;
