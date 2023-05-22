//token expiration stuff
//let myApiKey = PTmmWmvcU1eY9pAoleqbM57DyZuzYvKtVAbEUXVxFzxpLpTbkz
//let mySecretKey = XwHgkStKwEQ56VBCOP0rZb03KYntKbslZLv8tKqE
//let token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJQVG1tV212Y1UxZVk5cEFvbGVxYk01N0R5WnV6WXZLdFZBYkVVWFZ4Rnp4cExwVGJreiIsImp0aSI6IjQyNDgxNTllY2Q3OWZkMDE0MzIzYTliMThkNzQ5MGE1NjM0NTBlNDdkMDNkNWEyN2FlZDFmNWJjMmE2ZmU2MDZiNzJkMzQ1OGJhNGE0NDRkIiwiaWF0IjoxNjg0Nzc0MjQ0LCJuYmYiOjE2ODQ3NzQyNDQsImV4cCI6MTY4NDc3Nzg0NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.rW5RuTrPc37g_1u9cL-E6YaXLKKL6Y91l-OOXbkNCQFJkc85Yml41wvW-t1GXADLd9rLLBKuxxI7QGFDFxnsTLWdP8xZaDhue6fIZuHb_QlUIAPUtgjD8rDZex0BBDXOrreTzIS8A7JBRzswCAJgvSKUFzJ57JBk3sLXvUtrSCFGi_-_VwFKreiZN5WAYQlaDwJqdHeaxUhSrzbdVftHCfpP0DA1tTmPx3CVpLE1cyqoz7nbKRMELoLBD3nk5q_7b-Yr0LbyLB6sSQGcHuubGc5-u4yQS3Bxze1iWx7WxRPNgXRRABY7yRjncSy8oGCplJPmazwa_iPcBzNgliw41w`
 
 
 
 /*let tokenExpired = 3590

function checkExpired ()
{
    
}
*/

/*Dont delete 

Things I used with how much I used them:
ThunderClient:  All of the code for the token came from there except the varible and calling it in the program
ChatGPT (4/10)  I asked a lot of questions.  I didn't copy the code, but I definitely read how they did it and did things similarly.



*/
 



async function getToken() {
    let headersList = {
      "Accept": "*/*",
    };
  
    let formdata = new FormData();
    formdata.append("grant_type", "client_credentials");
    formdata.append("client_id", "PTmmWmvcU1eY9pAoleqbM57DyZuzYvKtVAbEUXVxFzxpLpTbkz");
    formdata.append("client_secret", "XwHgkStKwEQ56VBCOP0rZb03KYntKbslZLv8tKqE");
  
    let bodyContent = formdata;
  
    let reqOptions = {
      url: "https://api.petfinder.com/v2/oauth2/token",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
  
    let response = await axios.request(reqOptions);
    token = response.data.access_token
    return token
    console.log(response.data.access_token);
  }
  

getToken()
  // Call the function to get the token
 let token = getToken()
 const headers = 
 {
     'Authorization': `Bearer ${token}`,
     'Content-Type': 'application/json',
 }






const button = document.querySelector('button')
const breedInput = document.querySelector('.breedInput')
const imgDiv = document.querySelector('.resultDiv')
const container = document.querySelector('#pContainer')
const dContainer = document.querySelector('#dContainer')



function preferredSex()
{
    const selectedSex = []

    const sexMale = document.querySelector(`#sexMale`)
    const sexFemale = document.querySelector(`#sexFemale`)

    if (sexFemale.checked) selectedSex.push(sexFemale.value)
    if (sexMale.checked) selectedSex.push(sexMale.value)

    const sexString = selectedSex.join(',')
    console.log(sexString)
    return sexString
}

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

function ageSelection()
{

    const selectedAges = [];

    const babyBox = document.querySelector(`#ageBaby`) 
    const youngBox = document.querySelector(`#ageYoung`)
    const adultBox = document.querySelector(`#ageAdult`)
    const seniorBox = document.querySelector(`#ageSenior`)

    if (babyBox.checked) selectedAges.push(babyBox.value)
    if (youngBox.checked) selectedAges.push(youngBox.value)
    if (adultBox.checked) selectedAges.push(adultBox.value)
    if (seniorBox.checked) selectedAges.push(seniorBox.value)

    const ageString = selectedAges.join(',')
    console.log(ageString)
    return ageString

}


function locSlider()
{
    var slider = document.querySelector('#locRange')
    var outputDist = document.querySelector("#outputDist")

    outputDist.innerHTML = slider.value

    slider.oninput = function ()
    {
        outputDist.innerHTML = this.value
    }
    return slider.value
}



function clearScreen()
{
    imgDiv.innerHTML = " "
}


button.addEventListener('click', async () =>
{
    clearScreen()
    const selectedSizes = sizeCreation()
    const selectedAges = ageSelection()
    const selectedSex = preferredSex()
    const distAway = locSlider()
    // User knows Breed
    let breed = breedInput.value
    console.log(breed)

    //User sets zip code
    const locZip = document.querySelector(".locZip").value



    let response = await axios.get(`https://api.petfinder.com/v2/animals?type=dog&limit=50&breed=${breed}&location=${locZip}&distance=${distAway}&size=${selectedSizes}&age=${selectedAges}&gender=${selectedSex}`, {
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
            imgDiv.innerHTML += "<p> <p>"
          }
          else
          {
          let dogPic = animal.primary_photo_cropped.small
        
        const div_creation = document.createElement('div')
        div_creation.innerHTML = `<img src=${dogPic}>`
        imgDiv.appendChild(div_creation)
        
        const paragraph = document.createElement('p')
        paragraph.textContent=`This is ${animal.name} the ${animal.breeds.primary}`
        imgDiv.appendChild(paragraph)
          } 
        }
        });

}

)





