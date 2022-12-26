import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBEloader'

// 目标：加载hdr图

// 加载hdr环境图

const rgbeLoader = new RGBELoader();
rgbeLoader.loadAsync("textures/hdr/002.hdr").then((texture)=>{
    texture.mapping = THREE.EquirectangularReflectionMapping; // 设置纹理映射
    scene.background = texture;
    scene.environment = texture;
})

/*
* 1.创建场景
*/
const scene = new THREE.Scene();

/*
* 2.创建相机：透视相机（PerspectiveCamera）
*/
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// 2.1设置相机位置
camera.position.set(0, 0, 10);

// 2.2将相机添加到场景中
scene.add(camera)

// 设置cube纹理加载器
const cubeTextureLoader = new THREE.CubeTextureLoader();
const envMapTexture = cubeTextureLoader.load([
    "./textures/environmentMaps/1/px.jpg",
    "./textures/environmentMaps/1/nx.jpg",
    "./textures/environmentMaps/1/py.jpg",
    "./textures/environmentMaps/1/ny.jpg",
    "./textures/environmentMaps/1/pz.jpg",
    "./textures/environmentMaps/1/nz.jpg",
]);
// 添加圆形物体
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const material = new THREE.MeshStandardMaterial({
    metalness: 0.7, // 设置金属
    roughness: 0.1, // 设置粗糙度
    // envMap: envMapTexture // 环境贴图
});
const spher = new THREE.Mesh(sphereGeometry, material);
scene.add(spher)


// 灯光
// 环境光：AmbientLight
const light = new THREE.AmbientLight(0xffffff);
scene.add(light)

// 场景添加背景
scene.background = envMapTexture;
// 给场景所有的物体添加默认的环境贴图
scene.environment = envMapTexture;

// 直线光：
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(10, 10, 10)
scene.add(directionalLight)


/*
* 4.初始化渲染器
*/

const renderer = new THREE.WebGLRenderer();

// 4.1设置渲染器尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.domElement是一个canvas画布

// 4.2将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)

// 4.3使用渲染器，将场景通过相机渲染进来
// renderer.render(scene, camera)

/*
* 5.使用轨道控制器查看物体
*/

const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()
controls.enableDamping = true;
/*
* 6.添加坐标轴辅助器(AxesHelper)：参数代表轴的线段长度. 默认为 1.
*/

const axesHelper = new THREE.AxesHelper(5)
// 将坐标轴辅助器体添加到场景中
scene.add(axesHelper)

function render() {
    renderer.render(scene, camera)
    // 渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render)
}

// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;

    // 更新摄像头的投影矩阵
    camera.updateProjectionMatrix();

    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight)

    //设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio)
})
render()