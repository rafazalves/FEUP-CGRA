attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform sampler2D uSampler2;
uniform float timeFactor;

varying vec2 vTextureCoord;

void main() {
	vec4 color = texture2D(uSampler2, vTextureCoord);
	
	vec3 offset=vec3(0.0,0.0,0);
	offset = aVertexNormal * (texture2D(uSampler2, vec2(0.0,0.1)+aTextureCoord*timeFactor/100.0).b/15.0);
	

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);

	vTextureCoord = aTextureCoord;
}

