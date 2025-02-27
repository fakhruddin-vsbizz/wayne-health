import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export function CustomModal({
    open,
    setOpen,
    heading,
    children,
    handleOkay,
    style,
    noBtns,
    size,
    longScroll,
}) {
    const handleOpen = () => setOpen(!open);

    return (
        <>
            {/* <Button onClick={handleOpen} variant="gradient">
                Open Modal
            </Button> */}
            <Dialog
                style={style ? { ...style } : {}}
                size={size || "md"}
                open={open}
                handler={handleOpen}
            >
                <DialogHeader>{heading || "Its a simple modal."}</DialogHeader>
                <DialogBody
                    className={longScroll ? "h-[30rem] overflow-scroll" : ""}
                >
                    {children}
                </DialogBody>
                <DialogFooter>
                    {noBtns ? null : (
                        <>
                            <Button
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button
                                variant="gradient"
                                color="green"
                                onClick={handleOkay}
                            >
                                <span>Confirm</span>
                            </Button>
                        </>
                    )}
                </DialogFooter>
            </Dialog>
        </>
    );
}
