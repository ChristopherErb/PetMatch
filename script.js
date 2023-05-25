/*
Things I used with how much I used them:
ThunderClient:  All of the code for the token came from there except the varible and calling it in the program
ChatGPT (4/10)  I asked a lot of questions.  I didn't copy the code, but I definitely read how they did it and did things similarly.

Surge pushed to
FureverHome.surge.sh

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
let selectedBreed = ''


async function populateBreedsDropdown() {

// trying try/catch block to see if it helps?
// it didnt, it just got annoying when it kept tellign me the error was on line (whatever the trycatch was)
    try {
      const token = await getToken();
      let response = await axios.get(`https://api.petfinder.com/v2/types/dog/breeds`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const breeds = response.data.breeds;
      const breedDropdown = document.querySelector('#breedsDropdown');
  
//Initial search for breed on the box
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.text = 'Click to select a breed';
      breedDropdown.appendChild(defaultOption);
  
//populates all the options
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.name;
        option.text = breed.name;
        breedDropdown.appendChild(option);
      });
  
//Event listener for click, sets the selected breed to somthign ic an use later

      breedDropdown.addEventListener('change', function(event) {
        selectedBreed = event.target.value;
      });
    } catch (error) {
      console.error("Error with dog breeds", error);
    }
  }
  populateBreedsDropdown();


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


function goodWithChildren()
{
let gwKids = false
const gwKidsBox = document.querySelector(`#gwKids`)
if (gwKidsBox.checked) gwKids = true

return gwKids

}

function goodWithDogs()
{
    let gwDogs = false
    const gwDogsBox = document.querySelector(`#gwDogs`)
    if (gwDogsBox.checked) gwDogs = true
    
    return gwDogs
}

function goodWithCats()
{
    let gwCats = false
    const gwCatsBox = document.querySelector(`#gwCats`)
    if (gwCatsBox.checked) gwCats = true
    
    return gwCats
}

function isHouseTrained()
{
    let isHouseTrained = false
    const houseTrainedBox = document.querySelector(`#isHouseTrained`)
    if (houseTrainedBox.checked) isHouseTrained = true
    return isHouseTrained
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
    const gwKids = goodWithChildren()
    const gwDogs = goodWithDogs()
    const gwCats = goodWithCats()
    const houseTrained = isHouseTrained()
    const breed = selectedBreed

    
    const locZip = document.querySelector(".locZip").value



    let response = await axios.get(`https://api.petfinder.com/v2/animals?type=dog&limit=50&page=1
&breed=${breed}
&location=${locZip}
&distance=${distAway}
&size=${selectedSizes}
&age=${selectedAges}
&gender=${selectedSex}
&good_with_children=${gwKids}
&good_with_dogs=${gwDogs}
&good_with_cats=${gwCats}
&house_trained=${houseTrained}

`, {
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
        

        const div2_creation = document.createElement('div')
        div2_creation.innerHTML = `I am ${animal.name}, the ${animal.breeds.primary}. I am ${animal.distance} miles from the zip code you entered. <br> ${animal.description} <br><br><br><br><br><a href=${animal.url} target=_blank><button class="js_button">Find me!</button></a> <br> <br>`  
        imgDiv.appendChild(div2_creation)

          } 
        }
        });




}

)





