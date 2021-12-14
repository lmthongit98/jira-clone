import React from "react";
import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <div>
      <h1>Auth</h1>
      <Outlet />
    </div>
  );
}
