import ToDo from "./types";

class ToDoModel {
  private state: ToDo[];
  constructor() {}

  getState(): ToDo[] {
    return this.state;
  }
  getToDo(resolve: Function): void {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json: Array<ToDo>) => {
        this.state = json.slice(0, 10);
        resolve(this.state);
      });
  }
  postToDo(toDo: ToDo, resolve: Function): void {
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify(toDo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json: ToDo) => {
        this.state.push(json);
        resolve(json);
      });
  }
  putToDo(toDo: ToDo, resolve: Function): void {
    fetch(`https://jsonplaceholder.typicode.com/todos/${toDo.id}`, {
      method: "PUT",
      body: JSON.stringify(toDo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json: ToDo) => {
        this.state[this.state.findIndex((el) => el.id === json.id)] = json;
        resolve(json);
      });
  }
  patchToDo(toDoID: number, toDo: Partial<ToDo>, resolve: Function): void {
    fetch(`https://jsonplaceholder.typicode.com/todos/${toDoID}`, {
      method: "PATCH",
      body: JSON.stringify(toDo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json: ToDo) => {
        this.state[this.state.findIndex((el) => el.id === json.id)] = json;
        resolve(json);
      });
  }
  deleteToDo(toDoID: number, resolve: Function): void {
    fetch(`https://jsonplaceholder.typicode.com/todos/${toDoID}`, {
      method: "DELETE",
    }).then(() => {
      this.state = this.state.filter((toDo) => toDo.id !== toDoID);
      resolve(this.getState());
    });
  }
}

export default ToDoModel;
