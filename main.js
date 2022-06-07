async function getBunnies() {
    const res = await fetch(`/wholeBunnies`)
    const data = await res.json()
    
    if(data.error){
        alert(data.error)
    }
    else {
        data.forEach(bunny => {
            let entry = `<div class=bunnyCont>
            <p>${bunny.ears}</p>
            <p>${bunny.eyes}</p>
            <p>${bunny.body}</p>
            </div>`
    
            console.log(entry)
            let bunnyDiv = document.createElement("div")
            bunnyDiv.classList.add("eachBunnyCont")
            bunnyDiv.innerHTML = entry;
            document.querySelector(".bunnyArmyGrouping").appendChild(bunnyDiv)
        })
    }
    
}



