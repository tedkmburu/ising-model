let lattice = []
let numberOfRows = 40;
let numberOfCols = 80;
function setup()
{
    createCanvas(innerWidth, innerHeight);

    for (let x = 0; x < numberOfCols; x++) 
    {
        lattice[x] = []
        for (let y = 0; y < numberOfRows; y++) 
        {
            lattice[x][y] = new Magnet({x: x, y: y, neighbors: [], direction: Math.floor(Math.random() * 2)});
        }
    }
}

function draw() 
{
    background(105);
    frameRate(1);

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

            if (lattice[x + 1][y].direction) 
            {
                up++;
            }
            else
            {
                down++;
            }

            if (lattice[x - 1][y].direction) 
            {
                up++;
            }
            else
            {
                down++;
            }

            if (lattice[x][y - 1].direction) 
            {
                up++;
            }
            else
            {
                down++;
            }

            if (lattice[x + 1][y - 1].direction) 
            {
                up++;
            }
            else
            {
                down++;
            }

            if (lattice[x - 1][y - 1].direction) 
            {
                up++;
            }
            else
            {
                down++;
            }

            if (lattice[x][y + 1].direction) 
            {
                up++;
            }
            else
            {
                down++;
            }

            if (lattice[x + 1][y + 1].direction) 
            {
                up++;
            }
            else
            {
                down++;
            }

            if (lattice[x - 1][y + 1].direction) 
            {
                up++;
            }
            else
            {
                down++;
            }

            if (up > down) 
            {
                lattice[x][y].direction = 0;
            }
            else if (up < down)
            {
                lattice[x][y].direction = 1;
            }
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
        this.direction = props.direction; 
    }

    display()
    {
        noFill()
        rect((this.x * 20) + 50, (this.y * 20) + 50, 20, 20)

        if (this.direction) 
        {
            fill(0)
        }
        else
        {
            fill(255)
        }
        rect((this.x * 20) + 45, (this.y * 20) + 45, 10, 10)
    }
}