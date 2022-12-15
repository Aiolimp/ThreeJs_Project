import * as THREE from 'three'
import { Mesh } from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//导入动画库

// 目标：材质与纹理

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
const texture = textureLoader.load('./textures/minecraft.png') // 导入纹理
const doorAplhaTexture = textureLoader.load('./textures/door/alpha.jpg') // 导入透明纹理

// // 纹理偏移：offset
// doorColorTexture.offset.x = 0.5;
// doorColorTexture.offset.y = 0.5;
// doorColorTexture.offset.set(0.5, 0.5);

// // 设置旋转原点
// doorColorTexture.center.set(0.5, 0.5)

// // 纹理旋转: rotation
// doorColorTexture.rotation = Math.PI / 4; // 旋转45°

// // 设置纹理重复
// doorColorTexture.repeat.set(2, 3);

// // 设置纹理重复的模式
// doorColorTexture.wrapS = THREE.RepeatWrapping; // 水平重复
// doorColorTexture.wrapT = THREE.MirroredRepeatWrapping; // 镜像重复

// 纹理显示设置
// texture.minFilter = THREE.NearestFilter;
// texture.magFilter = THREE.NearestFilter;



/*
* 3.添加物体
*/
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// 材质
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: '#ffff00',
    map: doorColorTexture, // 颜色贴图
    alphaMap: doorAplhaTexture, // 透明纹理
    transparent: true, // 是否透明
    // map: texture // 颜色贴图
    opacity: 0.3, // 透明度
    side: THREE.DoubleSide // 设置物体可以两面查看，默认看不到后面
})
const cube = new Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

// 添加平面
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1),
    cubeMaterial
)
plane.position.x = 3
scene.add(plane)

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

// 设置时钟
const clock = new THREE.Clock()


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