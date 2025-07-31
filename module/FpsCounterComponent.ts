import { sharedState } from './StateManager';
import html from './resources/FpsCounter.template.html?raw';

export default class FpsCounterComponent extends HTMLElement {
    static register(tag = 'fps-counter-component') {
        if (!customElements.get(tag)) {
            customElements.define(tag, FpsCounterComponent);
        }
    }

    constructor() {
        super();

        console.info("FpsCounterComponent::Started");

        this.attachShadow({ mode: 'open' });

        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = html;
        }

        const fpsElement = this.shadowRoot?.getElementById('avgFps');
        sharedState.subscribeAvgFps((e) => {
            if (fpsElement) fpsElement.textContent = String(e.detail.number);
        });
    }
}
