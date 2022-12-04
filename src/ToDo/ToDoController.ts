import ToDoModel from "./ToDoModel";
import ToDo from "./types";

class ToDoController {
  model: ToDoModel;
  constructor(model: ToDoModel) {
    this.model = model;
  }
  getState(): ToDo[] {
    return this.model.getState();
  }
  getToDo(): Promise<ToDo[]> {
    return new Promise((resolve) => {
      this.model.getToDo(resolve);
    });
  }
  postToDo(toDo: Partial<ToDo>): Promise<ToDo> {
    return new Promise((resolve) => {
      this.model.postToDo(toDo, resolve);
    });
  }
  putToDo(toDo: ToDo): Promise<ToDo> {
    return new Promise((resolve) => {
      this.model.putToDo(toDo, resolve);
    });
  }
  patchToDo(toDoID: number, toDo: Partial<ToDo>): Promise<ToDo> {
    return new Promise((resolve) => {
      this.model.patchToDo(toDoID, toDo, resolve);
    });
  }
  deleteToDo(toDoID: number): Promise<ToDo[]> {
    return new Promise((resolve) => {
      this.model.deleteToDo(toDoID, resolve);
    });
  }
}

export default ToDoController;
