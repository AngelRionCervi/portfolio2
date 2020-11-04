//@ts-ignore
import { createComp } from "vengarl";
//@ts-ignore
import anime from "animejs";

createComp("circle-arrow", ({ html, css, props, self, onAttached, queryAll }: any) => {
    const arrowCircleSize = parseInt(self.attributes.circleSize.value);

    const getTemplateArea = () => {
        const orientation = self.attributes.orientation.value;
        if (orientation === "top-left") {
            return `
                "top1 center1 center2"
                "bottom1 bottom2 a"
                "bottom3 b c";
            `;
        }
        return `
            "a b top1"
            "c center1 center2"
            "bottom1 bottom2 bottom3";
        `;
    };

    const circleArrow = css`
        grid-area: bottomr;
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas:
            ${getTemplateArea()}
        align-items: end;
        justify-items: end;
        height: ${arrowCircleSize * 3.5}px;
        width: ${arrowCircleSize * 3.5}px;
        cursor: pointer;
    `;

    const circle = css`
        width: ${arrowCircleSize}px;
        height: ${arrowCircleSize}px;
        background-color: black;
        border-radius: 50%;
    `;

    let inAn = false;
    let outAn = false;

    const hoverEffectIn = () => {
        if (inAn === false) {
            inAn = true;
            anime({
                targets: queryAll(`.${circle}`),
                rotate: 45,
                borderRadius: 0,
                easing: "linear",
                duration: 200,
                complete: () => (inAn = false)
            })
        }
    }

    const hoverEffectOut = () => {
        if (outAn === false) {
            outAn = true;
            anime({
                targets: queryAll(`.${circle}`),
                rotate: 0,
                borderRadius: "50%",
                easing: "linear",
                duration: 200,
                complete: () => (outAn = false)
            })
        }
    }

    return () => html`<div @mouseleave=${hoverEffectOut} @mouseover=${hoverEffectIn} @click=${() => props().click()} class=${circleArrow}>
        <div class=${circle} style="grid-area: top1;"></div>
        <div class=${circle} style="grid-area: center1;"></div>
        <div class=${circle} style="grid-area: center2;"></div>
        <div class=${circle} style="grid-area: bottom1;"></div>
        <div class=${circle} style="grid-area: bottom2;"></div>
        <div class=${circle} style="grid-area: bottom3;"></div>
    </div>`;
});
