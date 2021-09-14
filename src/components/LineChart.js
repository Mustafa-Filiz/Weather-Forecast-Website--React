import React from 'react'
import {Line} from "react-chartjs-2"

const LineChart = ({graph}) => {
    
    return (
        <div>
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
                        borderWidth: 3
                    }]
                }}
                height={200}
                width={800}
                options={{
                    elements : {
                        point : {
                            radius : 0,
                            pointStyle : "circle",
                            hitRadius : 10,
                            hoverRadius : 5,
                        },
                        line : {
                            tension : 0,
                            fill : true,
                            borderJoinStyle : "round"
                        }
                    },
                    scales : {
                        y : {
                            beginAtZero : true,
                        }
                    },
                }}
            />
        </div>
    )
}

export default LineChart
