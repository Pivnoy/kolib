import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Lottie from "react-lottie";
import * as location from "../../98083-geometric-loader.json";
import * as success from "../../1127-success.json";
import Wallet from '../Wallet/Wallet';
import { Fullscreen } from "@mui/icons-material";

function Loader() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(undefined);
  const [completed, setcompleted] = useState(undefined);
  
  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: location.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setData(json);
          setloading(true);

          setTimeout(() => {
            setcompleted(true);
          }, 1000);
        });
    }, 1000);
  }, []);

  return (
    <div className="">
    <>
      {!completed ? (
        <>
          {!loading ? (
            <Lottie options={defaultOptions1} height={100} width={100}/>
          ) : (
            <Lottie options={defaultOptions2} height={100} width={100} />
          )}
        </>
      ) : (
        <>
          <h1><Wallet /> </h1>
        </>
      )}
    </>
    </div>
  );
} 

export default Loader;