import {
  BoxGeometry,
  Color,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';

export class ThreeJSAnimation {
  private readonly _container: HTMLElement;
  private readonly INSTANCE_AMOUNT = 60;
  private readonly COLORS = [
    [0.35, 0.96, 0.93],
    [1, 0.05, 0.177],
    [1, 1, 1],
    [0.275, 0.275, 0.275],
  ];

  private _progress!: number;
  private _renderer!: WebGLRenderer;
  private _scene!: Scene;
  private _camera!: PerspectiveCamera;

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

  private _createBox(scene: Scene) {
    const geometry = new BoxGeometry(1, 1, 0.15);
    const material = new MeshBasicMaterial({ color: 0xffffff });
    const cube = new Mesh(geometry, material);
    cube.rotation.y = Math.PI / 2;
    scene.add(cube);

    return cube;
  }

  private _createInstances(cube: Mesh, scene: Scene) {
    const instances = new InstancedMesh(cube.geometry, cube.material, this.INSTANCE_AMOUNT);

    for (let i = 0; i < this.INSTANCE_AMOUNT; i++) {
      const v = i * 0.2;
      const matrix = new Matrix4();
      const positionX = v - (this.INSTANCE_AMOUNT / 2) * 0.2;
      const color = this.COLORS[i % 4];

      matrix.makeRotationFromEuler(cube.rotation);
      matrix.scale(cube.scale);

      matrix.setPosition(cube.position.x + positionX, cube.position.y, cube.position.z);
      instances.setMatrixAt(i, matrix);
      instances.setColorAt(i, new Color(...color));
    }

    instances.instanceMatrix.needsUpdate = true;

    scene.add(instances);
  }

  private _createScene(container: HTMLElement) {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff, 0);
    container.appendChild(renderer.domElement);

    const scene = new Scene();

    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 2;
    camera.position.x = -2;

    camera.lookAt(new Vector3(0, 0, 0));

    const b = this._createBox(scene);
    this._createInstances(b, scene);

    return { _renderer: renderer, _scene: scene, _camera: camera };
  }

  //#endregion

  //#region Public

  init() {
    this._createScene(this._container);
    Object.assign(this, this._createScene(this._container));

    this._windowResizeHandler();
    window.addEventListener('resize', this._windowResizeHandlerBind);
  }

  progress(p: number) {
    if (p !== this._progress) {
      this._progress = p;
      /*this._updateInstances(p);
      this._updateCamera(p);*/
      this._renderer.render(this._scene, this._camera);
    }
  }

  destroy() {
    window.removeEventListener('resize', this._windowResizeHandlerBind);
  }

  //#endregion
}
