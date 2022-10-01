import { Routes as RoutesReactRouter, Route } from "react-router-dom";

import { Register } from "../pages";

export function Routes() {
  return(
    <RoutesReactRouter>
      <Route path="/cadastrar" element={<Register />} />
    </RoutesReactRouter>
  )
}