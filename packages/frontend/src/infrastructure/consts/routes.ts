export const routes = {
  home: '/',
  login: '/login',
  signup: '/signup',
  playlists: '/playlists',
  newPlaylist: '/playlist/new',
  player: (playlistId: string) => `/player/${playlistId}`,
  playlistUpdate: (playlistId: string) => `/playlist/${playlistId}`,
  profile: '/profile',
  remoteAuth: '/auth',
}
