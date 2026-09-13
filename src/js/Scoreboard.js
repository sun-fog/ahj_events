/**
 * Класс, отвечающий за подсчёт очков, промахов и отображение статистики игры.
 * Управляет счётчиком попаданий, отслеживает количество промахов, сравнивает их
 * с максимально допустимым значением и обновляет соответствующие DOM‑элементы.
 */
export default class Scoreboard {
  /**
   * Создаёт экземпляр табло счёта.
   * @param {number} [maxMisses=5] - Максимально допустимое количество промахов до окончания игры.
   */
  constructor(maxMisses = 5) {
    /**
     * Текущее количество попаданий (очков).
     * @type {number}
     */
    this.score = 0;

    /**
     * Текущее количество промахов.
     * @type {number}
     */
    this.misses = 0;

    /**
     * Максимально допустимое количество промахов - по достижении этого значения игра завершается.
     * @type {number}
     */
    this.maxMisses = maxMisses;

    /**
     * Элемент DOM для отображения текущего счёта (должен иметь id="score").
     * @type {HTMLElement | null}
     */
    this.scoreEl = document.getElementById("score");

    /**
     * Элемент DOM для отображения количества промахов (должен иметь id="misses").
     * Формат вывода: «X / Y», где X - текущие промахи, Y - максимум.
     * @type {HTMLElement | null}
     */
    this.missesEl = document.getElementById("misses");
  }

  /**
   * Увеличивает счёт на 1 и обновляет отображение.
   */
  addHit() {
    this.score++;
    this._render();
  }

  /**
   * Увеличивает счётчик промахов на 1 и обновляет отображение.
   */
  addMiss() {
    this.misses++;
    this._render();
  }

  /**
   * Проверяет, превышено ли максимально допустимое количество промахов.
   * Используется для определения момента окончания игры.
   * @returns {boolean} true, если количество промахов достигло или превысило лимит; иначе - false.
   */
  isGameOver() {
    return this.misses >= this.maxMisses;
  }

  /**
   * Сбрасывает счёт и количество промахов в ноль и обновляет отображение.
   * Вызывается при старте новой игры.
   */
  reset() {
    this.score = 0;
    this.misses = 0;
    this._render();
  }

  /**
   * Обновляет текст в DOM‑элементах счёта и промахов.
   * Если элемент не найден (null), обновление для него пропускается.
   */
  _render() {
    if (this.scoreEl) {
      this.scoreEl.textContent = String(this.score);
    }

    if (this.missesEl) {
      this.missesEl.textContent = `${this.misses} / ${this.maxMisses}`;
    }
  }
}
