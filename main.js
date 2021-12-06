// let lattice = [];
// const numberOfRows = 10;
// const numberOfCols = 10;
// let gridSize = 10;
// let gridSpacing = 20;
// let pixelSize = 20; 

// let field = 10000;

// function setup()
// {
//     createCanvas(innerWidth, innerHeight);

//     pixelSize = (height - 200) / numberOfRows;
//     gridSpacing = pixelSize;

//     for (let x = 0; x < numberOfCols; x++) 
//     {
//         lattice[x] = []
//         for (let y = 0; y < numberOfRows; y++) 
//         {
//             let neighbors = [{x: x - 1, y: y - 1}, {x: x - 1, y: y}, {x: x - 1, y: y + 1}, {x: x, y: y - 1}, {x: x, y: y + 1}, {x: x + 1, y: y - 1}, {x: x + 1, y: y}, {x: x + 1, y: y + 1}  ]

//             let state = (Math.round(Math.random()) >= 1) ? 1 : -1;
//             lattice[x][y] = new Magnet({x: x, y: y, neighbors: neighbors, state: state});
//         }
//     }
// }

// function draw() 
// {
//     background(105);
//     frameRate(60);

//     lattice.forEach((column, x) => {
//         column.forEach((magnet, y) => 
//             {
//                 //if (x != 0 && y != 0)
//                 if (true)
//                 {
//                     magnet.display()
//                 }
//             })
//     })

//     calc()
// }

// function calc()
// {
//     let x = Math.floor(Math.random() * gridSize);
//     let y = Math.floor(Math.random() * gridSize);
//     let ind = x + y * gridSize;
//     let changeInEnergy = -2 * (bond_energy((x,y,gN,gboard) + field_energy((x,y,gN,gboard))));
//     if (changeInEnergy <= 0 || Math.random() < Math.exp(-changeInEnergy / gT))
//     {
//         gboard[ind] = -gboard[ind];

//         if (!onefill)
//             put_pixel(x, y, gpx_size, gboard[gN*gN] * gboard[x+y*gN]);

//         genergy += 1.0*changeInEnergy/(gN*gN);
//         gmag += 2.0*gboard[ind] * gboard[gN*gN]/(gN*gN);
//     }
//     gt += 1.0/(gN*gN);

// }

// class Magnet
// {
//     constructor(props)
//     {
//         this.x = props.x;
//         this.y = props.y;
//         this.neighbors = props.neighbors;
//         this.state = props.state; 
//         this.nextState = props.state; 
//     }

//     display()
//     {
//         //this.state = this.nextState;
//         noFill()
//         stroke(0)
//         // rect((this.x * gridSpacing) + 50, (this.y * gridSpacing) + 50, gridSpacing, gridSpacing)

//         noStroke()
//         if (this.state == 1) 
//         {
//             fill(0)
//         }
//         else if(this.state == -1)
//         {
//             fill(255)
//         }
//         else
//         {
//             fill("red")
//         }
//         rect((this.x * pixelSize) + 50 - (pixelSize / 2), (this.y * pixelSize) + 50 - (pixelSize / 2), pixelSize, pixelSize)
//     }
// }




























let lattice = [];
const numberOfRows = 100;
const numberOfCols = 100;
let gridSpacing = 20;
let pixelSize = 20; 

let field = 0;
let temp = 0;

let looping = true;

function setup()
{
    createCanvas(innerWidth, innerHeight);

    pixelSize = (height - 200) / numberOfRows;
    gridSpacing = pixelSize;

    for (let x = 0; x < numberOfCols; x++) 
    {
        lattice[x] = []
        for (let y = 0; y < numberOfRows; y++) 
        {
            let neighbors = [{x: x - 1, y: y - 1}, {x: x - 1, y: y}, {x: x - 1, y: y + 1}, {x: x, y: y - 1}, {x: x, y: y + 1}, {x: x + 1, y: y - 1}, {x: x + 1, y: y}, {x: x + 1, y: y + 1}  ]

            let state = (Math.round(Math.random()) >= 1) ? 1 : -1;
            if (x == 0 || y == 0 || x == numberOfCols - 1 || y == numberOfRows - 1) 
            {
                state = 0;    
            }
            lattice[x][y] = new Magnet({x: x, y: y, neighbors: neighbors, state: state});
        }
    }

    lattice.forEach((column, x) => {
        column.forEach((magnet, y) => 
            {
                //if (x != 0 && y != 0)
                if (true)
                {
                    magnet.display()
                }
            })
    })

    document.getElementById("temp").value = temp;
    document.getElementById("field").value = field;
}

function draw() 
{
    // background(105);
    frameRate(100);

    for (let i = 0; i < (numberOfRows * numberOfCols) / 50; i++) 
    {
        calc()
    }
    
}

function calc()
{
    let randX = Math.floor(Math.random() * (numberOfCols - 2)) + 1; 
    let randY = Math.floor(Math.random() * (numberOfRows - 2)) + 1; 

    // console.log("(", randX, ", ", randY, ")");
    let baseCharge = 0;

    lattice.forEach(row => {
        row.forEach(square => { 
            baseCharge += square.state;
        })
    })

    let newBaseCharge = 0;
    let newLattice = [...lattice]

    newLattice[randX][randY].state = (newLattice[randX][randY].state == 1) ? -1 : 1;

    newLattice.forEach(row => {
        row.forEach(square => { 
            newBaseCharge += square.state;
        })
    })

    
    if (Math.abs(newBaseCharge) < Math.abs(baseCharge))
    
    // if (newBaseCharge - baseCharge <= field)
    {
        // fill("rgba(255,0,0,0.5)")
        // rect((randX * pixelSize) + 50 - (pixelSize / 2), (randY * pixelSize) + 50 - (pixelSize / 2), pixelSize, pixelSize)

        lattice[randX][randY].state = (lattice[randX][randY].state == 1) ? -1 : 1;
        lattice[randX][randY].display()
        
        // console.log("flip");
    }
    else
    {
        randX = Math.floor(Math.random() * (numberOfCols - 2)) + 1; 
        randY = Math.floor(Math.random() * (numberOfRows - 2)) + 1; 

        let baseCharge = 0;
        lattice[randX][randY].neighbors.forEach(neighbor => {
            baseCharge += lattice[neighbor.x][neighbor.y].state;
        })

        let flip = Math.floor(Math.random() > 0.5) ;
        let boltzmann = flip < Math.pow(Math.E,(- (Math.abs(baseCharge) - Math.abs(newBaseCharge))  / temp));
        // console.log(boltzmann);
        if (baseCharge > 0 && boltzmann) 
        {
            lattice[randX][randY].state = -1;
            lattice[randX][randY].display()
        }
        else if (boltzmann)
        {
            lattice[randX][randY].state = 1;
            lattice[randX][randY].display()
        }
    }
}

class Magnet
{
    constructor(props)
    {
        this.x = props.x;
        this.y = props.y;
        this.neighbors = props.neighbors;
        this.state = props.state; 
        this.nextState = props.state; 
    }

    display()
    {
        noFill()
        stroke(0)
        
        noStroke()
        if (this.state == 1) fill(0) 
        else if(this.state == -1) fill(255)
        else fill("red")
        rect((this.x * pixelSize) + 50 - (pixelSize / 2), (this.y * pixelSize) + 50 - (pixelSize / 2), pixelSize, pixelSize)
    }
}


function menuInput()
{
    temp = parseFloat(document.getElementById("temp").value);
    field = parseFloat(document.getElementById("field").value);

}


function togglePlay()
{
    if (looping) 
    {
        loop();
    } 
    else 
    {
        noLoop();
    }
}