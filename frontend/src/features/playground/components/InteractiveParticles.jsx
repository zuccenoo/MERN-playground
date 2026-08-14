import { useEffect, useRef } from 'react';

export default function InteractiveParticles() {
    const canvasRef = useRef(null);
    const mousePosRef = useRef({ x: -9999, y: -9999 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const particles = [];
        const interactionRadius = 120;

        const resizeCanvas = () => {
            canvas.width = canvas.clientWidth || canvas.parentElement.clientWidth;
            canvas.height = canvas.clientHeight || canvas.parentElement.clientHeight;
        };

        resizeCanvas();

        // dynamically scale particles — fewer on smaller/weaker screens
        const screenWidth = window.innerWidth;
        const particleCount = screenWidth < 480 ? 300
            : screenWidth < 768 ? 600
            : screenWidth < 1280 ? 1000
            : 1500;

        class Particle {
            constructor() {
                this.reset();
                // scatter them on init instead of all starting at 0
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // 25% of particles are linkable
                this.hasLink = Math.random() < 0.25;
                // 7.5% of particles have random permanent links
                this.hasRandomLink = Math.random() < 0.075;
                this.randomLinkedParticle = null;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // very slow natural drift
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                // slight upward float bias for lighter particles, downward for heavier
                this.buoyancy = (Math.random() - 0.52) * 0.012;
                // subtle horizontal current
                this.drift = (Math.random() - 0.5) * 0.008;
                // smaller radius — fine sediment feel
                this.radius = (Math.random() * 1.31 + 0.35) * 0.5;
                // vary opacity — some particles more visible than others
                this.opacity = Math.random() < 5 ? Math.random() * 0.4 + 0.6 : Math.random() * 0.5 + 0.2;
                this.baseOpacity = this.opacity;
                // each particle wobbles at a slightly different frequency
                this.wobbleOffset = Math.random() * Math.PI * 2;
                this.wobbleSpeed = 0.004 + Math.random() * 0.006;
                this.wobbleAmp = 0.015 + Math.random() * 0.02;
            }

            update(frame) {
                const { x: mouseX, y: mouseY } = mousePosRef.current;

                // natural buoyancy + slow current
                this.vy += this.buoyancy;
                this.vx += this.drift;

                // organic wobble — makes them feel suspended in water
                this.vx += Math.sin(frame * this.wobbleSpeed + this.wobbleOffset) * this.wobbleAmp;
                this.vy += Math.cos(frame * this.wobbleSpeed + this.wobbleOffset * 1.3) * this.wobbleAmp * 0.6;

                this.x += this.vx;
                this.y += this.vy;

                // mouse/touch interaction — soft brightness boost on proximity
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < interactionRadius && distance > 0) {
                    const force = (interactionRadius - distance) / interactionRadius;
                    const smoothForce = force * force; // quadratic ease — stronger only very close
                    // MOVE OUT OF MOUSE RADIUS (disabled — kept for reference)
                    // const angle = Math.atan2(dy, dx);
                    // this.vx += Math.cos(angle) * smoothForce * 0.4;
                    // this.vy += Math.sin(angle) * smoothForce * 0.4;
                    this.opacity = Math.min(1, this.baseOpacity + smoothForce * 0.3);
                } else {
                    // smoothly return to base opacity after leaving radius
                    this.opacity += (this.baseOpacity - this.opacity) * 0.05;
                }

                // water drag — heavy damping keeps everything slow
                this.vx *= 0.92;
                this.vy *= 0.92;

                // clamp max speed so nothing ever shoots off
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (speed > 1.8) {
                    this.vx = (this.vx / speed) * 1.8;
                    this.vy = (this.vy / speed) * 1.8;
                }

                // wrap around edges instead of bouncing
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.fillStyle = `rgba(34, 197, 94, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            drawLinksOnHover(mouseX, mouseY, allParticles) {
                if (!this.hasLink) return;

                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // only draw links when cursor/finger is near this particle
                if (distance < interactionRadius) {
                    // connect to nearby linkable particles
                    allParticles.forEach((particle) => {
                        if (particle.hasLink && particle !== this) {
                            const pdx = particle.x - this.x;
                            const pdy = particle.y - this.y;
                            const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

                            if (pdist < 120) {
                                // fade line opacity with distance
                                const alpha = 1 - (pdist / 120);
                                ctx.strokeStyle = `rgba(34, 197, 94, ${alpha * 0.4})`;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(this.x, this.y);
                                ctx.lineTo(particle.x, particle.y);
                                ctx.stroke();
                            }
                        }
                    });

                    // draw random permanent link on hover — more subtle
                    if (this.hasRandomLink && this.randomLinkedParticle) {
                        const pdx = this.randomLinkedParticle.x - this.x;
                        const pdy = this.randomLinkedParticle.y - this.y;
                        const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

                        if (pdist < 120) {
                            const alpha = 1 - (pdist / 120);
                            ctx.strokeStyle = `rgba(34, 197, 94, ${alpha * 0.25})`;
                            ctx.lineWidth = 0.8;
                            ctx.beginPath();
                            ctx.moveTo(this.x, this.y);
                            ctx.lineTo(this.randomLinkedParticle.x, this.randomLinkedParticle.y);
                            ctx.stroke();
                        }
                    }
                }
            }

            drawRandomLink() {
                if (!this.hasRandomLink || !this.randomLinkedParticle) return;

                const pdx = this.randomLinkedParticle.x - this.x;
                const pdy = this.randomLinkedParticle.y - this.y;
                const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

                // always draw random links at subtle opacity — ambient web effect
                if (pdist < 300) {
                    const alpha = 1 - (pdist / 300);
                    ctx.strokeStyle = `rgba(34, 197, 94, ${alpha * 0.2})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(this.randomLinkedParticle.x, this.randomLinkedParticle.y);
                    ctx.stroke();
                }
            }
        }

        // initialize all particles
        for (let i = 0; i < particleCount; i++) particles.push(new Particle());

        // assign random permanent link targets
        particles.forEach((particle) => {
            if (particle.hasRandomLink) {
                const randomIndex = Math.floor(Math.random() * particles.length);
                particle.randomLinkedParticle = particles[randomIndex];
            }
        });

        const getCanvasPoint = (clientX, clientY) => {
            const rect = canvas.getBoundingClientRect();
            return { x: clientX - rect.left, y: clientY - rect.top };
        };

        // mouse handler — tracks cursor position relative to canvas
        const handleMouseMove = (e) => {
            mousePosRef.current = getCanvasPoint(e.clientX, e.clientY);
        };

        // touch handlers — tracks finger position relative to canvas
        const touchStateRef = { active: false, startX: 0, startY: 0, lastX: 0, lastY: 0, startTime: 0 };

        const handleTouchStart = (e) => {
            if (!e.touches || !e.touches[0]) return;

            const touch = e.touches[0];
            const point = getCanvasPoint(touch.clientX, touch.clientY);

            touchStateRef.active = true;
            touchStateRef.startX = point.x;
            touchStateRef.startY = point.y;
            touchStateRef.lastX = point.x;
            touchStateRef.lastY = point.y;
            touchStateRef.startTime = performance.now();

            mousePosRef.current = point;
        };

        const handleTouchMove = (e) => {
            if (!e.touches || !e.touches[0]) return;

            const touch = e.touches[0];
            const point = getCanvasPoint(touch.clientX, touch.clientY);

            if (touchStateRef.active) {
                // touch position tracking for connection visualization
            }

            mousePosRef.current = point;
            touchStateRef.lastX = point.x;
            touchStateRef.lastY = point.y;
        };

        const handleTouchEnd = () => {
            touchStateRef.active = false;
            mousePosRef.current = { x: -9999, y: -9999 };
        };

        // resize handler — keeps canvas dimensions in sync with window
        const handleResize = () => {
            resizeCanvas();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
        window.addEventListener('resize', handleResize);

        let animId;
        let frame = 0;
        const animate = () => {
            frame++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const { x: mouseX, y: mouseY } = mousePosRef.current;

            // render particles and connection lines
            particles.forEach((p) => { p.update(frame); p.draw(); });
            particles.forEach((p) => { p.drawRandomLink(); });
            particles.forEach((p) => { p.drawLinksOnHover(mouseX, mouseY, particles); });

            animId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchcancel', handleTouchEnd);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full absolute inset-0"
            style={{ background: 'transparent' }}
        />
    );
}