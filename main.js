let lattice = []
const numberOfRows = 10;
const numberOfCols = 10;
let gridSpacing = 20;
let pixelSize = 20; 

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
            lattice[x][y] = new Magnet({x: x, y: y, neighbors: [], state: Math.floor(Math.random() * 2)});
        }
    }
}

function draw() 
{
    background(105);
    frameRate(3);

    lattice.forEach(column => {
        column.forEach(magnet => 
            {
                magnet.display()
            })
    })

    calc()
}

function calc()
{
    for (let x = 1; x < numberOfCols - 2; x++) 
    {
        for (let y = 1; y < numberOfRows - 2; y++) 
        {
            let down = 0;
            let up = 0;

            if (lattice[x + 1][y].state) 
            {
                up++;
            }
            else
            {
                down++;
            }

            if (lattice[x - 1][y].state) 
            {
                up++;
            }
            else
            {
                down++;
            }

            if (lattice[x][y - 1].state) 
            {
                up++;
            }
            else
            {
                down++;
            }

            if (lattice[x + 1][y - 1].state) 
            {
                up++;
            }
            else
            {
                down++;
            }

            if (lattice[x - 1][y - 1].state) 
            {
                up++;
            }
            else
            {
                down++;
            }

            if (lattice[x][y + 1].state) 
            {
                up++;
            }
            else
            {
                down++;
            }

            if (lattice[x + 1][y + 1].state) 
            {
                up++;
            }
            else
            {
                down++;
            }

            if (lattice[x - 1][y + 1].state) 
            {
                up++;
            }
            else
            {
                down++;
            }

            
            
            // if (up > down) 
            // {
                let flipUpProbability = Math.round((Math.abs(up - 3) * Math.random()));

                if (flipUpProbability) 
                {
                    lattice[x][y].nextState = 0;
                }
            // ][y].nextState = 1;

                let flipDownProbability = Math.round((Math.abs(down - 3) * Math.random()));


                if (flipDownProbability) 
                {
                    lattice[x][y].nextState = 1;
                }
            // }
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
        this.state = this.nextState;
        noFill()
        stroke(0)
        // rect((this.x * gridSpacing) + 50, (this.y * gridSpacing) + 50, gridSpacing, gridSpacing)

        noStroke()
        if (this.state) 
        {
            fill(0)
        }
        else
        {
            fill(255)
        }
        rect((this.x * pixelSize) + 50 - (pixelSize / 2), (this.y * pixelSize) + 50 - (pixelSize / 2), pixelSize, pixelSize)
    }
}