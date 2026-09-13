import GameField from './GameField.js';
import Goblin from './Goblin.js';
import Scoreboard from './Scoreboard.js';

/**
 * Интервал появления гоблина в миллисекундах.
 * Гоблин появляется каждые 1000 мс (1 секунда).
 * @type {number}
 */
const APPEAR_INTERVAL = 1000;

/**
 * Максимально допустимое количество промахов до окончания игры.
 * При достижении этого значения игра завершается.
 * @type {number}
 */
const MAX_MISSES = 5;

/**
 * Основной класс игры «Ударь гоблина».
 * Управляет игровым полем, логикой появления/исчезновения гоблина,
 * подсчётом очков и промахов, а также отображением статуса игры.
 */
export default class Game {
  /**
   * Создаёт экземпляр игры, инициализируя игровое поле, гоблина и табло счёта.
   */
  constructor() {
    /**
     * Экземпляр игрового поля (сетка ячеек).
     * @type {GameField}
     */
    this.field = new GameField(4);

    /**
     * Экземпляр гоблина, отвечающий за его появление и исчезновение.
     * @type {Goblin}
     */
    this.goblin = new Goblin(this.field);

    /**
     * Экземпляр табло счёта, отслеживающий попадания и промахи.
     * @type {Scoreboard}
     */
    this.scoreboard = new Scoreboard(MAX_MISSES);

    /**
     * Идентификатор таймера setInterval для планирования появления гоблинов.
     * @type {NodeJS.Timeout | null}
     */
    this.timerId = null;

    /**
     * Флаг активности игры. Если false, действия игрока игнорируются.
     * @type {boolean}
     */
    this.active = false;

    /**
     * Элемент DOM для отображения статуса игры (например, сообщения об окончании).
     * @type {HTMLElement | null}
     */
    this.statusEl = document.getElementById('status');
  }

  /**
   * Запускает игру: создаёт поле, сбрасывает счёт, активирует обработку кликов,
   * показывает первого гоблина и запускает таймер появления новых.
   */
  start() {
    this.field.create();
    this.scoreboard.reset();
    this.field.reset();
    this.active = true;

    this._showStatus('');

    // Обработка кликов по полю (делегирование)
    this.field.boardEl.addEventListener('click', (event) => this._onClick(event));

    // Первый гоблин появляется сразу
    this.goblin.appear();

    // Планируем появление гоблинов каждые APPEAR_INTERVAL мс
    this.timerId = setInterval(() => this._tick(), APPEAR_INTERVAL);
  }

  /**
   * Внутренний метод-тик таймера. Вызывается каждую секунду.
   * Проверяет, был ли гоблин поражён: если нет — засчитывает промах,
   * затем создаёт нового гоблина. Если игра окончена — останавливает цикл.
   */
  _tick() {
    if (!this.active) return;

    // Если гоблин ещё в поле — значит, его не «сбили» → промах
    if (this.goblin.currentIndex !== -1) {
      this.scoreboard.addMiss();
      this.goblin.disappear();

      if (this.scoreboard.isGameOver()) {
        this._gameOver();
        return;
      }
    }

    // Новый гоблин
    this.goblin.appear();
  }

  /**
   * Обработчик клика по игровому полю.
   * Определяет, по какой ячейке кликнули, и проверяет, попал ли игрок в гоблина.
   * @param {MouseEvent} event - Событие клика.
   */
  _onClick(event) {
    if (!this.active) return;

    const cell = event.target.closest('.cell');
    if (!cell) return;

    const index = parseInt(cell.dataset.index, 10);
    const hit = this.goblin.hit(index);

    if (hit) {
      this.scoreboard.addHit();
    }
  }

  /**
   * Завершает игру: останавливает таймер, убирает гоблина, блокирует поле,
   * отображает финальное сообщение.
   */
  _gameOver() {
    this.active = false;
    clearInterval(this.timerId);
    this.goblin.disappear();
    this.field.setGameOver();
    this._showStatus('Игра окончена! Обновите страницу, чтобы начать заново.');
  }

  /**
   * Обновляет текст статуса игры в DOM-элементе #status.
   * Если текст не передан — скрывает статус (добавляет класс hidden).
   * @param {string} [text] - Текст для отображения. Если не указан, статус скрывается.
   */
  _showStatus(text) {
    if (this.statusEl) {
      if (text) {
        this.statusEl.textContent = text;
        this.statusEl.classList.remove('hidden');
      } else {
        this.statusEl.classList.add('hidden');
      }
    }
  }
}
