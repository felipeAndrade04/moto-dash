import { Routes as RoutesReactRouter, Route } from "react-router-dom";

import { Dashboard, Login, Register } from "../pages";

export function Routes() {
  return(
    <RoutesReactRouter>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/" element={<Dashboard />} />
    </RoutesReactRouter>
  )
}