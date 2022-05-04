export const initializeAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return null;
  }
  const users = JSON.parse(localStorage.getItem("users"));
  if (!users) {
    return null;
  }
  const localStorageUser = users.find((u) => u.username === user.username);
  if (!localStorageUser) {
    return null;
  }
  if (localStorageUser.password !== user.password) {
    return null;
  }
  return user;
};
