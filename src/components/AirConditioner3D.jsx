import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const AirConditioner3D = ({ modelPath = '/models/10ton_AC_CC.gltf', size = 1 }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);
  const modelRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // Light gray background
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      100, // Even wider FOV for better overview
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 50); // Doubled the distance (100% increase)

    // Renderer setup with performance optimizations
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for better performance
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Additional lights for better illumination
    const pointLight1 = new THREE.PointLight(0x003399, 0.5, 10);
    pointLight1.position.set(-5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xFFCC00, 0.3, 10);
    pointLight2.position.set(5, -5, 5);
    scene.add(pointLight2);

    // Create enhanced AC model
    const createACModel = () => {
      const group = new THREE.Group();

      // Main body with rounded corners effect
      const bodyGeometry = new THREE.BoxGeometry(2, 1.5, 0.8);
      const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.95,
        shininess: 100
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = 0;
      body.castShadow = true;
      body.receiveShadow = true;
      group.add(body);

      // Front panel with gradient effect
      const panelGeometry = new THREE.BoxGeometry(1.8, 1.2, 0.1);
      const panelMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x003399, // Blue color
        transparent: true,
        opacity: 0.9,
        shininess: 150
      });
      const panel = new THREE.Mesh(panelGeometry, panelMaterial);
      panel.position.set(0, 0, 0.45);
      group.add(panel);

      // Enhanced vents with depth
      for (let i = 0; i < 3; i++) {
        const ventGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.05);
        const ventMaterial = new THREE.MeshPhongMaterial({ 
          color: 0x333333,
          shininess: 50
        });
        const vent = new THREE.Mesh(ventGeometry, ventMaterial);
        vent.position.set(-0.6 + i * 0.6, 0, 0.5);
        vent.castShadow = true;
        group.add(vent);
      }

      // Brand logo with glow effect
      const logoGeometry = new THREE.CircleGeometry(0.2, 16);
      const logoMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFFCC00, // Yellow color
        transparent: true,
        opacity: 0.9,
        emissive: 0xFFCC00,
        emissiveIntensity: 0.2
      });
      const logo = new THREE.Mesh(logoGeometry, logoMaterial);
      logo.position.set(0, 0.4, 0.46);
      logo.rotation.x = -Math.PI / 2;
      group.add(logo);

      // Add some decorative elements
      const cornerGeometry = new THREE.SphereGeometry(0.05, 8, 6);
      const cornerMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x003399,
        shininess: 200
      });
      
      // Add corner spheres
      const positions = [
        [-0.9, 0.6, 0.4], [0.9, 0.6, 0.4],
        [-0.9, -0.6, 0.4], [0.9, -0.6, 0.4]
      ];
      
      positions.forEach(pos => {
        const corner = new THREE.Mesh(cornerGeometry, cornerMaterial);
        corner.position.set(...pos);
        corner.castShadow = true;
        group.add(corner);
      });

      // Scale the model
      group.scale.setScalar(size);
      
      return group;
    };

    // Load model with GLTF support
    const loadModel = async () => {
      try {
        const loader = new GLTFLoader();
        
        // Try to load GLTF model first
        try {
          const gltf = await new Promise((resolve, reject) => {
            loader.load(
              modelPath,
              (gltf) => resolve(gltf),
              (progress) => {
                // Show loading progress
                const progressPercent = (progress.loaded / progress.total) * 100;
                setLoadingProgress(progressPercent);
                console.log('Loading progress:', progressPercent + '%');
              },
              (error) => reject(error)
            );
          });
          
          const acModel = gltf.scene;
          
          // Optimize the model for better performance
          acModel.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              // Optimize materials
              if (child.material) {
                child.material.transparent = true;
                child.material.opacity = 0.95;
              }
            }
          });
          
          // Scale and position the model
          acModel.scale.setScalar(size);
          acModel.position.set(0, 0, 0);
          
          modelRef.current = acModel;
          scene.add(acModel);
          
        } catch (gltfError) {
          console.warn('GLTF loading failed, using fallback model:', gltfError);
          // Fallback to simple model
          const acModel = createACModel();
          modelRef.current = acModel;
          scene.add(acModel);
        }

        // Enhanced animation
        const animate = () => {
          animationIdRef.current = requestAnimationFrame(animate);
          
          if (modelRef.current) {
            // Smooth rotation
            modelRef.current.rotation.y += 0.001; // Very slow rotation for distant view
            
            // Gentle floating animation
            modelRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.02; // Very minimal floating
            
            // Subtle scale pulsing
            const scale = 1 + Math.sin(Date.now() * 0.002) * 0.003; // Barely noticeable pulsing
            modelRef.current.scale.setScalar(size * scale);
          }
          
          renderer.render(scene, camera);
        };
        
        animate();
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading 3D model:', err);
        setError('Failed to load 3D model');
        setIsLoading(false);
      }
    };

    loadModel();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelPath, size]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl">
        <div className="text-center">
          <div className="text-6xl mb-4">❄️</div>
          <p className="text-gray-600 font-inter">3D Model</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 font-inter mb-2">Loading 3D Model...</p>
            <div className="w-32 bg-gray-200 rounded-full h-2 mx-auto">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 font-inter mt-2">{Math.round(loadingProgress)}%</p>
          </div>
        </div>
      )}
      <div 
        ref={mountRef} 
        className="w-full h-full rounded-2xl overflow-hidden"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
};

export default AirConditioner3D;
