let Game = {
    points: 0,
    perClick: 1
}



function pointless() {
    Game.points += Game.perClick
}

function load() {
    const saveGame = window.localStorage.getItem('pointless')

    if (saveGame) Game = JSON.parse(atob(saveGame))

    
}

window.addEventListener("load", () => {
    document.getElementById('pointless').onclick = pointless
    load()
    window.setInterval(() => {
        window.localStorage.setItem('pointless', btoa(JSON.stringify(Game)))
    }, 60000)
})