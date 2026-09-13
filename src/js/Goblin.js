/**
 * URL изображения гоблина, размещённого в репозитории Netology.
 * @type {string}
 */
const GOBLIN_URL =
  'https://raw.githubusercontent.com/netology-code/ahj-homeworks/AHJ-50/dom/pic/goblin.png';

/**
 * Класс, управляющий появлением, исчезновением и логикой «поражения» гоблина.
 * Отвечает за размещение картинки гоблина на случайной ячейке игрового поля
 * и проверку попадания по нему.
 */
export default class Goblin {
  /**
   * Создаёт экземпляр гоблина и привязывает его к игровому полю.
   * @param {GameField} field - Экземпляр игрового поля, на котором будет появляться гоблин.
   */
  constructor(field) {
    /**
     * Ссылка на игровое поле, которым управляет гоблин.
     * @type {GameField}
     */
    this.field = field;

    /**
     * Текущая ячейка, в которой находится гоблин (DOM-элемент).
     * @type {HTMLDivElement | null}
     */
    this.currentCell = null;

    /**
     * Индекс текущей ячейки с гоблином. -1 означает, что гоблина нет на поле.
     * @type {number}
     */
    this.currentIndex = -1;

    /**
     * Элемент изображения гоблина.
     * @type {HTMLImageElement}
     */
    this.img = document.createElement('img');
    this.img.src = GOBLIN_URL;
    this.img.alt = 'Гоблин';
  }

  /**
   * Показывает гоблина: очищает поле от предыдущего гоблина, выбирает новую случайную
   * ячейку (не совпадающую с предыдущей позицией) и помещает туда изображение.
   */
  appear() {
    // Сначала очищаем поле от старого гоблина (на случай, если он ещё там)
    this.field.clearGoblin();

    // Выбираем новый случайный индекс, отличный от текущего
    this.currentIndex = this.field.getRandomIndex(this.currentIndex);
    this.currentCell = this.field.getCell(this.currentIndex);

    if (this.currentCell) {
      this.currentCell.appendChild(this.img);
    }
  }

  /**
   * Убирает гоблина с игрового поля: очищает все ячейки и сбрасывает индекс текущей позиции.
   */
  disappear() {
    this.field.clearGoblin();
    this.currentIndex = -1;
  }

  /**
   * Проверяет, попал ли игрок в гоблина по указанному индексу ячейки.
   * Если попадание есть — убирает гоблина и возвращает true, иначе — false.
   * @param {number} index - Индекс ячейки, по которой кликнул игрок.
   * @returns {boolean} true, если игрок попал в гоблина; false — если промахнулся.
   */
  hit(index) {
    if (index === this.currentIndex) {
      this.disappear();
      return true;
    }
    return false;
  }
}
