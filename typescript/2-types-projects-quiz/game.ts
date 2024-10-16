/**
 * Let's make a game 🕹
 */

{
  type Postiton = {
    x: number;
    y: number;
  };

  type Direction = 'up' | 'down' | 'left' | 'right';

  let position: Postiton = {
    x: 0,
    y: 0,
  };

  function move(direction: Direction) {
    switch (direction) {
      case 'up':
        position = {
          x: position.x,
          y: position.y + 1,
        };
        break;
      case 'down':
        position = {
          x: position.x,
          y: position.y - 1,
        };
        break;
      case 'left':
        position = {
          x: position.x - 1,
          y: position.y,
        };
        break;
      case 'right':
        position = {
          x: position.x + 1,
          y: position.y,
        };
        break;
    }
  }

  console.log(position); // { x: 0, y: 0}
  move('up');
  console.log(position); // { x: 0, y: 1}
  move('down');
  console.log(position); // { x: 0, y: 0}
  move('left');
  console.log(position); // { x: -1, y: 0}
  move('right');
  console.log(position); // { x: 0, y: 0}
}
