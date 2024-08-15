const styles = {
  ".resizer": {
    position: "absolute",
    opacity: 0,
    top: "0",
    right: "0",
    height: "100%",
    width: "5px",
    backgroundColor: "#27bbff",
    cursor: "col-resize",
    userSelect: "none",
    touchAction: "none",
    borderRadius: "6px",
  },
  ".resizer.isResizing": {
    backgroundColor: "#2eff31",
    opacity: 1,
  },
  "*:hover > .resizer": {
    opacity: 1,
  },
};

export default styles;
