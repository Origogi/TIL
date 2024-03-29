import { Maze } from "../maze";
import { MazeBuilder } from "./maze-builder";
import { CountingMazeBuilder } from "./counting-maze-builder";

export function createMaze(builder : MazeBuilder) : Maze {
    builder.buildMaze();

    builder.buildRoom(1);
    builder.buildRoom(2);
    builder.buildDoor(1, 2);

    return builder.getMaze();
}

