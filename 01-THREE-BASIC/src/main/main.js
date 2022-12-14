import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//导入动画库
import gsap from 'gsap'
//导入dat.gui
import * as dat from 'dat.gui'

// 目标：应用图形用户界面更改变量


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

/*
* 3.添加物体
*/
// 3.1添加几何体和材质：立方缓冲几何体（BoxGeometry）、基础网格材质(MeshBasicMaterial)
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })

// 3.2根据几何体和材质创建物体：网格（Mesh）
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

// 3.3修改物体的位置:position
// cube.position.set(5,0,0)
// cube.position.x = 3

// 3.5设置物体的缩放:scale
// cube.scale.set(3,2,1)
// cube.scale.x = 2

// 3.6设置物体的旋转:rotation (Math.PI/4 = 45°)
cube.rotation.set(Math.PI / 4, 0, 0)

// 3.7将几何体添加到场景中
scene.add(cube)


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

// 应用图形用户界面更改变量
const gui = new dat.GUI();

// 修改物体移动位置
gui.add(cube.position, "x")
    .min(0) // 最小值
    .max(5) // 最大值
    .step(0.01) // 每次移动的变量值
    .name("移动x轴") // 变量名称
    .onChange((value) => {
        console.log("值被修改：", value)
    }).onFinishChange((value) => {
        console.log("完全停下来的值：", value)
    })

const params = {
    color: "#ffff00",
    // 控制物体运动
    fn: () => {
        gsap.to(cube.position, { x: 5, duration: 3, yoyo: true, repeat: - 1 })
}
}
// 修改物体颜色
gui.addColor(params, "color").onChange(value => {
    console.log("颜色被修改了", value)
    cube.material.color.set(value)
})
// 设置物体是否显示
gui.add(cube, "visible").name("是否显示")

// 设置按钮点击触发某个事件
gui.add(params,"fn").name("物体运动")

// 设置文件夹,
const folder = gui.addFolder("设置物体")
folder.add(cube.material,"wireframe")
folder.add(params,"fn").name("物体运动")

// 设置动画
// let animate1 = gsap.to(cube.position, {
//     x: 5,
//     duration: 5, // 移动的时间
//     ease: "power1.inOut", // 动画移动的速度变化
//     repeat: 2, //重复次数，无限次循环-1
//     yoyo: true, // 往返运动
//     delay: 2, //延迟两秒运动
//     onComplete: () => {
//         console.log('动画完成')
//     }, // 动画完成的回调函数
//     onStart: () => {
//         console.log('动画开始')
//     } // 动画开始的回调函数
// })
// gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inOut" })

// 监听鼠标双击事件，暂停动画
// window.addEventListener("dblclick", () => {
//     // 如果是运动状态，双击后暂停，否则双击后运动
//     if (animate1.isActive()) {
//         animate1.pause()
//     } else {
//         animate1.resume()
//     }
// })

//双击控制屏幕进去全屏，退出全屏
window.addEventListener("dblclick", () => {
    const fullscreenElement = document.fullscreenElement
    if (!fullscreenElement) {
        // 全屏需要在renderer的画布canvas上进行
        renderer.domElement.requestFullscreen();
    } else {
        // 退出全屏需要在cocument上进行
        document.exitFullscreen();
    }
})

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