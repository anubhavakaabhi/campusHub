import axios from "axios";


async function handleLogin({email,password}){
    const response = await axios.post("http://localhost:3000/login",{
        email,
        password,
    },{withCredentials:true});
    return response;
}

async function handleRegister({name,email,password}){
    const response = await axios.post("http://localhost:3000/register",{
        name,
        email,
        password,
    },{withCredentials:true});
    return response;
}

async function getUser(){
    const response = await axios.post("http://localhost:3000/me",{withCredentials:true});
    return response;
}
async function handleLogout() {
    const response = await axios.post("http://localhost:3000/logout",{withCredentials:true});
    return response;
}
async function handleRefreshToken() {
    const response = await axios.post("http://localhost:3000/refresh",{withCredentials:true});
    return response;
}

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Variables to handle race conditions with concurrent 401s
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Ignore requests that have no config or are ALREADY the refresh request
    if (!originalRequest || originalRequest.url === "/refresh") {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If a refresh is already in progress, queue this request until it's done
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh endpoint
        await api.post("/refresh");

        // Process all queued requests now that token is refreshed
        processQueue(null);

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed (token expired/invalid) -> Reject queue & redirect to login
        processQueue(refreshError, null);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


export {handleLogin , handleRegister , getUser , handleLogout , handleRefreshToken, api };