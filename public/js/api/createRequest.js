/**
 * Основная функция для совершения запросов
 * на сервер.
 * */


const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let method = '';
    let url = options.url;

    if (options.method === 'GET') {
        const urlForm = `${options.url}?mail=${options.data.mail}&password=${options.data.password}`;
        method = 'GET';
        url = urlForm;
    }

    if (options.method !== 'GET') {
        const formData = new FormData();
        method = options.method;
        formData.append('mail', options.data.mail);
        formData.append('password', options.data.password);
    }

    try {
        xhr.open(method, url);
        xhr.send(formData);
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                options.callback = (xhr.response.error, xhr.response);
            }
        }
    }
    catch (e) {
        console.log(e);
    }

}
