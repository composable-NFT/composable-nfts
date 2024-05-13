'use client';
import React, { useEffect, useRef } from 'react';
import GameCanvas from '../game/game';
import tempale1 from '@/../public/tempale1.png';
import tempale2 from '@/../public/tempale2.png';
//向右x+50y+14;
//向左x - 48 y-22;
type Point = { x: number; y: number };
type Routes = Point[];

function right(point: { x: number; y: number }) {
	return { x: point.x + 53, y: point.y + 12 };
}
function left(point: { x: number; y: number }) {
	return { x: point.x - 48, y: point.y + 22 };
}
function up(point: { x: number; y: number }) {
	return { x: point.x + 47, y: point.y - 22 };
}
function upLeft(point: { x: number; y: number }) {
	return { x: point.x - 52, y: point.y - 12 };
}
export default function Game() {
	const canvasRef = useRef(null);
	const animateCanvasRef = useRef(null);
	function genterateRoutes(
		start: { x: number; y: number },
		steps: { dir: 'right' | 'left' | 'up' | 'upLeft'; times: number }[]
	) {
		const routes = [start];
		let times = 0;
		steps.forEach((step) => {
			switch (step.dir) {
				case 'right':
					for (let i = 0; i < step.times; i++) {
						routes.push(right(routes[times]));
						times++;
					}
					break;
				case 'left':
					for (let i = 0; i < step.times; i++) {
						routes.push(left(routes[times]));
						times++;
					}
					break;
				case 'up':
					for (let i = 0; i < step.times; i++) {
						routes.push(up(routes[times]));
						times++;
					}
					break;
				case 'upLeft':
					for (let i = 0; i < step.times; i++) {
						routes.push(upLeft(routes[times]));
						times++;
					}
					break;
				default:
					break;
			}
		});
		console.log(routes, 'routes');
		return routes;
	}
	function drawBoard(routes: Routes) {
		const context = canvasRef.current?.getContext('2d');
		context.fillStyle = 'rgb(250,229,208)'; // 设置方块的颜色

		routes.forEach((route) => {
			context.save(); // 保存当前的绘图状态
			context.translate(route.x, route.y); // 将坐标原点移动到方块的位置
			context.rotate(-Math.PI * 0.2); // 旋转45度
			context.transform(1, 0.2, 0.9, 1, 0, 0);
			context.scale(1, 0.8); // 缩放y轴，使得形状变为菱形
			context.fillRect(-35, -35, 50, 50); // 绘制方块
			context.restore(); // 恢复原有的绘图状态
		});
	}
	useEffect(() => {
		const routes = genterateRoutes({ x: 220, y: 128 }, [
			{ dir: 'right', times: 3 },
			{ dir: 'left', times: 5 },
			{ dir: 'right', times: 2 },
			{ dir: 'left', times: 3 },
			{ dir: 'right', times: 3 },
			{ dir: 'left', times: 2 },
			{ dir: 'right', times: 2 },
			{ dir: 'up', times: 4 },
			{ dir: 'right', times: 4 },
			{ dir: 'up', times: 4 },
			{ dir: 'upLeft', times: 4 },
			{ dir: 'up', times: 5 },
			{ dir: 'upLeft', times: 10 },
			{ dir: 'left', times: 2 }
		]);
		let game = new GameCanvas({
			id: 'anicanvas',
			width: window.innerWidth * 0.7,
			height: 750,
			routes: routes,
			passRoutes: [],
			manPic: tempale1.src
		});
		let bg = new GameCanvas({
			id: 'canvas',
			width: window.innerWidth * 0.7,
			height: 750,
			routes: [],
			passRoutes: []
		});

		async function go() {
			await game.animate(1);
		}
		console.log(canvasRef.current, 'canvasRef.current');
		if (animateCanvasRef.current) {
			animateCanvasRef.current?.addEventListener('click', go);
		}
		if (canvasRef.current) {
			const img = new Image();
			img.onload = function () {
				const context = canvasRef.current.getContext('2d');
				context?.drawImage(img, 25, 20, 179 / 2, 160 / 2);
				const animaContext = animateCanvasRef?.current?.getContext('2d');
				animaContext?.drawImage(img, 200, 100, 179 / 2, 160 / 2);
			};
			img.src = tempale1.src;
			const img2 = new Image();
			img2.onload = function () {
				const context = canvasRef.current.getContext('2d');
				context?.drawImage(img2, 100, 450, 179 / 2, 160 / 2);
			};
			img2.src = tempale2.src;
			drawBoard(routes);
		}

		return () => {
			if (canvasRef.current) {
				animateCanvasRef.current?.removeEventListener('click', go);
			}
		};
	}, []);

	return (
		<div className="h-full overflow-auto bg-[#111827]">
			<div className="box">
				<canvas id="canvas" ref={canvasRef}></canvas>
				<canvas
					id="anicanvas"
					ref={animateCanvasRef}
					style={{ position: 'absolute', zIndex: 5, top: 0, left: 0, right: 0 }}
				></canvas>
				<button className="btn">go</button>
			</div>
		</div>
	);
}
