import {Composable, PageComponent, PageItemComponent} from "./components/page/page.js";
import {ImageComponent} from "./components/page/item/image.js";
import {NoteComponent} from "./components/page/item/note.js";
import {TodoComponent} from "./components/page/item/todo.js";
import {VideoComponent} from "./components/page/item/video.js";
import {Component} from "./components/component.js";
import {InputDialog, MediaData, TextData} from "./components/dialog/dialog.js";
import {MediaSectionInput} from "./components/dialog/input/media-input.js";
import {TextSectionInput} from "./components/dialog/input/text-input.js";

type InputComponentConstructor<T = (TextData | MediaData) & Component> = {
    new () : T;
}

class App {
    private readonly page: Composable & Component;

    constructor(appRoot: HTMLElement, private dialogRoot : HTMLElement) {
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);


        this.bindElementToDialog<MediaSectionInput>(
            "#new-image",
            MediaSectionInput,
            (input) => new ImageComponent(input.title, input.url)
        );

        this.bindElementToDialog<MediaSectionInput>(
            "#new-video",
            MediaSectionInput,
            (input) => new VideoComponent(input.title, input.url)
        );

       this.bindElementToDialog<TextSectionInput>(
           "#new-note",
           TextSectionInput,
           (input) => new NoteComponent(input.title, input.body)
       )

        this.bindElementToDialog<TextSectionInput>(
            "#new-todo",
            TextSectionInput,
            (input) => new TodoComponent(input.title, input.body)
        )

    }

    private bindElementToDialog<T extends (MediaData | TextData) & Component >(
        selector : string,
        InputComponent : InputComponentConstructor<T>,
        makeSection : (input : T) => Component ) {

        const imageBtn = document.querySelector(selector) as HTMLButtonElement;
        imageBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const input = new InputComponent();
            dialog.addChild(input);
            dialog.attachTo(this.dialogRoot);
            dialog.setOncloseListener(() => {
                dialog.removeFrom(this.dialogRoot);
            });

            dialog.setOnSubmitListener(() => {
                const image = makeSection(input)
                this.page.addChild(image);
                dialog.removeFrom(this.dialogRoot);
            });
        });
    }
}

new App(document.querySelector('.document')! , document.body);