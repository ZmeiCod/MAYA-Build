import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { LOGIN_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
  const { user } = useContext(Context);


  return (
    <Routes>
    {/* Если пользователь авторизован, отображаем защищенные маршруты */}
    {user.isAuth &&
      authRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    
    {/* Если пользователь не авторизован, отображаем только публичные маршруты */}
    {!user.isAuth &&
      publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    
    {/* Редирект на страницу логина, если пользователь не авторизован */}
    <Route path="*" element={<Navigate to={user.isAuth ? authRoutes[0].path : LOGIN_ROUTE} />} />
  </Routes>
  );
});

export default AppRouter;
