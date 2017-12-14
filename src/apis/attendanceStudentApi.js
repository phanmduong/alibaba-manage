/**
 * Created by phanmduong on 4/7/17.
 */
import axios from 'axios';
import * as env from '../constants/env';

export function getInfoStudentApi(studentCode, token) {
    let url = env.API_URL + "/studentcode/" + studentCode + "?token=" + token;
    return axios.get(url);
}

export function postAttendanceStudentApi(attendanceId, status = null, hw_status = null, token) {
    let url = env.API_URL + "/attendances/" + attendanceId + "?token=" + token;
    return axios.post(url, {
        status: status ? status : 0,
        hw_status: hw_status ? hw_status : 0,
    });
}

