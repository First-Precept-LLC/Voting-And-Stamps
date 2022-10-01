export const getUserId = () => {
    const localUser = localStorage.getItem("user")
    const userInfo = localUser ? JSON.parse(localUser) : {}
    return userInfo._id;
}