function puppyInfo(dog){
    let span = document.createElement('span')
    let image = document.createElement('img')
    let title = document.createElement('h2')
    let btn = document.createElement('button')
    span.textContent = dog.name
    image.src = dog.image
    title.textContent = dog.name
    dogBehavior(btn, dog)
    btn.addEventListener('click', event => {
        if(event.path[0].innerText === 'Good Dog!'){
            dog.isGoodDog = false
        }else if(event.path[0].innerText === 'Bad Dog!'){
            dog.isGoodDog = true
        }
        dogBehavior(btn, dog)
        patchPups(dog)
    })
       
    span.addEventListener('click',event =>{
        let info = document.querySelector('#dog-info')
        if(event.outerText != span.outerText){
            document.querySelector('#dog-info').replaceChildren(image, title, btn)
        }else{
            document.querySelector('#dog-info').append(image, title, btn)
        }
    })
    document.querySelector('#dog-bar').appendChild(span)
    
}
function dogBehavior(action, file){
    if(file.isGoodDog === true){
        action.textContent = 'Good Dog!'
    }else{
        action.textContent = 'Bad Dog!'
    }
}

function renderPups(){
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(json => json.map(puppyInfo))
}
renderPups()
function patchPups(dog){
    fetch(`http://localhost:3000/pups/${dog.id}`,{
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dog)
    })
    .then(res => res.json())
    .then(pupId => console.log(pupId))
}