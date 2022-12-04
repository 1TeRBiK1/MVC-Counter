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
    this.mount();
  }

  private mount() {
    this.addEventLisners();
    this.getInitToDo();
  }

  private addEventLisners() {}

  private getInitToDo() {
    this.controller.getToDo().then((toDo) => {
      this.updateToDo(toDo);
    });
  }

  private updateToDo(ToDo: ToDo[]) {
    this.viewState = ToDo;
    this.root.textContent = "";

    this.root.appendChild(this.createForm());

    this.viewState.map((el) => {
      this.root.appendChild(this.createToDo(el));
    });
  }

  private createForm(): HTMLDivElement {
    const form = document.createElement("div");
    form.classList.add("containerForm");
    const input = document.createElement("input");
    input.placeholder = "Enter ToDo";
    input.classList.add("inputForm");
    const button = document.createElement("button");
    button.innerText = "Add ToDo";
    button.classList.add("buttonForm");
    button.addEventListener("click", () => {
      this.controller
        .postToDo({
          title: input.value,
          completed: false,
        })
        .then(() => {
          this.updateToDo(this.viewState);
        });
    });

    form.appendChild(input);
    form.appendChild(button);

    return form;
  }

  private createToDo(toDo: ToDo): Node {
    const container = document.createElement("div");
    container.id = toDo.id.toString();
    container.classList.add("container");

    const checkbox = this.createCheckbox(toDo.completed);
    const title = this.createTitle(toDo.title, toDo.completed);
    const buttons = this.createActionButtons(toDo.id);

    container.appendChild(checkbox);
    container.appendChild(title);
    container.appendChild(buttons);

    return container;
  }

  private createCheckbox(checked: boolean): HTMLInputElement {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    checkbox.classList.add("checkbox");
    return checkbox;
  }

  private createTitle(title: string, completed: boolean): HTMLDivElement {
    const div = document.createElement("div");
    div.innerText = title;
    div.classList.add("title");
    completed ? div.classList.add("completed") : null;
    return div;
  }

  private createActionButtons(toDoID: number): HTMLDivElement {
    const container = document.createElement("div");
    container.classList.add("buttonsContainer");

    const editButton = this.createEditButton();
    const deleteButton = this.createDeleteButton(toDoID);

    container.appendChild(editButton);
    container.appendChild(deleteButton);
    return container;
  }

  private createEditButton(): HTMLButtonElement {
    const editButton = document.createElement("button");
    editButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
  </svg>`;
    editButton.classList.add("edit");

    return editButton;
  }

  private createDeleteButton(toDoID: number): HTMLButtonElement {
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>`;
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => {
      this.controller.deleteToDo(toDoID).then((state) => {
        this.updateToDo(state);
      });
    });

    return deleteButton;
  }
}

export default ToDoView;
