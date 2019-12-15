// ActionType.js

const ActionType = {
  TOKEN: {
    HEART: {
      FULLFILLED: "TOKEN.HEART.FULLFILLED",
      PENDING: "TOKEN.HEART.REJECTED",
      REJECTED: "TOKEN.HEART.REJECTED"
    }
  },

  // Authentication
  AUTH_SUCCESS: "AUTH_SUCCESS",
  AUTH_PENDING: "AUTH_PENDING",
  AUTH_FAIL: "AUTH_FAIL",

  // Toast
  HIDE_ERROR: "HIDE_ERROR",
  HIDE_SUCCESS_TOAST: "HIDE_SUCCESS_TOAST",

  LOGISTIC_PROVIDER: {
    GET_ALL: {
      ERROR: "LOGISTIC_PROVIDER_GET_ALL_ERROR",
      PENDING: "LOGISTIC_PROVIDER_GET_ALL_PENDING",
      FULFILLED: "LOGISTIC_PROVIDER_GET_ALL_FULFILLED"
    },
    GET: {
      ERROR: "LOGISTIC_PROVIDER_GET_ERROR",
      PENDING: "LOGISTIC_PROVIDER_GET_PENDING",
      FULFILLED: "LOGISTIC_PROVIDER_GET_FULFILLED"
    },
    UPDATE: {
      ERROR: "LOGISTIC_PROVIDER_UPDATE_ERROR",
      PENDING: "LOGISTIC_PROVIDER_UPDATE_PENDING",
      FULFILLED: "LOGISTIC_PROVIDER_UPDATE_FULFILLED"
    },
    CREATE: {
      ERROR: "LOGISTIC_PROVIDER_CREATE_ERROR",
      PENDING: "LOGISTIC_PROVIDER_CREATE_PENDING",
      FULFILLED: "LOGISTIC_PROVIDER_CREATE_FULFILLED"
    }
  },

  ANALYTICS: {
    GET: {
      ERROR: "ANALYTICS_GET_ERROR",
      PENDING: "ANALYTICS_GET_PENDING",
      FULFILLED: "ANALYTICS_GET_FULFILLED"
    },
  },

  PRODUCT: {
    GET_ALL: {
      ERROR: "PRODUCT_GET_ALL_ERROR",
      PENDING: "PRODUCT_GET_ALL_PENDING",
      FULFILLED: "PRODUCT_GET_ALL_FULFILLED"
    },
    GET: {
      ERROR: "PRODUCT_GET_ERROR",
      PENDING: "PRODUCT_GET_PENDING",
      FULFILLED: "PRODUCT_GET_FULFILLED"
    },
    UPDATE: {
      ERROR: "PRODUCT_UPDATE_ERROR",
      PENDING: "PRODUCT_UPDATE_PENDING",
      FULFILLED: "PRODUCT_UPDATE_FULFILLED"
    },
    CREATE: {
      ERROR: "PRODUCT_CREATE_ERROR",
      PENDING: "PRODUCT_CREATE_PENDING",
      FULFILLED: "PRODUCT_CREATE_FULFILLED"
    },
    CATEGORY: {
      GET_ALL: {
        ERROR: "PRODUCT_CATEGORY_GET_ALL_ERROR",
        PENDING: "PRODUCT_CATEGORY_GET_ALL_PENDING",
        FULFILLED: "PRODUCT_CATEGORY_GET_ALL_FULFILLED"
      }
    }
  },
  USER: {
    GET_ALL: {
      ERROR: "USER_GET_ALL_ERROR",
      PENDING: "USER_GET_ALL_PENDING",
      FULFILLED: "USER_GET_ALL_FULFILLED"
    },
    GET: {
      ERROR: "USER_GET_ERROR",
      PENDING: "USER_GET_PENDING",
      FULFILLED: "USER_GET_FULFILLED"
    },
    UPDATE: {
      ERROR: "USER_UPDATE_ERROR",
      PENDING: "USER_UPDATE_PENDING",
      FULFILLED: "USER_UPDATE_FULFILLED"
    },
    CREATE: {
      ERROR: "USER_CREATE_ERROR",
      PENDING: "USER_CREATE_PENDING",
      FULFILLED: "USER_CREATE_FULFILLED"
    }
  },
  SKU: {
    ATTRIBUTE: {
      GET_ALL: {
        ERROR: "SKU_ATTRIBUTE_GET_ALL_ERROR",
        PENDING: "SKU_ATTRIBUTE_GET_ALL_PENDING",
        FULFILLED: "SKU_ATTRIBUTE_GET_ALL_FULFILLED"
      },
      GET: {
        ERROR: "SKU_ATTRIBUTE_GET_ERROR",
        PENDING: "SKU_ATTRIBUTE_GET_PENDING",
        FULFILLED: "SKU_ATTRIBUTE_GET_FULFILLED"
      },
      UPDATE: {
        ERROR: "SKU_ATTRIBUTE_UPDATE_ERROR",
        PENDING: "SKU_ATTRIBUTE_UPDATE_PENDING",
        FULFILLED: "SKU_ATTRIBUTE_UPDATE_FULFILLED"
      },
      DELETE: {
        ERROR: "SKU_ATTRIBUTE_DELETE_ERROR",
        PENDING: "SKU_ATTRIBUTE_DELETE_PENING",
        FULFILLED: "SKU_ATTRIBUTE_DELETE_FULFILLED"
      },
      CATEGORY: {
        GET_ALL: {
          ERROR: "SKU_ATTRIBUTE_CATEGORY_GET_ALL_ERROR",
          PENDING: "SKU_ATTRIBUTE_CATEGORY_GET_ALL_PENDING",
          FULFILLED: "SKU_ATTRIBUTE_CATEGORY_GET_ALL_FULFILLED"
        },
        GET: {
          ERROR: "SKU_ATTRIBUTE_CATEGORY_GET_ERROR",
          PENDING: "SKU_ATTRIBUTE_CATEGORY_GET_PENDING",
          FULFILLED: "SKU_ATTRIBUTE_CATEGORY_GET_FULFILLED"
        },
        UPDATE: {
          ERROR: "SKU_ATTRIBUTE_CATEGORY_UPDATE_ERROR",
          PENDING: "SKU_ATTRIBUTE_CATEGORY_UPDATE_PENDING",
          FULFILLED: "SKU_ATTRIBUTE_CATEGORY_UPDATE_FULFILLED"
        },
        DELETE: {
          ERROR: "SKU_ATTRIBUTE_CATEGORY_DELETE_ERROR",
          PENDING: "SKU_ATTRIBUTE_CATEGORY_DELETE_PENING",
          FULFILLED: "SKU_ATTRIBUTE_CATEGORY_DELETE_FULFILLED"
        }
      }
    },
    GET_ALL: {
      ERROR: "SKU_GET_ALL_ERROR",
      PENDING: "SKU_GET_ALL_PENDING",
      FULFILLED: "SKU_GET_ALL_FULFILLED"
    },
    GET: {
      ERROR: "SKU_GET_ERROR",
      PENDING: "SKU_GET_PENDING",
      FULFILLED: "SKU_GET_FULFILLED"
    },
    UPDATE: {
      ERROR: "SKU_UPDATE_ERROR",
      PENDING: "SKU_UPDATE_PENDING",
      FULFILLED: "SKU_UPDATE_FULFILLED"
    },
    DELETE: {
      ERROR: "SKU_DELETE_ERROR",
      PENDING: "SKU_DELETE_PENING",
      FULFILLED: "SKU_DELETE_FULFILLED"
    }
  }
};

export default ActionType;
