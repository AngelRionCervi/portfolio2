//@ts-ignore
import { createComp } from "vengarl";
//@ts-ignore
import anime from "animejs";
import gState from "../state";

const workCursor = createComp("work-cursor", ({ html, css }: any) => {
    const container = css`
        width: 20px;
        height: 20px;
        transform: rotate(135deg) skew(10deg, 10deg);
        display: grid;
        grid-gap: 3px;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
    `;

    const blackBox = css`
        width: 100%;
        height: 100%;
        background-color: black;
    `;

    return () =>
        html`<div class=${container}>
            <div class=${blackBox}></div>
            <div class=${blackBox}></div>
            <div class=${blackBox}></div>
        </div>`;
});

export default createComp("work-screen", ({ html, css, useGlobal, scopedComp, cx, nc }: any) => {
    //const { state, setState } = createState({ workScreenOpened: useGlobal("workScreenOpened") });
    const [workScreenOpened] = useGlobal("workScreenOpened");

    const WORKS = [
        {
            company: "Draw me a garden",
            description: "blablablbalbala lablabla blablanlakqdfhsdlùghgls",
            artworkClass: css`
                border: 1px solid black;
                border-radius: 5px;
                width: 100px;
                height: 100px;
            `,
        },
        {
            company: "Mashup Studio",
            description: "blablablbalbala lablabla blablanlakqdfhsdlùghgls",
            artworkClass: css`
                border: 1px solid green;
                border-radius: 5px;
                width: 100px;
                height: 100px;
            `,
        },
    ];

    const mainContainer = css`
        width: calc(100% - 6vh - 6vw);
        height: calc(100% - 6vh - 6vw);
        transition: opacity 100ms linear;
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-rows: 1fr;
    `;

    const opacity1 = css`
        opacity: 1;
    `;
    const opacity0 = css`
        opacity: 0;
    `;

    const companyName = css`
        margin: 0;
    `;

    const workCol = css`
        height: 80%;
        align-self: center;
        display: grid;
        grid-template-columns: 1fr 5fr;
    `;

    const cursorSlider = css``;
    const cursorContainer = css``;

    const companyNamesContainer = css`
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(5, 1fr);
    `;

    const getContentOpacity = () => {
        return workScreenOpened() ? opacity1 : opacity0;
    };

    const switchWork = (index: number) => {
        
    }

    scopedComp({
        "work-cursor": workCursor,
    })

    return () =>
        html`<div class=${nc("workscreen-container", cx(mainContainer, getContentOpacity()))}>
            <div class=${workCol}>
                <div class=${cursorSlider}><work-cursor></work-cursor></div>
                <div class=${companyNamesContainer}>
                    ${WORKS.map((w: any, i: number) => html`<p @click=${() => switchWork(i)} class=${companyName}>${w.company}</p>`)}
                </div>
            </div>
        </div>`;
});
