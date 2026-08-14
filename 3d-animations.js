// 3D Animations using Three.js
let scene, camera, renderer;
let particleSystem;
let skillsCube;

function init3DBackground() {
    const container = document.getElementById('canvas-3d');
    if (!container) return;

    // Scene Setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 30;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create Particles
    createParticles();

    // Create Skills Cube (in skills section)
    if (document.getElementById('skills-cube-container')) {
        createSkillsCube();
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate particles
        if (particleSystem) {
            particleSystem.rotation.x += 0.0002;
            particleSystem.rotation.y += 0.0005;
        }

        // Rotate skills cube
        if (skillsCube) {
            skillsCube.rotation.x += 0.005;
            skillsCube.rotation.y += 0.005;
        }

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function createParticles() {
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 100;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0x00d4ff,
        size: 0.5,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
}

function createSkillsCube() {
    const size = 5;
    const geometry = new THREE.BoxGeometry(size, size, size);

    const materials = [
        new THREE.MeshPhongMaterial({ color: 0xff006e, emissive: 0xff006e }),
        new THREE.MeshPhongMaterial({ color: 0x00d4ff, emissive: 0x00d4ff }),
        new THREE.MeshPhongMaterial({ color: 0x00f5ff, emissive: 0x00f5ff }),
        new THREE.MeshPhongMaterial({ color: 0xffbe0b, emissive: 0xffbe0b }),
        new THREE.MeshPhongMaterial({ color: 0x8338ec, emissive: 0x8338ec }),
        new THREE.MeshPhongMaterial({ color: 0x3a86ff, emissive: 0x3a86ff })
    ];

    skillsCube = new THREE.Mesh(geometry, materials);
    skillsCube.position.set(0, 0, 0);

    const skillsScene = new THREE.Scene();
    skillsScene.add(skillsCube);

    // Lights for cube
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    skillsScene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    skillsScene.add(ambientLight);

    // Store for animation
    window.skillsSceneData = { scene: skillsScene, camera: camera, cube: skillsCube };

    // Render skills cube separately
    const skillsContainer = document.getElementById('skills-cube-container');
    if (skillsContainer) {
        const skillsRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        skillsRenderer.setSize(skillsContainer.clientWidth, skillsContainer.clientHeight);
        skillsRenderer.setPixelRatio(window.devicePixelRatio);
        skillsContainer.appendChild(skillsRenderer.domElement);

        function animateSkillsCube() {
            requestAnimationFrame(animateSkillsCube);
            skillsCube.rotation.x += 0.008;
            skillsCube.rotation.y += 0.008;
            skillsRenderer.render(skillsScene, camera);
        }

        animateSkillsCube();
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = init3DBackground;
    document.head.appendChild(script);
});
