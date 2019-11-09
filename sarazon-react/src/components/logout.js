const Logout = () => {
  localStorage.removeItem("token");
  window.location = "/";
  return null;
};

export default Logout;
