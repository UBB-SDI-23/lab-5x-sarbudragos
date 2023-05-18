import axios from 'axios';
import { BACKEND_ADDR } from '../backendAddress';
export function storeTokenInLocalStorage(token: string) {
  localStorage.setItem('token', token);
}


export function getTokenFromLocalStorage() {
    const token = localStorage.getItem('token');
    if (!token) {
        return "";
      }
    return token;
};

export function storeItemsPerPageInLocalStorage(itemsPerPage: Number) {
  localStorage.setItem('itemsPerPage', String(itemsPerPage));
}


export function getItemsPerPageFromStorage() {
    const itemsPerPage = localStorage.getItem('itemsPerPage');
    if (!itemsPerPage) {
        return "";
      }
    return Number(itemsPerPage);
};



export async function getAuthenticatedUser() {
  const defaultReturnObject = { authenticated: false, user: {
    "id": 0,
        "username": "",
        "userProfile": {
            "id": 0,
            "bio": "",
            "location": "",
            "birthDay": new Date(),
            "gender": "",
            "maritalStatus": "",
         },
        "itemsPerPage": 0,
        "role": "",
        "numberOfClassrooms":0,
        "numberOfStudents":0,
        "numberOfSubjects":0,
        "numberOfTeacherSubjects":0,
        "numberOfTeachers":0
  } };
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      return defaultReturnObject;
    }
    const response = await axios.get(
    `${BACKEND_ADDR}/user/thisUser`,
      {
        headers:
        {
            Authorization: `Bearer ${token}`
        }
      }
    );

    storeItemsPerPageInLocalStorage(response.data.itemsPerPage)
    return { authenticated: true, user: response.data };
  }
  catch (err) {
    console.log('getAuthenticatedUser, Something Went Wrong', err);
    return defaultReturnObject;
  }
}