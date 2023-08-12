import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.125.0/build/three.module.js';

function addOriginAxes() {
    // Define the endpoints for each axis
    const origin = new THREE.Vector3(0, 0, 0);
    const xEndPoint = new THREE.Vector3(5, 0, 0);
    const yEndPoint = new THREE.Vector3(0, 5, 0);
    const zEndPoint = new THREE.Vector3(0, 0, 5);

    // Create a geometry for each axis
    const xGeometry = new THREE.BufferGeometry().setFromPoints([origin, xEndPoint]);
    const yGeometry = new THREE.BufferGeometry().setFromPoints([origin, yEndPoint]);
    const zGeometry = new THREE.BufferGeometry().setFromPoints([origin, zEndPoint]);

    // Define materials for each axis with the desired colors
    const xMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });  // Red for X-axis
    const yMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });  // Green for Y-axis
    const zMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });  // Blue for Z-axis

    // Create the lines using the geometries and materials
    const xLine = new THREE.Line(xGeometry, xMaterial);
    const yLine = new THREE.Line(yGeometry, yMaterial);
    const zLine = new THREE.Line(zGeometry, zMaterial);

    // Group the lines together
    const originLinesGroup = new THREE.Group();
    originLinesGroup.add(xLine, yLine, zLine);

    return originLinesGroup;
}

export { addOriginAxes };
