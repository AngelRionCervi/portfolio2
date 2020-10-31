//@ts-ignore
import { createComp } from "vengarl";
//@ts-ignore
import anime from "animejs";

createComp("app-square", ({ html, css, self, query, onAttached }: any) => {
    const initSquareSize = 75;
    const endSquareSize = 600;

    const calcNewCenter = (size: number) => {
        return {
            x: window.innerWidth / 2 - size / 2,
            y: window.innerHeight / 2 - size / 2,
        };
    };

    const initPos = calcNewCenter(initSquareSize);
    const squareContainer = css`
        position: absolute;
        background-color: white;
        box-shadow: inset 0px 0px 0px 40px black;
    `;
    console.log(self);

    const squareAnimation = () => {
        const squareEl = query(`.${squareContainer}`);
        squareEl.style.zIndex = "2";
        anime({
            targets: squareEl,
            top: [
                { value: window.innerHeight / 2 - initSquareSize / 2, duration: 250, easing: "linear" },
                { value: calcNewCenter(endSquareSize).y + "px", duration: 250, easing: "linear" },
            ],
            width: [{ value: endSquareSize, duration: 250, delay: 250, easing: "linear" }],
            height: [{ value: endSquareSize, duration: 250, delay: 250, easing: "linear" }],
            left: [{ value: calcNewCenter(endSquareSize).x + "px", duration: 250, delay: 250, easing: "linear" }],
            complete: () => {
                const squareElShadow = squareEl.cloneNode(true);
                squareElShadow.style.zIndex = "1";
                console.log(squareElShadow)
                self.shadowRootAccessor.appendChild(squareElShadow);
                anime({
                    targets: squareElShadow,
                    translateX: [{ value: -80, duration: 250, easing: "linear" }],
                    translateY: [{ value: -80, duration: 250, easing: "linear" }],
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
