import axios from "axios";
 
const getAuthToken = () => {
  return localStorage.getItem('token'); // Assuming you store the token in localStorage
};

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(
   `/user/login`, 
    { email, password }
  );
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  localStorage.setItem('token', data.token);// Store token in localStorage
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post(`/user/signup`, { name, email, password } );
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get(`/user/auth-status`);
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const token = getAuthToken();
  const res = await axios.post(`/chat/new`, { message }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const token = getAuthToken();
  const res = await axios.get(`/chat/all-chats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const token = getAuthToken();
  const res = await axios.delete(`/chat/delete`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } );
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const token = getAuthToken();
  const res = await axios.get(`/user/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  localStorage.removeItem('token'); // Clear token on logout
  const data = await res.data;
  return data;
};