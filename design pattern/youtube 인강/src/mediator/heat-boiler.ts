import { Participant } from "./participant";
import { Mediator } from "./mediator";

export class HeatBoiler extends Participant {
  private _isOff = false;

  constructor(mediator: Mediator) {
    super(mediator);
  }

  displayState(dom: HTMLElement): void {
    dom.innerText = this._isOff ? "보일러 off" : "보일러 on";

    if (this._isOff) {
      dom.classList.remove("hilighting");
    } else {
      dom.classList.add("hilighting");
    }
  }

  on() {
    if (!this._isOff) {
      return;
    }

    this._isOff = false;
    this.mediator.participantChanged(this);
  }

  off() {
    if (this._isOff) {
      return;
    }

    this._isOff = true;
    this.mediator.participantChanged(this);
  }

  get isOff(): boolean {
    return this._isOff;
  }
}
