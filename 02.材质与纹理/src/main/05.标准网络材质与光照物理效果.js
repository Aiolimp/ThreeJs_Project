import * as THREE from 'three'
import { Mesh } from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//导入动画库

// 目标：标准网络材质与光照物理效果

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



// 设置纹理
const textureLoader = new THREE.TextureLoader(); // 纹理加载器
const doorColorTexture = textureLoader.load('./textures/door/color.jpg') // 导入纹理
const doorAplhaTexture = textureLoader.load('./textures/door/alpha.jpg') // 导入透明纹理
const doorAoTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg') // 导入AO环境遮挡贴图

// 导入置换贴图
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
// 导入粗糙度贴图
const roughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
// 导入金属贴图
const metalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
// 导入法线贴图
const normalTexture = textureLoader.load('./textures/door/normal.jpg')

/*
* 3.添加物体
*/
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100);

// 材质
const material = new THREE.MeshStandardMaterial({
    color: '#ffff00',
    map: doorColorTexture, // 颜色贴图
    alphaMap: doorAplhaTexture, // 透明纹理
    transparent: true, // 是否透明
    aoMap: doorAoTexture,// AO环境遮挡贴图
    displacementMap: doorHeightTexture, // 设置置换属性
    displacementScale: 0.1, // 位移贴图对网格的影响程度
    roughnessMap: roughnessTexture, // 粗糙度纹理贴图
    roughness: 1, // 设置粗糙度
    metalness: 1, // 设置金属
    metalnessMap: metalnessTexture, // 金属贴图
    normalMap: normalTexture // 法线贴图
})
const cube = new Mesh(cubeGeometry, material)
scene.add(cube)

// 添加平面
const planeGeometry = new THREE.PlaneGeometry(1, 1, 200, 200)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.x = 2
scene.add(plane)
// aoMap需要两个uv
// 给平面设置第二组uv,直接将planeGeometry的第一个uv复制过来
planeGeometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
)
// 给物体设置第二组uv,直接将planeGeometry的第一个uv复制过来，
cubeGeometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
)

// 灯光
// 环境光：AmbientLight
const light = new THREE.AmbientLight(0xffffff);
scene.add(light)

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