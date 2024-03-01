const form = document.querySelector("form");

form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const data = new FormData(form)
    try{
        await post("/api/user/login", data)
        window.location.href = "/pixel"
    }catch(err){
        window.location.href = "/login"
    }

})