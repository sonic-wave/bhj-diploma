/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let accountSelect = this.element.querySelector('.accounts-select');

    Account.list(User.current(), (err, response) => {
      response.data.forEach(element => {
        accountSelect.innerHTML += `<option value="${element.id}">${element.name}</option>`;
      });
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        this.element.reset();
        const modalWindow = this.element.closest('.modal');
        let modal;
        if (modalWindow.getAttribute('id') === 'modal-new-income') {
          modal = 'newIncome';
        } else {
          modal = 'newExpense';
        }
        const getModal = App.getModal(modal);
        getModal.close();
        App.update();
      }
    })
  }
}

