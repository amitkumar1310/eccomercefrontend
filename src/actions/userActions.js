import { USER_LOGIN_FAIL,USER_LOGIN_SUCCESS,USER_LOGOUT,USER_LOGIN_REQUEST,USER_REGISTER_FAIL,USER_REGISTER_SUCCESS,USER_REGISTER_REQUEST,
    USER_DETAILS_SUCCESS,USER_DETAILS_REQUEST,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_FAIL,
  USER_DELETE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,

} from '../constants/userConstants'
import axios from 'axios'

export const login = (email,password)=> async(dispatch)=>{

   try{
       dispatch({
           type:USER_LOGIN_REQUEST
       })

       const config ={
           headers:{
               'Content-type':'application/json'
           }
       }

       const {data}= await axios.post('/api/users/login/',
       
       {username: email, password},config
       
       
       )
       const customPayload = {
        userInfo: {
          name: data.name,
          email: data.email,
        },
        access_token: data.access,
        refresh_token: data.refresh,
      };
       console.log('Login data:', data);
       dispatch({
           type:USER_LOGIN_SUCCESS,
           payload:customPayload,
          //  token: data.token, 
       })

       localStorage.setItem('userInfo',JSON.stringify(data))
       localStorage.setItem('access_token', data.access);
       localStorage.setItem('refresh_token', data.refresh);
   


   }

   catch(error){
    dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
   }

}


export const register =(name,email,password)=> async(dispatch)=>{
    try{

       dispatch({
           type:USER_REGISTER_REQUEST
       })

       const config = {
           headers:{
               'Content-type':'application/json'
           }
       }

       const {data}= await axios.post('/api/users/register/',
       
       
       {'name':name,'email':email,'password':password },config )

       dispatch({
           type:USER_REGISTER_SUCCESS,
           payload:data
       })
       dispatch({
           type:USER_LOGIN_SUCCESS,
           payload:data
       })

       localStorage.setItem('userInfo',JSON.stringify(data))
       
    
    }
    catch(error){

       dispatch({
           type:USER_REGISTER_FAIL,
           payload:error.response && error.response.data.detail
           ? error.response.data.detail
           :error.message,
       })

    }
}









/* ACTION CREATOR USED IN USER LOGOUT IN LoginScreen COMPONENT & HEADER */
export const logout = () => (dispatch) => {
  /* REMOVE USER INFO FORM LOCAL STORAGE */
  localStorage.removeItem("userInfo");

  /* DISPATCH TO REMOVE USER INFO FORM STORE */
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: USER_DETAILS_RESET,
  });
  /* DISPATCH TO RESET THE DETAILS OF ORDERS MADE BY USER */
  // dispatch({
  //   type: ORDER_LIST_MY_RESET,
  // });
  /* DISPATCH TO RESET THE DETAILS OF USERS LIST */
  dispatch({
    type: USER_LIST_RESET,
  });
};



export const getUserDetails = () => async (dispatch, getState) => {
    try {
      
      dispatch({
        type: USER_DETAILS_REQUEST,
      });
      // const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
    
      // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
      const {
        userLogin: { userInfo },
        userDetails: { user },
      } = getState();
      
      const access_token = localStorage.getItem('access_token');
      /* MAKE GET REQUEST TO GET BACK THE USER DATA */
      if (user && user.username) {
        // If the user details exist, dispatch success action directly
        dispatch({
          type: USER_DETAILS_SUCCESS,
          payload: user,
        });
        return; // Exit the function to prevent unnecessary API call
      }

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${access_token}` /* PASSING IN USER TOKEN AND IF THE USER IN AUTHORISED HE'LL HAVE FULL ACCESS TO HIS PROFILE INFORMATION */,
        },
      };
       
      


      console.log("Fetching user details...");
      // USING ${id} BECAUSE WHILE ACCESSING NORMAL USER WE'LL PASS STRING 'profile' BUT WHILE ACCESSING ADMIN PANEL WE'LL PASS THE 'id' SO LINK HAS TO BE DYNAMIC
      const { data } = await axios.get(`/api/user/profile`, config);
      console.log("User details response:", data); 
      /* IF GET REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
        console.log("Error fetching user details:", error.message);

      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
// export const getUserDetails = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: USER_DETAILS_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//       userDetails: { user }, // Get the current user details from the state
//     } = getState();

//     if (!user || userInfo._id !== user._id) {
//       // Dispatch the action only if the user details are not available or if the user ID has changed
//       const access_token = localStorage.getItem('access_token');
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${access_token}`,
//         },
//       };

//       const { data } = await axios.get(`/api/user/profile`, config);
//       console.log("User details response:", data);

//       dispatch({
//         type: USER_DETAILS_SUCCESS,
//         payload: data.user,
//       });
//     } else {
//       // User details are already available in the state, no need to dispatch the action again
//       dispatch({
//         type: USER_DETAILS_SUCCESS,
//         payload: user,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: USER_DETAILS_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };



/* ACTION CREATOR USED IN UPDATING USER DETAILS IN ProfileScreen COMPONENT  */
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const {
      userLogin: { userInfo },
    } = getState();
    const access_token = localStorage.getItem('access_token');
    /* MAKE PUT REQUEST TO SET THE THE USER DATA */
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access_token}` /* PASSING IN USER TOKEN AND IF THE USER IN AUTHORISED HE'LL HAVE FULL ACCESS TO HIS PROFILE INFORMATION */,
      },
    };

    // USING ${id} BECAUSE WHILE ACCESSING NORMAL USER WE'LL PASS STRING 'profile' BUT WHILE ACCESSING ADMIN PANEL WE'LL PASS THE 'id' SO LINK HAS TO BE DYNAMIC
    console.log("updating user details now ...");
    const { data } = await axios.put(`/api/users/profile/update/`, user, config);
    localStorage.setItem("userInfo", JSON.stringify(data));
     console.log(data);
    /* IF PUT REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    /* AFTER UPDATING PROFILE INFORMATION WE WANT TO LOG THE USER IN WITH THE UPDATED INFO */
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    /* SETTING UPDATED VALUE OF USER INFO IN LOCAL STORAGE */
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

/* ACTION CREATOR USED TO GET THE LIST OF USERS IN UserList SCREEN  */
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const {
      userLogin: { userInfo },
    } = getState();
    const access_token = localStorage.getItem('access_token');
    /* MAKE GET REQUEST TO SET THE THE USERS LIST */
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access_token}` /* PASSING IN USER TOKEN AND IF THE USER IS ADMIN WE'LL BE ABLE TO SEE LIST OF USERS */,
      },
    };

    const { data } = await axios.get(`/api/users/`, config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

/* ACTION CREATOR USED TO DELETE A USER IN UserList SCREEN */
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const {
      userLogin: { userInfo },
    } = getState();
    const access_token = localStorage.getItem('access_token');
    /* MAKE DELETE REQUEST TO DELETE THE USER */
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access_token}` /* PASSING IN USER TOKEN AND IF THE USER IS ADMIN WE'LL BE ABLE TO DELETE THE USER */,
      },
    };

    const { data } = await axios.delete(`/api/users/delete/${id}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

/* ACTION CREATOR USED TO EDIT A USER IN UserUpdate SCREEN */
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const {
      userLogin: { userInfo },
    } = getState();
    const access_token = localStorage.getItem('access_token');
    /* MAKE PUT REQUEST TO EDIT THE USER */
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access_token}` /* PASSING IN USER TOKEN AND IF THE USER IS ADMIN WE'LL BE ABLE TO EDIT THE USER */,
      },
    };

    const { data } = await axios.put(
      `/api/users/update/${user._id}/`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_SUCCESS,
    });

    /* AFTER UPDATING WE WANT TO RELOAD THE USER DATA */
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};  