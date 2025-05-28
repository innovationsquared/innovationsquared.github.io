const canvas = document.getElementById("webGLCanvas");
const gl = canvas.getContext("webgl");

if (!gl) {
    alert("WebGL not enabled!");
}

gl.clearColor(1, 0, 0, 1);

gl.clear(gl.COLOR_BUFFER_BIT);

//vertex shader
const vShader =  `
attribute vec4 aVertexPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
void main() {
    gl_position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}`;

const fShader = `
void main() {
    gl_fragColor = vec4(1.0, 1.0, 1.0, 1.0);
}`;
