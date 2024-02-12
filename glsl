// vertex shader
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// fragment shader
uniform sampler2D texture; // Ajoutez une variable pour la texture
uniform vec2 offset; // Ajoutez une variable pour le déplacement

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv += offset;
    gl_FragColor = texture2D(texture, uv); // Utilisez la texture
}
