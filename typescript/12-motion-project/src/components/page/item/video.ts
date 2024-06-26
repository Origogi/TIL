// <iframe width="1022" height="575" src="https://www.youtube.com/embed/Jq9Z_aRxZdI" title="제노블레이드3 새로운 미래 2화 엔딩 (Xenoblade Chronicles 3 DLC)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

import {BaseComponent} from "../../component.js";

export class VideoComponent extends BaseComponent<HTMLElement> {
    constructor(title: string, url: string) {
        super(`
        <section class="video">
            <div class="video__player">
                <iframe class="video__iframe"></iframe>
            </div>
            <h3 class="page-item__title video__title"></h3>
        </section>
        `);

        const iframe = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
        iframe.src = url;

        iframe.src = this.convertToEmbeddedURL(url);

        const titleElement = this.element.querySelector('.video__title')! as HTMLHeadingElement;
        titleElement.textContent = title;
    }

    private convertToEmbeddedURL(url: string): string {
        const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        const match = url.match(regex);
        const videoId = match ? match[1] || match[2] : undefined;

        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    }

}