// src/dom/move-element.ts
export function initMoveElement() {
  const fromContainer = document.querySelector<HTMLElement>('#from');
  const toContainer = document.querySelector<HTMLElement>('#to');
  const btn = document.querySelector<HTMLButtonElement>('#move-btn');

  if (!fromContainer || !toContainer || !btn) {
    console.error('Не найдены элементы #from, #to или #move-btn');
    return;
  }

  // Находим элемент, который будем перемещать (например, первый дочерний элемент)
  const elementToMove = fromContainer.firstElementChild;

  if (!elementToMove) {
    console.warn('В #from нет элементов для перемещения');
    return;
  }

  btn.addEventListener('click', () => {
    // Перемещение: appendChild автоматически удаляет элемент из старого родителя
    toContainer.appendChild(elementToMove);
  });
}