//@ts-ignore
import { createComp } from "vengarl";
//@ts-ignore
import anime from "animejs";

createComp("app-background", ({ css, html, query, onAttached }: any) => {
    const background_container = css`
        width: 100%;
        height: 100%;
        background-color: #c6736e;
        overflow: hidden;
    `;

    const background_svg = css`
        position: absolute;

        overflow: hidden;
        margin-left: -10px;
        margin-top: -10px;
    `;

    const loadSVG = () => {
        const svg: any = document.querySelector("#svg_bg");
        const canvas: any = query("canvas");
        const img = new Image(30000, 20000);

        // get svg data
        const xml = new XMLSerializer().serializeToString(svg);

        // make it base64
        const svg64 = btoa(xml);
        const b64Start = "data:image/svg+xml;base64,";

        // prepend a "header"
        const image64 = b64Start + svg64;

        // set it as the source of the img element
        img.src = image64;

        // draw the image onto the canvas
        img.onload = () => {
            document.body.appendChild(img);
            canvas
                .getContext("2d")
                .drawImage(
                    img,
                    200,
                    200,
                    window.innerWidth,
                    window.innerHeight,
                    0,
                    0,
                    window.innerWidth,
                    window.innerHeight
                );
        };
    };

    onAttached(() => {
        //loadSVG();

        const viewPort = { x: 1500, y: 1500 };
        const canvas: any = query("canvas");
        const ctx = canvas.getContext("2d");
        //ctx.imageSmoothingEnabled = false;
        const img = new Image();
        img.src = "./images/destroyed_mars_UNCOMPRESSED2.webp";
        
        const animate = () => {
            viewPort.x += 0.25;
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
       
           // requestAnimationFrame(animate);
        };

        img.onload = () => {
            //requestAnimationFrame(animate);

            anime({
                targets: viewPort,
                x: 5000,
                y: 3000,
                duration: 80000,
                easing: 'linear',
                round: 1,
                update: function() {
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
                }
              });
        };
    });

    return () =>
        html`<div class=${background_container}>
            <canvas width=${window.innerWidth} height=${window.innerHeight}></canvas>
        </div>`;
});
// <img class=${background_svg} src="./images/destroyedMars2.svg" />
