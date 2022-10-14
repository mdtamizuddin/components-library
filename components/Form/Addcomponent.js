import Image from "next/image";
import React, { useState } from "react";
import api from "../Hooks/instance";

const Addcomponent = ({ category }) => {
  const [imageMobile, setImgMobile] = useState("");
  const [imageDesctop, setImgDesktop] = useState("");
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
    const desc = e.target.desc.value;
    const code = e.target.code.value;
    const style = e.target.style.value;
    if (imageDesctop && code && category) {
      const newComponent = {
        category: "navbar",
        img: imageDesctop,
        imgMobile: imageMobile,
        desc,
        code,
        css: style,
      };

      api
        .post("/api/components", newComponent)
        .then((res) => console.log(res.data));
    } else if (!imageDesctop) {
    }
  };

  return (
    <div>
      <form className="comp-adding-form" onSubmit={formhandler}>
        <h1 className="text-center text-3xl font-semibold">
          Component Adding Form
        </h1>
        <p>About Component</p>
        <textarea className="textarea " name="desc" required />
        <p>Code Html / JSX</p>
        <textarea className="textarea h-400" name="code" required />

        <p>Style Sheet</p>
        <textarea className="textarea h-400" name="style" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-5">
          {imageDesctop ? (
            <Image
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
            <Image
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
  );
};

export default Addcomponent;
