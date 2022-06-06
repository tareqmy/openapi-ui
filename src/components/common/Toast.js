import {notification} from "antd";

export const Toast = (type, title, desc) => {

    if (typeof title !== 'string') {
        desc = "Error title must be a string."
    }

    if (typeof desc !== 'string') {
        desc = "Error description must be a string."
    }

    notification[type]({
        message: title,
        description: desc,
    });
};
