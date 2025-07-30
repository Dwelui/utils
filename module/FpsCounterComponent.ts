import html from './resources/FpsCounter.template.html?raw';

export class FpsCounterComponent extends HTMLElement {
    constructor() {
        super();

        console.info("FpsCounterComponent::Started");

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = html;

        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            console.log('YOU CLICKED IT!');
        });
    }
}

customElements.define('fps-counter-component', FpsCounterComponent);

