import { Route, Routes } from "react-router-dom";
import Home from "./components/containers/home";
import NotFound from "./components/containers/not-found";
import Login from "./components/containers/login";
import NewNote from "./components/containers/new-playlist";
import SignUp from "./components/containers/sing-up";
import UnauthenticatedRoute from "./components/elements/unauthenticated-route";
import AuthenticatedRoute from "./components/elements/authenticated-route";
import Playlists from "./components/containers/playlists";
import { routes } from "./infrastructure/consts/routes";
import Player from "./components/containers/player";
import Profile from "./components/containers/profile";
import UpdatePlaylist from "./components/containers/update-playlist";
import RemoteAuth from "./components/containers/remote-auth";

export default function Links() {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route
        path={routes.login}
        element={
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path={routes.signup}
        element={
          <UnauthenticatedRoute>
            <SignUp />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path={routes.playlists}
        element={
          <AuthenticatedRoute>
            <Playlists />
          </AuthenticatedRoute>
        }
      />
      <Route
        path={routes.newPlaylist}
        element={
          <AuthenticatedRoute>
            <NewNote />
          </AuthenticatedRoute>
        }
      />
      <Route
        path={'/playlist/:id'}
        element={
          <AuthenticatedRoute>
            <UpdatePlaylist />
          </AuthenticatedRoute>
        }
      />
      <Route
        path={"/player/:id"}
        element={
          <AuthenticatedRoute>
            <Player />
          </AuthenticatedRoute>
        }
      />
      <Route
        path={routes.profile}
        element={
          <AuthenticatedRoute>
            <Profile />
          </AuthenticatedRoute>
        }
      />
      <Route 
        path={routes.remoteAuth}
        element={
          <AuthenticatedRoute>
            <RemoteAuth />
          </AuthenticatedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
