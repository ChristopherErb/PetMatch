//token expiration stuff
//let myApiKey = PTmmWmvcU1eY9pAoleqbM57DyZuzYvKtVAbEUXVxFzxpLpTbkz
//let mySecretKey = XwHgkStKwEQ56VBCOP0rZb03KYntKbslZLv8tKqE
 let token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJQVG1tV212Y1UxZVk5cEFvbGVxYk01N0R5WnV6WXZLdFZBYkVVWFZ4Rnp4cExwVGJreiIsImp0aSI6IjVkMGQ3OWM0NzQ3M2I3ZDNmZTMyOWQ1ODEwY2U5MzhmYmRlMDJiZDY4NzFiZTBhODg5OTEwZTA4ODA5NzhiMmY0ZGI4NWFiYzVhMDc5YTA5IiwiaWF0IjoxNjg0NzYxNzEwLCJuYmYiOjE2ODQ3NjE3MTAsImV4cCI6MTY4NDc2NTMxMCwic3ViIjoiIiwic2NvcGVzIjpbXX0.Wz-rIc5rioYtGjtoERR_uYYzUdf5yHdG3DqeGl62SOq7tdiLjQHkjSbt0ihQfwFBgJ5RPtnnm6OgYXBKShC-LrZvgAqKSL4mkYx0cgJ6cwHpTT2-UJ5fo8vYnrncRY82zPOIHTXL_P0j0hUvLpQt6Kl6HIO51Q_3jmFNovjelK7BK0X_hFS06SZy6dOIT6sxi25oOl-6BZfTiM85ftkiSG1MiOAhx6NEDB8c40PzSwRa6pm1OycQWm8TvuVqHGJI7yzBhIrg9C7wD81bKGqLkjV9IsRUjuRw3LaLyokj9caWRXsH4ffsmkrOMGzTUaBa-yoIIAQAg5P5ZexQ2kdTTg`
 /*let tokenExpired = 3590

function checkExpired ()
{
    
}
 */

const headers = 
{
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
}


const button = document.querySelector('button')
const breedInput = document.querySelector('input')
const imgDiv = document.querySelector('.resultDiv')
const container = document.querySelector('#pContainer')
const dContainer = document.querySelector('#dContainer')


function sizeCreation()
{
    const selectedSizes = []

    
    const smallBox = document.querySelector(`#sizeSmall`)
    const medBox = document.querySelector(`#sizeMedium`)
    const lrgBox = document.querySelector(`#sizeLarge`)
    const xLrgBox = document.querySelector(`#sizeXLarge`)

    if (smallBox.checked)
        {
        selectedSizes.push(smallBox.value)
        }
    if (medBox.checked)
        {
        selectedSizes.push(medBox.value)
        }
    if (lrgBox.checked)
        {
        selectedSizes.push(lrgBox.value)
        }
    if (xLrgBox.checked)
        {
        selectedSizes.push(xLrgBox.value)
        }

    const sizeString = selectedSizes.join(',')
    console.log(sizeString)
    return sizeString


}


function clearScreen()
{
    imgDiv.innerHTML = " "
}

button.addEventListener('click', async () =>
{

    clearScreen()
    const selectedSizes = sizeCreation()
    // User knows Breed
    let breed = breedInput.value
    console.log(breed)

    let response = await axios.get(`https://api.petfinder.com/v2/animals?type=dog&limit=50&breed=${breed}&size=${selectedSizes}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {  
             
          for (i = 0; i < response.data.animals.length; i++)
        {   
            const animal = response.data.animals[i]
            
       
          console.log(response.data.animals);
          if (!animal.primary_photo_cropped)
          {
            imgDiv.innerHTML += "<p>No Picture available<p>"
          }
          else
          {
          let dogPic = animal.primary_photo_cropped.small
        
        const div_creation = document.createElement('div')
        div_creation.innerHTML = `<img src=${dogPic}>`
        imgDiv.appendChild(div_creation)
        
        const paragraph = document.createElement('p')
        paragraph.textContent=animal.name
        imgDiv.appendChild(paragraph)
          } 
        }
        });

}

)





