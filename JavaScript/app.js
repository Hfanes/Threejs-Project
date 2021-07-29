var camera, scene, renderer, controls, camaraOrtografica,palco,mixerAnimacao,barricade;
var relogio = new THREE.Clock();
var relogio1 = new THREE.Clock();
var relogio2 = new THREE.Clock();
var relogio3 = new THREE.Clock();
var importer = new THREE.FBXLoader();
var texturaLoader = new THREE.TextureLoader();
var musica1On= true;
var musica2On= true;
var keyboard = {}; //para camera ortografica e ligar e desligar luzes
var pointlightGroup = new THREE.Group();
var spotlightGroup = new THREE.Group();
var luzeshelper = new THREE.Group();
const objectsColisao = [];
var raycaste
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var mudarPrespectiva = true;
var mudarOrtografica = false;
var canJump = false;
var prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

var holofoteT = texturaLoader.load("Objetos/stageTexture/lowpoly_concert_textures _Glow.png");
importer.load('./Objetos/spotLightTripe.fbx',function (object){
	object.traverse(function(child){
  		 if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
			child.material.map = holofoteT;
    		}
	});
	object.position.set(45,10,-160)
	scene.add(object);
	object.scale.x = 0.15;
	object.scale.z= 0.15;
	object.scale.y = 0.15;
	object.rotateY( - Math.PI / 3  );
});
importer.load('./Objetos/spotLightTripe.fbx',function (object){
	object.traverse(function(child){
  		 if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
			child.material.map = holofoteT;
    		}
	});
	object.position.set(-35,10,-160)
	scene.add(object);
	object.scale.x = 0.15;
	object.scale.z= 0.15;
	object.scale.y = 0.15;
	object.rotateY(  Math.PI / 3  );
});

importer.load('./Objetos/spotlight.005.fbx',function (object){
	object.traverse(function(child){
  		 if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
			child.material.map = holofoteT;
    		}
	});
	object.position.set(-20,35,110)
	scene.add(object);
	object.scale.x = 15;
	object.scale.z= 15;
	object.scale.y = 15;
	object.rotateY( Math.PI);
});

importer.load('./Objetos/spotlight.005.fbx',function (object){
	object.traverse(function(child){
  		 if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
			child.material.map = holofoteT;
    		}
	});
	object.position.set(20,35,110)
	scene.add(object);
	object.scale.x = 15;
	object.scale.z= 15;
	object.scale.y = 15;
	object.rotateY( Math.PI);
});
//esquerda do palco
importer.load('./Objetos/spotlight.002.fbx',function (object){
	object.traverse(function(child){
  		 if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
			child.material.map = holofoteT;
    		}
	});
	object.position.set(-35,39,-93)
	scene.add(object);
	object.scale.x = 9;
	object.scale.z= 9;
	object.scale.y = 9;
	object.rotateY(  Math.PI /5 );
});
//direita do palco
importer.load('./Objetos/spotlight.002.fbx',function (object){
	object.traverse(function(child){
  		 if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
			child.material.map = holofoteT;
    		}
	});
	object.position.set(45,39,-93)
	scene.add(object);
	object.scale.x = 9;
	object.scale.z= 9;
	object.scale.y = 9;
	object.rotateY( - Math.PI /5 );
});
//mais à esquerda
importer.load('./Objetos/spotlight.002.fbx',function (object){
	object.traverse(function(child){
  		 if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
			child.material.map = holofoteT;
    		}
	});
	object.position.set(80,39,-93)
	scene.add(object);
	object.scale.x = 9;
	object.scale.z= 9;
	object.scale.y = 9;
	object.rotateY( - Math.PI /5 );
});
//mais à direita
importer.load('./Objetos/spotlight.002.fbx',function (object){
	object.traverse(function(child){
  		 if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
			child.material.map = palcoT;
    		}
	});
	object.position.set(-70,39,-93)
	scene.add(object);
	object.scale.x = 9;
	object.scale.z= 9;
	object.scale.y = 9;
	object.rotateY( Math.PI /5 );
});

importer.load('./Objetos/speaker.001.fbx',function (object){
	object.traverse(function(child){
  		 if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
			child.material.map = palcoT;
    		}
	});
	object.position.set(-15,10,-155)
	scene.add(object);
	object.scale.x = 20;
	object.scale.z= 20;
	object.scale.y = 20;
});
importer.load('./Objetos/speaker.001.fbx',function (object){
	object.traverse(function(child){
  		 if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
			child.material.map = palcoT;
    		}
	});
	object.position.set(25,10,-155)
	scene.add(object);
	object.scale.x = 20;
	object.scale.z= 20;
	object.scale.y = 20;
});

importer.load('./Objetos/speaker.005.fbx',function (object){
	object.traverse(function(child){
  		 if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
			child.material.map = palcoT;
    		}
	});
	object.position.set(68,0,-95)
	scene.add(object);
	object.scale.x = 9;
	object.scale.z= 9;
	object.scale.y = 9;
});
importer.load('./Objetos/speaker.005.fbx',function (object){
	object.traverse(function(child){
  		 if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
			child.material.map = palcoT;
    		}
	});
	object.position.set(-60,0,-95)
	scene.add(object);
	object.scale.x = 9;
	object.scale.z= 9;
	object.scale.y = 9;
});


importer.load('./Objetos/camera.fbx',function (object){
	object.traverse(function(child){
  		if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
			child.color = "0xCCCCCC";
    		}
	});
	object.position.set(100,9,120)
	scene.add(object);
	object.scale.x = 0.3;
	object.scale.z= 0.3;
	object.scale.y = 0.3;
	object.rotateY(  Math.PI / 2  );
});

//entrada barricade
importer.load('./Objetos/barricade.fbx',function (object){
	object.traverse(function(child){
  		if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
    		}
	});
	object.position.set(4,0,110)
	scene.add(object);
	object.scale.x = 7;
	object.scale.z= 7;
	object.scale.y = 7;
	barricade = object;
});

//palco
var palcoT = texturaLoader.load("Objetos/stageTexture/lowpoly_concert_textures.png");
importer.load('./Objetos/stage.004.fbx',function (object){
	object.traverse(function(child){
  		if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
			child.material.map = palcoT;
    		}
	});
	object.position.set(-1,0,-130)
	scene.add(object);
	object.scale.x = 12;
	object.scale.z= 12;
	object.scale.y = 7;
});

//estrutura
importer.load('./Objetos/truss structure.004.fbx',function (object){
	object.traverse(function(child){
  		if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
			child.material.map = palcoT;
    		}
	});
	object.position.set(4.8,0,-130)
	scene.add(object);
	object.scale.x = 2.9;
	object.scale.z= 4;
	object.scale.y = 3;
});



importer.load('./Objetos/DJ-Set.fbx',function (object){
	object.traverse(function(child){
  		if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
    		}
	});
	object.position.set(4.8,22.5,-130)
	scene.add(object);
	object.scale.x = 1;
	object.scale.z= 1;
	object.scale.y = 1;
});
importer.load('./Objetos/MarshmelloHelmet.fbx',function (object){
	object.traverse(function(child){
  		if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
    		}
	});
	object.position.set(-30,10,-100)
	scene.add(object);
	object.scale.x = 0.3;
	object.scale.z= 0.3;
	object.scale.y = 0.3;
});
importer.load('./Objetos/MarshmelloHelmet.fbx',function (object){
	object.traverse(function(child){
  		if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
    		}
	});
	object.position.set(40,10,-100)
	scene.add(object);
	object.scale.x = 0.3;
	object.scale.z= 0.3;
	object.scale.y = 0.3;
});

var mixerAnimacao1;
importer.load('./Objetos/Male Standing Pose.fbx',function (object){
	mixerAnimacao1 = new THREE.AnimationMixer(object);
	var action = mixerAnimacao1.clipAction(object.animations[0]);
	action.play();
	object.traverse(function(child){
  		if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
    		}
	});
	object.position.set(148,0,122)
	scene.add(object);
	object.rotateY( - Math.PI / 2 );
	object.scale.x = 0.05;
	object.scale.z=0.05;
	object.scale.y = 0.05;
});

var mixerAnimacao2;
importer.load('./Objetos/Female Standing Pose.fbx',function (object){
	mixerAnimacao2 = new THREE.AnimationMixer(object);
	var action = mixerAnimacao2.clipAction(object.animations[0]);
	action.play();
	object.traverse(function(child){
  		if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
    		}
	});
	object.position.set(125,0,113)
	scene.add(object);
	object.rotateY( - Math.PI / 2 );
	object.scale.x = 0.1;
	object.scale.z=0.1;
	object.scale.y = 0.1;
});

importer.load('./Objetos/Silly Dancing.fbx',function (object){
	mixerAnimacao = new THREE.AnimationMixer(object);
	var action = mixerAnimacao.clipAction(object.animations[0]);
	action.play();
	object.traverse(function(child){
  		if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
    		}
	});
	object.position.set(4.8,10,-145)
	scene.add(object);
	object.scale.x = 0.12;
	object.scale.z=0.12;
	object.scale.y = 0.12;
});
var mixerAnimacao3;
importer.load('./Objetos/Twist Dance.fbx',function (object){
	mixerAnimacao3 = new THREE.AnimationMixer(object);
	var action = mixerAnimacao3.clipAction(object.animations[0]);
	action.play();
	object.traverse(function(child){
  		if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
    		}
	});
	object.position.set(0,0,0)
	scene.add(object);
	object.rotateY(  Math.PI );
	object.scale.x = 0.1;
	object.scale.z=0.1;
	object.scale.y = 0.1;
});

var mixerAnimacao4;
importer.load('./Objetos/Can Can.fbx',function (object){
	mixerAnimacao4 = new THREE.AnimationMixer(object);
	var action = mixerAnimacao4.clipAction(object.animations[0]);
	action.play();
	object.traverse(function(child){
  		if(child.isMesh){
        	child.castShadow = true;
        	child.receiveShadow = true;
    		}
	});
	object.position.set(10,0,-10)
	scene.add(object);
	object.rotateY(  Math.PI );
	object.scale.x = 0.1;
	object.scale.z=0.1;
	object.scale.y = 0.1;
});


init();
animate();

function init() {

	//camaras
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(-1,10,150);

	camaraOrtografica = new THREE.OrthographicCamera(-25,25,25,-25, 1, 500); 
	camaraOrtografica.position.set(120,11,120);
	camaraOrtografica.rotateY( - Math.PI / 2  );
	scene = new THREE.Scene();


	const listener = new THREE.AudioListener();
    camera.add(listener);
    const sound = new THREE.Audio( listener );
   	const audioLoader = new THREE.AudioLoader();
   	audioLoader.load( 'music/music1.ogg', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.2 );
	sound.play();
   	});

	//sky
	var textLoadSky = new THREE.TextureLoader();
    skyTexture = textLoadSky.load("texturas/sky3.jpg");
    scene = new THREE.Scene();
    scene.background = skyTexture;

	scene.fog = new THREE.Fog( 0xffffff, 0, 1550 );

	//luzes
	var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.2 );
	light.position.set( 0.5, 1, 0.75 );
	scene.add( light );

	var spotLight = new THREE.SpotLight( "#753EF2", 0.5);
	spotLight.position.set( -70,39,-93 );
	spotLight.castShadow = true;
    spotLight.angle = 1;
	spotLight.penumbra = 1;
	spotLight.decay = 2;
	spotLight.distance = 500;
	lightHelper = new THREE.SpotLightHelper( spotLight );
	//scene.add( lightHelper );
	spotlightGroup.add(spotLight);
	//scene.add( spotLight );

	var spotLight1 = new THREE.SpotLight( "#753EF2", 0.5);
	spotLight1.position.set( 80,39,-93 );
	spotLight1.castShadow = true;
    spotLight1.angle = 1;
	spotLight1.penumbra = 1;
	spotLight1.decay = 2;
	spotLight1.distance = 500;

	lightHelper = new THREE.SpotLightHelper( spotLight1 );
	//scene.add( lightHelper );
	spotlightGroup.add(spotLight1);
	//scene.add( spotLight1 );

	var spotLight2 = new THREE.SpotLight( "#FF8FEB", 0.5);
	spotLight2.position.set( 45,39,-93 );
	spotLight2.castShadow = true;
    spotLight2.angle = 1;
	spotLight2.penumbra = 1;
	spotLight2.decay = 2;
	spotLight2.distance = 500;
	lightHelper = new THREE.SpotLightHelper( spotLight2 );
	//scene.add( lightHelper );
	spotlightGroup.add(spotLight2);
	//scene.add( spotLight2 );

	var spotLight3 = new THREE.SpotLight( "#FF8FEB", 0.5);
	spotLight3.position.set( -35,39,-93 );
	spotLight3.castShadow = true;
    spotLight3.angle = 1;
	spotLight3.penumbra = 1;
	spotLight3.decay = 2;
	spotLight3.distance = 500;

	lightHelper = new THREE.SpotLightHelper( spotLight3 );
	//scene.add( lightHelper );
	spotlightGroup.add(spotLight3);
	//scene.add( spotLight3 );

	var spotLightEntrada = new THREE.SpotLight( "#3910FF", 5);
	spotLightEntrada.position.set( 20,40,110 );
	spotLightEntrada.castShadow = true;
    spotLightEntrada.angle = 0.4;
	spotLightEntrada.penumbra = 1;
	spotLightEntrada.decay = 2;
	spotLightEntrada.distance = 300;

	lightHelper = new THREE.SpotLightHelper( spotLightEntrada );
	//scene.add( lightHelper );
	spotlightGroup.add(spotLightEntrada);
	//scene.add( spotLightEntrada );

	var spotLightEntrada1 = new THREE.SpotLight( "#3910FF", 5);
	spotLightEntrada1.position.set( -20,40,110 );
	spotLightEntrada1.castShadow = true;
    spotLightEntrada1.angle = 0.4;
	spotLightEntrada1.penumbra = 1;
	spotLightEntrada1.decay = 2;
	spotLightEntrada1.distance = 300;

	lightHelper = new THREE.SpotLightHelper( spotLightEntrada1 );
	//scene.add( lightHelper );
	spotlightGroup.add(spotLightEntrada1);
	//scene.add( spotLightEntrada1 );
	
	scene.add(spotlightGroup);

	///POINT/////////////////

	var pointLightpalcoCima = new THREE.PointLight( "#94FFFB", 3 ,70);
	pointLightpalcoCima.position.set( 4.8,50,-130 );
	lightHelper = new THREE.PointLightHelper( pointLightpalcoCima );
	//scene.add( lightHelper );
	pointlightGroup.add(pointLightpalcoCima);	
	//scene.add( pointLightpalcoCima );


	var pointLightpalcoCima1 = new THREE.PointLight( "#3910FF", 3 ,100);
	pointLightpalcoCima1.position.set( -35,45,-160 );
	lightHelper = new THREE.PointLightHelper( pointLightpalcoCima1 );
	//scene.add( lightHelper );
	pointlightGroup.add(pointLightpalcoCima1);
	//scene.add( pointLightpalcoCima1 );

	var pointLightpalcoCima2 = new THREE.PointLight( "#FF10FE", 3 ,100);
	pointLightpalcoCima2.position.set( 45,45,-160);
	lightHelper = new THREE.PointLightHelper( pointLightpalcoCima2 );
	//scene.add( lightHelper );
	pointlightGroup.add(pointLightpalcoCima2);
	//scene.add( pointLightpalcoCima2 );

	//entradaLuz
	var pointentradaLuz = new THREE.PointLight( "#94B5FF", 1 ,100);
	pointentradaLuz.position.set( 0,20,130);
	lightHelper = new THREE.PointLightHelper( pointentradaLuz );
	//scene.add( lightHelper );
	pointlightGroup.add(pointentradaLuz);
	//scene.add( pointentradaLuz );

	var pointSpeaker = new THREE.PointLight( "#FF785D", 3 ,50);
	pointSpeaker.position.set( -60,30,-95 );
	lightHelper = new THREE.PointLightHelper( pointSpeaker );
	//scene.add( lightHelper );
	pointlightGroup.add(pointSpeaker);
	//scene.add( pointSpeaker );
	var pointSpeaker1 = new THREE.PointLight( "#FF785D", 3 ,50);
	pointSpeaker1.position.set( 68,30,-95);
	lightHelper = new THREE.PointLightHelper( pointSpeaker1 );
	//scene.add( lightHelper );
	pointlightGroup.add(pointSpeaker1);
	//scene.add( pointSpeaker1 );

	//rodaLuz
	var pointrodaLuz = new THREE.PointLight( "#0B058C",5,200);
	pointrodaLuz.position.set( -105,100,118);
	lightHelper = new THREE.PointLightHelper( pointrodaLuz );
	//scene.add( lightHelper );
	pointlightGroup.add(pointrodaLuz);
	//scene.add( pointrodaLuz );

	//greenScreenLuz
	var greenScreenLuz = new THREE.PointLight( "#FFCEF9",2.5,50);
	greenScreenLuz.position.set( 120,20,120);
	lightHelper = new THREE.PointLightHelper( greenScreenLuz );
	//scene.add( lightHelper );
	pointlightGroup.add(greenScreenLuz);
	//scene.add( greenScreenLuz );


	var ebPoint = new THREE.PointLight( "#FFFFFF",1,45);
	ebPoint.position.set( -151,29,25);
	lightHelper = new THREE.PointLightHelper( ebPoint );
	//scene.add( lightHelper );
	luzeshelper.add(lightHelper);
	pointlightGroup.add(ebPoint);
	//scene.add( ebPoint );

	var LEIPoint = new THREE.PointLight( "#FFFFFF",1,45);
	LEIPoint.position.set( -151,29,-45);
	lightHelper1 = new THREE.PointLightHelper( LEIPoint );
	//scene.add( lightHelper1 );
	pointlightGroup.add(LEIPoint);
	luzeshelper.add(lightHelper1);
	//scene.add( LEIPoint );

	var BioPoint = new THREE.PointLight( "#FFFFFF",1,45);
	BioPoint.position.set( 151,29,25);
	lightHelper2 = new THREE.PointLightHelper( BioPoint );
	//scene.add( lightHelper2 );
	luzeshelper.add(lightHelper2);
	pointlightGroup.add(BioPoint);
	//scene.add( BioPoint );

	var GeneticaPoint = new THREE.PointLight( "#FFFFFF",1,45);
	GeneticaPoint.position.set( 151,29,-45);
	lightHelper3 = new THREE.PointLightHelper( GeneticaPoint );
	scene.add( lightHelper3 );
	luzeshelper.add(lightHelper3);
	pointlightGroup.add(GeneticaPoint);
	//scene.add( GeneticaPoint );
	scene.add(pointlightGroup);
	scene.add(luzeshelper);


	controls = new THREE.PointerLockControls( camera, document.body );

	const blocker = document.getElementById( 'blocker' );
	const instructions = document.getElementById( 'instructions' );

	instructions.addEventListener( 'click', function () {
		controls.lock();
	} );

	//sair a tela de instruções
	controls.addEventListener( 'lock', function () {
		instructions.style.display = 'none';
		blocker.style.display = 'none';
	} ); 

	//aparecer a tela de instruções quando se sai da tela
	controls.addEventListener( 'unlock', function () {
		blocker.style.display = 'block';
		instructions.style.display = '';
	} );

	scene.add( controls.getObject() );

	const onKeyDown = function ( event ) {
		switch ( event.code ) {
			case 'KeyW':
				moveForward = true;
				break;
			case 'KeyA':
				moveLeft = true;
				break;
			case 'KeyS':
				moveBackward = true;
				break;
			case 'KeyD':
				moveRight = true;
				break;
			case 'Space':
				if ( canJump === true ) velocity.y += 250;
				canJump = false;
				break;
			case 'KeyF':
				barricade.rotateY( - Math.PI / 2.5);
				break;
			case 'KeyE':
				if(mudarPrespectiva == true){
					mudarPrespectiva = false;
					console.log(mudarPrespectiva);
					mudarOrtografica = true;
				}
				else{				
					mudarOrtografica = false;
					mudarPrespectiva = true;
				}
				break;
			case'KeyZ':
			if(musica1On == true){
				musica1On = false;
				console.log(musica1On);
				sound.stop();
			}
			else{
				musica1On = true;
				console.log(musica1On);
				sound.play();
			}
			break;
			case 'KeyX':
				if(pointlightGroup.visible == true){
					pointlightGroup.visible = false;
					scene.remove(luzeshelper);
				}
				else{
					pointlightGroup.visible = true;
				}
			break;
			case 'KeyC':
				if(light.visible == true){
					light.visible = false;
				}
				else{
					light.visible = true;
				}
			break;
			case 'KeyV':
				if(spotlightGroup.visible == true){
					spotlightGroup.visible = false;
				}
				else{
					spotlightGroup.visible = true;
				}
			break;
		}
	};

	const onKeyUp = function ( event ) {
		switch ( event.code ) {
			case 'KeyW':
				moveForward = false;
				break;
			case 'KeyA':
				moveLeft = false;
				break;
			case 'KeyS':
				moveBackward = false;
				break;
			case 'KeyD':
				moveRight = false;
				break;
			case 'KeyF':
				barricade.rotateY(  Math.PI / 2.5);
				break;
		}
	};

	document.addEventListener( 'keydown', onKeyDown );
	document.addEventListener( 'keyup', onKeyUp );

	raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

	//chao
	floorgeometry = new THREE.PlaneGeometry( 1000, 1000, 10, 10 );
	floorgeometry.rotateX( - Math.PI / 2 );
	floorTexture = new THREE.TextureLoader().load( 'texturas/relva.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.set(20, 20);
	material = new THREE.MeshPhongMaterial({map: floorTexture}),
	mesh = new THREE.Mesh( floorgeometry, material );
	scene.add(mesh);

	//recinto
	const recinto = new THREE.Mesh(
        new THREE.TorusGeometry(250, 5, 30, 4),
		
        new THREE.MeshPhongMaterial({color: "#cfb1ff"})
    );
	recinto.rotateX( - Math.PI / 2 );
	recinto.rotateZ( - Math.PI / 4 );
	recinto.scale.z = 2;
	scene.add(recinto); 

	//entrada
	//entradaesq
	cube = new THREE.Mesh( new THREE.BoxGeometry( 10, 40, 10 ), new THREE.MeshPhongMaterial({ color: "#cfb1ff"}));
	cube.position.set(-20,10,110);
	scene.add(cube);
	//entradir	
	cube1 = new THREE.Mesh( new THREE.BoxGeometry( 10, 40, 10 ), new THREE.MeshPhongMaterial({ color: "#cfb1ff"}));
	cube1.position.set(20,10,110);
	scene.add(cube1);
	//entracima
	cube2 = new THREE.Mesh( new THREE.BoxGeometry( 50, 10, 10 ), new THREE.MeshPhongMaterial({ color: "#cfb1ff"}));
	cube2.position.set(0,30,110);
	scene.add(cube2);

	//entradaesq
	cubeEntradaEsq = new THREE.Mesh( new THREE.BoxGeometry( 10, 20, 70 ), new THREE.MeshPhongMaterial({ color: "#cfb1ff"}));
	cubeEntradaEsq.position.set(-20,0,140);
	scene.add(cubeEntradaEsq);
	
	//entradir
	cubeEntradaDir = new THREE.Mesh( new THREE.BoxGeometry( 10, 20, 70 ), new THREE.MeshPhongMaterial({ color: "#cfb1ff"}));
	cubeEntradaDir.position.set(20,0,140);
	scene.add(cubeEntradaDir);
	
	//greenScreen
	greenScreen = new THREE.Mesh( new THREE.BoxGeometry( 80, 50, 1 ), new THREE.MeshPhongMaterial({ color: "#00ff00"}));
	greenScreen.position.set(150,10,120);
	greenScreen.rotateY( - Math.PI / 2 );
	scene.add(greenScreen);

	greenScreenChao = new THREE.Mesh( new THREE.BoxGeometry( 80, 40, 1 ), new THREE.MeshPhongMaterial({ color: "#00ff00"}));
	greenScreenChao.position.set(130,0,120);
	greenScreenChao.rotateY( - Math.PI / 2 );
	greenScreenChao.rotateX( - Math.PI / 2 );
	scene.add(greenScreenChao);

	postegreenScreen = new THREE.Mesh( new THREE.BoxGeometry( 1, 70, 1 ), new THREE.MeshPhongMaterial({ color: 0xCCCCCC}));
	postegreenScreen.position.set(150,0,160.5);
	scene.add(postegreenScreen);
	postegreenScreen1 = new THREE.Mesh( new THREE.BoxGeometry( 1, 70, 1 ), new THREE.MeshPhongMaterial({ color: 0xCCCCCC}));
	postegreenScreen1.position.set(150,0,79.5);
	scene.add(postegreenScreen1);
	postegreenScreen2 = new THREE.Mesh( new THREE.BoxGeometry( 40, 1, 1 ), new THREE.MeshPhongMaterial({ color: 0xCCCCCC}));
	postegreenScreen2.position.set(130,0,79.5);
	scene.add(postegreenScreen2);
	postegreenScreen3 = new THREE.Mesh( new THREE.BoxGeometry( 40, 1, 1 ), new THREE.MeshPhongMaterial({ color: 0xCCCCCC}));
	postegreenScreen3.position.set(130,0,160.5);
	scene.add(postegreenScreen3);
	postegreenScreen4 = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 82 ), new THREE.MeshPhongMaterial({ color: 0xCCCCCC}));
	postegreenScreen4.position.set(150,35,120);
	scene.add(postegreenScreen4);
	postegreenScreen5 = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 82 ), new THREE.MeshPhongMaterial({ color: 0xCCCCCC}));
	postegreenScreen5.position.set(109.5,0,120);
	scene.add(postegreenScreen5);


	//Estrutura debaixo do palo para poder andar sobre ele (transparent: true)
	cubePalco = new THREE.Mesh( new THREE.BoxGeometry( 92, 19, 70 ), new THREE.MeshPhongMaterial({
		color,
		opacity: 0,
		transparent: true,
	  }));
	cubePalco.position.set(4.8,0,-130);
	scene.add(cubePalco);

	var shape = new THREE.Shape();
			shape.moveTo( 0,0 );
			shape.lineTo( 0, 10 );
			shape.lineTo( 25, 0 );
			shape.lineTo( 0, 0 );

			var extrudeSettings = {
				steps: 2,
				depth: 22,
				bevelEnabled: false,
			};		
	//Prisma/Escada do palco (transparent: true)
	var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
			var material = new THREE.MeshPhongMaterial({color,
				opacity: 0,
				transparent: true});
            var prism = new THREE.Mesh(geometry, material); 
			prism.position.set(-40,0,-120);
			prism.rotateY(  Math.PI  );
            scene.add(prism);
	
	var mesasomT = texturaLoader.load("./texturas/mesasom.jpg");
	mesaSom = new THREE.Mesh( new THREE.BoxGeometry( 20, 12, 15 ), new THREE.MeshBasicMaterial({ map:mesasomT}));
	mesaSom.position.set(4.8,16,-130);
	scene.add(mesaSom);


	//camara tripe
	posteTripe = new THREE.Mesh( new THREE.BoxGeometry( 0.4, 20, 0.4 ), new THREE.MeshBasicMaterial({ color: "#836F32"}));
	posteTripe.position.set(98,0,120);
	posteTripe.rotateZ( - Math.PI / 18 );
	scene.add(posteTripe);
	posteTripe1 = new THREE.Mesh( new THREE.BoxGeometry( 0.4, 20.6, 0.4 ), new THREE.MeshBasicMaterial({ color: "#836F32"}));
	posteTripe1.position.set(104,0,116);
	posteTripe1.rotateZ( Math.PI / 10 );
	posteTripe1.rotateX( Math.PI / 10 );
	scene.add(posteTripe1);
	posteTripe2 = new THREE.Mesh( new THREE.BoxGeometry( 0.4, 20.6, 0.4 ), new THREE.MeshBasicMaterial({ color: "#836F32"}));
	posteTripe2.position.set(104,0,124);
	posteTripe2.rotateZ( Math.PI / 10 );
	posteTripe2.rotateX( -Math.PI / 10 );
	scene.add(posteTripe2);

	//barracaEB
	//atras
	var barracaEBT = texturaLoader.load("./texturas/ebFundo.png");
	var barracaEBG = new THREE.BoxGeometry( 2, 40, 50 );
	var barracaEBmaterials = {}
	barracaEB = new THREE.Mesh( new THREE.BoxGeometry( 2, 40, 50 ), [
	new THREE.MeshPhongMaterial({ map: barracaEBT,  side:THREE.FrontSide} ),
	new THREE.MeshPhongMaterial({ map: barracaEBT, side:THREE.FrontSide}),
	new THREE.MeshPhongMaterial({ color: "#5E5F76", side:THREE.FrontSide}),
	new THREE.MeshPhongMaterial({ color: "#5E5F76", side:THREE.FrontSide}),
	new THREE.MeshPhongMaterial({ color: "#5E5F76", side:THREE.FrontSide}),
	new THREE.MeshPhongMaterial({ color: "#5E5F76", side:THREE.FrontSide})]
	);

	barracaEB.position.set(-160,10,25);
	scene.add(barracaEB);	
	//esq
	var barracaEBT1 = texturaLoader.load("./texturas/ebFundo1.png");
	barracaEB1 = new THREE.Mesh( new THREE.BoxGeometry( 18, 40, 2 ), [
		new THREE.MeshPhongMaterial({ color: "#5E5F76",  side:THREE.FrontSide} ),
		new THREE.MeshPhongMaterial({ color: "#5E5F76", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#5E5F76", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#5E5F76", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ map: barracaEBT1, side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ map: barracaEBT1, side:THREE.FrontSide})]
	);
	barracaEB1.position.set(-150,10,49);
	scene.add(barracaEB1);
	//dir
	var barracaEBT2 = texturaLoader.load("./texturas/ebFundo2.png");
	barracaEB2 = new THREE.Mesh( new THREE.BoxGeometry( 18, 40, 2 ), [
		new THREE.MeshPhongMaterial({ color: "#5E5F76",  side:THREE.FrontSide} ),
		new THREE.MeshPhongMaterial({ color: "#5E5F76", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#5E5F76", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#5E5F76", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ map: barracaEBT2, side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ map: barracaEBT2, side:THREE.FrontSide})]
	);
	barracaEB2.position.set(-150,10,1);
	scene.add(barracaEB2);	
	//baixofrente	
	barracaEB3 = new THREE.Mesh( new THREE.BoxGeometry( 2, 15, 50 ), new THREE.MeshPhongMaterial({ color: "#5E5F76"}));
	barracaEB3.position.set(-140,0,25);
	scene.add(barracaEB3);
	//cima
	barracaEB4 = new THREE.Mesh( new THREE.BoxGeometry( 21, 1, 50 ), new THREE.MeshPhongMaterial({ color: "#5E5F76"}));
	barracaEB4.position.set(-151,30.4,25);
	scene.add(barracaEB4);

	//barracaLei
	//atras
	var barracaLeiT = texturaLoader.load("./texturas/informaticafundo.png");
	barracaLei = new THREE.Mesh( new THREE.BoxGeometry( 2, 40, 50 ), [
		new THREE.MeshPhongMaterial({ map: barracaLeiT,  side:THREE.FrontSide} ),
		new THREE.MeshPhongMaterial({ map: barracaLeiT, side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#EBE644", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#EBE644", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#EBE644", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#EBE644", side:THREE.FrontSide})]
	);
	barracaLei.position.set(-160,10,-45);
	scene.add(barracaLei);	
	//dir
	var barracaLeiT1 = texturaLoader.load("./texturas/informaticafundo1.png");
	barracaLei1 = new THREE.Mesh( new THREE.BoxGeometry( 18, 40, 2 ), [
		new THREE.MeshPhongMaterial({ color: "#EBE644",  side:THREE.FrontSide} ),
		new THREE.MeshPhongMaterial({ color: "#EBE644", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#EBE644", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#EBE644", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ map: barracaLeiT1, side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ map: barracaLeiT1, side:THREE.FrontSide})]
	);
	barracaLei1.position.set(-150,10,-69);
	scene.add(barracaLei1);
	//esq
	var barracaLeiT2 = texturaLoader.load("./texturas/informaticafundo2.png");
	barracaLei2 = new THREE.Mesh( new THREE.BoxGeometry( 18, 40, 2 ), [
		new THREE.MeshPhongMaterial({ color: "#EBE644",  side:THREE.FrontSide} ),
		new THREE.MeshPhongMaterial({ color: "#EBE644", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#EBE644", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#EBE644", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ map: barracaLeiT2, side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ map: barracaLeiT2, side:THREE.FrontSide})]
	);
	barracaLei2.position.set(-150,10,-21);
	scene.add(barracaLei2);	
	//baixofrente	
	barracaLei3 = new THREE.Mesh( new THREE.BoxGeometry( 2, 15, 50 ), new THREE.MeshPhongMaterial({ color: "#EBE644"}));
	barracaLei3.position.set(-140,0,-45);
	scene.add(barracaLei3);
	//cima
	barracaLei4 = new THREE.Mesh( new THREE.BoxGeometry( 21, 1, 50 ), new THREE.MeshPhongMaterial({ color: "#EBE644"}));
	barracaLei4.position.set(-151,30.4,-45);
	scene.add(barracaLei4);

	//barracaBio
	//atras
	var barracaBioT = texturaLoader.load("./texturas/BiomediaFundo3.png");
	barracaBio = new THREE.Mesh( new THREE.BoxGeometry( 2, 40, 50 ),  [
		new THREE.MeshPhongMaterial({ map: barracaBioT,  side:THREE.FrontSide} ),
		new THREE.MeshPhongMaterial({ map: barracaBioT, side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#64249E", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#64249E", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#64249E", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#64249E", side:THREE.FrontSide})]
	);
	barracaBio.position.set(160,10,25);
	scene.add(barracaBio);	
	//esq
	var barracaBioT1 = texturaLoader.load("./texturas/BiomediaFundo1.png");
	barracaBio1 = new THREE.Mesh( new THREE.BoxGeometry( 18, 40, 2 ), [
		new THREE.MeshPhongMaterial({ color: "#64249E",  side:THREE.FrontSide} ),
		new THREE.MeshPhongMaterial({ color: "#64249E", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#64249E", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#64249E", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ map: barracaBioT1, side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ map: barracaBioT1, side:THREE.FrontSide})]
	);
	barracaBio1.position.set(150,10,49);
	scene.add(barracaBio1);
	//dir
	var barracaBioT2 = texturaLoader.load("./texturas/BiomediaFundo2.png");
	barracaBio2 = new THREE.Mesh( new THREE.BoxGeometry( 18, 40, 2 ),[
		new THREE.MeshPhongMaterial({ color: "#64249E",  side:THREE.FrontSide} ),
		new THREE.MeshPhongMaterial({ color: "#64249E", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#64249E", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#64249E", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ map: barracaBioT2, side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ map: barracaBioT2, side:THREE.FrontSide})]
	);
	barracaBio2.position.set(150,10,1);
	scene.add(barracaBio2);	
	//baixofrente	
	barracaBio3 = new THREE.Mesh( new THREE.BoxGeometry( 2, 15, 50 ), new THREE.MeshPhongMaterial({ color: "#64249E"}));
	barracaBio3.position.set(140,0,25);
	scene.add(barracaBio3);
	//cima
	barracaBio4 = new THREE.Mesh( new THREE.BoxGeometry( 21, 1, 50 ), new THREE.MeshPhongMaterial({ color: "#64249E"}));
	barracaBio4.position.set(151,30.3,25);
	scene.add(barracaBio4);


	//barracaGenetica
	//atras
	var barracaGeneticaT = texturaLoader.load("./texturas/geneticaFundo.png");
	barracaGenetica = new THREE.Mesh( new THREE.BoxGeometry( 2, 40, 50 ), [
		new THREE.MeshPhongMaterial({ map: barracaGeneticaT,  side:THREE.FrontSide} ),
		new THREE.MeshPhongMaterial({ map: barracaGeneticaT, side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#41B9F5", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#41B9F5", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#41B9F5", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#41B9F5", side:THREE.FrontSide})]
	);
	barracaGenetica.position.set(160,10,-45);
	scene.add(barracaGenetica);	
	//dir
	var barracaGeneticaT1 = texturaLoader.load("./texturas/geneticaFundo1.png");
	barracaGenetica1 = new THREE.Mesh( new THREE.BoxGeometry( 18, 40, 2 ), [
		new THREE.MeshPhongMaterial({ color: "#41B9F5",  side:THREE.FrontSide} ),
		new THREE.MeshPhongMaterial({ color: "#41B9F5", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#41B9F5", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#41B9F5", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ map: barracaGeneticaT1, side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ map: barracaGeneticaT1, side:THREE.FrontSide})]
	);
	barracaGenetica1.position.set(150,10,-69);
	scene.add(barracaGenetica1);
	//esq
	var barracaGeneticaT2 = texturaLoader.load("./texturas/geneticaFundo2.png");
	barracaGenetica2 = new THREE.Mesh( new THREE.BoxGeometry( 18, 40, 2 ), [
		new THREE.MeshPhongMaterial({ color: "#41B9F5",  side:THREE.FrontSide} ),
		new THREE.MeshPhongMaterial({ color: "#41B9F5", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#41B9F5", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ color: "#41B9F5", side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ map: barracaGeneticaT2, side:THREE.FrontSide}),
		new THREE.MeshPhongMaterial({ map: barracaGeneticaT2, side:THREE.FrontSide})]
	);
	barracaGenetica2.position.set(150,10,-21);
	scene.add(barracaGenetica2);	
	//baixofrente	
	barracaGenetica3 = new THREE.Mesh( new THREE.BoxGeometry( 2, 15, 50 ), new THREE.MeshPhongMaterial({ color: "#41B9F5"}));
	barracaGenetica3.position.set(140,0,-45);
	scene.add(barracaGenetica3);
	//cima
	barracaGenetica4 = new THREE.Mesh( new THREE.BoxGeometry( 21, 1, 50 ), new THREE.MeshPhongMaterial({ color: "#41B9F5"}));
	barracaGenetica4.position.set(151,30.4,-45);
	scene.add(barracaGenetica4);
	
	//Objetos Bancada
	//genetica
	var cocacolaT = texturaLoader.load("./texturas/cocacola.jpg");
	var cocacola = new THREE.Mesh( new THREE.CylinderGeometry( 1, 1, 4, 50),[
	new THREE.MeshPhongMaterial({  map: cocacolaT, side:THREE.DoubleSide}),
	new THREE.MeshPhongMaterial({ color: "#ADA9A9", side:THREE.DoubleSide}),
	new THREE.MeshPhongMaterial({ color: "#ADA9A9", side:THREE.DoubleSide}),
	]);
	cocacola.position.set(140,9.3,-60);
	cocacola.rotateY( - Math.PI / 2 );
	scene.add( cocacola );
	
	var cervejaT = texturaLoader.load("./texturas/cerveja.jpg");
	var cervejaT2 = texturaLoader.load("./texturas/cerveja2.png");
	var cerveja = new THREE.Mesh( new THREE.CylinderGeometry( 1.5, 1, 3.4, 50),[
	new THREE.MeshPhongMaterial({  map: cervejaT,side:THREE.DoubleSide}),
	new THREE.MeshPhongMaterial({  map: cervejaT2,side:THREE.DoubleSide}),
	]);
	cerveja.position.set(140,9.3,-40);
	cerveja.rotateY( - Math.PI / 2 );
	scene.add( cerveja );


	var cervejaT = texturaLoader.load("./texturas/cerveja.jpg");
	var cervejaT2 = texturaLoader.load("./texturas/cerveja2.png");
	var cerveja = new THREE.Mesh( new THREE.CylinderGeometry( 1.5, 1, 3.4, 50),[
	new THREE.MeshPhongMaterial({  map: cervejaT,side:THREE.DoubleSide}),
	new THREE.MeshPhongMaterial({  map: cervejaT2,side:THREE.DoubleSide}),
	]);
	cerveja.position.set(-140,9.3,-45);
	cerveja.rotateY( - Math.PI / 2 );
	scene.add( cerveja );

	var cervejaT = texturaLoader.load("./texturas/cerveja.jpg");
	var cervejaT2 = texturaLoader.load("./texturas/cerveja2.png");
	var cerveja = new THREE.Mesh( new THREE.CylinderGeometry( 1.5, 1, 3.4, 50),[
	new THREE.MeshPhongMaterial({  map: cervejaT,side:THREE.DoubleSide}),
	new THREE.MeshPhongMaterial({  map: cervejaT2,side:THREE.DoubleSide}),
	]);
	cerveja.position.set(-140,9.3,-30);
	cerveja.rotateY( - Math.PI / 2 );
	scene.add( cerveja );
	var cervejaT = texturaLoader.load("./texturas/cerveja.jpg");
	var cervejaT2 = texturaLoader.load("./texturas/cerveja2.png");
	var cerveja = new THREE.Mesh( new THREE.CylinderGeometry( 1.5, 1, 3.4, 50),[
	new THREE.MeshPhongMaterial({  map: cervejaT,side:THREE.DoubleSide}),
	new THREE.MeshPhongMaterial({  map: cervejaT2,side:THREE.DoubleSide}),
	]);
	cerveja.position.set(-140,9.3,-35);
	cerveja.rotateY( - Math.PI / 2 );
	scene.add( cerveja );
	var cervejaT2 = texturaLoader.load("./texturas/cerveja2.png");
	var cerveja = new THREE.Mesh( new THREE.CylinderGeometry( 1.5, 1, 3.4, 50),[
	new THREE.MeshPhongMaterial({  map: cervejaT,side:THREE.DoubleSide}),
	new THREE.MeshPhongMaterial({  map: cervejaT2,side:THREE.DoubleSide}),
	]);
	cerveja.position.set(-140,9.3,-55);
	cerveja.rotateY( - Math.PI / 2 );
	scene.add( cerveja );

	var cervejaT2 = texturaLoader.load("./texturas/cerveja2.png");
	var cerveja = new THREE.Mesh( new THREE.CylinderGeometry( 1.5, 1, 3.4, 50),[
	new THREE.MeshPhongMaterial({  map: cervejaT,side:THREE.DoubleSide}),
	new THREE.MeshPhongMaterial({  map: cervejaT2,side:THREE.DoubleSide}),
	]);
	cerveja.position.set(-140,9.3,15);
	cerveja.rotateY( - Math.PI / 2 );
	scene.add( cerveja );
	var cocacolaT = texturaLoader.load("./texturas/cocacola.jpg");
	var cocacola = new THREE.Mesh( new THREE.CylinderGeometry( 1, 1, 4, 50),[
		new THREE.MeshPhongMaterial({  map: cocacolaT, side:THREE.DoubleSide}),
		new THREE.MeshPhongMaterial({ color: "#ADA9A9", side:THREE.DoubleSide}),
		new THREE.MeshPhongMaterial({ color: "#ADA9A9", side:THREE.DoubleSide}),
		]);
	cocacola.position.set(-140,9.3,20);
	cocacola.rotateY( - Math.PI / 2 );
	scene.add( cocacola );
	var cocacolaT = texturaLoader.load("./texturas/cocacola.jpg");
	var cocacola = new THREE.Mesh( new THREE.CylinderGeometry( 1, 1, 4, 50),[
		new THREE.MeshPhongMaterial({  map: cocacolaT, side:THREE.DoubleSide}),
		new THREE.MeshPhongMaterial({ color: "#ADA9A9", side:THREE.DoubleSide}),
		new THREE.MeshPhongMaterial({ color: "#ADA9A9", side:THREE.DoubleSide}),
		]);
	cocacola.position.set(-140,9.3,25);
	cocacola.rotateY( - Math.PI / 2 );
	scene.add( cocacola );


	//bio
	var cervejaT2 = texturaLoader.load("./texturas/cerveja2.png");
	var cerveja = new THREE.Mesh( new THREE.CylinderGeometry( 1.5, 1, 3.4, 50),[
	new THREE.MeshPhongMaterial({  map: cervejaT,side:THREE.DoubleSide}),
	new THREE.MeshPhongMaterial({  map: cervejaT2,side:THREE.DoubleSide}),
	]);
	cerveja.position.set(140,9.3,10);
	cerveja.rotateY( - Math.PI / 2 );
	scene.add( cerveja );
	var cocacolaT = texturaLoader.load("./texturas/cocacola.jpg");
	var cocacola = new THREE.Mesh( new THREE.CylinderGeometry( 1, 1, 4, 50),[
		new THREE.MeshPhongMaterial({  map: cocacolaT, side:THREE.DoubleSide}),
		new THREE.MeshPhongMaterial({ color: "#ADA9A9", side:THREE.DoubleSide}),
		new THREE.MeshPhongMaterial({ color: "#ADA9A9", side:THREE.DoubleSide}),
		]);
	cocacola.position.set(140,9.3,35);
	cocacola.rotateY( - Math.PI / 2 );
	scene.add( cocacola );
	var cocacolaT = texturaLoader.load("./texturas/cocacola.jpg");
	var cocacola = new THREE.Mesh( new THREE.CylinderGeometry( 1, 1, 4, 50),[
		new THREE.MeshPhongMaterial({  map: cocacolaT, side:THREE.DoubleSide}),
		new THREE.MeshPhongMaterial({ color: "#ADA9A9", side:THREE.DoubleSide}),
		new THREE.MeshPhongMaterial({ color: "#ADA9A9", side:THREE.DoubleSide}),
		]);
	cocacola.position.set(140,9.3,40);
	cocacola.rotateY( - Math.PI / 2 );
	scene.add( cocacola );


	//rodaGigante
	suporte = new THREE.Mesh( new THREE.BoxGeometry( 2, 120, 2 ), new THREE.MeshPhongMaterial({ color: "#E4FF49"}));
	suporte.position.set(-100,10,95);
	suporte.rotateX( Math.PI / 9 );
	scene.add(suporte);	
	suporte1 = new THREE.Mesh( new THREE.BoxGeometry( 2, 120, 2 ), new THREE.MeshPhongMaterial({ color: "#E4FF49"}));
	suporte1.position.set(-100,10,142);
	suporte1.rotateX( - Math.PI / 9 );
	scene.add(suporte1);	
	suporte2 = new THREE.Mesh( new THREE.BoxGeometry( 2, 120, 2 ), new THREE.MeshPhongMaterial({ color: "#E4FF49"}));
	suporte2.position.set(-110,10,142);
	suporte2.rotateX( - Math.PI / 9 );
	scene.add(suporte2);	
	suporte3 = new THREE.Mesh( new THREE.BoxGeometry( 2, 120, 2 ), new THREE.MeshPhongMaterial({ color: "#E4FF49"}));
	suporte3.position.set(-110,10,95);
	suporte3.rotateX( Math.PI / 9 );
	scene.add(suporte3);
	suporteExterior = new THREE.Mesh( new THREE.BoxGeometry( 2, 55, 2 ), new THREE.MeshPhongMaterial({ color: "#E4FF49"}));
	suporteExterior.position.set(-105,28,94);
	suporteExterior.rotateX( - Math.PI / 3 );
	scene.add(suporteExterior);
	suporteExterior1= new THREE.Mesh( new THREE.BoxGeometry( 2, 55, 2 ), new THREE.MeshPhongMaterial({ color: "#E4FF49"}));
	suporteExterior1.position.set(-105,68.3,70.5);
	scene.add(suporteExterior1);
	suporteExterior2 = new THREE.Mesh( new THREE.BoxGeometry( 2, 55, 2 ), new THREE.MeshPhongMaterial({ color: "#E4FF49"}));
	suporteExterior2.position.set(-105,109,94);
	suporteExterior2.rotateX( Math.PI / 3 );
	scene.add(suporteExterior2);
	suporteExterior3 = new THREE.Mesh( new THREE.BoxGeometry( 2, 55, 2 ), new THREE.MeshPhongMaterial({ color: "#E4FF49"}));
	suporteExterior3.position.set(-105,109,141);
	suporteExterior3.rotateX( - Math.PI / 3 );
	scene.add(suporteExterior3);
	suporteExterior4= new THREE.Mesh( new THREE.BoxGeometry( 2, 55, 2 ), new THREE.MeshPhongMaterial({ color: "#E4FF49"}));
	suporteExterior4.position.set(-105,68.3,164.5);
	scene.add(suporteExterior4);
	suporteExterior5 = new THREE.Mesh( new THREE.BoxGeometry( 2, 55, 2 ), new THREE.MeshPhongMaterial({ color: "#E4FF49"}));
	suporteExterior5.position.set(-105,28,141);
	suporteExterior5.rotateX( Math.PI / 3 );
	scene.add(suporteExterior5);	

	suporteInterior0= new THREE.Mesh( new THREE.BoxGeometry( 2, 50, 2 ), new THREE.MeshPhongMaterial({ color: "#227FFF"}));
	suporteInterior0.position.set(-105,40,118);
	scene.add(suporteInterior0);
	suporteInterior= new THREE.Mesh( new THREE.BoxGeometry( 2, 50, 2 ), new THREE.MeshPhongMaterial({ color: "#227FFF"}));
	suporteInterior.position.set(-105,56.5,143);
	suporteInterior.rotateX( - Math.PI / 3.3 );
	scene.add(suporteInterior);
	suporteInterior1= new THREE.Mesh( new THREE.BoxGeometry( 2, 47, 2 ), new THREE.MeshPhongMaterial({ color: "#227FFF"}));
	suporteInterior1.position.set(-105,84.5,142);
	suporteInterior1.rotateX( Math.PI / 2.8 );
	scene.add(suporteInterior1);
	suporteInterior2= new THREE.Mesh( new THREE.BoxGeometry( 2, 47, 2 ), new THREE.MeshPhongMaterial({ color: "#227FFF"}));
	suporteInterior2.position.set(-105,98,118);
	scene.add(suporteInterior2);
	suporteInterior3= new THREE.Mesh( new THREE.BoxGeometry( 2, 47, 2 ), new THREE.MeshPhongMaterial({ color: "#227FFF"}));
	suporteInterior3.position.set(-105,84.5,93);
	suporteInterior3.rotateX( - Math.PI / 2.8 );
	scene.add(suporteInterior3);
	suporteInterior4= new THREE.Mesh( new THREE.BoxGeometry( 2, 51, 2 ), new THREE.MeshPhongMaterial({ color: "#227FFF"}));
	suporteInterior4.position.set(-105,56.5,93);
	suporteInterior4.rotateX(  Math.PI / 3.3 );
	scene.add(suporteInterior4);

	var meioT = texturaLoader.load("./texturas/suporte.jpg");
	var meioT1 = texturaLoader.load("./texturas/suporte.jpg");
	meioT1.wrapS = meioT1.wrapT= THREE.RepeatWrapping;
	meioT1.repeat.set(4,4);
	meio = new THREE.Mesh( new THREE.CylinderGeometry(5, 5, 12,50, 10,false,Math.PI * 2.00, Math.PI * 2.00), [
		new THREE.MeshPhongMaterial({  map: meioT, side:THREE.DoubleSide}),
		new THREE.MeshPhongMaterial({  map: meioT1, side:THREE.DoubleSide}),
		new THREE.MeshPhongMaterial({  map: meioT1, side:THREE.DoubleSide}),
	]
	);
	meio.position.set(-105,70,118);
	meio.rotateX( Math.PI / 2);
	meio.rotateZ( Math.PI / 2);
    scene.add(meio);
	//cadeiras
	const points = [];
	for (let i = 0; i < 10; ++i) {
  		points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * .8));
	}

	var cadeiraT = texturaLoader.load("./texturas/cadeiras.jpg");
	cadeiraT.wrapS = cadeiraT.wrapT= THREE.RepeatWrapping;
	cadeiraT.repeat.set(4,4);
	cadeiraRoda = new THREE.Mesh( new THREE.SphereGeometry(10, 15, 20,Math.PI * 0.00, Math.PI * 2.00,Math.PI * 0.44,Math.PI * 0.74), 
	new THREE.MeshPhongMaterial({  map: cadeiraT, side:THREE.DoubleSide}),
	);
	cadeiraRoda.position.set(-105,14,117.5);
	scene.add(cadeiraRoda);

	cadeiraRoda1 = new THREE.Mesh( new THREE.SphereGeometry(10, 15, 20,Math.PI * 0.00, Math.PI * 2.00,Math.PI * 0.44,Math.PI * 0.74), 
	new THREE.MeshPhongMaterial({  map: cadeiraT, side:THREE.DoubleSide}),
	);
	cadeiraRoda1.position.set(-105,39,70);
	cadeiraRoda1.rotateX(  Math.PI / 4 );
	scene.add(cadeiraRoda1);

	cadeiraRoda2 = new THREE.Mesh( new THREE.SphereGeometry(10, 15, 20,Math.PI * 0.00, Math.PI * 2.00,Math.PI * 0.44,Math.PI * 0.74), 
	new THREE.MeshPhongMaterial({  map: cadeiraT, side:THREE.DoubleSide}),
	);	
	cadeiraRoda2.position.set(-105,91,70);
	cadeiraRoda2.rotateX(  Math.PI / 7 );
	scene.add(cadeiraRoda2);

	cadeiraRoda3 = new THREE.Mesh( new THREE.SphereGeometry(10, 15, 20,Math.PI * 0.00, Math.PI * 2.00,Math.PI * 0.44,Math.PI * 0.74), 
	new THREE.MeshPhongMaterial({  map: cadeiraT, side:THREE.DoubleSide}),
	);
	cadeiraRoda3.position.set(-105,91,167);
	cadeiraRoda3.rotateX( - Math.PI / 7 );
	scene.add(cadeiraRoda3);

	cadeiraRoda4 = new THREE.Mesh( new THREE.SphereGeometry(10, 15, 20,Math.PI * 0.00, Math.PI * 2.00,Math.PI * 0.44,Math.PI * 0.74), 
	new THREE.MeshPhongMaterial({  map: cadeiraT, side:THREE.DoubleSide}),
	);
	cadeiraRoda4.position.set(-105,40,166);
	cadeiraRoda4.rotateX( - Math.PI / 4 );
	scene.add(cadeiraRoda4);

	cadeiraRoda5 = new THREE.Mesh( new THREE.SphereGeometry(10, 15, 20,Math.PI * 0.00, Math.PI * 2.00,Math.PI * 0.44,Math.PI * 0.74), 
	new THREE.MeshPhongMaterial({  map: cadeiraT, side:THREE.DoubleSide}),
	);	
	cadeiraRoda5.position.set(-105,119,118);
	cadeiraRoda5.rotateX( Math.PI);
	scene.add(cadeiraRoda5);


	objectsColisao.push(cube,cube1,cube2,cubeEntradaEsq,cubeEntradaDir,recinto,cubePalco,
		prism,barracaGenetica3,barracaBio3,barracaLei3,barracaEB3,mesaSom,barracaEB4,barracaLei4,
		barracaBio4,barracaGenetica4);



	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}


function animate() {

	requestAnimationFrame( animate );

	if(mixerAnimacao){
		mixerAnimacao.update(relogio.getDelta());
	}
	if(mixerAnimacao1){
		mixerAnimacao1.update(relogio.getDelta());
	 }
	 if(mixerAnimacao2){
		mixerAnimacao2.update(relogio.getDelta());
	 }
	 if(mixerAnimacao3){
		mixerAnimacao3.update(relogio1.getDelta());
	 }
	 if(mixerAnimacao4){
		mixerAnimacao4.update(relogio2.getDelta());
	 }
	const time = performance.now();

	if ( controls.isLocked === true ) {

		raycaster.ray.origin.copy( controls.getObject().position );
		raycaster.ray.origin.y -= 10;

		const intersections = raycaster.intersectObjects( objectsColisao );

		const onObject = intersections.length > 0;

		const delta = ( time - prevTime ) / 1000;

		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;

		velocity.y -= 9.8 * 100.0 * delta;

		direction.z = Number( moveForward ) - Number( moveBackward );
		direction.x = Number( moveRight ) - Number( moveLeft );
		direction.normalize(); 

		if ( moveForward || moveBackward ) velocity.z -= direction.z * 800.0 /*400 */ * delta;
		if ( moveLeft || moveRight ) velocity.x -= direction.x * 800.0 * delta;

		if ( onObject === true ) {
			velocity.y = Math.max( 0, velocity.y );
			canJump = true;
		}

		controls.moveRight( - velocity.x * delta );
		controls.moveForward( - velocity.z * delta );

		controls.getObject().position.y += ( velocity.y * delta ); // new behavior

		if ( controls.getObject().position.y < 10 ) {
			velocity.y = 0;
			controls.getObject().position.y = 10; 
			canJump = true;
		}
	}

	if(mudarPrespectiva) {
		renderer.render(scene, camera);
	}
	else{
		renderer.render(scene, camaraOrtografica);
	}
	prevTime = time;
	//renderer.render( scene, camaraOrtografica );
}


