
// TypeScript definitions for Gmail webhook notifications
interface BaseNotification {
  message_id: string;
  event_type: string;
  timestamp: number;
  metadata: {
    sender: string;
    recipient: string;
  };
}

interface MessageDelivered extends BaseNotification {
  event_type: "message_delivered";
  delivery_status: {
    status: string;
    reason: string;
  };
}

interface MessageRead extends BaseNotification {
  event_type: "message_read";
  read_time: number;
}

interface MessageMarkedAsSpam extends BaseNotification {
  event_type: "message_marked_as_spam";
}

interface MessageMoved extends BaseNotification {
  event_type: "message_moved";
  new_label: string;
  old_label: string;
}

interface MessageDeleted extends BaseNotification {
  event_type: "message_deleted";
}

type Notification = MessageDelivered | MessageRead | MessageMarkedAsSpam | MessageMoved | MessageDeleted;
