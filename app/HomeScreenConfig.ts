import { StringRes } from "@/src/i18n/strings";
const R = StringRes.homescreen;

export const HomeScreenConfig = {
    buyCoffeeColor: "#8D8A8A",
    scanBagColor: "#010101",
    isClickable: true,
    buttonLabelsConfig: {
        findYourTaste: {
            label: R.findYourTaste,
            fontSize: 32,
            fontFamily: "InterBold",
            fill: "#010101",
        },
        scanBag: {
            label: R.scanBag,
            fontSize: 32,
            fontFamily: "InterBold",
            fill: "#FFFFFF",
        },
        marketplace: {
            label: R.marketplace,
            fontSize: 32,
            fontFamily: "InterBold",
            fill: "#010101",
        },
        diagnoseBrew: {
            label: R.diagnoseBrew,
            fontSize: 32,
            fontFamily: "InterBold",
            fill: "#FFFFFF",
        },
        recipeAgenda: {
            label: R.recipeAgenda,
            fontSize: 32,
            fontFamily: "InterBold",
            fill: "#FFFFFF",
        },
        coffeePlacesNearby: {
            label: R.coffeePlacesNearby,
            fontSize: 32,
            fontFamily: "InterBold",
            fill: "#010101",
        },
    }
}
