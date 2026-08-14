import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Hand } from 'lucide-react';

export default function Model3D() {
  const containerRef = useRef(null);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    // OrbitControls — handles all mouse/touch interaction cleanly
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;        // smooth inertia
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;           // idle auto-rotation
    controls.autoRotateSpeed = 2.0;
    controls.enableZoom = true;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.enablePan = false;           // no panning, just rotate/zoom

    // Pause auto-rotate on user interaction, resume after 3s idle
    let idleTimeout;
    const onInteractionStart = () => {
      setShowInstructions(false); // Hide instructions on first interaction
      controls.autoRotate = false;
      clearTimeout(idleTimeout);
    };
    const onInteractionEnd = () => {
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        controls.autoRotate = true;
      }, 3000);
    };

    renderer.domElement.addEventListener('pointerdown', onInteractionStart);
    renderer.domElement.addEventListener('pointerup', onInteractionEnd);
    renderer.domElement.addEventListener('pointerleave', onInteractionEnd);

    // Load 3D model
    const loader = new GLTFLoader();
    let model;

    loader.load(
      '/minecraft_tree/scene.gltf',
      (gltf) => {
        model = gltf.scene;
        model.scale.set(3, 3, 3);
        model.position.set(0, -2.7, 0);

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Failed to load model:', error);
      }
    );

    // Lighting
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 5, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const fillLight = new THREE.DirectionalLight(0x8888ff, 0.3);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // required for damping + autoRotate
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      clearTimeout(idleTimeout);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', onInteractionStart);
      renderer.domElement.removeEventListener('pointerup', onInteractionEnd);
      renderer.domElement.removeEventListener('pointerleave', onInteractionEnd);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-grab active:cursor-grabbing relative"
      style={{ pointerEvents: 'auto' }}
    >
      {/* Instruction overlay - hides on first interaction */}
      {showInstructions && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg px-6 py-4 text-center flex flex-col items-center gap-2">
            <Hand className="w-6 h-6 text-green-500" />
            <p className="text-slate-300 text-sm font-medium">
              Drag to rotate
            </p>
            <p className="text-slate-400 text-xs">
              Pinch to zoom
            </p>
          </div>
        </div>
      )}
    </div>
  );
}