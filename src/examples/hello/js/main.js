require(['goo'], function() {
    require([
        'goo/entities/GooRunner',
        'goo/renderer/Camera',
        'goo/entities/components/CameraComponent',
        'goo/shapes/ShapeCreator', 
        'goo/entities/EntityUtils',
        'goo/renderer/shaders/ShaderLib',
        'goo/renderer/Material',
        'goo/entities/components/LightComponent',
        'goo/renderer/light/PointLight',
        'goo/entities/components/ScriptComponent', 
        'goo/entities/World'

    ], function(
        GooRunner,
        Camera,
        CameraComponent,
        ShapeCreator, 
        EntityUtils,
        ShaderLib,
        Material,
        LightComponent,
        PointLight,
        ScriptComponent,
        World
    ) {
        // ** MY APPLICATION **
		var goo = new GooRunner();
		document.body.appendChild(goo.renderer.domElement);
		goo.renderer.setClearColor(1.0, 160/255, 160/255, 1.0);

		//Add camera
		var cameraName = 'MainCamera';
		var camera = goo.world.createEntity(cameraName);
		var m_camera = new Camera(31, 1, 0.1, 1000);
		camera.setComponent(new CameraComponent(m_camera));

		camera.transformComponent.transform.translation.set(0, 0, 5);
		camera.addToWorld();


		//add box
		var meshData = ShapeCreator.createBox(1, 1, 1);
		var box = EntityUtils.createTypicalEntity(goo.world, meshData);
		box.transformComponent.transform.translation.set(0,0,-3);

		var material = Material.createMaterial(ShaderLib.texturedLit, 'BoxMaterial');
		box.meshRendererComponent.materials.push(material);

		box.addToWorld();


		//add light source
		var light = new PointLight();
		var lightEntity = goo.world.createEntity('light');
		lightEntity.setComponent(new LightComponent(light));
		lightEntity.transformComponent.transform.translation.set(0, 1, 0);
		lightEntity.addToWorld();

		// Spin the box
		var spinC = new ScriptComponent({
		    run: function (entity) {
		        entity.transformComponent.transform.setRotationXYZ(
		            World.time * 1.2,
		            World.time * 2.0,
		            0
		        );
		        entity.transformComponent.setUpdated();
		    }
		});


		//move the box randomly :D
		var update = 0;
		var offsetx = -1; var offsety = -0.5; var offsetz = -1;
		var lastx = Math.random(); var lasty = Math.random(); var lastz = Math.random(); 
		var newx  = Math.random(); var newy  = Math.random(); var newz  = Math.random();

		var lerpk = 0;
		var interval = 10;
		var floatC = new ScriptComponent({
			run: function(entity){
				update++;
				lerpk = (lerpk + 1) % interval;
				if(update % interval == 0){
					//get new random
					lastx = newx; lasty = newy; lastz = newz;
					newx = Math.random(); newy = Math.random(); newz = Math.random();
				}

				//lerp between last and new
				var k = lerpk/(interval);
				var tarx = lastx + (newx - lastx) * k;
				var tary = lasty + (newy - lasty) * k;
				var tarz = lastz + (newz - lastz) * k;

				// Rotate
				entity.transformComponent.transform.setRotationXYZ(
		            World.time * 1.2,
		            World.time * 2.0,
		            0
		        );


		        entity.transformComponent.transform.translation.set(tarx + offsetx, tary + offsety, tarz + offsetz);

				entity.transformComponent.setUpdated();	
			}
		});

		
		box.setComponent(floatC);
		//box.setComponent(spinC);




    });
});

