import { Engine, FreeCamera, Scene, Vector3 } from '@babylonjs/core';

export class BabylonAnimation {
  private readonly _canvas!: HTMLCanvasElement;
  private _engine!: Engine;
  private _scene!: Scene;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
  }

  //#region Private

  private _windowResizeHandlerBind = this._windowResizeHandler.bind(this);
  private _renderLoopHandlerBind = this._renderLoopHandler.bind(this);

  private _renderLoopHandler() {
    this._scene.render();
  }

  private _windowResizeHandler() {
    this._engine.resize();
  }

  private _createScene(engine: Engine) {
    const scene = new Scene(engine);
    const camera = new FreeCamera('mainCamera', new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());

    return scene;
  }

  //#endregion

  //#region Public

  init() {
    this._engine = new Engine(this._canvas, true);
    this._scene = this._createScene(this._engine);
    window.addEventListener('resize', this._windowResizeHandlerBind);
  }

  pauseLoop() {
    this._engine.stopRenderLoop(this._renderLoopHandlerBind);
  }

  restartLoop() {
    this._engine.runRenderLoop(this._renderLoopHandlerBind);
  }

  destroy() {
    this._engine.stopRenderLoop(this._renderLoopHandlerBind);
    window.removeEventListener('resize', this._windowResizeHandlerBind);
  }

  //#endregion
}
