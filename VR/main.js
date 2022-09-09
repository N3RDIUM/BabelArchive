var models = {}

var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    engine.displayLoadingUI();

    // load assets
    var texture = new BABYLON.Texture("assets/carpet.jpg", scene);
    var material = new BABYLON.StandardMaterial("carpet", scene);
    material.albedoTexture = texture;
    material.diffuseTexture = texture;
    material.specularTexture = texture;
    material.emissiveTexture = texture;
    material.ambientTexture = texture;
    material.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    material.ambientColor = new BABYLON.Color3(99, 3, 0);
    material.backFaceCulling = false;
    material.roughness = 1;
    material.metallic = 0;

    BABYLON.SceneLoader.Append("./models/", "floor.glb", scene, function (scene) {
        models["hexagon"] = scene;
        mesh = scene.meshes[1];
        mesh.position = new BABYLON.Vector3(0, -18, 0);
        mesh.material = material;

        skybox = scene.meshes[0];
        skybox.material = material;
    });

    engine.hideLoadingUI();

    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // WASD keys
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);
    camera.speed = 0.8;
    camera.inputs.addGamepad();
    camera.angularSensibility = 8000;

    // pointer lock
    var canvas = engine.getRenderingCanvas();
    canvas.addEventListener("click", function () {
        canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
        if (canvas.requestPointerLock) {
            canvas.requestPointerLock();
        }
    }, false);


    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 2;

    // Two point lights
    var light1 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 0, 0), scene);
    var light2 = new BABYLON.PointLight("light3", new BABYLON.Vector3(0, 0, 0), scene);
    light1.intensity = 2;
    light2.intensity = 2;
    light1.position = new BABYLON.Vector3(12, 1000, 0);
    light2.position = new BABYLON.Vector3(-12, 1000, 0);


    var skyMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
    skyMaterial.backFaceCulling = false;

    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    skybox.material = skyMaterial;
    skyMaterial.turbidity = 1;
    skyMaterial.rayleigh = 2;

    return scene;
}

var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = createScene();
engine.runRenderLoop(function () {
    scene.activeCamera.position.y = 1
    scene.render();
});
window.addEventListener("resize", function () {
    engine.resize();
});