import {
  AmbientLight,
  BoxGeometry,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';

export class ThreeJSAnimation {
  private readonly _container: HTMLElement;
  private readonly INSTANCE_AMOUNT = 60;
  private readonly CLAMP_TOP = 0.9;
  private readonly CLAMP_BOTTOM = 0.1;

  private readonly COLORS = [0xe8002d, 0x5af4ed, 0xffffff, 0x454545];

  private _progress!: number;
  private _renderer!: WebGLRenderer;
  private _scene!: Scene;
  private _camera!: PerspectiveCamera;
  private _box!: Mesh;
  private _clones!: Mesh[];

  constructor(container: HTMLElement) {
    this._container = container;
  }

  //#region Private

  private _windowResizeHandlerBind = this._windowResizeHandler.bind(this);

  private _windowResizeHandler() {
    const w = window.innerWidth;
    const h = window.innerHeight * 0.8;

    this._renderer.setSize(w, h);
    this._camera.aspect = w / h;
    this._camera.updateProjectionMatrix();
  }

  //#endregion

  //#region Creation

  /**
   * Create the main mesh
   * @param scene
   * @private
   */
  private _createBox(scene: Scene) {
    const geometry = new BoxGeometry(1, 1, 0.15);
    const material = new MeshStandardMaterial();

    const box = new Mesh(geometry, material);
    box.rotation.y = Math.PI / 2;
    box.visible = false;
    scene.add(box);

    return box;
  }

  /**
   * Return cube materials for clones
   * @private
   */
  private _makeMaterials(): MeshStandardMaterial[] {
    return this.COLORS.map((c) => {
      return new MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.75 });
    });
  }

  /**
   * Create the box clones
   * @param m
   * @param scene
   * @private
   */
  private _makeClones(m: Mesh, scene: Scene): Mesh[] {
    const clones: Mesh[] = [];

    const mats = this._makeMaterials();

    for (let i = 0; i < this.INSTANCE_AMOUNT; i += 1) {
      const clone = m.clone();
      const v = i * 0.2;

      clone.position.x = v - (this.INSTANCE_AMOUNT / 2) * 0.2;
      clone.material = mats[i % 4];
      clone.visible = true;
      clones.push(clone);
      scene.add(clone);
    }

    return clones;
  }

  /**
   * Create scene
   * @param container
   * @private
   */
  private _createScene(container: HTMLElement) {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff, 0);
    container.appendChild(renderer.domElement);

    const scene = new Scene();

    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;

    camera.lookAt(new Vector3(0, 0, 0));

    const light = new AmbientLight(0xffffff, 1);
    scene.add(light);

    const hemiLight = new HemisphereLight(0xffffff, 0x444444, 1.5);
    scene.add(hemiLight);

    this._box = this._createBox(scene);
    this._clones = this._makeClones(this._box, scene);

    return { _renderer: renderer, _scene: scene, _camera: camera };
  }

  //#endregion

  //#region Update

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
   * Update clone positions
   * @param p
   * @private
   */
  private _updateClones(p: number) {
    const prog = this._mapValue(p);

    for (let i = 0; i < this.INSTANCE_AMOUNT; i += 1) {
      const v = i * 0.2;
      const cl = this._clones[i];
      cl.position.y = Math.cos(v * prog * 0.5);
      cl.position.z = Math.sin(v * prog);
      cl.rotation.z = (Math.PI / 2) * p * v;
      cl.updateMatrix();
    }
  }

  private _updateCamera(p: number) {
    const posZ = p + 2;
    const posX = -p / 2;
    const posY = -p;

    this._camera.position.set(posX, posY, posZ);
    this._camera.lookAt(0, 0, 0);
    this._camera.updateMatrix();
  }

  //#endregion

  //#region Public

  init() {
    this._createScene(this._container);
    Object.assign(this, this._createScene(this._container));
    this._updateCamera(0);

    this._windowResizeHandler();
    window.addEventListener('resize', this._windowResizeHandlerBind);
  }

  progress(p: number) {
    if (p !== this._progress) {
      this._progress = p;

      this._updateClones(p);
      this._updateCamera(p);

      this._renderer.render(this._scene, this._camera);
    }
  }

  destroy() {
    window.removeEventListener('resize', this._windowResizeHandlerBind);
  }

  //#endregion
}
