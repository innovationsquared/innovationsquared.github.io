function main() {
    const canvas = document.getElementById("webGLCanvas");
const gl = canvas.getContext("webgl");

if (!gl) {
    alert("WebGL not enabled!");
}


//vertex shader
const vShader =  `
attribute vec2 aVertexPosition;
attribute vec3 color;
varying vec3 vColor;
void main() {
   gl_Position = vec4(aVertexPosition, 0.0, 1.0);
   vColor = color;
}`;

const fShader = `
precision mediump float;
varying vec3 vColor;
void main() {
    gl_FragColor = vec4(vColor, 1.0);
}`;

var compileShader = function(source, type, typeString) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("ERROR IN " + typeString + " SHADER:" + gl.getShaderInfoLog(shader));
        return false;
    }
    return shader;
};

var shader_vertex = compileShader(vShader, gl.VERTEX_SHADER, "VERTEX");
var shader_fragment = compileShader(fShader, gl.FRAGMENT_SHADER, "FRAGMENT");
var SHADER_PROGRAM = gl.createProgram();
gl.attachShader(SHADER_PROGRAM, shader_vertex);
gl.attachShader(SHADER_PROGRAM, shader_fragment);

gl.linkProgram(SHADER_PROGRAM);

var _color = gl.getAttribLocation(SHADER_PROGRAM, "color");
var _position = gl.getAttribLocation(SHADER_PROGRAM, "aVertexPosition");
gl.enableVertexAttribArray(_color);
gl.enableVertexAttribArray(_position);
gl.useProgram(SHADER_PROGRAM);

var triangle_vertex = [
    -1, -1,
    1, 0, 0,
    1, -1, 
    0, 1, 0,
    1, 1, 
    0, 0, 1
];

var TRIANGLE_VERTEX = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, TRIANGLE_VERTEX);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle_vertex), gl.STATIC_DRAW);

var triangle_faces = [0, 1, 2];
var TRIANGLE_FACES = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, 
    new Uint16Array(triangle_faces), gl.STATIC_DRAW);


gl.clearColor(0, 0, 0, 0);

var animate = function() {
gl.clear(gl.COLOR_BUFFER_BIT);
gl.bindBuffer(gl.ARRAY_BUFFER, TRIANGLE_VERTEX);
gl.vertexAttribPointer(_position, 2, gl.FLOAT, false, 4*2, 0);
gl.vertexAttribPointer(_color, 3, gl.FLOAT, false, 4*(2+3), 2*4);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);
gl.flush();
window.requestAnimationFrame(animate);
};

animate();

}

window.addEventListener('load', main);