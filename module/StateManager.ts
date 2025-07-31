type avgFpsBus = {
    number: number
};

class StateManager {
    #avgFps = 0;
    #eventBus = new EventTarget();

    get avgFps() { return this.#avgFps; }
    set avgFps(number: number) {
        this.#avgFps = number;
        this.#eventBus.dispatchEvent(new CustomEvent<avgFpsBus>('avgFps', { detail: { number } }));
    }
    subscribeAvgFps(callback: (e: CustomEvent<avgFpsBus>) => void) {
        this.#eventBus.addEventListener('avgFps', callback as EventListener);
    }
    unsubscribeAvgFps(callback: (e: CustomEvent<avgFpsBus>) => void) {
        this.#eventBus.removeEventListener('avgFps', callback as EventListener);
    }
}

export const sharedState = new StateManager();
