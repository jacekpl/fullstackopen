import {useNotificationValue} from "../NotificationContext.jsx";

const Notification = () => {
    const message = useNotificationValue()
    if (message === null || message === '') {
        return null;
    }

    return <p className="notification">{message}</p>;
};

export default Notification;
