import { Routes as RoutesReactRouter, Route } from "react-router-dom";

import { Dashboard, Login, Orders, Products, Register } from "../pages";

export function Routes() {
  return(
    <RoutesReactRouter>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/produtos" element={<Products />} />
      <Route path="/vendas" element={<Orders />} />
    </RoutesReactRouter>
  )
}