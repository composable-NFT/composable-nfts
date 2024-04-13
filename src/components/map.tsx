import china from './china.json';
import * as echarts from 'echarts'; //全局引入 ，可按需引入
import React, { useImperativeHandle, useEffect, useRef } from 'react';
import Modal from './modal';
import { useModalStore } from '@/store/useModalStore';

const ChinaMap = React.forwardRef((props: any, ref) => {
	const chartRef = useRef();
	const topNumber = props.data[0].value;
	const bottomNumber = props.data[props.data.length - 1].value;
	const lastHightLight = useRef<any>();
	// const [show, setShow] = React.useState(false);
	const { isShow, setIsShow } = useModalStore();
	console.log(ref, 'ref');
	const echartsMapClick = () => {
		//点击地图模块逻辑事件
	};
	const instance = useRef<any>();
	const highlightRandomData = () => {
		// Randomly select data and highlight it

		console.log(instance.current, 'chartRef.current');
		const intervalId = setInterval(() => {
			const randomIndex =
				Math.floor(Math.random() * 40) === lastHightLight.current
					? Math.floor(Math.random() * 40)
					: Math.floor(Math.random() * 40);
			console.log(randomIndex, 'randomIndex');
			if (lastHightLight.current) {
				instance.current?.dispatchAction({
					type: 'downplay',
					seriesIndex: 0,
					dataIndex: lastHightLight.current
				});
			}
			instance.current?.dispatchAction({
				type: 'highlight',
				seriesIndex: 0,
				dataIndex: randomIndex
			});
			lastHightLight.current = randomIndex;
		}, 200);
		// Wait for 3 seconds
		setTimeout(() => {
			// Highlight Beijing or Shanghais
			clearInterval(intervalId);
			instance.current?.dispatchAction({
				type: 'downplay',
				seriesIndex: 0,
				dataIndex: lastHightLight.current
			});
			// setShow(true);
			setIsShow(true);
		}, 3000);
	};

	const mapOption = (mapName: string, data: any) => {
		const myChart = echarts.init(chartRef.current);
		instance.current = myChart;
		echarts.registerMap(mapName, data);
		const option = {
			geo: {
				map: 'china',
				roam: false, //不开启缩放和平移
				zoom: 1.23, //视角缩放比例
				label: {
					normal: {
						show: false,
						fontSize: '10',
						color: 'rgba(0,0,0,0.7)'
					}
				},
				itemStyle: {
					normal: {
						borderColor: 'rgba(0, 0, 0, 0.2)',
						areaColor: '#323c48'
					},
					emphasis: {
						areaColor: '#acb5c0', //鼠标选择区域颜色
						shadowOffsetX: 0,
						shadowOffsetY: 0,
						shadowBlur: 20,
						borderWidth: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			},
			series: [
				{
					name: '人口',
					type: 'map',
					geoIndex: 0,
					data: props.data
				}
			]
		};
		myChart.setOption(option); //绘图
		//点击画布内还是画布外
		myChart.getZr().on('click', (params) => {
			if (params.target) {
				myChart.on('click', echartsMapClick); //增加点击事件
			}
		});
	};
	const loadingChina = () => {
		mapOption('china', china); //初始化-创建中国地图
	};

	useEffect(() => {
		loadingChina();
	}, [props.data]);

	useImperativeHandle(ref, () => ({
		highlightRandomData
	}));

	return (
		<div>
			{/* <Modal show={show} onClose={() => setShow(false)} /> */}
			<Modal show={isShow} onClose={() => setIsShow(false)} />
			<div style={{ width: '100%', minHeight: '500px' }} ref={chartRef} />
		</div>
	);
});
ChinaMap.displayName = 'ChinaMap';
export default ChinaMap;
