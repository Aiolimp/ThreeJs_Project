import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//导入动画库

// 目标：BufferGeometry设置顶点创建矩形

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
// 3.1添加几何体和材质：BufferGeometry、基础网格材质(MeshBasicMaterial)
// BufferGeometry是面片、线或点几何体的有效表述。包括顶点位置，面片索引、法相量、颜色值、UV 坐标和自定义缓存属性值。
// 使用 BufferGeometry 可以有效减少向 GPU 传输上述数据所需的开销。
const geometry = new THREE.BufferGeometry();
// 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
// 因为在两个三角面片里，这两个顶点都需要被用到。
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const vertices = new Float32Array( [
	-1.0, -1.0,  1.0,
	 1.0, -1.0,  1.0,
	 1.0,  1.0,  1.0,

	 1.0,  1.0,  1.0,
	-1.0,  1.0,  1.0,
	-1.0, -1.0,  1.0
] );
// itemSize = 3 因为每个顶点都是一个三元组。
// BufferAttribute构造函数：BufferAttribute( array : TypedArray用于实例化缓存, itemSize : Integer队列中与顶点相关的数据值的大小, normalized : Boolean )
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
const mesh = new THREE.Mesh( geometry, material );
scene.add(mesh)


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