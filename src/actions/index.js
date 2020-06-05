import shop from '../api/shop'
import * as types from '../constants/ActionTypes'
import store from "../store";
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const optionToast = {
    autoClose: 1300
};
  
export const postLogin = () => ({
    type: types.SET_LOGIN
});

export const onChangeStateLogin = (field, value) => ({
    type: types.ON_CHANGE_STATE_LOGIN,
    value,
    field
});

export const resetStateLoginMenu = () => ({
    type: types.RESET_STATE_LOGIN
});

export const postLogout = () => ({
    type: types.SET_LOGOUT
});

//////////

export const fetchProductsBegin = () => ({
    type: types.FETCH_PRODUCTS_BEGIN
});



export const receiveProducts = products => ({
    type: types.RECEIVE_PRODUCTS,
    products
})

export const getAllProducts = () => dispatch => {
    dispatch(fetchProductsBegin());
    shop.getProducts(products => {
        dispatch(receiveProducts(products));
        return products;
    })
}
export const fetchSingleProduct = productId => ({
    type: types.FETCH_SINGLE_PRODUCT,
    productId
})




//it seems that I should probably use this as the basis for "Cart"
export const addToCart = (product,qty) => (dispatch) => {
    toast.success("Item Added to Cart");
        dispatch(addToCartUnsafe(product, qty))

}
export const addToCartAndRemoveWishlist = (product,qty) => (dispatch) => {
    toast.success("Item Added to Cart");
    dispatch(addToCartUnsafe(product, qty));
    dispatch(removeFromWishlist(product));
}
export const addToCartUnsafe = (product, qty) => ({
    type: types.ADD_TO_CART,
    product,
    qty
});
export const removeFromCart = product_id => ({
    type: types.REMOVE_FROM_CART,
    product_id
});
export const incrementQty = (product,qty) => (dispatch) => {
    dispatch(addToCartUnsafe(product, qty))

}
export const decrementQty = productId => ({
    type: types.DECREMENT_QTY,
    productId
});



//it seems that I should probably use this as the basis for "Wishlist"
export const addToWishlist = (product) => (dispatch) => {
    toast.success("Item Added to Wishlist");
    dispatch(addToWishlistUnsafe(product))

}
export const addToWishlistUnsafe = (product) => ({
    type: types.ADD_TO_WISHLIST,
    product
});
export const removeFromWishlist = product_id => ({
    type: types.REMOVE_FROM_WISHLIST,
    product_id
});


//Compare Products
export const addToCompare = (product) => (dispatch) => {
    toast.success("Item Added to Compare");
    dispatch(addToCompareUnsafe(product))

}
export const addToCompareUnsafe= (product) => ({
    type: types.ADD_TO_COMPARE,
    product
});
export const removeFromCompare = product_id => ({
    type: types.REMOVE_FROM_COMPARE,
    product_id
});


// Filters
export const filterBrand = (brand) => ({
    type: types.FILTER_BRAND,
    brand
});
export const filterColor = (color) => ({
    type: types.FILTER_COLOR,
    color
});
export const filterPrice = (value) => ({
    type: types.FILTER_PRICE,
    value
});
export const filterSort = (sort_by) => ({
    type: types.SORT_BY,
    sort_by
});


// Currency
export const changeCurrency = (symbol) => ({
    type: types.CHANGE_CURRENCY,
    symbol
});


//tasksiswa
export const setModal = (field, value) => ({
    type: types.SET_MODAL,
    field,
    value
})

export const setDate = (field, value) => ({
    type: types.SET_DATE,
    value,
    field
});

export const getTaskSiswaList = (data) => ({
    type: types.GET_TASK_SISWA_LIST,
    payload: data
})

export const setStateTaskListFilter = (field, value) => ({
    type: types.SET_TASK_LIST_FILTER,
    value,
    field
})

export const setStateUploadTaskSiwa = (field, value) => ({
    type: types.SET_UPLOAD_TASK_SISWA,
    value,
    field
})

//ortu
export const getTaskOrtuList = (data) => ({
    type: types.GET_TASK_ORTU_LIST,
    payload: data
})

//guru
export const deleteTask = (ids) => ({
    type: types.DELETE_TASK,
    payload: ids
})

export const getTaskGuruList = (data) => ({
    type: types.GET_TASK_GURU_LIST,
    payload: data
})

export const getSubjectList = (data) => ({
    type: types.GET_SUBJECT_LIST,
    payload: data
})

export const getClassList = (data) => ({
    type: types.GET_CLASS_LIST,
    payload: data
})

export const setStateModalForm = (field, value) => ({
    type: types.SET_MODAL_FORM,
    value,
    field
})

export const postTask = () => ({
    type: types.POST_TASK
})