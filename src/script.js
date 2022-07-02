import './style.css'
import * as THREE from 'three';
// import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'



const scene = new THREE.Scene();




const canvas = document.querySelector('.webgl')

// Creating a mesh with material    
const geometry = new THREE.BoxGeometry(1,1,1)      // here BoxGeometry(height, width, depth)
const material = new THREE.MeshBasicMaterial({color : 'red'})
const cube = new THREE.Mesh(geometry,material)

//Positioning Cube
cube.position.set(0,0,0)
// Adding Mesh to the Scene
scene.add(cube)

// Scaling cube
cube.scale.set(1,1,1)
// Rotating Cube
cube.rotation.y = Math.PI * 0.5



//Camera
const size ={
    width : window.innerWidth,
    height: window.innerHeight
}
//Resizing the canvas
window.addEventListener('resize', () =>{
    //Update size
    size.width = window.innerWidth
    size.height =window.innerHeight

    //Update camera
    camera.aspect = size.width/size.height;
    camera.updateProjectionMatrix()

    //Update renderer
    renderer.setSize(size.width, size.height)
    renderer.setPixelRatio(window.devicePixelRatio)
})

// full screen on double click
window.addEventListener('dblclick', () =>{
    if(!document.fullscreenElement){
        canvas.requestFullscreen()
    }
    else{
        document.exitFullscreen()
    }
})


const camera = new THREE.PerspectiveCamera(75,size.width/size.height, 0.1,100)
scene.add(camera)
// Position the Camera
camera.position.z = 2    


//Orbit control
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.dampingFactor = 0.2


//Render
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(size.width,size.height)


//Animation
const clock = new THREE.Clock();

const tick = () =>{
    const elapsedTime = clock.getElapsedTime()
    
    // my camera setup, Will be using threejs Built in Control.
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2 ) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3 
    // camera.lookAt(cube.position)

    controls.update()      //needed for OrbitControl to keep updating it in animation loop
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
}
tick()






// Gouping objects
//const group = new THREE.Group()
//scene.add(group)
// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1,),
//     new THREE.MeshBasicMaterial({color: 'red'}),
// )
// group.add(cube1)

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1,),
//     new THREE.MeshBasicMaterial({color: 'green'}),
// )
// cube2.position.x = 3 
// group.add(cube2)



//Cursor Control//
// const cursor ={
//     x:0,
//     y:0
// }
// window.addEventListener('mousemove', (e)=> {
//     cursor.x = e.clientX / size.width - 0.5
//     cursor.y = -(e.clientY / size.height - 0.5)
    
// })



//Animation using GSAP

// gsap.to(cube.position, {duration: 1, delay: 1, x: 2})
// gsap.to(cube.position, {duration: 1, delay: 2, x: 0})