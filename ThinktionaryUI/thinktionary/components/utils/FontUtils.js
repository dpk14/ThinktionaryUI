import * as Font from "expo-font";
export const HP_SIMPLIFIED = "hp-simplified";
export const HP_SIMPLIFIED_BOLD = "hp-simplified-bold";

export default class FontUtils {
    static async loadFonts() {
        await Font.loadAsync({
            'hp-simplified-bold': require('../../assets/fonts/hp-simplified-bold.ttf'),
            'hp-simplified': require('../../assets/fonts/hp-simplified.ttf'),
        });
    }
}
