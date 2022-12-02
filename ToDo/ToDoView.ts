import ToDoController from "./ToDoController";
import ToDo from "./types";

class ToDoView {
  root: HTMLElement;
  controller: ToDoController;
  div: HTMLDivElement;
  viewState: ToDo[];
  constructor(root: HTMLElement, controller: ToDoController) {
    this.root = root;
    this.controller = controller;
    this.addEventLisners();
    this.mount();
  }
  private mount() {
    this.root.appendChild(this.div);
  }
  private addEventLisners() {
    this.div = document.createElement("div");
    this.div.innerHTML = "Hello World";
    this.div.addEventListener("click", () => {
      this.controller.getToDo().then((toDo) => {
        this.viewState = toDo;
        this.viewState.map((el) => {
          this.root.appendChild(this.createToDo(el));
        });
      });
    });
  }
  private createToDo(toDo: ToDo): Node {
    const container = document.createElement("div");
    container.id = toDo.id.toString();
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = toDo.completed;
    const title = document.createElement("span");
    title.innerText = toDo.title;
    container.appendChild(checkbox);
    container.appendChild(title);
    return container;
  }
}

export default ToDoView;
