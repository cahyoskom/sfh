import { call, put, all, takeEvery } from 'redux-saga/effects';
import {
  ADMIN_APROVAL_GET_DATA_ADS,
  ADMIN_APROVAL_GET_DATA_ADS_SUCCESS
} from '../constants/ActionTypes';
import { fail, success } from "../components/common/toast-message";
import * as services from "../services";
import { API_BASE_URL_DEV, API_PATH } from "../constants/api";
import { Header, HeaderAuth } from "../services/header";

export function* adminAprovalGetAllAdsList() {
  try {
    const response = {
      listAds: [
        {
          id: 1,
          nama: "Naster kering enak",
          pembuat: "ipul",
          dilihat: 0,
          periode: "01-08-2020 sampai 07-08-2020",
          status: "Menunggu Persetujuan",
          tarif: 5000
        },
        {
          id: 2,
          nama: "HP murah",
          pembuat: "Bagio",
          dilihat: 10,
          periode: "01-08-2020 sampai 01-09-2020",
          status: "Menunggu Persetujuan",
          tarif: 10000
        },
        {
          id: 3,
          nama: "Katering sehat",
          pembuat: "Darmi",
          dilihat: 20,
          periode: "01-08-2020 sampai 07-08-2020",
          status: "Menunggu Persetujuan",
          tarif: 5000
        },
        {
          id: 4,
          nama: "Barang elektronik berkualitas",
          pembuat: "Ajoy",
          dilihat: 100,
          periode: "01-08-2020 sampai 07-08-2021",
          status: "Menunggu Persetujuan",
          tarif: 50000
        },
        {
          id: 5,
          nama: "Boneka lucu",
          pembuat: "Diana",
          dilihat: 5,
          periode: "01-07-2020 sampai 30-07-2020",
          status: "Dipubilkasikan",
          tarif: 10000
        }
      ]
    };


    const _response = yield call(services.GET, API_BASE_URL_DEV + API_PATH.admadslist, HeaderAuth());
    yield put({
      type: ADMIN_APROVAL_GET_DATA_ADS_SUCCESS,
      value: _response
    });
    console.log('saga : ', _response.data.data);
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(ADMIN_APROVAL_GET_DATA_ADS, adminAprovalGetAllAdsList)
  ]);
}
