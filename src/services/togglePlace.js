export const togglePlace = (place) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const users = JSON.parse(localStorage.getItem("users"));
  if (!user || !users) {
    return;
  }
  const placeIndex = user.places.findIndex((p) => p === place);
  console.log(placeIndex);
  if (placeIndex >= 0) {
    user.places.splice(placeIndex, 1);
  } else {
    user.places.push(place);
  }
  let userIndex = users.find((u) => u.username === user.username);
  users.splice(userIndex, 1);
  users.push(user);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("users", JSON.stringify(users));
};
