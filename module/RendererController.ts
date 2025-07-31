import * as THREE from 'three';

export default class RendererController {
    #canvas: HTMLCanvasElement;
    #camera: THREE.PerspectiveCamera;
    #scene: THREE.Scene;
    #renderer: THREE.WebGLRenderer;
    #gameUpdateLoop: (delta: number) => void;

    #targetFps: number | null = null;
    #previousTime: number = 0;

    constructor(
        canvas: HTMLCanvasElement,
        camera: THREE.PerspectiveCamera,
        scene: THREE.Scene,
        gameUpdateLoop: (delta: number) => void
    ) {
        this.#canvas = canvas;
        this.#camera = camera;
        this.#scene = scene;

        this.#renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

        this.#gameUpdateLoop = gameUpdateLoop;
    }

    /**
     * Set target fps for game tick target.
     *
     * @param targetFps - Value must be positive.
     *
     * @returns Returns false if range is not respected.
     */
    setTargetFps(targetFps: number): boolean {
        if (targetFps <= 0) {
            return false;
        }

        this.#targetFps = targetFps;
        return true;
    }

    /**
     * Start update loop.
     */
    render(): void {
        requestAnimationFrame(this.#updateBrowserTick);
    }

    renderTest(): void {
        this.#updateTick();
    }

    /**
     * Updates ever browser animation tick.
     */
    #updateBrowserTick = (time: number = 0) => {
        time *= 0.001; // in seconds.

        let targetFrameDuration = 0;
        if (this.#targetFps) targetFrameDuration = 1 / this.#targetFps;

        const delta = time - this.#previousTime;

        if (delta >= targetFrameDuration * 0.75) {
            this.#previousTime = time;
            this.#updateGameTick(delta);
        }

        requestAnimationFrame(this.#updateBrowserTick);
    }

    #updateTick = () => {
        const time = performance.now() * 0.001; // in seconds.

        let targetFrameDuration = 0;
        if (this.#targetFps) {
            targetFrameDuration = 1 / this.#targetFps;
        }

        const frameDuration = time - this.#previousTime;
        if (frameDuration >= targetFrameDuration) {
            this.#previousTime = time;
            this.#updateGameTick(frameDuration);
        }
    }

    /**
     * Updates every game tick.
     *
     * @param delta - in seconds.
     */
    #updateGameTick(delta: number) {
        this.#resizeRendererToDisplaySize();

        this.#gameUpdateLoop(delta);

        this.#renderer.render(this.#scene, this.#camera);
    }

    /**
     * Resizes rendered canvas to be same as layout canvas.
     */
    #resizeRendererToDisplaySize(): void {
        const needsResize =
            this.#canvas.width !== this.#canvas.clientWidth ||
            this.#canvas.height !== this.#canvas.clientHeight
            ;

        if (needsResize) {
            this.#renderer.setSize(this.#canvas.clientWidth, this.#canvas.clientHeight, false);
            this.#camera.aspect = this.#canvas.clientWidth / this.#canvas.clientHeight;
            this.#camera.updateProjectionMatrix();
        }
    }
}
