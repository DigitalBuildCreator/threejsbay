import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.125.0/build/three.module.js';

function createSimpleGrid(xSpacing, ySpacing, extension) {
    const gridLineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

    // Grid Line 1
    var startPoint = new THREE.Vector3(-xSpacing / 2, 0, extension);
    var endPoint = new THREE.Vector3(-xSpacing / 2, 0, -(ySpacing + extension));
    const geometry1 = new THREE.BufferGeometry().setFromPoints([startPoint, endPoint]);

    // Grid Line 2
    startPoint = new THREE.Vector3(xSpacing / 2, 0, extension);
    endPoint = new THREE.Vector3(xSpacing / 2, 0, -(ySpacing + extension));
    const geometry2 = new THREE.BufferGeometry().setFromPoints([startPoint, endPoint]);

    // Grid Line A
    startPoint = new THREE.Vector3(-((xSpacing / 2) + extension), 0, 0);
    endPoint = new THREE.Vector3((xSpacing / 2) + extension, 0, 0);
    const geometryA = new THREE.BufferGeometry().setFromPoints([startPoint, endPoint]);

    // Grid Line B
    startPoint = new THREE.Vector3(-((xSpacing / 2) + extension), 0, -ySpacing);
    endPoint = new THREE.Vector3((xSpacing / 2) + extension, 0, -ySpacing);
    const geometryB = new THREE.BufferGeometry().setFromPoints([startPoint, endPoint]);

    const gridLine1 = new THREE.Line(geometry1, gridLineMaterial);
    const gridLine2 = new THREE.Line(geometry2, gridLineMaterial);
    const gridLineA = new THREE.Line(geometryA, gridLineMaterial);
    const gridLineB = new THREE.Line(geometryB, gridLineMaterial);

    const gridGroup = new THREE.Group();
    gridGroup.add(gridLine1, gridLine2, gridLineA, gridLineB);



    return gridGroup;
}

export { createSimpleGrid };
