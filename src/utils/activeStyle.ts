export const activeStyle = {
    color: "#205d2e",
    fontWeight: "600",
    // textDecoration: "underline",
    // textUnderlineThickness: "3px",
    display: "inline-block",
    position: "relative" as "relative",
    "&::after": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "2px",
        bottom: 0,
        left: 0,
        backgroundColor: "#4D7E3E",

    }
}