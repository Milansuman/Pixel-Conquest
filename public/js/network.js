async function get(url){
    return await (await fetch(url)).json()
}

async function post(url, data=(new FormData())){
    return await (await fetch(url, {
        method: "POST",
        body: (new URLSearchParams(data)).toString(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })).json()
}