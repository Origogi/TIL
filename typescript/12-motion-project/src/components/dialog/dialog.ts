import {BaseComponent, Component} from "../component.js";
import {Composable} from "../page/page.js";

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export interface MediaData {
    readonly title : string;
    readonly url : string;
}

export interface TextData {
    readonly title : string;
    readonly body : string;
}

export class InputDialog extends BaseComponent<HTMLElement> implements Composable {

    closeListener?: OnCloseListener;
    submitListener?: OnSubmitListener;

    constructor() {
        super(`
            <dialog class="dialog">
            <div class="dialog__container">
                 <button class="close">&times;</button>
                <div id="dialog__body"></div>
                <button class="dialog__submit">ADD</button>
            </div>
        
            </dialog>
        `);

        const closeBtn = this.element.querySelector('.close') as HTMLElement;
        const submitBtn = this.element.querySelector('.dialog__submit') as HTMLElement;

        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        }

        submitBtn.onclick = () => {
            this.submitListener && this.submitListener();
        }

    }

    addChild(child: Component): void {
        const body = this.element.querySelector('#dialog__body') as HTMLElement;
        child.attachTo(body);
    }

    setOncloseListener(listener: OnCloseListener) {
        this.closeListener = listener;
    }

    setOnSubmitListener(listener : OnSubmitListener) {
        this.submitListener = listener;
    }


}