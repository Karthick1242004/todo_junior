import { showNotification } from "../utils/notification";

const MyComponent = () => {
  const triggerNotification = () => {
    showNotification("Notification Title", "Notification message body");
  };

  return (
    <div>
      <button onClick={triggerNotification}>Show Notification</button>
    </div>
  );
};

export default MyComponent;
