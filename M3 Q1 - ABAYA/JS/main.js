
const scene = new THREE.Scene();
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 80;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(cameraWidth / -2, cameraWidth/2, cameraHeight/2, cameraHeight/-2, 0, 1000);
camera.position.set(120, 90, 120);
camera.lookAt(0, 0, 0);


const textureLoader = new THREE.TextureLoader();
const renderer = new THREE.WebGLRenderer();
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(100, 200, 120);
scene.add(directionalLight); 

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Creating the wall and adding the wall texture
function createWall(){
	const wallTexture = new THREE.TextureLoader().load("M3 Q1 - ABAYA\assets\textures\Wall.jpg");
	const wallGeometry = new THREE.BoxGeometry(50, 25, 2.7);
	const wallMaterial = new THREE.MeshLambertMaterial({map: wallTexture});
	const wall = new THREE.Mesh(wallGeometry, wallMaterial);
		
	return wall;

}

//Creating the Room
function createRoom(){

	const room = new THREE.Group();

	const rightWall = createWall();
	rightWall.position.set(0, 2.9, -24)
	room.add(rightWall);

	const leftWall = createWall();
	leftWall.rotation.y = 17.28;
	leftWall.position.set(-25, 3);
	room.add(leftWall);
	
	//Floor Texture
	const floorTexture = new THREE.TextureLoader().load("M3 Q1 - ABAYA\assets\textures\Floor.jpg");
	const floor = new THREE.Mesh( 
		new THREE.PlaneGeometry( 50, 50, 1, 1 ), 
		new THREE.MeshLambertMaterial( { map: floorTexture } ) 
	);
	floor.material.side = THREE.DoubleSide;
	floor.rotation.x = 11;
	floor.position.y= -9.6;
	room.add(floor);




	return room;

}
const room = createRoom();
scene.add(room); 


// Create chair
function createChair(){

	const textureChair = textureLoader.load("M3 Q1 - ABAYA/assets/textures/Leather.jpg");
	const chair = new THREE.Group();
	const chairBack = new THREE.Mesh(
		new THREE.BoxBufferGeometry (10, 13, 1),
		new THREE.MeshPhongMaterial({ map: textureChair })
	); 
	chairBack.position.z = 1.4;
	chairBack.position.y = 3
	chair.add(chairBack);

	const chairSeat = new THREE.Mesh(
		new THREE.BoxBufferGeometry (10, 2, 4),
		new THREE.MeshLambertMaterial({	 map: textureChair 	})
	);
	chairSeat.position.y= -2.5;
	chair.add(chairSeat);

	const chairFront = new THREE.Mesh(
		new THREE.BoxBufferGeometry (2, 2, 2),
		new THREE.MeshLambertMaterial({	 map: textureChair })
	);
	chairFront.position.set(0,0,-5.5);
	chair.add(chairFront);

	const chairWheel = new THREE.Mesh(
		new THREE.BoxBufferGeometry( 4, 2, 3),
		new THREE.MeshLambertMaterial({	color: 0x293042	})
	);
	chairWheel.position.y = -8;
	chair.add(chairWheel);

	return chair;
}

//Creating the monitor
function createMonitor(){

	const monitor = new THREE.Group();
	const stand = new THREE.Mesh(
		new THREE.BoxBufferGeometry(2, 10),
		new THREE.MeshLambertMaterial({ color: 0x4A4A4A })
	);
	monitor.add(stand);
	stand.position.y = -2;

	const foot = new THREE.Mesh(
		new THREE.BoxBufferGeometry(4, 2),
		new THREE.MeshLambertMaterial({ color: 0x4A4A4A })
	);
	monitor.add(foot);
	foot.position.y = -5;

	const desktop = new THREE.Mesh(
		new THREE.BoxBufferGeometry(18, 9, 0.5),
		new THREE.MeshLambertMaterial({ color: 0x4A4A4A })
	);
	desktop.position.set(0, 2, 1.5);
	monitor.add(desktop);

	const screen = new THREE.Mesh(
		new THREE.BoxBufferGeometry(15, 6, 0.5),
		new THREE.MeshPhysicalMaterial({ color: 0xffffff, opacity: 1, transparent: true })
	);
	const ScreenLight = new THREE.PointLight( 0xffffff, 0.8, 15);
	ScreenLight.position.set(0, 2, 1.55);
	screen.add(ScreenLight);
	screen.position.set(0, 2, 1.55);
	monitor.add(screen);

	return monitor;	

}


//Creating the Workspace
function createWorkSpace() {
	const workSpace = new THREE.Group();
  
	const monitor = createMonitor();
	monitor.position.set(7.8, 12, -1);
	monitor.rotation.y = -.12
	workSpace.add(monitor);

	const monitor2 = createMonitor();
	monitor2.position.set(-12, 12, -1);
	monitor2.rotation.y = .12;
	workSpace.add(monitor2);


	const keyboard = new THREE.Mesh(
		new THREE.BoxBufferGeometry(12, 4, 3),
		new THREE.MeshLambertMaterial({ color: 0x4A4A4A })
	  );
	workSpace.add(keyboard);
	keyboard.position.set(3, 3, 2);
  
	const desk = new THREE.Mesh(
	  new THREE.BoxBufferGeometry(42, 4, 8),
	  new THREE.MeshLambertMaterial({ color: 0x1B1212  })
	);
	workSpace.add(desk);
	desk.position.y = 2;
	

	const deskSideLeft = new THREE.Mesh(
		new THREE.BoxBufferGeometry(12, 8, 8),
		new THREE.MeshLambertMaterial({ color: 0x1B1212})
	);

	const deskSideRight = new THREE.Mesh(
		new THREE.BoxBufferGeometry(12, 8, 8),
		new THREE.MeshLambertMaterial({ color: 0x1B1212  })
	);
	
	workSpace.add(deskSideRight);
	deskSideRight.position.set(15, -2);

	workSpace.add(deskSideLeft);
	deskSideLeft.position.set(-15, -2);

	const chair = createChair();
	chair.position.set(3, 3.2, 8);
	workSpace.add(chair);
	
	return workSpace;
}
  
const workSpace = createWorkSpace();
workSpace.scale.x = 0.5;
workSpace.scale.y = 0.5;

workSpace.rotation.y = -17.29;
workSpace.position.set(-15, -6.0, 3);
scene.add(workSpace);
  

//Creating the lamp stand
function createLampStand (){

	const lampStand = new THREE.Group();

	const lampStandCylinder = new THREE.Mesh(
		new THREE.CylinderGeometry( 1, 1.5, 1, 30 ),
		new THREE.MeshBasicMaterial( {color: 0x1A1E2A} )
	);
	lampStandCylinder.position.y = -6;
	lampStand.add(lampStandCylinder)

	const lampPole = new THREE.Mesh(
		new THREE.BoxBufferGeometry(0.1, 8),
		new THREE.MeshLambertMaterial({color:0x1A1E2A})
	);
	lampPole.position.y = -2;
	lampStand.add(lampPole)

	return lampStand;
}

//Creating Lamp Design
function createlampDesign(){

	const geometry = new THREE.CylinderGeometry( 1.5, 1.9, 3, 30 );
	const material = new THREE.MeshToonMaterial( {color: 0xFCF5E5} );
	const lampDesign = new THREE.Mesh( geometry, material );
	lampDesign.position.y = 4;
	return lampDesign;
};

//Creating the Lamp
function createLamp(){
	const lamp = new THREE.Group();

	const lampStand = createLampStand();
	lamp.add(lampStand);

	const lampDesign = createlampDesign();
	lamp.add(lampDesign);

	const light = new THREE.PointLight( 0xffffff, 1.5,  8 );
	lamp.add(light);

	return lamp;
}

//Placing the Lamp
const lamp= createLamp();
lamp.position.set(-20, -3, -20);
scene.add(lamp);

//Creating the LED Strip

function createLED(){
	const LEDLight = new THREE.Group();
	
	const LED = new THREE.Mesh(
		new THREE.BoxBufferGeometry(50, .5),
		new THREE.MeshPhysicalMaterial({ color: 0xffffff, opacity: 0.6, transparent: true })
	);
	LED.position.z = 8;
	LED.position.y = 4.5;
	LED.position.x = 0;
	LEDLight.add(LED);

	
	const light = new THREE.RectAreaLight( 0x71A2EC ,10, 10, 10 );
	LED.add(light);

	return LED;
};

function LEDStrip(){

	const strip = new THREE.Group();

	const frameTop = new THREE.Mesh(
		new THREE.BoxBufferGeometry(50, .2),
		new THREE.MeshLambertMaterial({color:0x000000})
	);
	frameTop.position.set(0, 5, 8);
	strip.add(frameTop);



	const LED = createLED();
	strip.add(LED);

	return strip;
};
//Creating a couch
function createCouch(){

	const couch = new THREE.Group();

	const armrestR = new THREE.Mesh(
		new THREE.BoxBufferGeometry(12, 9, 5),
		new THREE.MeshLambertMaterial({ color: 0x71797E })
	);
	couch.add(armrestR);
	armrestR.position.z = -10;

	const BackRest = new THREE.Mesh(
		new THREE.BoxBufferGeometry(25, 11, 4),
		new THREE.MeshLambertMaterial({ color: 0x71797E })
	);
	BackRest.position.set(-4.4, 0, 0);
	BackRest.rotation.y=1.58
	couch.add(BackRest);

	const CouchCushion = new THREE.Mesh(
		new THREE.BoxBufferGeometry(9, 4, 20),
		new THREE.MeshLambertMaterial({ color: 0x71797E })
	);
	CouchCushion.position.set(1 , -2, 0	);
	couch.add(CouchCushion);


	const armrestL = new THREE.Mesh(
		new THREE.BoxBufferGeometry(12, 9, 5),
		new THREE.MeshLambertMaterial({ color: 0x71797E })
	);
	armrestL.position.set(0, -1, 11);
	couch.add(armrestL);
	
	return couch
}
const couch = createCouch();
couch.scale.x = 1;
couch.rotation.y = -7.87;
couch.position.set(11, -5, -17);
scene.add(couch);

//ADDING LEDSTRIP AND COLOR
const LEDStripR = LEDStrip();
LEDStripR.rotation.y = -6.3;
LEDStripR.position.set(0, 10, -30);
scene.add(LEDStripR);
const lightR = new THREE.RectAreaLight( 0xDC143C,20, 20, 20 );
lightR.position.set(0, 10, -30);
lightR.lookAt(0, 0, 0);
scene.add(lightR);

const LEDStripL = LEDStrip();
LEDStripL.rotation.y = -1.58;
LEDStripL.position.set(-15, 10 , 0);
scene.add(LEDStripL);
const lightL = new THREE.RectAreaLight( 0xDC143C,20, 20, 20 );
lightL.position.set(-15, 10, 0);
lightL.lookAt(0, 0, 0);
scene.add(lightL);



//Render Scene
renderer.render(scene, camera);