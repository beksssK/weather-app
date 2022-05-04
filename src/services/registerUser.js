export const registerUser = (userData, successCb) => {
  let errors = {};
  let users = JSON.parse(localStorage.getItem("users"));
  if (!users) {
    users = [];
  }
  const emailExists = users.some((user) => user.email === userData.email);
  const usernameExists = users.some(
    (user) => user.username === userData.username
  );
  users.push(userData);
  if (emailExists) {
    errors.email = "There is already a user with this email";
  }
  if (usernameExists) {
    errors.username = "There is already a user with this username";
  }
  if (Object.keys(errors).length) {
    return errors;
  }
  localStorage.setItem("users", JSON.stringify(users));
  successCb();
};
