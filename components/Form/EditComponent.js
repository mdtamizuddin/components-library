import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import api from "../Hooks/instance";
import RequireAdmin from "../Hooks/RequireAdmin";
import dynamic from "next/dynamic";
import Loader from "../Loader/Loader";
const importJodit = () => import('jodit-react')
const JoditEditor = dynamic(importJodit, {
  ssr: false
})

const Addcomponent = ({ }) => {
  const [loading1, setLoading] = useState(false);
  const { id } = useRouter().query;
  const [refach, setrefach] = useState({})
  const editor = useRef(null);

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
  useEffect(() => {
    if (refach) {
      setLoading(true);
      api.get(`/api/components/one/${id}`).then((res) => {
        setLoading(false);
        setData(res.data);
      });
    }
  }, [refach]);
  const formhandler = (e) => {
    e.preventDefault();
    const status = e.target.status.value
    const code = e.target.code.value;
    const style = e.target.style.value;
    const imgMobile = e.target.imgMobile.value;
    const img = e.target.img.value;
    const category = e.target.category.value;
    const newComponent = {
      category,
      img,
      imgMobile,
      desc: content ? content : data.desc,
      code,
      css: style,
      status
    };
    api.put(`/api/components/${id}`, newComponent).then((res) => {
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
          <p>Status </p>
          <input
            defaultValue={data.status}
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
          <button type="submit" className="btn btn-primary mt-8">
            Submit This Component
          </button>
        </form>
      </div>
    </RequireAdmin>
  );
};

export default Addcomponent;
