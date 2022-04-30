export const addUser = (userData) => {
  let users = JSON.parse(localStorage.getItem('users'));
  if(!users) {
    users = [];
  }
  users.push(userData);
  localStorage.setItem('users', JSON.stringify(users));
}