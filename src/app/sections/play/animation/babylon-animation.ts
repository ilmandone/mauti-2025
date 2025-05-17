import {
  ArcRotateCamera,
  Color3,
  Color4,
  Engine,
  InstancedMesh,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';

export class BabylonAnimation {
  private readonly _canvas!: HTMLCanvasElement;

  private readonly INSTANCE_AMOUNT = 60;
  private readonly CLAMP_TOP = 0.9;
  private readonly CLAMP_BOTTOM = 0.1;

  private _camera!: ArcRotateCamera;
  private _engine!: Engine;
  private _scene!: Scene;
  private _boxes: InstancedMesh[] = [];
  private _progress = 0;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
  }

  private readonly COLORS = [
    [0.35, 0.96, 0.93],
    [1, 0.05, 0.177],
    [1, 1, 1],
    [0.2, 0.2, 0.2],
  ];

  //#region Private

  private _windowResizeHandlerBind = this._windowResizeHandler.bind(this);

  private _windowResizeHandler() {
    this._engine.resize();
  }

  //#endregion

  //#region Creation

  /**
   * Create the main mesh and material
   * @param scene
   * @private
   */
  private _createBox(scene: Scene) {
    const boxMat = new StandardMaterial('box-mat', scene);
    boxMat.disableLighting = true;
    boxMat.emissiveColor = Color3.White();

    const box = MeshBuilder.CreateBox('box', { width: 1, height: 1, depth: 0.15 }, scene);
    box.registerInstancedBuffer('color', 4);
    box.instancedBuffers['color'] = new Color4(0, 0, 0, 0);
    box.rotation.y = Math.PI / 2;
    box.isVisible = false;
    box.material = boxMat;

    return box;
  }

  /**
   * Create cube instances
   * @param mesh
   * @private
   */
  private _createInstances(mesh: Mesh) {
    for (let i = 0; i < this.INSTANCE_AMOUNT; i += 1) {
      const inst = mesh.createInstance('cube' + i);
      const v = i * 0.2;

      inst.position.x = v - (this.INSTANCE_AMOUNT / 2) * 0.2;

      const color = this.COLORS[i % 4];

      inst.instancedBuffers['color'] = new Color4(...color);
      inst.metadata = { v };
      inst.visibility = 1;
      this._boxes.push(inst);
    }
  }

  /**
   * Create scene
   * @param engine
   * @private
   */
  private _createScene(engine: Engine) {
    const scene = new Scene(engine);
    scene.clearColor = new Color4(255, 255, 255, 1);

    const camera = new ArcRotateCamera('Camera', -Math.PI / 2, Math.PI / 2, 20, Vector3.Zero(), scene);
    camera.fov = 0.01;
    camera.setTarget(new Vector3(0, 0.1, 1.75));

    const box = this._createBox(scene);
    this._createInstances(box);

    return { _scene: scene, _camera: camera };
  }

  //#endregion

  //#region Updates

  /**
   * Clamp and convert linear progress to an ease-in-out function
   * @param value
   * @private
   */
  private _mapValue(value: number): number {
    const clampedValue = Math.max(0, Math.min(1, value));

    if (clampedValue <= this.CLAMP_BOTTOM) return 0;
    if (clampedValue > this.CLAMP_TOP) return 1;

    const normalizedValue = (clampedValue - this.CLAMP_BOTTOM) / (this.CLAMP_TOP - this.CLAMP_BOTTOM);
    return normalizedValue * normalizedValue * (3 - 2 * normalizedValue);
  }

  /**
   * Update instances by progress
   * @param p
   * @private
   */
  private _updateInstances(p: number) {
    const prog = this._mapValue(p);
    this._boxes.forEach((box) => {
      const v = box.metadata['v'];

      box.position.z = Math.cos(v * prog * 0.125);
      box.position.y = Math.sin(v * prog);
      box.rotation.z = v * prog;
    });
  }

  /**
   * Update camera by progress
   * @param p
   * @private
   */
  private _updateCamera(p: number) {
    const prog = this._mapValue(p);
    this._camera.alpha = -Math.PI / 2 - (-Math.PI / 4) * prog;
    this._camera.beta = Math.PI / 2 + (-Math.PI / 4) * prog;
    this._camera.fov = 0.01 + 0.34 * prog;
    this._camera.radius = 20 - 18 * prog;
  }

  //#endregion

  //#region Public

  init() {
    this._engine = new Engine(this._canvas, true);
    Object.assign(this, this._createScene(this._engine));

    this.progress(1);

    window.addEventListener('resize', this._windowResizeHandlerBind);
  }

  progress(p: number) {
    if (p !== this._progress) {
      this._progress = p;
      this._updateInstances(p);
      this._updateCamera(p);
      this._scene.render();
    }
  }

  destroy() {
    window.removeEventListener('resize', this._windowResizeHandlerBind);
  }

  //#endregion
}
