/**
 * Created by phanmduong on 5/27/17.
 */

export function dotNumber(number) {
    if (number) {
        return number.toString().replace(/\./g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return 0;
}

export function maxArray(arr) {
    var max = -10000000;
    arr.forEach(function (item) {
        var data = parseInt(item);
        if (data > max) max = data;
    })
    return max;
}

export function formatPhone(phone) {
    if (phone.length === 10) {
        return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');
    } else {
        return phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1.$2.$3');
    }
}

export function typeConnect(type) {
    if (type.toLowerCase() == 'wifi') {
        return 'Wifi';
    }
    if (type.toLowerCase() == 'mobile') {
        return 'Điện thoại';
    }
    return '';

}

export function isEmptyInput(input) {
    return input === null || input === undefined || input.toString().trim().length <= 0;
}

export function convertHttp(url) {
    if (isEmptyInput(url)) return url;
    if (url.substr(0, 4) === 'http') return url;
    return 'http://' + url;
}