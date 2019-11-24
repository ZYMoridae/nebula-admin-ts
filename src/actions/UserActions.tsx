import Zjax from "../utils/zjax";
import Utils from "../utils/Utils";
import ActionType from "./ActionType";

// ANCHOR Fetch all users by pagination

export const fetchAllUserFulfilled = (results: any, totalPages: number, totalElements: number) => {
  return {
    type: ActionType.USER.GET_ALL.FULFILLED,
    fetchAllUserPending: false,
    fetchAllUserFulfilled: true,
    users: results,
    totalPages: totalPages,
    totalElements: totalElements,
    receivedAt: Date.now()
  };
};

export const fetchAllUserPending = () => {
  return {
    type: ActionType.USER.GET_ALL.PENDING,
    fetchAllUserPending: true,
    fetchAllUserFulfilled: false
  };
};

export const fetchAllUserError = (error: any) => {
  return {
    type: ActionType.USER.GET_ALL.ERROR,
    fetchAllUserPending: false,
    fetchAllUserFulfilled: true,
    error: error
  };
};

export const fetchAllUser = (
  page: number,
  perPage: number,
  orderBy: string
) => {
  return function(dispatch: any) {
    dispatch(fetchAllUserPending());

    let options = {
      method: Zjax.HTTP.METHOD.GET
    };

    Zjax.request({
      url: `/api/users?page=${page -
        1}&size=${perPage}&sort=${orderBy}&keyword`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        let userList: any = [];
        Object.keys(response.data._embedded).forEach(key => {
          if (Array.isArray(response.data._embedded[key])) {
            userList = userList.concat(response.data._embedded[key]);
          }
        });

        userList = userList.sort(function(a: any, b: any) {
          return a.id - b.id || a.name.localeCompare(b.name);
        });

        dispatch(
          fetchAllUserFulfilled(userList, response.data.page.totalPages, response.data.page.totalElements)
        );
      },
      failureCallback: (error: any) => {
        dispatch(fetchAllUserError(error));
      }
    });
  };
};

// ANCHOR Fetch user based on id

export const fetchUserFulfilled = (user: any) => {
  return {
    type: ActionType.USER.GET.FULFILLED,
    fetchUserPending: false,
    fetchUserFulfilled: true,
    user: user
  };
};

export const fetchUserPending = () => {
  return {
    type: ActionType.USER.GET.PENDING,
    fetchUserPending: true,
    fetchUserFulfilled: false
  };
};

export const fetchUserError = (error: any) => {
  return {
    type: ActionType.USER.GET.ERROR,
    fetchUserPending: false,
    fetchUserFulfilled: true,
    error: error
  };
};

export const fetchUser = (id: any) => {
  return function(dispatch: any) {
    dispatch(fetchUserPending());

    let options = {
      method: Zjax.HTTP.METHOD.GET
    };

    Zjax.request({
      url: `/api/users/${id}`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(fetchUserFulfilled(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(fetchUserError(error));
      }
    });
  };
};

// ANCHOR Update user based on id

export const updateUserFulfilled = (user: any) => {
  return {
    type: ActionType.USER.UPDATE.FULFILLED,
    updateUserPending: false,
    updateUserFulfilled: true
    // user: user
  };
};

export const updateUserPending = () => {
  return {
    type: ActionType.USER.UPDATE.PENDING,
    updateUserPending: true,
    updateUserFulfilled: false
  };
};

export const updateUserError = (error: any) => {
  return {
    type: ActionType.USER.UPDATE.ERROR,
    updateUserPending: false,
    updateUserFulfilled: true,
    error: error
  };
};

export const updateUser = (user: any) => {
  return function(dispatch: any) {
    dispatch(updateUserPending());

    let options = {
      method: Zjax.HTTP.METHOD.PUT,
      data: user
    };

    Zjax.request({
      url: `/api/users/${user.id}`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        dispatch(updateUserFulfilled(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(updateUserError(error));
      }
    });
  };
};

// ANCHOR Create user

export const createUserFulfilled = (user: any) => {
  return {
    type: ActionType.USER.CREATE.FULFILLED,
    createUserPending: false,
    createUserFulfilled: true
    // user: user
  };
};

export const createUserPending = () => {
  return {
    type: ActionType.USER.CREATE.PENDING,
    createUserPending: true,
    createUserFulfilled: false
  };
};

export const createUserError = (error: any) => {
  return {
    type: ActionType.USER.CREATE.ERROR,
    createUserPending: false,
    createUserFulfilled: true,
    error: error
  };
};

export const createUser = (user: any) => {
  return function(dispatch: any) {
    dispatch(createUserPending());

    let options = {
      method: Zjax.HTTP.METHOD.POST,
      data: user
    };

    Zjax.request({
      url: `/api/users?isIncludeToken=false`,
      option: Utils.addToken(options),
      successCallback: (response: any) => {
        window.location.href = `/users/${response.data.id}`;

        dispatch(createUserFulfilled(response.data));
      },
      failureCallback: (error: any) => {
        dispatch(createUserError(error));
      }
    });
  };
};