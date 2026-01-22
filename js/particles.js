// Three.js Data Stream Particles Animation
// Matches 'Ocean Depth' theme

const container = document.getElementById('canvas-container');

if (container) {
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    camera.position.y = 10;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Particles setup
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    // Colors matching Ocean Depth theme (Blue/Cyan/White)
    const colors = [];
    const colorPalette = [
        new THREE.Color('#3b82f6'), // Royal Blue
        new THREE.Color('#06b6d4'), // Cyan
        new THREE.Color('#ffffff')  // White
    ];

    for (let i = 0; i < particleCount; i++) {
        // Spread particles across a wide field
        positions[i * 3] = (Math.random() - 0.5) * 150;     // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z

        // Velocity for stream effect (moving right/forward)
        velocities.push({
            x: Math.random() * 0.2 + 0.05,
            y: (Math.random() - 0.5) * 0.05,
            z: (Math.random() - 0.5) * 0.05
        });

        // Assign random color from palette
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // Material with vertex colors
    const material = new THREE.PointsMaterial({
        size: 0.6,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        const positions = particles.geometry.attributes.position.array;

        // Smooth camera movement based on mouse
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;
        scene.rotation.y += 0.05 * (targetX - scene.rotation.y);
        scene.rotation.x += 0.05 * (targetY - scene.rotation.x);

        // Update particle positions (Flowing stream effect)
        for (let i = 0; i < particleCount; i++) {
            // Move particle based on its velocity
            positions[i * 3] += velocities[i].x; // Move along X (stream)
            positions[i * 3 + 1] += velocities[i].y;
            positions[i * 3 + 2] += velocities[i].z;

            // Amplitude wavelike motion
            positions[i * 3 + 1] += Math.sin((Date.now() * 0.001) + positions[i * 3]) * 0.02;

            // Reset particle if it goes off screen (recycle)
            if (positions[i * 3] > 75) {
                positions[i * 3] = -75;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
            }
        }

        particles.geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
