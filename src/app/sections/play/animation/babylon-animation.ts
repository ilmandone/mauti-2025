import { Engine, FreeCamera, Scene, Vector3 } from '@babylonjs/core';

export class BabylonAnimation {
  private readonly _canvas!: HTMLCanvasElement;
  private _engine!: Engine;
  private _scene!: Scene;
  private _camera!: FreeCamera;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
  }

  //#region Private

  private _createScene(engine: Engine) {
    const scene = new Scene(engine);
    const camera = new FreeCamera('mainCamera', new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());

    return scene;
  }

  private _windowResizeHandler() {
    this._engine.resize();
  }

  private _run(engine: Engine, scene: Scene) {
    window.addEventListener('resize', this._windowResizeHandler.bind(this));
    engine.runRenderLoop(() => {
      scene.render();
    });
  }

  //#endregion

  //#region Public

  init() {
    this._engine = new Engine(this._canvas, true);
    this._scene = this._createScene(this._engine);
    this._run(this._engine, this._scene);
  }

  destroy() {
    window.removeEventListener('resize', this._windowResizeHandler);
  }

  //#endregion
}
