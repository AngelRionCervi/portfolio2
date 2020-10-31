//@ts-ignore
import { createComp, store, addGlobalCSS } from "vengarl";
import "./components/background";
import "./components/square";


createComp("app-root", ({ html }: any) => {
    
    return () => html`<app-background></app-background><app-square></app-square>`;
});
