import ParticleCanvas from "./particle-canvas.js";

export default function run(id) {
    const canvas = document.getElementById(id);
    if(!canvas) {
        return;
    }

    canvas.width = canvas.getBoundingClientRect().width
    canvas.height = canvas.getBoundingClientRect().height

    new ParticleCanvas(canvas, {
        particles: {
            number: (canvas.width*canvas.height) / 5000,
            size: {
                min: 0.2,
                max: 4,
            },
            velocity: {
                min: 0.3,
                max: 0.5,
            },
            color: "rgba(170, 170, 170, 0.4)",
        },
        lines: {
            color: "rgba(170, 170, 170, 0.4)",
            maxLength: 190,
        },
        canvas: {
            margin: 40,
        },
        interaction: {
            distance: 100,
        }
    });
}