let size = 10 // Width of square lattice
let T = 2.5 // Temperature in units of ⇧/k
initialize

for (let i = 0; i < Math.pow(size, 2) * 100; i++)  // Main iteration loop
{
    let i = int(rand*size+1) // Choose a random row number
    let j = int(rand*size+1) // and a random column number\

    deltaU(i,j,Ediff) // Compute ⇥U of hypothetical flip
    if (Ediff <= 0) // If flipping reduces the energy . . .
    {
        s(i,j) = -s(i,j) // then flip it!
    }
    else
    if (rand < exp(-Ediff/T)) // then otherwise the Boltzmann factor
    {
        s(i,j) = -s(i,j) // gives the probability of flipping
    }
        
}






funciton deltaU(i,j,Ediff) // Compute ⇥U of flipping a dipole
// (note periodic boundary conditions)
if i = 1 
{
    top = s(size,j)
} 
else 
{
    top = s(i-1,j)
} 
if i = size 
{
    bottom = s(1,j)
} 
else 
{
    bottom = s(i+1,j)
}
if j = 1 then left = s(i,size) else left = s(i,j-1)
if j = size then right = s(i,1) else right = s(i,j+1)

Ediff = 2*s(i,j)*(top+bottom+left+right)
end subroutine
subroutine initialize // Initialize to a random array
for i = 1 to size
for j = 1 to size
if rand < .5 then s(i,j) = 1 else s(i,j) = -1
colorsquare(i,j)
next j
next i
end subroutine
subroutine colorsquare(i,j)