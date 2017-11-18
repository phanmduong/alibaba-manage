/**
 * Created by phanmduong on 4/7/17.
 */
import * as types from '../constants/actionTypes';
import * as attendanceStudentApi from '../apis/attendanceStudentApi';

export function beginGetInforStudent() {
    return{
        type: types.BEGIN_GET_INFOR_STUDENT,
        isLoadingInfoStudent : true,
        errorLoad: false,
        messageError: undefined
    };
}

export function loadInfoStudent(studentCode, token) {
    return function (dispatch) {
        dispatch(beginGetInforStudent());
        attendanceStudentApi.getInfoStudentApi(studentCode, token).then(function (res) {
            dispatch(loadedInforStudentSuccessful(res));
        }).catch(error => {
            dispatch(loadedInforStudentError(error.response.data));
            throw (error);
        })
    }
}

export function loadedInforStudentSuccessful(res) {
    return {
        type: types.LOAD_GET_INFOR_STUDENT_SUCCESSFUL,
        isLoadingInfoStudent: false,
        errorLoad: false,
        student: res.data.student,
        classStudent: res.data.class
    }
}

export function loadedInforStudentError(res) {
    return {type: types.LOAD_GET_INFOR_STUDENT_ERROR,
        isLoadingInfoStudent: false,
        errorLoad: true,
        messageError: res.error
    }
}

export function beginPostAttendaceStudent() {
    return{
        type: types.BEGIN_POST_ATTENDANCE_STUDENT,
        isUpdatingAttendanceStudent: true,
        errorUpdate: false,
    };
}

export function updateAttendanceStudent(attendanceId, token) {
    return function (dispatch) {
        dispatch(beginPostAttendaceStudent());
        attendanceStudentApi.postAttendanceStudentApi(attendanceId, token).then(function (res) {
            dispatch(updateAttendanceStudentSuccessful(res));
        }).catch(error => {
            dispatch(updateAttendanceStudentError());
            throw (error);
        })

    }
}

export function updateAttendanceStudentSuccessful(res) {
    return ({
        type: types.LOAD_POST_ATTENDANCE_STUDENT_SUCCESSFUL,
        isUpdatingAttendanceStudent: false,
        errorUpdate: false,
        statusRequestUpdated: res.status,
        attendance: res.data.attendance,
        message: res.data.message
    })
}

export function updateAttendanceStudentError() {
    return {type: types.LOAD_POST_ATTENDANCE_STUDENT_ERROR,
        isUpdatingAttendanceStudent: false,
        errorUpdate: true,
    }
}

export function selectButtonEnterStudentCode(studentCode) {
    return{
        type: types.SELECT_BUTTON_ENTER_STUDENT_CODE,
        studentCode: studentCode,
    };
}

export function scannedQRCode(studentCode) {
    return{
        type: types.SCANNED_QR_CODE,
        studentCode: studentCode
    };
}