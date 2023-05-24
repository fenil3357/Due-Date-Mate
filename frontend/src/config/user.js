const token = localStorage.getItem("accessToken");
const faculty = JSON.parse(localStorage.getItem("faculty"));
module.exports={
    token,
    faculty
}