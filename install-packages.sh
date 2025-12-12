#!/bin/bash

# 🎨 Magical Landing Page - Package Installation Script
# Run with: bash install-packages.sh

echo "🚀 Installing packages for magical landing page..."

# Core 3D & Animation packages
npm install three @threlte/core @threlte/extras @threlte/gltf gsap

# Smooth scrolling
npm install @studio-freight/lenis

# Utilities
npm install clsx tailwind-merge canvas-confetti

# Additional animation utilities
npm install splitting

echo "✅ All packages installed successfully!"
echo ""
echo "📦 Installed packages:"
echo "  - three (3D graphics)"
echo "  - @threlte/core, @threlte/extras, @threlte/gltf (Svelte Three.js wrapper)"
echo "  - gsap (animations)"
echo "  - @studio-freight/lenis (smooth scroll)"
echo "  - clsx, tailwind-merge (utilities)"
echo "  - canvas-confetti (effects)"
echo "  - splitting (text animations)"
echo ""
echo "🎯 Ready to build something magical!"
