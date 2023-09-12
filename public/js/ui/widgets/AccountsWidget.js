/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    try {
      this.element = element;
      this.registerEvents();
      this.update();
    }
    catch (e) {
      console.log(e);
  }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createButton = document.querySelector('.create-account');
    createButton.addEventListener('click', () => {
      App.getModal('createAccount').open();
    });
    
    this.element.addEventListener('click', (e) => {
      let item = e.target;
      if (item.closest('.account')) {
        this.onSelectAccount(item.closest('.account'));
      }
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const user = User.current();

    Account.list(user, (error, response) => {
      if (response.success) {
        this.clear();
        response.data.forEach(element => this.renderItem(element));
      }
    });
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    this.element.querySelectorAll('.account').forEach(element => element.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    if (this.currentId) {
      let account = this.element.querySelector(`.account[data-id="${this.currentId}"]`);
      if (account) {
        account.classList.remove('active');
      }
      else {
        this.currentAccountId = null;
      }
    }
    element.classList.add('active');
    this.currentId = element.dataset.id;

    App.showPage( 'transactions', { account_id: this.currentAccountId});
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `<li class="active account" data-id=${item.id}>
    <a href="#">
    <span>${item.name}</span> /
    <span>${item.sum} ₽</span>
    </a>
    </li>`
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    let accountHTML = this.getAccountHTML(data);
    this.element.insertAdjacentHTML('beforeEnd', accountHTML);
  }
}
