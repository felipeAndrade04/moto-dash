import { Routes as RoutesReactRouter, Route } from "react-router-dom";

import { Login, Register } from "../pages";

export function Routes() {
  return(
    <RoutesReactRouter>
      <Route path="/" element={<Login />} />
      <Route path="/cadastrar" element={<Register />} />
    </RoutesReactRouter>
  )
}