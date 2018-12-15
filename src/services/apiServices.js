import axios from 'axios';


export function getUsers() {
    let url = `${window.settings.api}/api/user`;
    return axios.get(url);
}

export function getUser(id) {
    let url = `${window.settings.api}/api/user/${id}`;
    return axios.get(url);
}



export function getFromQueryString(parameter, url, emptyVal) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + parameter + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : emptyVal;
} 