import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { PiArrowBendDownRightBold } from "react-icons/pi";

const verticalLinePlugin = {
    getLinePosition: function (chart, pointIndex) {
        const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
        const data = meta.data;
        return data[pointIndex].x;
    },
 
    renderVerticalLine: function (chartInstance, pointIndex) {
        const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex);
        const scale = chartInstance.scales.y;
        const context = chartInstance.ctx;
        // render vertical line
        context.beginPath();
        context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        if(pointIndex === 23) context.strokeStyle = 'rgba(0, 0, 0, 0.15)';
        context.moveTo(lineLeftOffset, scale.top);
        context.lineTo(lineLeftOffset, scale.bottom);
        context.stroke();
 
        // write label
        context.fillStyle = "rgba(0, 0, 0, 0.7)";
        context.textAlign = 'left';
        context.font = "600 1rem ui-sans-serif, system-ui, sans-serif";
        context.fillText(pointIndex === 23 ? '' : `  ${pointIndex / 6}ª revisão`, lineLeftOffset, (scale.bottom - scale.top) / 1.7 + scale.top);
    },

    beforeDatasetsDraw: function (chart, easing) {
        if(chart.config._config.lineAtIndex)
            chart.config._config.lineAtIndex.forEach(pointIndex => this.renderVerticalLine(chart, pointIndex));
    }
 };

const ChartComponent2 = () => {
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
        ctx = document.getElementById("myChart2");
        ctx.width = ctx.getBoundingClientRect().width;
        ctx.height = ctx.getBoundingClientRect().height;
        document.addEventListener('scroll', update);
        chart = new Chart(ctx, config);
        update();
    });

      
    const config = {
        type: 'line',
        data: {
          labels: Array.from({length: 24}, (_, i) => ''),
          datasets: [
            {
              data: Array.from({length: 24}, (_, i) => 0),
              borderColor: 'rgb(27, 30, 173)',
              cubicInterpolationMode: 'monotone'
            }
          ]
        },
        options: {
            elements: {
                point:{
                    radius: 0
                }
            },
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
                          family: 'Arial',
                          size: 22,
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
                    display: false,
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                datalabels: {
                    display: false,
                }
            }
        },
        lineAtIndex: [6,12,18,23],
        plugins: [verticalLinePlugin],
    }

    let loaded = false; 


    const load = () => {
        config.data.datasets[0].data = [100, 77, 61, 48, 40, 36, 100, 86, 74, 65, 59, 56, 100, 90, 82, 77, 74, 73, 100, 96, 93, 91, 90, 90];
        loaded = true;
        chart.update();
        document.removeEventListener('scroll', update)
    }



    return (<>
        <div className='h-full w-full relative'>
            <canvas id="myChart2" className='h-full w-full absolute'></canvas>
        </div>
    </>);
}

export default ChartComponent2;