function main() {
    const canvas = document.getElementById("webGLCanvas");
const gl = canvas.getContext("webgl", {antialias: true});

if (!gl) {
    alert("WebGL not enabled!");
}


//vertex shader
const vShader =  `
attribute vec3 aVertexPosition;
uniform mat4 ProjectionMatrix;
uniform mat4 ViewMatrix;
uniform mat4 MovementMatrix;
attribute vec3 color;
varying vec3 vColor;
void main() {
   gl_Position = ProjectionMatrix * ViewMatrix * MovementMatrix * vec4(aVertexPosition, 1.0);
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

var _Pmatrix = gl.getUniformLocation(SHADER_PROGRAM, "ProjectionMatrix");
var _Mmatrix = gl.getUniformLocation(SHADER_PROGRAM, "MovementMatrix");
var _Vmatrix = gl.getUniformLocation(SHADER_PROGRAM, "ViewMatrix");
var _color = gl.getAttribLocation(SHADER_PROGRAM, "color");
var _position = gl.getAttribLocation(SHADER_PROGRAM, "aVertexPosition");
gl.enableVertexAttribArray(_color);
gl.enableVertexAttribArray(_position);
gl.useProgram(SHADER_PROGRAM);

var cube_vertex = [
    -1, -1, -1,     1, 0, 0,
     1, -1, -1,     1, 0, 0,
     1,  1, -1,     1, 0, 0,
    -1,  1, -1,     1, 0, 0,

    -1, -1, 1,     0, 1, 0,
     1, -1, 1,     0, 1, 0,
     1,  1, 1,     0, 1, 0,
    -1,  1, 1,     0, 1, 0,

    -1, -1, -1,     0, 0, 1,
    -1,  1, -1,     0, 0, 1,
    -1,  1,  1,     0, 0, 1,
    -1, -1,  1,     0, 0, 1,

    1, -1, -1,     1, 1, 0,
    1,  1, -1,     1, 1, 0,
    1,  1,  1,     1, 1, 0,
    1, -1,  1,     1, 1, 0,

    -1, -1, -1,     1, 0, 1,
    -1, -1,  1,     1, 0, 1,
     1, -1,  1,     1, 0, 1,
     1, -1, -1,     1, 0, 1,

    -1, 1, -1,     0, 1, 1,
    -1, 1,  1,     0, 1, 1,
     1, 1,  1,     0, 1, 1,
     1, 1, -1,     0, 1, 1
];

var CUBE_VERTEX = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, CUBE_VERTEX);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube_vertex), gl.STATIC_DRAW);

var cube_faces = [
    0, 1, 2,
    0, 2, 3,

    4, 5, 6, 
    4, 6, 7, 

    8, 9, 10,
    8, 10, 11,

    12, 13, 14,
    12, 14, 15,

    16, 17, 18,
    16, 18, 19,

    20, 21, 22,
    20, 22, 23
];
var CUBE_FACES = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, CUBE_FACES);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, 
    new Uint16Array(cube_faces), gl.STATIC_DRAW);

var PROJMATRIX = LIBS.get_projection(70, window.innerWidth/window.innerHeight, 1, 100);
var MOVEMATRIX = LIBS.get_I4();
var VIEWMATRIX = LIBS.get_I4();
LIBS.translateZ(VIEWMATRIX, -5);
gl.clearColor(0, 0, 0, 0);
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);
gl.clearDepth(1.0);

var time_prev = 0;
var animate = function(time) {
    var dTime = time-time_prev;

    LIBS.rotateZ(MOVEMATRIX, dTime * 0.005);
    LIBS.rotateY(MOVEMATRIX, dTime * 0.004);
    LIBS.rotateX(MOVEMATRIX, dTime * 0.003);
    time_prev = time;

gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
gl.uniformMatrix4fv(_Pmatrix, false, PROJMATRIX);
gl.uniformMatrix4fv(_Mmatrix, false, MOVEMATRIX);
gl.uniformMatrix4fv(_Vmatrix, false, VIEWMATRIX);
gl.bindBuffer(gl.ARRAY_BUFFER, CUBE_VERTEX);
gl.vertexAttribPointer(_position, 3, gl.FLOAT, false, 4*(3+3), 0);
gl.vertexAttribPointer(_color, 3, gl.FLOAT, false, 4*(3+3), 3*4);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, CUBE_FACES);
gl.drawElements(gl.TRIANGLES, 6 * 2 * 3, gl.UNSIGNED_SHORT, 0);
gl.flush();
window.requestAnimationFrame(animate);
};

animate(0);

}

window.addEventListener('load', main);