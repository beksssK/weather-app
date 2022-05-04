export const loginUser = (userData) => {
  const errorMessage = "Username or password is wrong";
  let users = JSON.parse(localStorage.getItem("users"));
  if (!users) {
    return errorMessage;
  }
  const user = users.find((u) => u.username === userData.username);
  if (!user) {
    return errorMessage;
  }
  if (user.password !== userData.password) {
    return errorMessage;
  }
  return null;
};
