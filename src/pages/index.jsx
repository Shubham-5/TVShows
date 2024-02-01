import { Navigate, Route, Routes } from "react-router-dom";

import TvShows from "./TvShows";

export default function Pages() {
  return (
    <Routes>
      <Route path="shows/*" element={<TvShows />} />
      <Route path="*" element={<Navigate to="Shows" />} />
    </Routes>
  );
}
