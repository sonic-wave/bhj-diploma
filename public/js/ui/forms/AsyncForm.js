/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    try {
      if (element === undefined || element === '') {
        throw new Error('Элемент пустой');
      }

      this.element = element;
      this.registerEvents();
    }
    catch (e) {
      console.log(e);
    }
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
      this.element.addEventListener('submit', (e) => {
        e.preventDefault(); 
        this.submit();
      }) 
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    const data = new FormData(this.element);
    for (const [key, value] of Object.entries(data)) {
      data.append(key, value);
    }
    return data;
  }

  onSubmit(options){

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    let data = this.getData(); 
    this.onSubmit(data); 
  }
}