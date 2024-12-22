export const routes = {
  home: '/',
  login: '/login',
  signup: '/signup',
  playlists: '/playlists',
  newPlaylist: '/playlist/new',
  player: (playlistId: string) => `/player/${playlistId}`,
}
