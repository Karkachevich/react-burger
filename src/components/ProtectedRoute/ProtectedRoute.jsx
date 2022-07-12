import React, { useCallback, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import style from "./ProtectedRoute.module.css";
import { auth } from "../../services/auth";
import { fetchUser } from "../../services/actions/auth";

export function ProtectedRoute({
  children,
  accessType = "anonymous",
  ...rest
}) {
  const { user, loading } = useSelector((state) => state.auth);
  const { accessToken, refreshToken } = auth();
  const dispatch = useDispatch();
  const [loadingText, setLoadingText] = useState("");

  const isAuth = useCallback(
    () => (accessToken || refreshToken) && user,
    [accessToken, refreshToken, user]
  );

  useEffect(() => {
    let interval;
    let point = 0;
    if (loading) {
      interval = setInterval(() => {
        setLoadingText(`Проверка авторизации${".".repeat(point)}`);
        point = point === 3 ? 0 : ++point;
      }, 350);
    }

    return () => clearInterval(interval);
  }, [setLoadingText, loading]);

  useEffect(() => {
    if ((accessToken || refreshToken) && !user) {
      dispatch(fetchUser());
    }
  }, [accessToken, dispatch, refreshToken]);


  const render = () => {
    if (accessType !== "anonymous" && !user && loading) {
      return (
        <div className={`${style.loader} text text_type_main-default`}>
          {loadingText}
        </div>
      );
    } 
      let elementToRender = <Route {...rest} render={() => children} />;
      switch (accessType) {
        case "authorized":
          if (!isAuth()) {
            elementToRender = (
              <Route
                render={({ location }) => (
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: { from: location },
                    }}
                  />
                )}
              />
            );
          }

          break;
        case "unauthorized":
          if (isAuth()) {
            elementToRender = (
              <Route
                render={({ location }) => (
                  <Redirect
                    to={{
                      pathname:
                        location.pathname === "/login" && location.state
                          ? location.state.from.pathname
                          : "/",
                      state: { from: location },
                    }}
                  />
                )}
              />
            );
          }
          break;
        default:
          break;
      }
      return elementToRender;
    
  };
  return render();
}

ProtectedRoute.propTypes = {
  accessType: PropTypes.oneOf(["authorized", "anonymous", "unauthorized"]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
