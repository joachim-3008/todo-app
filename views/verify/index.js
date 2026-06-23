// const textInfo = document.getElementById("text-info");


// (async()=>{
//     try {
//         const token = window.location.pathname.split('/')[3];
//         const id = window.location.pathname.split('/')[2];
//         console.log(await axios.patch(`/api/users/${id}/${token}`));
//         window.location.pathname = "/login";
//     } catch (error) {
//         textInfo.textContent = error.response.data.error;
//     }
// })();