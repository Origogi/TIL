import { Maze } from "./maze";
import { Room } from "./room";
import { Door } from "./door";
import { Wall } from "./wall";
import { Direction } from "./direction";
import { CountingMazeBuilder } from "./builder/counting-maze-builder";
import { createMaze } from "./builder";
import { BombedMazeFactory } from "./abstract-factory/bombed-maze-factory";
import { MazeGame } from "./abstract-factory/maze-game";
import { EnchantedMazeFactory } from "./abstract-factory/enchanted-maze-factory";

console.log("Maze Game");

// const countingMazeBuilder = new CountingMazeBuilder();
// createMaze(countingMazeBuilder);
//
// console.log(countingMazeBuilder.getCounts());

// const mazeFactory = new BombedMazeFactory();
const mazeFactory = new EnchantedMazeFactory();

const mazeGame = new MazeGame();
const maze = mazeGame.createMaze(mazeFactory);

console.log(maze);
maze.roomNo(1)?.enter();

//
// function createMaze(): Maze {
//   const maze = new Maze();
//
//   const r1 = new Room(1);
//   const r2 = new Room(2);
//
//   const theDoor = new Door(r1, r2);
//
//   maze.addRoom(r1);
//   maze.addRoom(r2);
//
//   r1.setSide(Direction.North, new Wall());
//   r1.setSide(Direction.East, theDoor);
//   r1.setSide(Direction.West, new Wall());
//   r1.setSide(Direction.South, new Wall());
//
//   r2.setSide(Direction.North, new Wall());
//   r2.setSide(Direction.East, new Wall());
//   r2.setSide(Direction.West, theDoor);
//   r2.setSide(Direction.South, new Wall());
//
//   return maze;
// }
