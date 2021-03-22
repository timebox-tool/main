import { colors, makeStyles } from "@material-ui/core";
import { failColor, succColor } from "theme";

type StyleConf = {
    isTimeout: boolean
}
export const useTimeBoxPageStyles = makeStyles({
    container: {
        padding: "20px",
        marginTop: "50px",
        border: "1px solid",
        borderColor: colors.grey[300],
        borderRadius: "10px",
        minHeight: "60vh",
    },
})

export const useTimeBoxItemStyles = makeStyles({
    clockIcon: {
        backgroundColor: (p: StyleConf) => (p.isTimeout ? failColor : succColor),
    },
})
