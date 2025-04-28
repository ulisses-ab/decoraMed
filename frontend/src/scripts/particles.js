import ParticleCanvas from "./particle-canvas.js";

export default function run(id) {
    const canvas = document.getElementById(id);
    if(!canvas) {
        return;
    }

    canvas.width = canvas.getBoundingClientRect().width
    canvas.height = canvas.getBoundingClientRect().height

    const size_const = (canvas.width*canvas.height) / 860000;

    console.log(size_const);

    let config = {
        particles: {
            number: 142,
            size: {
                min: 0.2 * size_const,
                max: 4 * size_const,
            },
            velocity: {
                min: 0.3 * size_const,
                max: 0.5 * size_const,
            },
            color: "rgba(170, 170, 170, 0.4)",
        },
        lines: {
            color: "rgba(170, 170, 170, 0.4)",
            maxLength: 190 * size_const,
        },
        canvas: {
            margin: 40 * size_const,
        },
        interaction: {
            distance: 100 * size_const,
        }
    };

    new ParticleCanvas(canvas, config);
}