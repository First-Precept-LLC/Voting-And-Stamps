export const getUserId = () => {
    const localUser = typeof window === "undefined" ? null : window?.localStorage?.getItem("user")
    const userInfo = localUser ? JSON.parse(localUser) : {}
    return userInfo._id;
}