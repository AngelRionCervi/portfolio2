//@ts-ignore
import { createComp } from "vengarl";

createComp("app-background", ({ css, html }: any) => {
    const background_container = css`
        width: 100%;
        height: 100%;
        background-color: #c6736e;
        overflow: hidden;
    `;

    const background_svg = css`
        width: 105%;
        overflow: hidden;
        margin-left: -10px;
        margin-top: -10px;
    `;

    return () =>
        html`<div class=${background_container}><img class=${background_svg} src="./images/SeaOfVectors.svg" /></div>`;
});
