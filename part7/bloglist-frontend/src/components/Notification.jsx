import {useNotificationValue} from "../NotificationContext.jsx";

const Notification = () => {
    const message = useNotificationValue()
    if (message === null || message === '') {
        return null;
    }

    return (
        <div className="notification bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 my-1" role="alert">
            <p className="font-bold">Message</p>
            <p>{message}</p>
        </div>
    )
};

export default Notification;
