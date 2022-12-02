import ToDoController from "./ToDo/ToDoController";
import ToDoModel from "./ToDo/ToDoModel";
import ToDoView from "./ToDo/ToDoView";

const root = document.getElementById("root");

const model = new ToDoModel();

const controller = new ToDoController(model);

const view = new ToDoView(root as HTMLElement, controller);

view.div;
