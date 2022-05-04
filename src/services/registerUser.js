export const registerUser = (userData, successCb) => {
  const newUser = { ...userData };
  let errors = {};
  let users = JSON.parse(localStorage.getItem("users"));
  if (!users) {
    users = [];
  }
  const emailExists = users.some((user) => user.email === newUser.email);
  const usernameExists = users.some(
    (user) => user.username === newUser.username
  );
  users.push(newUser);
  if (emailExists) {
    errors.email = "There is already a user with this email";
  }
  if (usernameExists) {
    errors.username = "There is already a user with this username";
  }
  if (Object.keys(errors).length) {
    return errors;
  }
  newUser.places = ["Moscow", "London", "New York", "Beijing", "Paris"];
  localStorage.setItem("users", JSON.stringify(users));
  successCb();
};
