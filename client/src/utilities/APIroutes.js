//path to all the routes

export const host = "http://localhost:3000";    //server listening on this port
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allUsers`;
export const sendMessageRoute = `${host}/api/messages/sendMsg`;
export const getAllMessagesRoute = `${host}/api/messages/getAllMsg`;