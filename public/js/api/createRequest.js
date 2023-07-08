/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let method = '';
    let url = options.url;
    let data = Object.entries(options.data);
    const formData = new FormData();

    if (options.method === 'GET') {
        let values = '';
        for ([key, value] of data) {
            values += key + '=' + value + '&';
        }
        values = values.substring(0, values.length - 1);
        const urlForm = `${options.url}?${values}`;
        method = 'GET';
        url = urlForm;
    }

    if (options.method !== 'GET') {
        method = options.method;
        for ([key, value] of data) {
            formData.append(key, value);
        }
    }

    try {
        xhr.open(method, url);
        xhr.send(formData);
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                if (xhr.response.error == null) {
                    options.callback = (undefined, xhr.response);
                } else {
                    options.callback = (xhr.response.error, xhr.response);
                }
            }
        }
    }
    catch (e) {
        console.log(e);
    }

}

createRequest(options = {
    url: 'http://localhost:8000', // адрес
    data: { // произвольные данные, могут отсутствовать
      email: 'ivan@poselok.ru',
      password: 'odinodin'
    },
    method: 'GET', // метод запроса
    /*
      Функция, которая сработает после запроса.
      Если в процессе запроса произойдёт ошибка, её объект
      должен быть в параметре err.
      Если в запросе есть данные, они должны быть переданы в response.
    */
    callback: (err, response) => {
        if (err !== null) {
            console.log( 'Ошибка, если есть', err );
        }
        console.log( 'Данные, если нет ошибки', response );
    }
  });