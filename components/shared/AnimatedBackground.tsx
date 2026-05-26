'use client'

import { useEffect, useRef } from 'react'

/**
 * AnimatedBackground - Renders animated gradient orbs on a canvas
 * Inspired by the legacy MySite.css animated gradient, reimagined
 * as floating luminous orbs behind a dark UI for a modern "liquid" feel.
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Non-null references for use inside closures
    const cvs = canvas
    const context = ctx

    let animationId: number
    let width = window.innerWidth
    let height = window.innerHeight

    // Palette from the legacy gradient — teal, purple, amber, rose
    const palette = [
      { r: 27, g: 202, b: 158 },   // teal
      { r: 121, g: 4, b: 189 },     // purple
      { r: 175, g: 119, b: 14 },    // amber
      { r: 220, g: 38, b: 127 },    // rose
      { r: 56, g: 89, b: 253 },     // electric blue
    ]

    interface Orb {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: { r: number; g: number; b: number }
      phase: number
      phaseSpeed: number
    }

    const orbs: Orb[] = []
    const orbCount = 5

    function createOrbs() {
      orbs.length = 0
      for (let i = 0; i < orbCount; i++) {
        const color = palette[i % palette.length]
        orbs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.min(width, height) * (0.2 + Math.random() * 0.15),
          color,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.015 + Math.random() * 0.015,
        })
      }
    }

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      cvs.width = width
      cvs.height = height
      createOrbs()
    }

    function draw() {
      context.clearRect(0, 0, width, height)

      for (const orb of orbs) {
        // Slowly drift
        orb.x += orb.vx
        orb.y += orb.vy
        orb.phase += orb.phaseSpeed

        // Breathing radius
        const breathe = Math.sin(orb.phase) * orb.radius * 0.15
        const r = orb.radius + breathe

        // Soft bounce off edges
        if (orb.x < -r * 0.5) orb.vx = Math.abs(orb.vx)
        if (orb.x > width + r * 0.5) orb.vx = -Math.abs(orb.vx)
        if (orb.y < -r * 0.5) orb.vy = Math.abs(orb.vy)
        if (orb.y > height + r * 0.5) orb.vy = -Math.abs(orb.vy)

        // Draw radial gradient orb
        const grad = context.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r)
        grad.addColorStop(0, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, 0.32)`)
        grad.addColorStop(0.4, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, 0.12)`)
        grad.addColorStop(1, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, 0)`)

        context.fillStyle = grad
        context.beginPath()
        context.arc(orb.x, orb.y, r, 0, Math.PI * 2)
        context.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
      style={{ filter: 'blur(80px)' }}
    />
  )
}
