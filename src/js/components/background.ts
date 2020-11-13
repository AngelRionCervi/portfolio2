//@ts-ignore
import { createComp } from "vengarl";
//@ts-ignore
import anime from "animejs";

export default createComp("app-background", ({ css, html, query, onAttached }: any) => {
    const background_container = css`
        width: 100%;
        height: 100%;
        background-color: #c6736e;
        overflow: hidden;
    `;

    onAttached(() => {
        const viewPort = { x: 250, y: 250 };
        const canvas: any = query("canvas");
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        const img = new Image();
        img.src = "./images/destroyed_mars_UNCOMPRESSED2.webp";
        img.onload = () => {
            anime({
                targets: viewPort,
                keyframes: [
                    { x: 4500, y: 1000 },
                    { x: 2500, y: 2000 },
                    { x: 250, y: 250 },
                ],
                duration: 200000,
                easing: "easeInOutSine",
                loop: true,
                update: () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(
                        img,
                        viewPort.x,
                        viewPort.y,
                        window.innerWidth,
                        window.innerHeight,
                        0,
                        0,
                        window.innerWidth,
                        window.innerHeight
                    );
                },
            });
        };
    });

    return () =>
        html`<div class=${background_container}>
            <canvas width=${window.innerWidth} height=${window.innerHeight}></canvas>
        </div>`;
});
