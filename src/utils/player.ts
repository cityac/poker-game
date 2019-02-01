export const playerByPlace = (players, place) => {
  return players.find(player => player.place === place);
}
