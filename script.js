//token expiration stuff
//let myApiKey = PTmmWmvcU1eY9pAoleqbM57DyZuzYvKtVAbEUXVxFzxpLpTbkz
//let mySecretKey = XwHgkStKwEQ56VBCOP0rZb03KYntKbslZLv8tKqE
 let token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJQVG1tV212Y1UxZVk5cEFvbGVxYk01N0R5WnV6WXZLdFZBYkVVWFZ4Rnp4cExwVGJreiIsImp0aSI6ImEzZmMyNTQ1ZjE5OTY1ZGRjMDNjZmM0OWYyNzQ5ODUzMGRkNTQxMjU1Mjc1NzFkZjg3MmY3ODI2Y2M1NTdkZjM4N2I5MzNhNzVlMDNkYWNkIiwiaWF0IjoxNjg0NjExNTQ2LCJuYmYiOjE2ODQ2MTE1NDYsImV4cCI6MTY4NDYxNTE0Niwic3ViIjoiIiwic2NvcGVzIjpbXX0.ltvQn1LYuKDNUG28mzOCjLxJUlbFvBqSIKQjP-YZtA_V_mzyr1xnwf2VGotZP5_tn0pzJzb6DJH-tY1WOvafyB8xnqvkEMduYqaNnhkbhApkiBs0MdbyisHdSSQAre04OSxFKAlxifK653MKFv_agrJ49qki-O0bMnq5NR6RedXt-6pZEpvuUCvOcZtwtMXZAY-I5FpKHIKGopgBmFuaeuOnG_MJ7sCaNCzxd0EbbQ7EdJrXUGyNR48t-TXW1a_N7kMw58cN2Zu2-TK_zS_GS-LBxDb3o6LNwk2wDnDMqO85vlaEuAulbo1vZRBXZhXKBC1acLGCBGDz5uUNg8SGaw`
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
const imgDiv = document.querySelector('div')
const container = document.querySelector('#pContainer')
const dContainer = document.querySelector('#dContainer')


button.addEventListener('click', async () =>
{
    imgDiv.innerHTML = " "
    // gets breed
    let breed = breedInput.value
    console.log(breed)

    let response = await axios.get(`https://api.petfinder.com/v2/animals?type=dog&limit=10&breed=${breed}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {  
             
          for (i = 0; i < response.data.animals.length; i++)
        {   
            const animal = response.data.animals[i]
            
       
          //console.log(response.data.animals);
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





