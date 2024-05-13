'use client';
import React, { useEffect, useRef } from 'react';
import GameCanvas from './game.js';
import tempale1 from '@/../public/tempale1.png';
import tempale2 from '@/../public/tempale2.png';
const routes = [
	{ x: 100, y: 100 },
	{ x: 80, y: 190 },
	{ x: 100, y: 280 },
	{ x: 50, y: 350 },
	{ x: 200, y: 500 },
	{ x: 300, y: 500 },
	{ x: 320, y: 560 },
	{ x: 400, y: 530 },
	{ x: 350, y: 500 },
	{ x: 390, y: 440 },
	{ x: 500, y: 440 },
	{ x: 600, y: 490 },
	{ x: 650, y: 400 },
	{ x: 600, y: 330 },
	{ x: 600, y: 200 },
	{ x: 550, y: 300 },
	{ x: 500, y: 110 },
	{ x: 440, y: 150 },
	{ x: 340, y: 170 },
	{ x: 220, y: 100 },
	{ x: 100, y: 100 }
];
export default function Game() {
	const canvasRef = useRef(null);

	useEffect(() => {
		let game = new GameCanvas({
			id: 'canvas',
			width: 750,
			height: 750,
			routes: routes,
			passRoutes: []
		});

		async function go() {
			await game.animate(routes[0], routes[1]);
			await game.animate(routes[1], routes[2]);
			await game.animate(routes[2], routes[3]);
			await game.animate(routes[3], routes[4]);
			await game.animate(routes[4], routes[5]);
		}
		console.log(canvasRef.current, 'canvasRef.current');
		if (canvasRef.current) {
			canvasRef.current?.addEventListener('click', go);
			const img = new Image();
			img.onload = function () {
				const context = canvasRef.current.getContext('2d');
				context?.drawImage(img, 25, 20, 179 / 2, 160 / 2);
			};
			img.src = tempale1.src;
			const img2 = new Image();
			img2.onload = function () {
				const context = canvasRef.current.getContext('2d');
				context?.drawImage(img2, 100, 450, 179 / 2, 160 / 2);
			};
			img2.src = tempale2.src;
		}

		return () => {
			if (canvasRef.current) {
				canvasRef.current?.removeEventListener('click', go);
			}
		};
	}, []);

	return (
		<div className="h-full overflow-auto bg-[#111827]">
			<div className="box">
				<canvas id="canvas" ref={canvasRef}></canvas>
				<button className="btn">go</button>
			</div>
		</div>
	);
}
