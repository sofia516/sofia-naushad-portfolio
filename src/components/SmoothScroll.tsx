'use client';
import {useEffect} from 'react';
import Lenis from 'lenis';
declare global { interface Window { portfolioLenis?: Lenis } }
export default function SmoothScroll(){useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const lenis=new Lenis({duration:1.05,easing:(t:number)=>Math.min(1,1.001-Math.pow(2,-10*t)),smoothWheel:true});window.portfolioLenis=lenis;let raf=0;const frame=(time:number)=>{lenis.raf(time);raf=requestAnimationFrame(frame)};raf=requestAnimationFrame(frame);return()=>{cancelAnimationFrame(raf);lenis.destroy();delete window.portfolioLenis}},[]);return null}
