export const loginUser = (userData) => {
  const response = {};
  let users = JSON.parse(localStorage.getItem("users"));
  if (!users) {
    response.errorMessage = "Username or password is wrong";
    return response;
  }
  const localStorageUser = users.find((u) => u.username === userData.username);
  if (!localStorageUser) {
    response.errorMessage = "Username or password is wrong";
    return response;
  }
  if (localStorageUser.password !== userData.password) {
    response.errorMessage = "Username or password is wrong";
    return response;
  }
  response.user = localStorageUser;
  localStorage.setItem("user", JSON.stringify(localStorageUser));
  return response;
};
