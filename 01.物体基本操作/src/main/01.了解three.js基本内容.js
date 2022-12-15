import * as THREE from 'three'

// console.log(THREE)

// 目标：了解three.js基本内容

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
//   3.3将几何体添加到场景中
scene.add(cube)

// 4.初始化渲染器
const renderer = new THREE.WebGLRenderer();
//   4.1设置渲染器尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
//renderer.domElement是一个canvas画布
//  4.2将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)

//  4.3使用渲染器，将场景通过相机渲染进来
renderer.render(scene, camera)