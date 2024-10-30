import React, { useEffect, useState } from "react";
import url from "../data/url";
import Loader from "./Loader";
import WorkComponent from "./WorkComponent";
import user from "../mobx/user";
import { observer } from "mobx-react-lite";

function MainComponent(props) {
  const [isLogin, setIsLogin] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch(url.isLogin)
      .then((res) => res.json())
      .then((data) => {
        setLoader(false);
        setIsLogin(data);
        user.setUser();
      })
      .catch((err) => console.log(err));
  }, []);

  const redirectOrRender = () => {
    if (isLogin != null) {
      if (loader) {
        return <Loader />;
      } else {
        if (isLogin == 1) return <WorkComponent />;
        else location.href = url.loginPage;
      }
    }
  };

  return <>{redirectOrRender()}</>;
}

export default observer(MainComponent);
