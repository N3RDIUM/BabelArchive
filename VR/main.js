// Create BABYLON.js scene
var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // WASD keys
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);
    camera.speed = 0.2;
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
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    sphere.position.y = 0;
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