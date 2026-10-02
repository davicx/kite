import axios from 'axios'

const axiosRequest = axios.create({
  withCredentials: true
})  

/* 
FUNCTIONS A: Login Functions 
	1) Function A1: Login a User 
	2) Function A2: Logout a User  
	3) Function A3: Get Login Status 
	4) Function A4: Request new Refresh Token

FUNCTIONS B: Device ID Functions
	1) Function B1: createDeviceId
	2) Function B2: getDeviceId

*/

//FUNCTIONS A: Login Functions 
//Function A1: Login a User 
function loginUser(userName) {
    console.log("login " + userName)
}

//Function A2: Logout a User 
function logoutUser() {
    //const navigate = useNavigate();
    console.log("logout ")

    //Step 2A: Set local storage  
    localStorage.setItem('localStorageCurrentUser', JSON.stringify("null"));   

    //Step 2B: Redirect to Login
    //navigate("/login");
}

//Function A3: Get Login Status 
function loginStatus(userName) {
    let userStatus = {
        isAuthenticated: false,
        user: userName,
    };

    if(userName == 'null') {
        userStatus.isAuthenticated = false;
      } else {
        userStatus.isAuthenticated = true;
      }

      return userStatus;
}

function sayHello(userName) {
    console.log("hello " + userName)
}

function clearLoginAndGoToLogin() {
  localStorage.setItem('localStorageCurrentUser', JSON.stringify('null'));
  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
}

//Function A4: Request new Refresh Token
async function refreshToken() {
  console.log('ATTEMPTING TO REFRESH TOKEN: refreshToken()');
  const refreshURL = 'http://localhost:3003/refresh/tokens';
  const data = localStorage.getItem('localStorageCurrentUser');
  const userName = JSON.parse(data);
  console.log('refreshToken: you are refreshing for' + userName);

  try {
    const response = await axiosRequest.post(refreshURL, {
      userName: userName,
      refreshToken: 'dontneedheretoken',
      device_id: getDeviceId(),
    });

    if (response?.data?.success === false) {
      console.log('refreshToken(): Server refused a new access token');
      clearLoginAndGoToLogin();
      return null;
    }

    console.log('refreshToken(): We got a new access token!');
    return response.data;
  } catch (error) {
    console.log('refreshToken(): We failed to get a new access token!');
    clearLoginAndGoToLogin();
    return null;
  }
}

//FUNCTIONS B: Device ID Functions
//Function B1: Create a new browser device id
function createDeviceId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return 'web-' + crypto.randomUUID();
  }

  return 'web-' + Date.now() + '-' + Math.random().toString(36).slice(2);
}

//Function B2: Stable per-browser id for refresh_tokens.device_id (matches iOS LoginAPI)
function getDeviceId() {
  const storageKey = 'kite_device_id';
  let deviceId = localStorage.getItem(storageKey);

  if (!deviceId) {
    deviceId = createDeviceId();
    localStorage.setItem(storageKey, deviceId);
  }

  return deviceId;
}

export default {
  loginUser,
  logoutUser,
  loginStatus,
  refreshToken,
  clearLoginAndGoToLogin,
  sayHello,
  getDeviceId,
};
export { getDeviceId, clearLoginAndGoToLogin };