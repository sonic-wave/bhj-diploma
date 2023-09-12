/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let method = '';
    let url = options.url;
    const formData = new FormData();
    let data = '';

    if (options.method === 'GET') {
        let values = '';
        if (options.data !== undefined) {
            data = Object.entries(options.data);
            for ([key, value] of data) {
                values += key + '=' + value + '&';
            }
            values = values.substring(0, values.length - 1);
            const urlForm = `${options.url}?${values}`;
            method = 'GET';
            url = urlForm;
        } else {
            method = 'GET';
            url = options.url;
        }
        // method = 'GET';
        // url = urlForm;
    }

    if (options.method !== 'GET' && options.data !== null && options.data !== undefined) {
        data = Object.entries(options.data);
        method = options.method;
        for (const [key, value] of data) {
            formData.append(key, value);
        }
    }

    try {
        xhr.open(options.method, url);
        xhr.send(formData);
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                    options.callback(null, xhr.response);
            }
        }
    }
    catch (e) {
        console.log(e);
    }

}

