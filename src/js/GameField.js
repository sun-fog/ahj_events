/**
 * Класс, отвечающий за создание и управление игровым полем (сеткой ячеек).
 * Создаёт DOM-элементы ячеек, предоставляет методы для работы с ними
 * и управляет визуальным состоянием поля (в т.ч. режимом «игра окончена»).
 */
export default class GameField {
  /**
   * Создаёт экземпляр игрового поля заданного размера.
   * @param {number} [boardSize=4] - Размер стороны игрового поля (количество ячеек в ряду).
   */
  constructor(boardSize = 4) {
    /**
     * Размер стороны игрового поля.
     * @type {number}
     */
    this.boardSize = boardSize;

    /**
     * Массив DOM-элементов ячеек игрового поля.
     * @type {HTMLDivElement[]}
     */
    this.cells = [];

    /**
     * Корневой элемент игрового поля в DOM (должен иметь id="board").
     * @type {HTMLElement}
     */
    this.boardEl = document.getElementById('board');

    if (!this.boardEl) {
      throw new Error('Элемент #board не найден');
    }
  }

  /**
   * Создаёт сетку ячеек игрового поля.
   * Очищает текущее содержимое boardEl, генерирует новые div-элементы с классом .cell,
   * присваивает им data-атрибут index и добавляет в DOM.
   * @returns {HTMLDivElement[]} Массив созданных ячеек.
   */
  create() {
    this.boardEl.innerHTML = '';
    this.cells = [];

    const totalCells = this.boardSize * this.boardSize;
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = String(i);
      this.boardEl.appendChild(cell);
      this.cells.push(cell);
    }

    return this.cells;
  }

  /**
   * Получает ячейку по её индексу.
   * @param {number} index - Индекс ячейки.
   * @returns {HTMLDivElement | null} Элемент ячейки или null, если индекс вне диапазона.
   */
  getCell(index) {
    return this.cells[index] || null;
  }

  /**
   * Возвращает случайный индекс ячейки, отличный от исключённого.
   * Используется для выбора новой позиции гоблина, чтобы он не появлялся
   * на той же самой ячейке подряд.
   * @param {number} [exclude=-1] - Индекс, который нужно исключить из выбора.
   * @returns {number} Случайный индекс ячейки.
   */
  getRandomIndex(exclude = -1) {
    let index = Math.floor(Math.random() * this.cells.length);
    while (index === exclude) {
      index = Math.floor(Math.random() * this.cells.length);
    }
    return index;
  }

  /**
   * Устанавливает визуальное состояние «игра окончена» для игрового поля.
   * Добавляет CSS-класс .game-over к корневому элементу поля.
   */
  setGameOver() {
    this.boardEl.classList.add('game-over');
  }

  /**
   * Сбрасывает состояние игрового поля: убирает класс .game-over и очищает ячейки
   * от содержимого (удаляет изображение гоблина).
   */
  reset() {
    this.boardEl.classList.remove('game-over');
    this.clearGoblin();
  }

  /**
   * Очищает все ячейки игрового поля от внутреннего содержимого.
   * Используется для удаления изображения гоблина со всех ячеек перед новым появлением.
   */
  clearGoblin() {
    this.cells.forEach((cell) => {
      cell.innerHTML = '';
    });
  }
}
