import React, { FC, useCallback, useEffect, useState, ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useSelector, useDispatch } from "../../utils/hooks";
import style from "./ProtectedRoute.module.css";
import { auth } from "../../services/auth";
import { fetchUser } from "../../services/actions/auth";

export type TRouterAccessTypes = "anonymous" | "authorized" | "unauthorized";

export interface IExpandedLocation extends Location {
  state: {
    from?: Location;
    ingredientModal?: Location;
    feedModal?: Location;
    profileFeedModal?: Location;
  };
}

interface IProtectedRouteProps {
  children: ReactNode;
  accessType: TRouterAccessTypes;
}

export const ProtectedRoute: FC<IProtectedRouteProps & RouteProps> = ({
  children,
  accessType = "anonymous",
  ...rest
}) => {
  const { user, loading } = useSelector((state) => state.auth);
  const { accessToken, refreshToken } = auth();
  const dispatch = useDispatch();
  const [loadingText, setLoadingText] = useState<string>("");

  const isAuth = useCallback(
    (): boolean => !!((accessToken || refreshToken) && user),
    [accessToken, refreshToken, user]
  );

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let point: number = 0;
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
  }, [accessToken, dispatch, refreshToken, user]);

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
              render={({ location }) => {
                const definedLocation = location as IExpandedLocation;
                return (
                  <Redirect
                    to={{
                      pathname:
                        definedLocation.pathname === "/login" &&
                        !!definedLocation.state
                          ? definedLocation.state.from?.pathname
                          : "/",
                      state: { from: definedLocation },
                    }}
                  />
                );
              }}
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
};
