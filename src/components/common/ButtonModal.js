import {Button, Modal} from "antd";
import React, {forwardRef, useImperativeHandle, useState} from "react";

const ButtonModal = forwardRef(({children, title, buttonChildren, buttonType, buttonSize}, ref) => {

    const [isShow, setIsShow] = useState(false);

    const showModal = () => {
        setIsShow(true);
    }

    const onClose = () => {
        setIsShow(false);
    }

    useImperativeHandle(ref, () => ({

        onClose() {
            setIsShow(false);
        }

    }));

    return (
        <>
            <Button type={buttonType} size={buttonSize} onClick={showModal}>{buttonChildren}</Button>
            <Modal centered title={title} visible={isShow} footer={null} onCancel={onClose}>
                {children}
            </Modal>
        </>
    )

});

export default ButtonModal;