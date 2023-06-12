import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../Context/Context";
import Loader from "../Loader/Loader";
import s from "../SuperTzComp/superTz.module.css";

const SuperTzComp = () => {
//   const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { superTz, SuperTzGet } = useContext(Context);

  useEffect(() => {
    SuperTzGet(id)
    // .then(() => setIsLoading(false));
  }, []);

//   if (isLoading) return <Loader />;
  return <div></div>;
};

export default SuperTzComp;
