export type MessageType = "text"|"audio"|"video";
export type MessageStatus = "draft"|"scheduled"|"delivered";
export interface Message{ id:string; type:MessageType; status:MessageStatus; title:string; createdAt:string; }
