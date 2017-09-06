import {MenuButtons, NavButtons} from "./interfaces"

export const leftMenuBtns: MenuButtons = [{ name: "Проекты" }, { name: "Связи" }];

export const rNavBtns: NavButtons = [
    {
        icon: "create",
        action: () => console.log("Created...")
    },
    {
        icon: "connect",
        action: () => console.log("Connect...")
    },
    {
        icon: "disconnect",
        action: () => console.log("Disconect...")
    },
    {
        icon: "create",
        action: () => console.log("Created...")
    },
    {
        icon: "connect",
        action: () => console.log("Connect...")
    }
];