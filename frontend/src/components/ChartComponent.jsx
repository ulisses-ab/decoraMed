import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { PiArrowBendDownRightBold } from "react-icons/pi";

const ChartComponent = () => {
    let ctx;
    let chart = 1;

    const update = () => {
        if(loaded) return;
        const rect = ctx.getBoundingClientRect();;
        if(rect && rect.y + rect.height < window.innerHeight + rect.height / 3) {
            load();
        } 
    }
    
    window.addEventListener("load", (e) => {
        ctx = document.getElementById("myChart");
        ctx.width = ctx.getBoundingClientRect().width;
        ctx.height = ctx.getBoundingClientRect().height;
        document.addEventListener('scroll', update);
        Chart.register(ChartDataLabels);
        chart = new Chart(ctx, config);
        positionAnnotations();
        update();
    });

      
    const config = {
        type: 'line',
        data: {
          labels: [
            '',
            '20 minutos',
            '1 hora',
            '9 horas',
            '1 dia',
            '2 dias',
            '6 dias',
            '30 dias',
          ],
          datasets: [
            {
                
              data: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
              ],
              borderColor: 'rgb(27, 30, 173)',
            }
          ]
        },
        options: {
            responsive: true,
            layout: {
                padding: {
                    right: 15,
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    },
                    title: {
                        display: true,
                        align: 'center',
                        text: 'Retenção',
                        color: 'rgb(10, 10, 10)',
                        font: {
                          family: 'ui-sans-serif, system-ui, sans-serif',
                          size: 20,
                          weight: 'bold',
                        },
                        padding: {
                          top: 10,
                          bottom: 5,
                          left: 0,
                          right: 0,
                        },
                    },
                },
                x: {
                    title: {
                        display: true,
                        align: 'center',
                        text: 'Tempo decorrido',
                        color: 'rgb(10, 10, 10)',
                        font: {
                          family: 'Arial',
                          size: 20,
                          weight: 'bold',
                        },
                        padding: {
                          top: 10,
                          bottom: 5,
                          left: 0,
                          right: 0,
                        },
                    },
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                datalabels: {
                    anchor: 'end',
                    align: 'start',
                    color: 'rgb(27, 30, 173)',
                    font: {
                        weight: '600',
                        size: 14
                    },
                    formatter: function (value, context) {
                        if(value === 100) return '';
                        return String(value) + '%';
                    }
                }
            }
        }
    }

    let loaded = false; 


    const load = () => {
        config.data.datasets[0].data = [100, 58, 48, 36, 33, 28, 25, 21];
        loaded = true;
        chart.update();
        setTimeout(() => setAnnotationOpacity(1), 400);
        document.removeEventListener('scroll', update)
        positionAnnotations();
        window.addEventListener("resize", (e) => {
            //positionAnnotations();
        })
    }

    const positionAnnotations = () => {
        const coordinates = getCoordinates();
        setAnnotationPosition1(coordinates[2]);
        setAnnotationPosition2(coordinates[6]);
    }

    const getCoordinates = () => {
        if (!chart) return [];
        const points = chart.getDatasetMeta(0).data;
        return points.map((point, index) => ({
            x: point.x,
            y: chart.scales.y.getPixelForValue(config.data.datasets[0].data[index]),
        }));
    };

    const [annotationPosition1, setAnnotationPosition1] = useState({ x: 0, y: 0});
    const [annotationPosition2, setAnnotationPosition2] = useState({ x: 0, y: 0});
    const [annotationOpacity, setAnnotationOpacity] = useState(0);

    return (<>
        <div className='h-full w-full relative'>
            <canvas id="myChart" className='h-full w-full absolute'></canvas>
        </div>
    </>);
}

export default ChartComponent;