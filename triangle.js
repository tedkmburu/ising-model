let lattice = [];
const numberOfRows = 25;
const numberOfCols = 50;
let gridSpacing = 20;
let pixelSize = 20; 

let field = 0;
let temp = 0;

let looping = true;

function setup()
{
    createCanvas(innerWidth, innerHeight);

    pixelSize = (height) / numberOfRows;
    gridSpacing = pixelSize;

    for (let x = 0; x < numberOfCols; x++) 
    {
        lattice[x] = []
        for (let y = 0; y < numberOfRows; y++) 
        {
            let neighbors = [];
            neighbors = [{x: x - 1, y: y}, {x: x + 1, y: y}, {x: x, y: y + 1}];
            neighbors = [{x: x - 1, y: y}, {x: x + 1, y: y}, {x: x, y: y - 1}];

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
                if (x != 0 && y != 0 && x != numberOfCols - 1 && y != numberOfRows - 1)
                // if (true)
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
    // frameRate(3);

    // lattice.forEach((column, x) => {
    //     column.forEach((magnet, y) => 
    //         {
    //             //if (x != 0 && y != 0)
    //             if (true)
    //             {
    //                 magnet.display()
    //             }
                
    //         })
    // })

    for (let i = 0; i < (numberOfRows * numberOfCols) / 100; i++) 
    {
        calc()
    }
}

function calc()
{
    // for (let x = 1; x < numberOfCols - 2; x++) 
    // {
    //     for (let y = 1; y < numberOfRows - 2; y++) 
    //     {
    //         let down = 0;
    //         let up = 0;

    //         if (lattice[x + 1][y].state) 
    //         {
    //             up++;
    //         }
    //         else
    //         {
    //             down++;
    //         }

    //         if (lattice[x - 1][y].state) 
    //         {
    //             up++;
    //         }
    //         else
    //         {
    //             down++;
    //         }

    //         if (lattice[x][y - 1].state) 
    //         {
    //             up++;
    //         }
    //         else
    //         {
    //             down++;
    //         }

    //         if (lattice[x + 1][y - 1].state) 
    //         {
    //             up++;
    //         }
    //         else
    //         {
    //             down++;
    //         }

    //         if (lattice[x - 1][y - 1].state) 
    //         {
    //             up++;
    //         }
    //         else
    //         {
    //             down++;
    //         }

    //         if (lattice[x][y + 1].state) 
    //         {
    //             up++;
    //         }
    //         else
    //         {
    //             down++;
    //         }

    //         if (lattice[x + 1][y + 1].state) 
    //         {
    //             up++;
    //         }
    //         else
    //         {
    //             down++;
    //         }

    //         if (lattice[x - 1][y + 1].state) 
    //         {
    //             up++;
    //         }
    //         else
    //         {
    //             down++;
    //         }

            
            
    //         // if (up > down) 
    //         // {
    //             let flipUpProbability = Math.round((Math.abs(up - 3) * Math.random()));

    //             if (flipUpProbability) 
    //             {
    //                 lattice[x][y].nextState = 0;
    //             }
    //         // ][y].nextState = 1;

    //             let flipDownProbability = Math.round((Math.abs(down - 3) * Math.random()));


    //             if (flipDownProbability) 
    //             {
    //                 lattice[x][y].nextState = 1;
    //             }
    //         // }
    //     }
    // }

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
        push()
        // this.state = this.nextState;
        noFill()
        stroke(0)
        // rect((this.x * gridSpacing) + 50, (this.y * gridSpacing) + 50, gridSpacing, gridSpacing)

        noStroke()
        if (this.state == 1) fill(0) 
        else if(this.state == -1) fill(255)
        else fill("red")

        if (this.y % 2 == 0) 
        {
            translate(pixelSize / 2, 0)
        }
        if (this.x % 2 == 0) 
        {
            translate((this.x * (pixelSize / 2)) - (pixelSize / 2), (this.y * (pixelSize * Math.sqrt(3))/2))
            triangle(0, 0, pixelSize, 0, pixelSize/2, (pixelSize * Math.sqrt(3))/2);    
        }
        else
        {
            translate((this.x * (pixelSize / 2)), (this.y * (pixelSize * Math.sqrt(3))/2))
            rotate(Math.PI / 3)
            triangle(0, 0, pixelSize, 0, pixelSize/2, (pixelSize * Math.sqrt(3))/2);    
            rotate( -Math.PI / 3)
        }
        
        // textAlign(CENTER, CENTER)
        // fill("red")
        // text("(" + this.x + ", " + this.y + ")", 0, 40)
        pop()
    }

    hover()
    {

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