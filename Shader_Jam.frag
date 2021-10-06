precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

//varying vec4 vColor;

uniform float u_isred;

float circle(vec2 frag_coord, float radius){
    return length(frag_coord) - radius;
}

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
               dot(st,vec2(269.5,183.3)));
    return -1.0 +2.0 *fract(sin(st)*43758.5453123);
}

float noise(vec2 st){
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}




void main(void) {
    float d = distance(u_mouse, gl_FragCoord.xy);
      d += u_time * 150.0;
      d = mod(d, 60.0);
      d = step(40.0, d);
    
    float c_sdf = circle(gl_FragCoord.xy - vec2(650.0, 350.0), 200.0);
    c_sdf -= u_time *100.0;

    float lines = fract(c_sdf * 0.01);
    lines = step(0.8, lines);
    
    float c1 = min(d,lines);
  
	
    
    vec3 color = vec3(c1);
    
    gl_FragColor = vec4(color, 1.0);
    
    
    
    //gl_FragColor = vec4(vColor.rgb *d, 1.0);
    

   
    }