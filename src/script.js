import './style.css'
import * as THREE from 'three';
import gsap from 'gsap';

const scene = new THREE.Scene();

//Cursor Control//
const cursor ={
    x:0,
    y:0
}
window.addEventListener('mousemove', (e)=> {
    cursor.x = e.clientX / size.width - 0.5
    cursor.y = -(e.clientY / size.height - 0.5)
    
})

// Gouping objects
const group = new THREE.Group()
scene.add(group)
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
    width : 800,
    height: 600
}
const camera = new THREE.PerspectiveCamera(75,size.width/size.height, 0.1,100)
scene.add(camera)

// Position the Camera
camera.position.z = 2    
// camera.position.x = 2 
// camera.position.y = 1    // Changing the Camera position to make the object visible on the canvas.
console.log(cube.position.distanceTo(camera.position))




//Render
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(size.width,size.height)





//Animation using GSAP

// gsap.to(cube.position, {duration: 1, delay: 1, x: 2})
// gsap.to(cube.position, {duration: 1, delay: 2, x: 0})


//Animation
const clock = new THREE.Clock();

const tick = () =>{
    const elapsedTime = clock.getElapsedTime()
    // cube.rotation.y = cursor.y
    camera.position.x = cursor.x * 5
    camera.position.y = cursor.y * 5
    camera.lookAt(cube.position)
    renderer.render(scene,camera)

    window.requestAnimationFrame(tick)
}
tick()