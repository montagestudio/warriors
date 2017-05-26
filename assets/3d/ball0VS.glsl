precision highp float;
attribute vec3 a_position;
attribute vec3 a_normal;
varying vec3 v_normal;
uniform mat3 u_normalMatrix;
uniform mat4 u_modelViewMatrix;
uniform mat4 u_projectionMatrix;
attribute vec2 a_texcoord0;
varying vec2 v_texcoord0;
attribute vec3 a_textangent;
varying vec3 v_textangent;
attribute vec3 a_texbinormal;
varying vec3 v_texbinormal;
varying vec3 v_light0Direction;
varying vec3 v_position;
uniform mat4 u_light0Transform;
varying vec3 v_light2Direction;
uniform mat4 u_light2Transform;
void main(void) {
vec4 pos = u_modelViewMatrix * vec4(a_position,1.0);
v_normal = u_normalMatrix * a_normal;
v_texcoord0 = a_texcoord0;
v_texbinormal = u_normalMatrix * a_texbinormal;
v_textangent = u_normalMatrix * a_textangent;
v_position = pos.xyz;
v_light0Direction = u_light0Transform[3].xyz - pos.xyz;
v_light2Direction = mat3(u_light2Transform) * vec3(0.,0.,1.);
gl_Position = u_projectionMatrix * pos;
}
