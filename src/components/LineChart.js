import React from 'react'
import {Line} from "react-chartjs-2"

const LineChart = ({graph}) => {
    
    return (
        <div className="line-chart">
            <h3 style={{opacity : 0.7}}>Temperature</h3>
            <Line 
                data={{
                    labels : graph?.map((item) => item.time.slice(11,16)),
                    datasets: [{
                        label: '°C',
                        data: graph?.map((item) => Math.round(item.temp_c)),
                        backgroundColor: [
                            "#EEF4FE"
                        ],
                        borderColor: [
                            "blue"
                        ],
                        borderWidth: 2
                    }]
                }}
                height={200}
                width={900}
                options={{
                    elements : {
                        point : {
                            radius : 0,
                            pointStyle : "circle",
                            hitRadius : 15,
                            hoverRadius : 8,
                        },
                        line : {
                            tension : 0,
                            fill : true,
                            borderJoinStyle : "round"
                        }
                    },
                    scales : {
                        x : {
                            display: false,
                        },
                        y : {
                            beginAtZero : true,
                            display : false,
                        }
                    },
                    plugins : {
                        legend: {
                            display: false,
                        },
                    }
                }}
            />
        </div>
    )
}

export default React.memo(LineChart)
