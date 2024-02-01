import { Route, Routes } from "react-router-dom";

import List from "./List";
import Details from "./Details";

export default function TvShows() {
  return (
    <Routes>
      <Route index element={<List />} />
      <Route path=":id" element={<Details />} />
    </Routes>
  );
}
