
let coordinates = [];

let addy = document.querySelector('#address');

let sat = document.querySelector('#norad')

const button = document.querySelector('button');


const maxLength = 4;

let address = '';

let options = []

let coordX = '';

let coordY = '';

let answer = [];

let culm = $('#culminate');

let rise = $('#rise');

let set = $('#set');


function addressChange() {
    console.log('yes')
    address = addy.value;
    console.log(address)
}


function fetching() {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYnJhbmRvbjEyMWoiLCJhIjoiY2tyd2VtY3JpMGZxbjJ2bjFjZGFwejE5ZyJ9.WS7aXRJWRmb2NepS2P1cdA`)
        .then((rawData) => rawData.json())
        .then((data) => {
            // console.log(data)
            // console.log(data.features[0].center);
            
            if (data.features !== undefined && data.features.length > 1) {
                for(i = 0; i < data.features.length; i++) {
                    options.push(data.features[i]);
                    coordX = data.features[0].center[0];
                    coordY = data.features[0].center[1];
                }
                
            }

            console.log(coordX);
            console.log(coordY)
            
            // coordY.substr(0, maxLength)
            // console.log(options)
        })
        .then((options) => {
            // console.log(coordX)
            // console.log(options)
            fetch(`https://satellites.fly.dev/passes/25544?lat=${coordY.toString().substr(0,5)}&lon=${coordX.toString().substr(0,6)}&limit=1&days=15&visible_only=true`)
            .catch(err => console.log(err))
            .then(options => options.json())
            .then((options2) => {
                // for(i = 0; i < options2.length; i++) {
                //     answer.push(options2[i]);
                // }
                console.log(options2[0].culmination.utc_datetime)
                console.log(options2[0].rise.utc_datetime)
                console.log(options2[0].set.utc_datetime)
                culm.html(`<h3>Culmination: ${options2[0].culmination.utc_datetime}</h3>`)
                rise.html(`<h3>Rise: ${options2[0].rise.utc_datetime}</h3>`)
                set.html(`<h3>Set: ${options2[0].set.utc_datetime}</h3>`)
                // alert(answer[0])
                // window.location.href = (`https://satellites.fly.dev/passes/25544?lat=${coordY.toString().substr(0,5)}&lon=${coordX.toString().substr(0,6)}&limit=1&days=15&visible_only=true`)
            })
        })
    }
    // .then(() => {
    
    //     alert(options.toString())
    //     for(let places of options) {
            
    // }})
    
    function satellite() {
        console.log(sat.value)
    }


    button.addEventListener('click', fetching)

    addy.addEventListener('change', addressChange)

    sat.addEventListener('change', satellite)


    // .then((dataOpt) => {
    //     alert(options)
    //     prompt(`Select your location`)
    // })
