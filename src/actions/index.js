import shop from '../api/shop';
import * as types from '../constants/ActionTypes';
import store from '../store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const optionToast = {
  autoClose: 1300
};
export const newPassword = () => ({
  type: types.SET_NEW_PASSWORD
});

//CLASS
export const getDataClassInfo = () => ({
  type: types.SET_CLASS_INFO
});
export const getDataClassMembers = () => ({
  type: types.SET_CLASS_MEMBERS
});
export const onChangeStateClassMembers = (field, value) => ({
  type: types.ON_CHANGE_STATE_CLASS_MEMBERS,
  value,
  field
});
export const onChangeStateClassInfo = (field, value) => ({
  type: types.ON_CHANGE_STATE_CLASS_INFO,
  value,
  field
});
export const onChangeStateEditClass = (field, value) => ({
  type: types.ON_CHANGE_STATE_EDIT_CLASS,
  value,
  field
});
export const postUpdateClass = () => ({
  type: types.UPDATE_CLASS_INFO
});
export const postDeleteClass = () => ({
  type: types.SET_CLASS_DELETE
});
export const postDuplicateClass = () => ({
  type: types.SET_CLASS_DUPLICATE
});

//LOGIN
export const googleLogin = data => ({
  type: types.SET_GOOGLE_LOGIN,
  data
});

export const closeAlert = () => ({
  type: types.SET_CLOSE_ALERT
});

export const postLogin = () => ({
  type: types.SET_LOGIN
});

export const confirmLogin = () => ({
  type: types.SET_CONFIRM_LOGIN
});

export const updatePassword = () => ({
  type: types.SET_UPDATE_PASSWORD
});

export const setUpdatePasswordCode = value => ({
  type: types.SET_UPDATE_PASSWORD_CODE,
  value
});

export const onChangeStateLogin = (field, value) => ({
  type: types.ON_CHANGE_STATE_LOGIN,
  value,
  field
});

export const onChangeStateNewPassword = (field, value) => ({
  type: types.ON_CHANGE_STATE_NEW_PASSWORD,
  value,
  field
});

export const onChangeStateUpdatePassword = (field, value) => ({
  type: types.ON_CHANGE_STATE_UPDATE_PASSWORD,
  value,
  field
});

export const resetStateLoginMenu = () => ({
  type: types.RESET_STATE_LOGIN
});

export const postLogout = () => ({
  type: types.SET_LOGOUT
});
export const setModalActivation = (field, value) => ({
  type: types.SET_MODAL_ACTIVATION,
  value,
  field
});
export const resendEmail = () => ({
  type: types.EMAIL_ACTIVATION
});

//REGISTER
export const onChangeStateRegister = (field, value) => ({
  type: types.ON_CHANGE_STATE_REGISTER,
  value,
  field
});
export const closeRegistAlert = () => ({
  type: types.SET_CLOSE_REGIST_ALERT
});
export const saveRegister = () => ({
  type: types.SET_REGISTER
});

//profile
export const requestUserData = (id, value) => ({
  type: types.REQUEST_USER_DATA,
  id,
  value
});

export const onChangeStateProfile = (field, value) => ({
  type: types.ON_CHANGE_STATE_PROFILE,
  value,
  field
});

export const onChangeStateEditProfile = (field, value) => ({
  type: types.ON_CHANGE_STATE_EDIT_PROFILE,
  value,
  field
});

export const postUpdateProfile = () => ({
  type: types.SET_PROFILE
});

//SCHOOL INFO
export const getSchool = value => ({
  type: types.GET_SCHOOL,
  value
});
export const onUpdateSchool = () => ({
  type: types.ON_UPDATE_SCHOOL
});
export const setModalSchool = (field, value) => ({
  type: types.SET_SCHOOL_MODAL,
  field,
  value
});
export const saveUpdateSchool = () => ({
  type: types.SAVE_UPDATE_SCHOOL
});
export const deleteSchool = () => ({
  type: types.DELETE_SCHOOL
});
export const handleDoneUpdateSchool = () => ({
  type: types.DONE_UPDATE_SCHOOL
});
export const getSchoolClass = value => ({
  type: types.GET_SCHOOL_CLASS,
  value
});
export const schoolConnectClass = () => ({
  type: types.CONNECT_CLASS_FROM_SCHOOL
});
export const setModalConnectClass = (field, value) => ({
  type: types.SET_CONNECT_CLASS,
  field,
  value
});
export const setModalCreateSchoolClass = (field, value) => ({
  type: types.SET_MODAL_CREATE_SCHOOL_CLASS,
  field,
  value
});
export const schoolCreateClass = () => ({
  type: types.SCHOOL_CREATE_CLASS
});
export const closeModalConnectClass = () => ({
  type: types.CLOSE_MODAL_CONNECT_CLASS
});
export const changeLinkStatus = (id, value) => ({
  type: types.CHANGE_LINK_STATUS,
  id,
  value
});
export const closeSuccessModal = () => ({
  type: types.CLOSE_SCHOOL_SUCCESS_MODAL
});
export const searchClass = () => ({
  type: types.SEARCH_CLASS
});
export const setFilter = value => ({
  type: types.SET_FILTER,
  value
});
export const getSchoolMembers = id => ({
  type: types.GET_SCHOOL_MEMBERS,
  id
});
export const changeOwner = id => ({
  type: types.CHANGE_SCHOOL_OWNER,
  id
});
export const removeMember = id => ({
  type: types.REMOVE_SCHOOL_MEMBER,
  id
});
export const onChangeAddMember = (field, value) => ({
  type: types.SET_MODAL_ADD_SCHOOL_MEMBER,
  field,
  value
});
export const addMember = () => ({
  type: types.ADD_SCHOOL_MEMBER
});

/////////////

export const fetchProductsBegin = () => ({
  type: types.FETCH_PRODUCTS_BEGIN
});

export const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
});

export const getAllProducts = () => dispatch => {
  dispatch(fetchProductsBegin());
  shop.getProducts(products => {
    dispatch(receiveProducts(products));
    return products;
  });
};
export const fetchSingleProduct = productId => ({
  type: types.FETCH_SINGLE_PRODUCT,
  productId
});

//it seems that I should probably use this as the basis for "Cart"
export const addToCart = (product, qty) => dispatch => {
  toast.success('Item Added to Cart');
  dispatch(addToCartUnsafe(product, qty));
};
export const addToCartAndRemoveWishlist = (product, qty) => dispatch => {
  toast.success('Item Added to Cart');
  dispatch(addToCartUnsafe(product, qty));
  dispatch(removeFromWishlist(product));
};
export const addToCartUnsafe = (product, qty) => ({
  type: types.ADD_TO_CART,
  product,
  qty
});
export const removeFromCart = product_id => ({
  type: types.REMOVE_FROM_CART,
  product_id
});
export const incrementQty = (product, qty) => dispatch => {
  dispatch(addToCartUnsafe(product, qty));
};
export const decrementQty = productId => ({
  type: types.DECREMENT_QTY,
  productId
});

//it seems that I should probably use this as the basis for "Wishlist"
export const addToWishlist = product => dispatch => {
  toast.success('Item Added to Wishlist');
  dispatch(addToWishlistUnsafe(product));
};
export const addToWishlistUnsafe = product => ({
  type: types.ADD_TO_WISHLIST,
  product
});
export const removeFromWishlist = product_id => ({
  type: types.REMOVE_FROM_WISHLIST,
  product_id
});

//Compare Products
export const addToCompare = product => dispatch => {
  toast.success('Item Added to Compare');
  dispatch(addToCompareUnsafe(product));
};
export const addToCompareUnsafe = product => ({
  type: types.ADD_TO_COMPARE,
  product
});
export const removeFromCompare = product_id => ({
  type: types.REMOVE_FROM_COMPARE,
  product_id
});

// Filters
export const filterBrand = brand => ({
  type: types.FILTER_BRAND,
  brand
});
export const filterColor = color => ({
  type: types.FILTER_COLOR,
  color
});
export const filterPrice = value => ({
  type: types.FILTER_PRICE,
  value
});
export const filterSort = sort_by => ({
  type: types.SORT_BY,
  sort_by
});

// Currency
export const changeCurrency = symbol => ({
  type: types.CHANGE_CURRENCY,
  symbol
});

//tasksiswa
export const setModal = (field, value) => ({
  type: types.SET_MODAL,
  field,
  value
});

export const setDate = (field, value) => ({
  type: types.SET_DATE,
  value,
  field
});

export const studentGetTaskList = data => ({
  type: types.STUDENT_GET_TASK_LIST,
  payload: data
});

export const setStateTaskListFilter = (field, value) => ({
  type: types.SET_TASK_LIST_FILTER,
  value,
  field
});

export const setStateUploadTaskSiwa = (field, value) => ({
  type: types.SET_UPLOAD_TASK_SISWA,
  value,
  field
});

export const studentPutCollection = () => ({
  type: types.STUDENT_PUT_COLLECTION
});

export const studentPutCollectionFiles = () => ({
  type: types.STUDENT_PUT_COLLECTION_FILES
});

export const studentSubmitCollection = () => ({
  type: types.STUDENT_SUBMIT_COLLECTION
});

export const studentGetTaskFileList = () => ({
  type: types.STUDENT_GET_TASK_FILE_LIST
});

export const studentGetUploadedFileList = () => ({
  type: types.STUDENT_GET_UPLOADED_FILE_LIST
});

export const studentDownloadFile = () => ({
  type: types.STUDENT_DOWNLOAD_FILE
});

export const setStateModalFormDownload = (field, value) => ({
  type: types.SET_MODAL_FORM_DOWNLOAD,
  value,
  field
});

//ortu
export const getTaskOrtuList = data => ({
  type: types.GET_TASK_ORTU_LIST,
  payload: data
});

//guru
export const setUrlPath = id => ({
  type: types.SET_URL_PATH,
  payload: id
});

export const deleteTask = ids => ({
  type: types.DELETE_TASK,
  payload: ids
});

export const archivedTask = ids => ({
  type: types.ARCHIVED_TASK,
  payload: ids
});

export const getTaskGuruList = data => ({
  type: types.GET_TASK_GURU_LIST,
  payload: data
});

export const guruGetTaskCollectionList = data => ({
  type: types.GURU_GET_TASK_COLLECTION_LIST,
  payload: data
});

export const guruGetUploadedCollectionList = data => ({
  type: types.GURU_GET_UPLOADED_COLLECTION_LIST,
  payload: data
});

export const getSubjectList = data => ({
  type: types.GET_SUBJECT_LIST,
  payload: data
});

export const getClassList = data => ({
  type: types.GET_CLASS_LIST,
  payload: data
});

export const setStateModalForm = (field, value) => ({
  type: types.SET_MODAL_FORM,
  value,
  field
});

export const setStateTaskSiswaList = (field, value) => ({
  type: types.GET_TASK_SISWA_LIST_SUCCESS,
  value,
  field
});

export const postTask = () => ({
  type: types.POST_TASK
});

export const updateTask = () => ({
  type: types.UPDATE_TASK
});

export const guruDeleteTaskFile = () => ({
  type: types.GURU_DELETE_TASK_FILE
});

export const getTaskGuruById = () => ({
  type: types.GET_TASK_GURU_BY_ID
});

export const setStateModalFormUploadedCollection = (field, value) => ({
  type: types.SET_STATE_MODAL_FORM_UPLOADED_COLLECTION,
  value,
  field
});

export const guruDownloadCollection = () => ({
  type: types.GURU_DOWNLOAD_COLLECTION
});

//kepsek
export const kepsekGetTaskCollectionList = data => ({
  type: types.KEPSEK_GET_TASK_COLLECTION_LIST,
  payload: data
});

export const kepsekGetTaskList = data => ({
  type: types.KEPSEK_GET_TASK_LIST,
  payload: data
});

export const kepsekGetSubjectList = data => ({
  type: types.KEPSEK_GET_SUBJECT_LIST,
  payload: data
});

export const kepsekGetClassList = data => ({
  type: types.KEPSEK_GET_CLASS_LIST,
  payload: data
});

export const kepsekGetUploadedCollectionList = data => ({
  type: types.KEPSEK_GET_UPLOADED_COLLECTION_LIST,
  payload: data
});

export const kepsekDownloadCollection = () => ({
  type: types.KEPSEK_DOWNLOAD_COLLECTION
});

//admin
export const adminGetGroupList = data => ({
  type: types.ADMIN_GET_GROUP_LIST,
  payload: data
});

export const adminGetUserList = data => ({
  type: types.ADMIN_GET_USER_LIST,
  payload: data
});

export const adminGetClassList = data => ({
  type: types.ADMIN_GET_CLASS_LIST,
  payload: data
});

export const adminGetSubjectList = data => ({
  type: types.ADMIN_GET_SUBJECT_LIST,
  payload: data
});

export const adminGetStudentList = data => ({
  type: types.ADMIN_GET_STUDENT_LIST,
  payload: data
});

export const adminGetRoleList = data => ({
  type: types.ADMIN_GET_ROLE_LIST,
  payload: data
});

export const adminGetDataSourceClass = data => ({
  type: types.ADMIN_GET_DATASOURCE_CLASS,
  payload: data
});

export const adminGetDataSourceGroup = data => ({
  type: types.ADMIN_GET_DATASOURCE_GROUP,
  payload: data
});

export const adminGetDataSourceSubject = data => ({
  type: types.ADMIN_GET_DATASOURCE_SUBJECT,
  payload: data
});

export const adminGetDataSourceStudent = data => ({
  type: types.ADMIN_GET_DATASOURCE_STUDENT,
  payload: data
});

export const adminSetModalFormUser = (field, value) => ({
  type: types.ADMIN_SET_MODAL_FORM_USER,
  value,
  field
});

export const adminSetModalFormUserRole = (field, value) => ({
  type: types.ADMIN_SET_MODAL_FORM_USER_ROLE,
  value,
  field
});

export const adminSetModalFormGroup = (field, value) => ({
  type: types.ADMIN_SET_MODAL_FORM_GROUP,
  value,
  field
});

export const adminSetModalFormClass = (field, value) => ({
  type: types.ADMIN_SET_MODAL_FORM_CLASS,
  value,
  field
});

export const adminSetModalFormSubject = (field, value) => ({
  type: types.ADMIN_SET_MODAL_FORM_SUBJECT,
  value,
  field
});

export const adminSetModalFormStudent = (field, value) => ({
  type: types.ADMIN_SET_MODAL_FORM_STUDENT,
  value,
  field
});

export const adminCreateUser = () => ({
  type: types.ADMIN_CREATE_USER
});

export const adminCreateClass = () => ({
  type: types.ADMIN_CREATE_CLASS
});

export const adminCreateSubject = () => ({
  type: types.ADMIN_CREATE_SUBJECT
});

export const adminCreateStudent = () => ({
  type: types.ADMIN_CREATE_STUDENT
});

export const adminSignUserRole = () => ({
  type: types.ADMIN_SIGN_USER_ROLE
});

export const setStateModalFormLogin = (field, value) => ({
  type: types.SET_MODAL_FORM_LOGIN,
  value,
  field
});

export const adminGetUserById = data => ({
  type: types.ADMIN_GET_USER_BY_ID,
  payload: data
});

export const adminGetRoleByUserId = data => ({
  type: types.ADMIN_GET_ROLE_BY_USER_ID,
  payload: data
});
