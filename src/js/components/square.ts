//@ts-ignore
import { createComp } from "vengarl";
//@ts-ignore
import anime from "animejs";

createComp("app-square", ({ html, css, self, query, onAttached }: any) => {
    const initSquareSize = 75;
    const endSquareSize = 700;
    const borderWidth = 40;
    const finalShift = 40;

    const calcNewCenter = (size: number) => {
        return {
            x: window.innerWidth / 2 - size / 2,
            y: window.innerHeight / 2 - size / 2,
        };
    };

    const initPos = calcNewCenter(initSquareSize);
    const squareContainer = css`
        position: absolute;
        z-index: 2;
        background-color: white;
        box-shadow: inset 0px 0px 0px ${borderWidth}px black;
    `;
    console.log(self);

    const squareAnimation = () => {
        const squareEl = query(`.${squareContainer}`);
        anime({
            targets: squareEl,
            rotate: [{value: "1turn", duration: 400, easing: "easeInQuad"}],
            top: [
                { value: calcNewCenter(initSquareSize).y + "px", duration: 400, easing: "easeInQuad" },
                { value: calcNewCenter(endSquareSize).y + "px", duration: 400, easing: "easeInQuad" },
            ],
            width: [{ value: endSquareSize, duration: 400, delay: 400, easing: "easeInQuad" }],
            height: [{ value: endSquareSize, duration: 400, delay: 400, easing: "easeInQuad" }],
            left: [{ value: calcNewCenter(endSquareSize).x + "px", duration: 400, delay: 400, easing: "easeInQuad" }],
            complete: () => {
                const squareElShadow = squareEl.cloneNode(true);
                squareElShadow.style.zIndex = "1";
                console.log(squareElShadow)
                self.shadowRootAccessor.appendChild(squareElShadow);
                anime({
                    targets: squareElShadow,
                    translateX: [{ value: -finalShift, duration: 250, easing: "easeInQuad" }],
                    translateY: [{ value: -finalShift, duration: 250, easing: "easeInQuad" }],
                })
                anime({
                    targets: squareEl,
                    translateX: [{ value: finalShift, duration: 250, easing: "easeInQuad" }],
                    translateY: [{ value: finalShift, duration: 250, easing: "easeInQuad" }],
                })
            }
        });
    };

    onAttached(() => {
        squareAnimation();
    });

    return () =>
        html`<div
            style="width: ${initSquareSize}px; height: ${initSquareSize}px; left: ${initPos.x}px; top: ${-initSquareSize}px;"
            class=${squareContainer}
        ></div>`;
});
