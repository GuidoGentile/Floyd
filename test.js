const nodes = {}
const links = []
var n = -1

function addLink(){

    const tail = document.getElementById('tail').value
    const head = document.getElementById('head').value
    const cost = parseFloat(document.getElementById('cost').value)

    if(isNaN(cost)){
        alert(document.getElementById('cost').value + " is not a number!")
        return
    }

    if(!(tail in nodes)){
        n++
        nodes[tail] = n
    }

    if(!(head in nodes)){
        n++
        nodes[head] = n
    }

    links.push({'tail' : nodes[tail], 'head' : nodes[head], 'cost' : cost})

    computeFloyd()
    
}

function computeFloyd(){

    const wkij = []
    for(let k=0; k<=n; k++){
        wkij[k] = []
        for(let i=0; i<=n; i++){
            wkij[k][i] = []
            for(let j=0; j<=n; j++){
                wkij[k][i][j] = Infinity
            }
        }
    }

    links.forEach(a => {if(wkij[0][a.tail][a.head] > a.cost) wkij[0][a.tail][a.head] = a.cost})
    for(let i=0; i<=n; i++) wkij[0][i][i] = 0
    
    for(let k=1; k<=n; k++){
        for(let i=0; i<=n; i++){  
            for(let j=0; j<=n; j++){
                wkij[k][i][j] = wkij[k-1][i][j]
                if(wkij[k][i][j] > wkij[k-1][i][k] + wkij[k-1][k][j]) wkij[k][i][j] = wkij[k-1][i][k] + wkij[k-1][k][j]
            }
        }
    }

    const nodeIDs = Object.keys(nodes)

    printTable('links', links.map(a => [nodeIDs[a.tail], nodeIDs[a.head], a.cost]), ['tail', 'head', 'cost'], false)

    printTable('costs', wkij[n], nodeIDs, true)

}

function printTable(tableID, data, head, isMatrix) {
 
    let table = document.getElementById(tableID)
    table.innerHTML = ""

    let thead = table.createTHead()
    let row = thead.insertRow()
    if(isMatrix) {
        let cell = row.insertCell()
        cell.appendChild(document.createTextNode(''))   
    }
    for (let key of head){
        let cell = row.insertCell()
        cell.appendChild(document.createTextNode(key))
        cell.style.fontWeight = "bold"
    }

    for (let i in data){
        let row = table.insertRow()
        if(isMatrix) {
            let cell = row.insertCell()
            cell.appendChild(document.createTextNode(head[i]))
            cell.style.fontWeight = "bold"    
        }
        for (dataCell of data[i]){
            let cell = row.insertCell()
            cell.appendChild(document.createTextNode(dataCell))
        }
    }
}
