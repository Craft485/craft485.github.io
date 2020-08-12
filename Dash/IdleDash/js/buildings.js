class Building {
    /**
     * 
     * @param {String} name 
     * @param {String} desc 
     * @param {Number[]} cost 
     * @param {Building} previous 
     * @param {Number} previousAmount
     * @param {Number[]} perSecond 
     */
    constructor(name, desc, cost, previous, previousAmount, perSecond) {
        this.name = name
        this.desc = desc
        this.description = desc
        this.cost = {dp: cost[0], rp: cost[1]}
        this.previous = previous
        this.previousAmount = previousAmount
        this.perSecond = {dp: perSecond[0], rp: perSecond[1]}
        this.owned = 0,
        this.shown = false
        // Don't ask
        this.buy = () => {
            // console.log(this)
            if (Game._DashPoints < this.cost.dp || Game._RepPoints < this.cost.rp) return
            
            this.owned++
            this.cost.dp = Math.ceil((Math.pow(this.owned, 2) / 4) + 25)
            
            Game._DashPoints -= this.cost.dp
            document.getElementById("dp").innerText = new Intl.NumberFormat().format(Math.floor(Game._DashPoints))
            document.getElementById(`${this.name}DPCost`).innerText = this.cost.dp

            Game._DPPerSecond = JSON.parse(Math.abs(JSON.parse(Game._DPPerSecond) + this.perSecond.dp).toFixed(1))
                        
            document.getElementById("dpps").innerText = Game._DPPerSecond

            if (this.cost.rp > 0) {
                /**@todo add formula for rp cost scale */
                this.cost.rp = Math.ceil((Math.pow(this.owned, 3) / 8) + 1)
                Game._RepPoints -= this.cost.rp
                document.getElementById(`${this.name}RPCost`).innerText = this.cost.rp
            }
            // Update tooltip data, using this method allows us to update it live without the user having to "rehover" the element
            $(`div#${this.name}Disp`).tooltip('hide')
                .attr('data-original-title', `Dash Points Per Second: ${this.perSecond.dp}\n${(this.perSecond.rp > 0 ? `Rep Points Per Second: ${this.perSecond.rp}` : "\n")}Owned: ${this.owned}\n<br><small>${this.desc}</small>`)
                .tooltip('show')
        }
        this.earn = function () {
            this.shown = true
            const parent = document.getElementById("build-disp")
            // Create container
            const container = document.createElement("div")
            container.id = `${this.name}Disp`
            container.className = "build"
            container.style = "padding-top: 15px; padding-bottom: 15px;"
            
            if (!this.shown) container.className += "locked"
            
            // Populate said container
            const text = document.createElement("p")
            
            text.innerHTML = `
            <span style="text-align: center;">${this.name}</span><br>
            <button class="build-buy" id="${this.name}Buy">
            Cost:<br/>Dash Points: <span id="${this.name}DPCost">${this.cost.dp}</span> <br/> `
            
            if (this.cost.rp > 0) text.innerHTML += `<span ${(Game.repPoints > 0 ? "" : 'class = "locked"')}>Rep Points: 
            <span id="${this.name}RPCost">${this.cost.rp}</span></span>`
            else text.innerHTML += `<span>\u200b</span></span>`
            text.innerHTML += `</button>`
            container.appendChild(text)
            // Append to parent
            parent.appendChild(container)
            document.getElementById(`${this.name}Buy`).onclick = this.buy
            // Tooltip things
            container.setAttribute('data-toggle', 'tooltip')
            container.setAttribute('data-placement', 'left')
            container.setAttribute('title', `Dash Points Per Second: ${this.perSecond.dp}\n${(this.perSecond.rp > 0 ? `Rep Points Per Second: ${this.perSecond.rp}\n` : "\n")}Owned: ${this.owned}\n<br><small>${this.desc}</small>`)
            $('[data-toggle="tooltip"]').tooltip({trigger: 'hover', html: true})
        }
        this.show = this.earn
    }
    buy () {this.buy()}
}

const rulebook = new Building("Rulebook", "The lay of the land, a set of rules to follow during your stay in Dash Net", [25, 0], null, 0, [0.1, 0])
const selfroles = new Building("Self Roles", "Which shall you choose? The Pillow, or the Chip of Life, or, maybe, Art Fan?", [50, 0], rulebook, 10, [3, 0])

let list = [rulebook, selfroles]
// Game.buildings = list