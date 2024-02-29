async function get(url){
    return new Promise((resolve, reject) => {
        fetch(url).then(response => response.json())
                    .then(data => resolve(data))
                    .catch(err => reject(err));
    });
}

async function post(url, data=(new FormData())){
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            body: data
        }).then(response => response.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
}