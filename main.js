function main() {
  /**
   * @type {HTMLCanvasElement} canvas
   */
  var canvas = document.getElementById("myCanvas");

  /**
   * @type {WebGLRenderingContext} gl
   */
  var gl = canvas.getContext("webgl");
  if (!gl) {
    console.log("Browser only support experimental WebGl");
    gl = canvas.getContext("experimental-webgl");
  }

  var vertices = [
    0.5403292893642, 0.807051551949, 0.64,0.66,0.63, //1
    0.5387445095744, 0.7359229060891, 0.64,0.66,0.63, //2
    0.5038793541987, 0.6692689325768, 0.64,0.66,0.63, //3
    0.4946503424817, 0.6364546686938, 0.64,0.66,0.63, //4
    0.4649124158377, 0.6364546686938, 0.64,0.66,0.63, //12
    0.459785187106, 0.6651671495914, 0.64,0.66,0.63, //13
    0.4156910200133, 0.7359229060891, 0.64,0.66,0.63, //14
    0.4146655742669, 0.8036023253477, 0.64,0.66,0.63, //15
    0.4946503424817, 0.6364546686938, 0.64,0.66,0.63, //4
    0.5079811371841, 0.4805869152498, 0.64,0.66,0.63, //5
    0.5213119318866, 0.2980575724008, 0.64,0.66,0.63, //6
    0.5161847031548, 0.0488742560395, 0.64,0.66,0.63, //7
    0.459785187106, 0.0550269305176, 0.64,0.66,0.63, //9
    0.4474798381499, 0.2990830181471, 0.64,0.66,0.63, //10
    0.456708849867, 0.4805869152498, 0.64,0.66,0.63, //11
    0.4649124158377, 0.6364546686938, 0.64,0.66,0.63, //12
    0.4146655742669, 0.8036023253477, 0.64,0.66,0.63, //15
    0.4361999349401, 0.9399866096112, 0.64,0.66,0.63, //16
    0.4413271636718, 0.8056532168404, 0.64,0.66,0.63, //17
    0.4587597413597, 0.8066786625867, 0.64,0.66,0.63, //18
    0.4638869700914, 0.9430629468503, 0.64,0.66,0.63, //19
    0.4751668733011, 0.8066786625867, 0.64,0.66,0.63, //20
    0.4874722222573, 0.8077041083331, 0.64,0.66,0.63, //21
    0.4915740052426, 0.9410120553576, 0.64,0.66,0.63, //22
    0.5023793300953, 0.8109330236366, 0.64,0.66,0.63, //23
    0.5142437890215, 0.8104584452795, 0.64,0.66,0.63, //24
    0.5193505104753, 0.9404608477416, 0.64,0.66,0.63, //0
    0.5403292893642, 0.807051551949, 0.64,0.66,0.63, //1
    
    -0.3821657094304, 0.4681441177767, 0.64,0.66,0.63, //5
    -0.3202162369565, 0.3611404835037, 0.64,0.66,0.63, //6
    -0.3159924092878, 0.262584504568, 0.64,0.66,0.63, //7
    -0.5004328841531, 0.26, 0.64,0.66,0.63, //18
    -0.493393171372, 0.3597325409475, 0.64,0.66,0.63, //19
    -0.4286278137857, 0.4653282326642, 0.64,0.66,0.63, //20

    -0.3835736519866, 0.917277793212, 0.64,0.66,0.63, //1
    -0.3666783413119, 0.7807073652584, 0.64,0.66,0.63, //2
    -0.3849815945428, 0.5667000967124, 0.64,0.66,0.63, //3
    -0.386389537099, 0.4991188540136, 0.64,0.66,0.63, //4
    -0.3821657094304, 0.4681441177767, 0.64,0.66,0.63, //5
    -0.4286278137857, 0.4653282326642, 0.64,0.66,0.63, //20
    -0.4244039861171, 0.5005267965698, 0.64,0.66,0.63, //21
    -0.4244039861171, 0.5638842115999, 0.64,0.66,0.63, //22
    -0.4412992967918, 0.7778914801459, 0.64,0.66,0.63, //23
    -0.4258119286733, 0.917277793212, 0.64,0.66,0.63, //0
    -0.3159924092878, 0.26, 0.64,0.66,0.63, //7
    -0.348375088081, 0.061248719028, 0.64,0.66,0.63, //8
    -0.3497830306372, 0.26, 0.64,0.66,0.63, //9
    -0.3694942264243, 0.26, 0.64,0.66,0.63, //10
    -0.386389537099, 0.0640646041405, 0.64,0.66,0.63, //11
    -0.3948371924364, 0.26, 0.64,0.66,0.63, //12
    -0.4159563307797, 0.26, 0.64,0.66,0.63, //13
    -0.4258119286733, 0.0598407764718, 0.64,0.66,0.63, //14
    -0.4412992967918, 0.26, 0.64,0.66,0.63, //15
    -0.4610104925789, 0.26, 0.64,0.66,0.63, //16
    -0.4638263776913, 0.0598407764718, 0.64,0.66,0.63, //17
    -0.5004328841531, 0.26, 0.64,0.66,0.63, //18
  ];

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  var vertexShaderSource = `
    attribute vec2 aPosition;
    attribute vec3 aColor;
    varying vec3 vColor;
    uniform mat4 uChanged;
    void main(){
        gl_Position = uChanged * vec4(aPosition,0,1);
        vColor = aColor;
    }
  `;

  var fragmentShaderSource = `
    precision mediump float;
    varying vec3 vColor;
    void main(){
        gl_FragColor = vec4(vColor, 1.0);
    }
  `;

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.shaderSource(fragmentShader, fragmentShaderSource);

  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error("ERROR compiling vertex shader!", gl.getShaderInfoLog(vertexShader));
    return;
  }

  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error("ERROR compiling fragment shader!", gl.getShaderInfoLog(fragmentShader));
    return;
  }

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);

  gl.linkProgram(shaderProgram);
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error("ERROR validating program!", gl.getProgramInfoLog(shaderProgram));
    return;
  }

  gl.validateProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
  gl.enableVertexAttribArray(aPosition);

  var aColor = gl.getAttribLocation(shaderProgram, "aColor");
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
  gl.enableVertexAttribArray(aColor);

  var speed = 0.0160;
  var change = 0;
  var uChanged = gl.getUniformLocation(shaderProgram, "uChanged");

  function render() {
    if (change >= 0 || change < -1) speed = -speed;
    change += speed;
    // gl.uniform1f(uChange, change);
    gl.clearColor(0.0, 0.1, 0.15, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const kiri = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		]
		
		const kanan = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, change, 0, 1,
		]

    gl.uniformMatrix4fv(uChanged, false, kiri);
    gl.drawArrays(gl.TRIANGLE_FAN, 28, 6);
    gl.drawArrays(gl.TRIANGLE_FAN, 34, 10);  
    gl.drawArrays(gl.TRIANGLE_FAN, 44, 3);
    gl.drawArrays(gl.TRIANGLE_FAN, 47, 3);
    gl.drawArrays(gl.TRIANGLE_FAN, 50, 3);
    gl.drawArrays(gl.TRIANGLE_FAN, 53, 3);
    
    gl.uniformMatrix4fv(uChanged, false, kanan);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);
    gl.drawArrays(gl.TRIANGLE_FAN, 8, 8);
    gl.drawArrays(gl.TRIANGLE_FAN, 15, 10);
    gl.drawArrays(gl.TRIANGLE_FAN, 25, 3);

  }
  setInterval(render, 1000 / 60);
}