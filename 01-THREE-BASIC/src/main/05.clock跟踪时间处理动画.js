import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// console.log(THREE)

// 目标：clock跟踪时间处理动画

// 1.创建场景
const scene = new THREE.Scene();

// 2.创建相机：透视相机（PerspectiveCamera）
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

//   2.1设置相机位置
camera.position.set(0, 0, 10);
//   2.2将相机添加到场景中
scene.add(camera)

// 3.添加物体
//   3.1添加几何体和材质：立方缓冲几何体（BoxGeometry）、基础网格材质(MeshBasicMaterial)
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })

//   3.2根据几何体和材质创建物体：网格（Mesh）
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

//   3.3修改物体的位置:position
// cube.position.set(5,0,0)
// cube.position.x = 3
//   3.5设置物体的缩放:scale
// cube.scale.set(3,2,1)
// cube.scale.x = 2
//   3.6设置物体的旋转:rotation (Math.PI/4 = 45°)
cube.rotation.set(Math.PI / 4, 0, 0)

//   3.7将几何体添加到场景中
scene.add(cube)

// 4.初始化渲染器
const renderer = new THREE.WebGLRenderer();
//   4.1设置渲染器尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
//renderer.domElement是一个canvas画布
//  4.2将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)

// //  4.3使用渲染器，将场景通过相机渲染进来
// // renderer.render(scene, camera)

// 5.使用轨道控制器查看物体
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()
controls.enableDamping = true;

// 6.添加坐标轴辅助器(AxesHelper)：参数代表轴的线段长度. 默认为 1.
const axesHelper = new THREE.AxesHelper(5)
//   将坐标轴辅助器体添加到场景中
scene.add(axesHelper)

// 设置时钟
const clock = new THREE.Clock()
function render() {
    // let deltaTime = clock.getDelta() // 获取两次时间的间隔时间
    // 获取时钟运行总时长
    let time = clock.getElapsedTime()
    let t = time % 5 // 这里的time是秒不需要除以1000，time取模5的值，就是在X轴上需要移动的时间
    cube.position.x = t * 1 //移动的时间 * 速度 = t * 1 = 在x轴移动的距离
    // 如果移动距离大于5、则返回起始点
    if (cube.position.x > 5) {
        cube.position.x = 0
    }
    controls.update();
    renderer.render(scene, camera)
    // 渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render)
}
render()