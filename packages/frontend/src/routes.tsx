import { Route, Routes } from "react-router-dom";
import Home from "./components/containers/home";
import NotFound from "./components/containers/not-found";
import Login from "./components/containers/login";
import NewNote from "./components/containers/new-note";

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/notes/new" element={<NewNote />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}