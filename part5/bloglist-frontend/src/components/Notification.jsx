const Notification = ({message}) => {
    if (message === null) {
        return null
    }

    return <p class="notification">{message}</p>
}

export default Notification
