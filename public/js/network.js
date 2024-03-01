async function get(url){
    return new Promise((resolve, reject) => {
        fetch(url).then(response => {
            if(response.status !== 200) throw response.statusText
            response.json()
        }).then(data => resolve(data))
                    .catch(err => reject(err));
    });
}

async function post(url, data=(new FormData())){
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            body: (new URLSearchParams(data)).toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(response => {
            if(response.status !== 200) throw response.statusText
            response.json()
        })
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
}