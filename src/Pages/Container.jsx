import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Chart } from '../components/Chart'
import { fetchWather } from '../store/asyncThunk'

export const Container = () => {
    const { data } = useSelector(store => store)
    const dispatch = useDispatch()
    const [id, setId] = useState()
    const dataWeather = []
    const cardData = []
    
    useEffect(() => {
        dispatch(fetchWather())
    }, [dispatch])

    const listWeather = () => {
        for (let i = 0; i < data.list?.length; i += 8) {
            dataWeather.push(data.list[i])
        }

        for (let i = 0; i < data.list?.length; i += 60) {
            cardData.push(data.list[i])
        }
    }
    listWeather()
    
    const filteredItem = () => {
        const filterItem = data.list?.filter(item => moment(item.dt_txt).format("ddd") === id)
        return filterItem
    }

    return (
        <Wrapper>
            <div className="flex-container">
                <div className='state_wrapper'>
                    {cardData?.map(item => 
                        <div className="state-cnt">
                            <div className='top-title'>
                                <p>{moment(item.dt_txt).format("lll")}</p>
                                <h3>{data.city?.name}</h3>
                            </div>

                            <div className="img_wrapper">
                                <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />
                                <h2>{item.main.temp.toFixed(0)+"\xB0C"}</h2>
                            </div>
                            
                            <div className="bottom_wrapper">
                                <h3>Feels like {item.main.feels_like.toFixed(0)+"\xB0C"}. Few clouds. Moderate breeze</h3>
                                <div className='line_flex-cnt'>
                                    <div className="line"></div>
                                    <div className='text_cnt'>
                                        <p>77ms/s SW <span></span> 1007pg</p>
                                        <p>humidy: 85%<span></span> uv:1</p>
                                        <p>dew point: 12C <span></span> Vilby</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="weather_wrapper-image">
                    <div className="weather_container">
                        {dataWeather.map(item => {
                            return (
                                <div key={item.dt} onMouseLeave={() => setId()} onMouseEnter={() => setId(moment(item.dt_txt).format("ddd"))} className='weather-wrapper'>
                                    <p>{moment(item.dt_txt).format("ddd")}</p>
                                    <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />
                                    <div>{item.main.temp_max.toFixed(0) + "\xB0"}  <span>{item.main.temp_min.toFixed(0) + "\xB0"}</span></div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="toltip_wrapper">

                        {filteredItem()?.map(item => 
                            <div className='toltip-cnt'>
                                <span>{moment(item.dt_txt).format("LT")}</span>
                                <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />
                                <p>{item.main.temp_max.toFixed(0) + "\xB0"}  <h4>{item.main.temp_min.toFixed(0) + "\xB0"}</h4></p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Chart data={data?.list} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
     width: 100%;
    min-height: 100vh;
    padding: 20px;
    font-family: sans-serif;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    .flex-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 40px;
        align-items: baseline;
    }
    
    .state_wrapper {
        width: 100%;
        display: flex;
        padding: 20px;
        align-items: center;
        background-color: white;
        .state-cnt {
            .top-title {
                p {
                    color: orange;
                }
                h3 {
                    font-size: 30px;
                    color: #202020;
                }
            }
        }
        .img_wrapper {
            display: flex;
            align-items: center;
            margin-top: 8px;
            h2 {
                font-weight: 400;
                font-size: 35px;
            }
        }
        .bottom_wrapper {
            h3 {
                font-size: 15px;
            }
            .line_flex-cnt {
                display: flex;
                height: 80px;
                gap: 20px;
                align-items: center;
                .line {
                    width: 2px;
                    height: 100%;
                    background-color: orange;
                    margin-left: 3px;
                }
                .text_cnt {
                    span {
                        display: inline-block;
                        width: 10px;
                    }
                }
            }
        }
    }
    .weather_wrapper-image {
        .weather_container {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 10px;
        }
        .weather-wrapper {
            width: 100%;
            height: 150px;
            transition: 0.3s;
            padding: 5px;
            :hover {
                outline: 2px solid white;
            }
            p{
                text-align: center;
                color: white;
            }
            div {
                text-align: center;
            }
            span {
                color: white;
            }
        }
        position: relative;
        .toltip_wrapper {
            width: 100%;
            max-width: 500px;
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
            z-index: 10;
            position: absolute;
            background-color: white;
            .toltip-cnt {
                margin-top: 20px;
                margin-left: 10px;
                margin-bottom: 20px;
                span {
                    text-align: center;
                    color: gray;
                }
                display: flex;
                flex-direction: column;
                align-content: center;
                img {
                    margin-top: -16px;
                }
                p {
                    text-align: center;
                }
                h4 {
                    display: inline-block;
                    color: gray;
                    font-weight: 200;
                }
            }
        }
    }
`