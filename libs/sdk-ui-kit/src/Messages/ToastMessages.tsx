// (C) 2021 GoodData Corporation
import React, { useContext } from "react";
import { ToastMessageContext } from "./ToastMessageContext";
import { Messages } from "./Messages";

/**
 * @internal
 */
export const ToastMessages: React.FC = () => {
    const { messages, removeMessage } = useContext(ToastMessageContext);

    if (messages.length > 0) {
        return <Messages messages={messages} onMessageClose={removeMessage} />;
    }
    return null;
};
