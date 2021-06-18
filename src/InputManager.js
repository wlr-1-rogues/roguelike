class InputManager {
  observers = [];

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  broadcast(action, data) {
    this.observers.forEach((subscriber) => subscriber(action, data));
  }

  handleKeys = (e) => {
    e.preventDefault();
    switch (e.keyCode) {
      case 37:
        this.broadcast("move", { x: -1, y: 0 });
        break;
      case 38:
        this.broadcast("move", { x: 0, y: -1 });
        break;
      case 39:
        this.broadcast("move", { x: 1, y: 0 });
        break;
      case 40:
        this.broadcast("move", { x: 0, y: 1 });
        break;
      case 49:
        this.broadcast("inspect", 0)
        break;
      case 50:
        this.broadcast("inspect", 1)
        break;
      case 51:
        this.broadcast("inspect", 2)
        break;
      case 52:
        this.broadcast("inspect", 3)
        break;
      case 53:
        this.broadcast("inspect", 4)
        break;
      case 54:
        this.broadcast("inspectE", 'left')
        break;
      case 55:
        this.broadcast("inspectE", 'right')
        break;
      case 56:
        this.broadcast("inspectE", 'head')
        break;
      case 57:
        this.broadcast("inspectE", 'torso')
        break;
      case 69:
        this.broadcast("equip", 0)
        break;
      case 82:
        this.broadcast("drop", 0)
        break;
      default:
        break;
    }
  };

  bindKeys() {
    document.addEventListener("keydown", this.handleKeys);
  }

  unbindKeys() {
    document.removeEventListener("keydown", this.handleKeys);
  }
}

export default InputManager;
