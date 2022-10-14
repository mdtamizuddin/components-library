import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const GetCode = () => {
  const router = useRouter();
  const { id } = router.query;
  const [codeData, setCodeDat] = useState();
  useEffect(() => {
    fetch(`http://localhost:3000/api/components/${id}`)
      .then((res) => res.json())
      .then((data) => setCodeDat(data));
  }, [id]);
  console.log(codeData);
  return (
    <div>
      <Head>
        <title>Component {id}</title>
      </Head>
    </div>
  );
};

export default GetCode;
