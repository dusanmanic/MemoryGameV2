let divCards = document.querySelector(".scene");
let btnRadio = document.querySelectorAll("input[name=level]");
let pRes = document.querySelector("p");
let vreme = document.querySelector(".vreme")
let ime = document.getElementById("ime")
let body = document.getElementsByTagName("body")
let page = document.querySelector(".page")

let btnLako = document.getElementById("lako")
let btnSrednje = document.getElementById("srednje")
let btnTesko = document.getElementById("tesko")
let btnExpert = document.getElementById("expert")

let easy = document.getElementById("easy");
let medium = document.getElementById("medium");
let hard = document.getElementById("hard");
let expert = document.getElementById("expert");

body.onload = koIgra()

imgEasy = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
imgMedium = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
imgHard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63];
imgExpert = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99];

function shuffle(arra1) {
    let ctr = arra1.length;
    let temp;
    let index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
};

let vrednost = []
let nizNuN = []
let nizPreview = []
let pogodak;
let clickCounter = 0;
let previewCounter = 0;
let igraCounter = 0;
let brojka = 0;
let counter;
let brojacZaVreme = 0;
let sacuvanoVreme;
let nizEasy = []

if (ime.value == "") {
    document.getElementById("easy").className = "pointerEvent";
    document.getElementById("medium").className = "pointerEvent";
    document.getElementById("hard").className = "pointerEvent";
    document.getElementById("expert").className = "pointerEvent";
}

btnRadio.forEach(izaberiNivo => {
    izaberiNivo.addEventListener("click", event => {
        
        divCards.style.visibility = "visible"

        document.getElementById("ime").className = "pointerEvent"
        
        //shuffle(imgEasy)
        //shuffle(imgMedium)
        //shuffle(imgHard)
        //shuffle(imgExpert)

        if(izaberiNivo.checked) { 
            divCards.innerHTML = "";
        }
        /// Nivo Easy ///
        if(izaberiNivo.id == "easy") {
            
            startCounter(1)
            dugmeLako()

            imgEasy.forEach(x => {
                let cardHolder = document.createElement("div");
                let cardFront = document.createElement("div");
                let cardBack = document.createElement("div");
                let imgFront = document.createElement("img");

                divCards.style.width = "330px";
                divCards.style.height = "330px";
                imgFront.setAttribute("src", `img/${x}.jpg`)
                imgFront.setAttribute("class", "slika")
                cardHolder.className = "card";
                cardHolder.id= `${x}`;
                cardFront.className = "card__face card__face--front";
                cardFront.id = `${x}`;
                cardBack.appendChild(imgFront)
                cardHolder.appendChild(cardFront)
                cardHolder.appendChild(cardBack)
                divCards.appendChild(cardHolder)

                document.getElementById("easy").className = "pointerEvent";
                document.getElementById("medium").className = "pointerEvent";
                document.getElementById("hard").className = "pointerEvent";
                document.getElementById("expert").className = "pointerEvent";

                cardHolder.addEventListener("click", event => {
                    
                    previewCounter++
                    clickCounter++

                    pRes.innerHTML = ""
                    
                    let idSlike = event.srcElement
                    let idBroj = Number(idSlike.id)
                    //console.log(`idBroj ${idBroj}`)
                    
                    nizNuN.push(idBroj)
                    //console.log(`nizNuN ${nizNuN}`)
                    
                    nizZaRacunanje = nizNuN.filter(function (value) {
                        return !Number.isNaN(value);
                    });
                    nizPreview = nizNuN.filter(function (value) {
                        return !Number.isNaN(value);
                    });

                    cardHolder.className = "pointerEventFliped"
                    
                    calculation(nizZaRacunanje)
                    
                    if(clickCounter >= 2) {
                        if(brojka != 1) {
                            setTimeout(() => {
                                divCards.classList.toggle("pointerEvent")
                            }, 200)
                            setTimeout(() => {
                                divCards.classList.remove("pointerEvent")
                            }, 2200)
                        }
                    }
                    
                    if(clickCounter >= 2) {
                        if(brojka != 1) {
                            //console.log(`brojka ${brojka}`)
                            setTimeout(() => {
                                document.getElementById(nizZaRacunanje[0]).className = "card";
                                document.getElementById(nizZaRacunanje[1]).className = "card";
                            }, 2000)
                        }
                        clickCounter = 0;
                        brojka = 0
                    }
                    
                    if(igraCounter == 8 && document.getElementById("easy").checked || 
                    igraCounter == 18 && document.getElementById("medium").checked || igraCounter == 32 && document.getElementById("hard").checked || igraCounter == 50 && document.getElementById("expert").checked) {
                        
                        brojacZaVreme++

                        document.getElementById("easy").classList.remove("pointerEvent");
                        document.getElementById("medium").classList.remove("pointerEvent");
                        document.getElementById("hard").classList.remove("pointerEvent");
                        document.getElementById("expert").classList.remove("pointerEvent");
        
                        console.log(`Ovo radi`);
                        
                        setTimeout(() => {

                            skuplja()
                            
                            alertPoruka = confirm(`Kraj igre! Da li želite novu igru?`)
                            
                            if(alertPoruka == true && document.getElementById("easy").checked) {
                                
                                clearInterval(interval)
                                document.getElementById("easy").click()
                                document.getElementById("ime").classList.remove = "pointerEvent"
                                brojacZaVreme = 0;
                                console.log(`brojacZaVreme ${igraCounter}`)
                                console.log(`igraCounter ${brojacZaVreme}`)
                            } else if(alertPoruka == true && document.getElementById("medium").checked) {
                                clearInterval(interval)
                                document.getElementById("medium").click()
                                document.getElementById("ime").classList.remove = "pointerEvent"
                                brojacZaVreme = 0;
                                console.log(`brojacZaVreme ${igraCounter}`)
                                console.log(`igraCounter  ${brojacZaVreme}`)
                            } else if(alertPoruka == true && document.getElementById("hard").checked) {
                                clearInterval(interval)
                                document.getElementById("hard").click()
                                document.getElementById("ime").classList.remove = "pointerEvent"
                                brojacZaVreme = 0;
                                console.log(`brojacZaVreme ${brojacZaVreme}`)
                                console.log(`igraCounter  ${igraCounter}`)
                                
                            } else if(alertPoruka == true && document.getElementById("expert").checked) {
                                clearInterval(interval)
                                document.getElementById("expert").click()
                                document.getElementById("ime").classList.remove = "pointerEvent"
                                brojacZaVreme = 0;
                                console.log(`brojacZaVreme ${brojacZaVreme}`)
                                console.log(`igraCounter  ${igraCounter}`)
                                
                            } else {
                                dugmeLako()
                                document.getElementById("ime").classList.remove("pointerEvent")
                            }
                            
                        }, 500)
                        pRes.innerHTML = ""
                        igraCounter = 0;
                    }
                })
            })
        }
        
        /// Nivo Medium ///
        if(izaberiNivo.id == "medium") {
            
            startCounter(1)
            dugmeSrednje()
            
            imgMedium.forEach(x => {
                let cardHolder = document.createElement("div");
                let cardFront = document.createElement("div");
                let cardBack = document.createElement("div");
                let imgFront = document.createElement("img");

                divCards.style.width = "500px";
                divCards.style.height = "500px";
                imgFront.setAttribute("src", `img/${x}.jpg`)
                imgFront.setAttribute("class", "slika")
                cardHolder.className = "card";
                cardHolder.id= `${x}`;
                cardFront.className = "card__face card__face--front";
                cardFront.id = `${x}`;
                cardBack.appendChild(imgFront)
                cardHolder.appendChild(cardFront)
                cardHolder.appendChild(cardBack)
                divCards.appendChild(cardHolder)
                
                document.getElementById("easy").className = "pointerEvent";
                document.getElementById("medium").className = "pointerEvent";
                document.getElementById("hard").className = "pointerEvent";
                document.getElementById("expert").className = "pointerEvent";

                cardHolder.addEventListener("click", event => {
                    
                    previewCounter++
                    clickCounter++
                    
                    pRes.innerHTML = ""
                    
                    let idSlike = event.srcElement
                    let idBroj = Number(idSlike.id)
                    //console.log(`idBroj ${idBroj}`)
                    
                    nizNuN.push(idBroj)
                    //console.log(`nizNuN ${nizNuN}`)
                    
                    nizZaRacunanje = nizNuN.filter(function (value) {
                        return !Number.isNaN(value);
                    });
                    nizPreview = nizNuN.filter(function (value) {
                        return !Number.isNaN(value);
                    });

                    cardHolder.className = "pointerEventFliped"
                    
                    calculation(nizZaRacunanje)
                    
                    if(clickCounter >= 2) {
                        if(brojka != 1) {
                            setTimeout(() => {
                                divCards.classList.toggle("pointerEvent")
                            }, 200)
                            setTimeout(() => {
                                divCards.classList.remove("pointerEvent")
                            }, 2200)
                        }
                    }
                    
                    if(clickCounter >= 2) {
                        if(brojka != 1) {
                            //console.log(`brojka ${brojka}`)
                            setTimeout(() => {
                                document.getElementById(nizZaRacunanje[0]).className = "card";
                                document.getElementById(nizZaRacunanje[1]).className = "card";
                            }, 2000)
                        }
                        clickCounter = 0;
                        brojka = 0
                    }
                    
                    if(igraCounter == 8 && document.getElementById("easy").checked || 
                    igraCounter == 18 && document.getElementById("medium").checked || igraCounter == 32 && document.getElementById("hard").checked || igraCounter == 50 && document.getElementById("expert").checked) {
                        
                        brojacZaVreme++
                        
                        document.getElementById("easy").classList.remove("pointerEvent");
                        document.getElementById("medium").classList.remove("pointerEvent");
                        document.getElementById("hard").classList.remove("pointerEvent");
                        document.getElementById("expert").classList.remove("pointerEvent");
                        
                        console.log(`Ovo radi`);
                        
                        setTimeout(() => {
                            skuplja()

                            alertPoruka = confirm(`Kraj igre! Da li želite novu igru?`)

                            if(alertPoruka == true && document.getElementById("easy").checked) {
                                
                                clearInterval(interval)
                                document.getElementById("easy").click()
                                document.getElementById("ime").classList.remove = "pointerEvent"
                                brojacZaVreme = 0;
                                console.log(`brojacZaVreme ${brojacZaVreme}`)
                                console.log(`igraCounter  ${igraCounter}`)
                                
                            } else if(alertPoruka == true && document.getElementById("medium").checked) {
                                clearInterval(interval)
                                document.getElementById("medium").click()
                                document.getElementById("ime").classList.remove = "pointerEvent"
                                brojacZaVreme = 0;
                                console.log(`brojacZaVreme ${brojacZaVreme}`)
                                console.log(`igraCounter  ${igraCounter}`)
                                
                            } else if(alertPoruka == true && document.getElementById("hard").checked) {
                                clearInterval(interval)
                                document.getElementById("hard").click()
                                document.getElementById("ime").classList.remove = "pointerEvent"
                                brojacZaVreme = 0;
                                console.log(`brojacZaVreme ${brojacZaVreme}`)
                                console.log(`igraCounter  ${igraCounter}`)
                                
                            } else if(alertPoruka == true && document.getElementById("expert").checked) {
                                clearInterval(interval)
                                document.getElementById("expert").click()
                                document.getElementById("ime").classList.remove = "pointerEvent"
                                brojacZaVreme = 0;
                                console.log(`brojacZaVreme ${brojacZaVreme}`)
                                console.log(`igraCounter  ${igraCounter}`)
                                
                            } else {
                                dugmeSrednje()
                                document.getElementById("ime").classList.remove("pointerEvent")
                            }
                        }, 200)
                        igraCounter = 0;
                    }
                })
            })
        }

        /// Nivo Hard ///
        if(izaberiNivo.id == "hard") {
            
            startCounter(1)
            dugmeTesko()
            
            imgHard.forEach(x => {
                let cardHolder = document.createElement("div");
                let cardFront = document.createElement("div");
                let cardBack = document.createElement("div");
                let imgFront = document.createElement("img");

                divCards.style.width = "660px";
                divCards.style.height = "660px";
                imgFront.setAttribute("src", `img/${x}.jpg`)
                imgFront.setAttribute("class", "slika")
                cardHolder.className = "card";
                cardHolder.id= `${x}`;
                cardFront.className = "card__face card__face--front";
                cardFront.id = `${x}`;
                cardBack.appendChild(imgFront)
                cardHolder.appendChild(cardFront)
                cardHolder.appendChild(cardBack)
                divCards.appendChild(cardHolder)
                
                document.getElementById("easy").className = "pointerEvent";
                document.getElementById("medium").className = "pointerEvent";
                document.getElementById("hard").className = "pointerEvent";
                document.getElementById("expert").className = "pointerEvent";

                cardHolder.addEventListener("click", event => {
                    
                    previewCounter++
                    clickCounter++
                    
                    pRes.innerHTML = ""
                    
                    let idSlike = event.srcElement
                    let idBroj = Number(idSlike.id)
                    //console.log(`idBroj ${idBroj}`)
                    
                    nizNuN.push(idBroj)
                    //console.log(`nizNuN ${nizNuN}`)
                    
                    nizZaRacunanje = nizNuN.filter(function (value) {
                        return !Number.isNaN(value);
                    });
                    nizPreview = nizNuN.filter(function (value) {
                        return !Number.isNaN(value);
                    });

                    cardHolder.className = "pointerEventFliped"
                    
                    calculation(nizZaRacunanje)
                    
                    if(clickCounter >= 2) {
                        if(brojka != 1) {
                            setTimeout(() => {
                                divCards.classList.toggle("pointerEvent")
                            }, 200)
                            setTimeout(() => {
                                divCards.classList.remove("pointerEvent")
                            }, 2200)
                        }
                    }
                    
                    if(clickCounter >= 2) {
                        if(brojka != 1) {
                            //console.log(`brojka ${brojka}`)
                            setTimeout(() => {
                                document.getElementById(nizZaRacunanje[0]).className = "card";
                                document.getElementById(nizZaRacunanje[1]).className = "card";
                            }, 2000)
                        }
                        clickCounter = 0;
                        brojka = 0
                    }
                    
                    if(igraCounter == 8 && document.getElementById("easy").checked || 
                    igraCounter == 18 && document.getElementById("medium").checked || igraCounter == 32 && document.getElementById("hard").checked || igraCounter == 50 && document.getElementById("expert").checked) {
                        
                        brojacZaVreme++
                        
                        document.getElementById("easy").classList.remove("pointerEvent");
                        document.getElementById("medium").classList.remove("pointerEvent");
                        document.getElementById("hard").classList.remove("pointerEvent");
                        document.getElementById("expert").classList.remove("pointerEvent");
                        
                        console.log(`Ovo radi`);
                        
                        setTimeout(() => {
                            skuplja()

                            alertPoruka = confirm(`Kraj igre! Da li želite novu igru?`)

                            if(alertPoruka == true && document.getElementById("easy").checked) {
                                
                                clearInterval(interval)
                                document.getElementById("easy").click()
                                document.getElementById("ime").classList.remove = "pointerEvent"
                                brojacZaVreme = 0;
                                console.log(`brojacZaVreme ${brojacZaVreme}`)
                                console.log(`igraCounter  ${igraCounter}`)
                                
                            } else if(alertPoruka == true && document.getElementById("medium").checked) {
                                clearInterval(interval)
                                document.getElementById("medium").click()
                                document.getElementById("ime").classList.remove = "pointerEvent"
                                brojacZaVreme = 0;
                                console.log(`brojacZaVreme ${brojacZaVreme}`)
                                console.log(`igraCounter  ${igraCounter}`)
                                
                            } else if(alertPoruka == true && document.getElementById("hard").checked) {
                                clearInterval(interval)
                                document.getElementById("hard").click()
                                document.getElementById("ime").classList.remove = "pointerEvent"
                                brojacZaVreme = 0;
                                console.log(`brojacZaVreme ${brojacZaVreme}`)
                                console.log(`igraCounter  ${igraCounter}`)
                                
                            } else if(alertPoruka == true && document.getElementById("expert").checked) {
                                clearInterval(interval)
                                document.getElementById("expert").click()
                                document.getElementById("ime").classList.remove = "pointerEvent"
                                brojacZaVreme = 0;
                                console.log(`brojacZaVreme ${brojacZaVreme}`)
                                console.log(`igraCounter  ${igraCounter}`)
                                
                            } else {
                                dugmeTesko()
                                document.getElementById("ime").classList.remove("pointerEvent")
                            }
                        }, 200)
                        igraCounter = 0;
                    }

                    
                })
            })
        }

        /// Nivo Expert ///
        if(izaberiNivo.id == "expert") {
            
            startCounter(1)
            dugmeExpert()
            
            imgExpert.forEach(x => {
                let cardHolder = document.createElement("div");
                let cardFront = document.createElement("div");
                let cardBack = document.createElement("div");
                let imgFront = document.createElement("img");

                divCards.style.width = "820px";
                divCards.style.height = "820px";
                imgFront.setAttribute("src", `img/${x}.jpg`)
                imgFront.setAttribute("class", "slika")
                cardHolder.className = "card";
                cardHolder.id= `${x}`;
                cardFront.className = "card__face card__face--front";
                cardFront.id = `${x}`;
                cardBack.appendChild(imgFront)
                cardHolder.appendChild(cardFront)
                cardHolder.appendChild(cardBack)
                divCards.appendChild(cardHolder)
                
                document.getElementById("easy").className = "pointerEvent";
                document.getElementById("medium").className = "pointerEvent";
                document.getElementById("hard").className = "pointerEvent";
                document.getElementById("expert").className = "pointerEvent";

                cardHolder.addEventListener("click", event => {
                    
                    previewCounter++
                    clickCounter++
                    
                    pRes.innerHTML = ""
                    
                    let idSlike = event.srcElement
                    let idBroj = Number(idSlike.id)
                    //console.log(`idBroj ${idBroj}`)
                    
                    nizNuN.push(idBroj)
                    //console.log(`nizNuN ${nizNuN}`)
                    
                    nizZaRacunanje = nizNuN.filter(function (value) {
                        return !Number.isNaN(value);
                    });
                    nizPreview = nizNuN.filter(function (value) {
                        return !Number.isNaN(value);
                    });

                    cardHolder.className = "pointerEventFliped"
                    
                    calculation(nizZaRacunanje)
                    
                    if(clickCounter >= 2) {
                        if(brojka != 1) {
                            setTimeout(() => {
                                divCards.classList.toggle("pointerEvent")
                            }, 200)
                            setTimeout(() => {
                                divCards.classList.remove("pointerEvent")
                            }, 2200)
                        }
                    }
                    
                    if(clickCounter >= 2) {
                        if(brojka != 1) {
                            //console.log(`brojka ${brojka}`)
                            setTimeout(() => {
                                document.getElementById(nizZaRacunanje[0]).className = "card";
                                document.getElementById(nizZaRacunanje[1]).className = "card";
                            }, 2000)
                        }
                        clickCounter = 0;
                        brojka = 0
                    }
                    
                    if(igraCounter == 8 && document.getElementById("easy").checked || 
                    igraCounter == 18 && document.getElementById("medium").checked || igraCounter == 32 && document.getElementById("hard").checked || igraCounter == 50 && document.getElementById("expert").checked) {
                        
                        brojacZaVreme++
                        
                        document.getElementById("easy").classList.remove("pointerEvent");
                        document.getElementById("medium").classList.remove("pointerEvent");
                        document.getElementById("hard").classList.remove("pointerEvent");
                        document.getElementById("expert").classList.remove("pointerEvent");
                        
                        console.log(`Ovo radi`);
                        
                        setTimeout(() => {
                            skuplja()

                            alertPoruka = confirm(`Kraj igre! Da li želite novu igru?`)

                            if(alertPoruka == true && document.getElementById("easy").checked) {
                                
                                clearInterval(interval)
                                document.getElementById("easy").click()
                                document.getElementById("ime").classList.remove = "pointerEvent"
                                brojacZaVreme = 0;
                                console.log(`brojacZaVreme ${brojacZaVreme}`)
                                console.log(`igraCounter  ${igraCounter}`)
                                
                            } else if(alertPoruka == true && document.getElementById("medium").checked) {
                                clearInterval(interval)
                                document.getElementById("medium").click()
                                document.getElementById("ime").classList.remove = "pointerEvent"
                                brojacZaVreme = 0;
                                console.log(`brojacZaVreme ${brojacZaVreme}`)
                                console.log(`igraCounter  ${igraCounter}`)
                                
                            } else if(alertPoruka == true && document.getElementById("hard").checked) {
                                clearInterval(interval)
                                document.getElementById("hard").click()
                                document.getElementById("ime").classList.remove = "pointerEvent"
                                brojacZaVreme = 0;
                                console.log(`brojacZaVreme ${brojacZaVreme}`)
                                console.log(`igraCounter  ${igraCounter}`)
                                
                            } else if(alertPoruka == true && document.getElementById("expert").checked) {
                                clearInterval(interval)
                                document.getElementById("expert").click()
                                document.getElementById("ime").classList.remove = "pointerEvent"
                                brojacZaVreme = 0;
                                console.log(`brojacZaVreme ${brojacZaVreme}`)
                                console.log(`igraCounter  ${igraCounter}`)
                                
                            } else {
                                dugmeExpert()
                                document.getElementById("ime").classList.remove("pointerEvent")
                            }
                        }, 200)
                        igraCounter = 0;
                    }

                    
                })
            })
        } 
    })
})

///////// f-je
function calculation (vrednost) {
    if(vrednost.length > 1 && vrednost[0]%2 == 0) {
        if(vrednost[1] - vrednost[0] == 1) {
            brojka++
            //console.log(`Prvi je paran ${vrednost[1]} minus ${vrednost[0]} daje 1 i brojka ${brojka}`)
            document.getElementById(vrednost[0]).classList.toggle = "pointerEvent"
            document.getElementById(vrednost[1]).classList.toggle = "pointerEvent"
            vrednost = []
            nizNuN = []
            pRes.innerHTML = `POGODAK`
            igraCounter++
            //console.log(`igraCounter ${igraCounter}`)
        } else {
            vrednost = []
            nizNuN = []
        }

    } else if (vrednost.length > 1 && vrednost[0]%2 != 0) {
        if(vrednost[0] - vrednost[1] == 1) {
            brojka++
            //console.log(`Prvi je neparan ali ${vrednost[0]} minus ${vrednost[1]} daje 1`)
            document.getElementById(vrednost[0]).classList.toggle = "pointerEvent" 
            document.getElementById(vrednost[1]).classList.toggle = "pointerEvent" 
            vrednost = []
            nizNuN = []
            pRes.innerHTML = `POGODAK`
            igraCounter++
        } else {
            vrednost = []
            nizNuN = []
        }
    }
}

function startCounter(seconds) {
    counter = seconds;
      
    interval = setInterval(() => {
        //console.log(counter);
        vreme.innerHTML = counter
        counter++;
        
        if (brojacZaVreme == 1) {
            console.log(brojacZaVreme)
            sacuvanoVreme = counter;
            pRes.innerHTML = sacuvanoVreme - 2;
            vreme.innerHTML = sacuvanoVreme - 2;
            
            clearInterval(interval);
                    
      }
    }, 1000);

    brojacZaVreme = 0;
    console.log(`brojacZaVreme ${brojacZaVreme}`)
}

//////////////////////////

let imeCounter = 0;
let player = {};
let nizIme;

ime.addEventListener("keyup", event => {
    if (event.keyCode === 13) {
        
        if (/^[0-9].*$/.test(ime.value) && imeCounter < 3 ) {
            imeCounter++
            alert(`Vaše ime ne moze da sadrzi karaktere ili da počinje brojem !`)
        } else if (ime.value == "" && imeCounter < 3)  {
            imeCounter++
            alert(`Unesite Vaše ime!`)
        } else if (imeCounter >= 3){
            alert(`Ne se zajebavaj nego lepo se upiši !!!`)
            imeCounter = 0;
        } else if(easy.checked) {
            easy.click()
        } else {
            alert(`Izaberite nivo`)
            //console.log(ime.value)
            
            localStorage.setItem("curentPlayer", ime.value)
            
            document.getElementById("easy").classList.remove("pointerEvent");
            document.getElementById("medium").classList.remove("pointerEvent");
            document.getElementById("hard").classList.remove("pointerEvent");
            document.getElementById("expert").classList.remove("pointerEvent");
            
            event.preventDefault();
            console.log(`Nesto`)
        }

    }
    
})

function koIgra () {
    
    trenutnoIgra = localStorage.getItem("curentPlayer")
    
    ime.value = trenutnoIgra
    //console.log(trenutnoIgra)
}

function skuplja() {
    console.log(`skuplja`)

    let localEasy;
    let localMedium;
    let localHard;
    let localExpert;
    let nivo;

    if(easy.checked) {
        nivo = "easy";

        localEasy = JSON.parse(localStorage.getItem("nizEasy") || "[]");
        console.log(localEasy);

        player = {
            name: ime.value,
            time: vreme.textContent,
            nivo: nivo
        };
        
        console.log(player)

        for(let i=0; i<localEasy.length; i++) {
            
           console.log(localEasy.length)

            let x = `${player.name}`
            let y = `${localEasy[i].name}`

            let n = x.localeCompare(y)
            console.log(n)
            
            if(n == 0) {
                num1 = Number(player.time)
                console.log(num1)
                num2 = Number(localEasy[i].time)
                console.log(num2)
                if ( num1 < num2 ) {
                    console.log(player.name)
                    console.log(player.time)
                    console.log(localEasy[i].name)
                    console.log(localEasy[i].time)
                    localEasy.splice(i, 1)
                } else {
                    console.log(player.name)
                    console.log(player.time)
                    console.log(localEasy[i].name)
                    console.log(localEasy[i].time)
                    player.time = `${localEasy[i].time}`
                    localEasy.splice(i, 1)
                } 
            }
        }
        
        localEasy.push(player);

        console.log(localEasy);
        console.log(`Skuplja ${ime.value}`);
        console.log(`Skuplja ${vreme.textContent}`);
        console.log(easy.checked);

        localEasy.sort(function(a, b) {
            return parseFloat(a.time) - parseFloat(b.time);
        });
        
        if(localEasy.length > 5) {
            //console.log(localEasy)
            localEasy.pop()
        }

        localStorage.setItem("nizEasy", JSON.stringify(localEasy) || "[]");
        console.log(localEasy);
    }

    if(medium.checked) {
        nivo = "medium";

        localMedium = JSON.parse(localStorage.getItem("nizMedium") || "[]");
        console.log(localMedium);

        player = {
            name: ime.value,
            time: vreme.textContent,
            nivo: nivo
        };
        

        console.log(player)
        for(let i=0; i<localMedium.length; i++) {
            
           
            console.log(localMedium.length)
            let x = `${player.name}`
            let y = `${localMedium[i].name}`

            let n = x.localeCompare(y)
            console.log(n)
            
            if(n == 0) {
                num1 = Number(player.time)
                console.log(num1)
                num2 = Number(localMedium[i].time)
                console.log(num2)
                if ( num1 < num2 ) {
                    console.log(player.name)
                    console.log(player.time)
                    console.log(localMedium[i].name)
                    console.log(localMedium[i].time)
                    localMedium.splice(i, 1)
                } else {
                    console.log(player.name)
                    console.log(player.time)
                    console.log(localMedium[i].name)
                    console.log(localMedium[i].time)
                    player.time = `${localMedium[i].time}`
                    localMedium.splice(i, 1)
                
                } 
            }
            console.log(localMedium)
        }

        localMedium.push(player);
        
        console.log(localMedium);
        console.log(`Skuplja ${ime.value}`);
        console.log(`Skuplja ${vreme.textContent}`);
        console.log(medium.checked);
        
        localMedium.sort(function(a, b) {
            return parseFloat(a.time) - parseFloat(b.time);
        });

        if(localMedium.length > 5) {
            localMedium.pop()
        }
    
        localStorage.setItem("nizMedium", JSON.stringify(localMedium));
        console.log(localMedium);
    }

    if(hard.checked) {
        nivo = "hard";

        localHard = JSON.parse(localStorage.getItem("nizHard") || "[]");
        console.log(localHard);

        player = {
            name: ime.value,
            time: vreme.textContent,
            nivo: nivo
        };
        

        console.log(player)
        for(let i=0; i<localHard.length; i++) {
            
           
            console.log(localHard.length)
            let x = `${player.name}`
            let y = `${localHard[i].name}`

            let n = x.localeCompare(y)
            console.log(n)
            
            if(n == 0) {
                num1 = Number(player.time)
                console.log(num1)
                num2 = Number(localHard[i].time)
                console.log(num2)
                if ( num1 < num2 ) {
                    console.log(player.name)
                    console.log(player.time)
                    console.log(localHard[i].name)
                    console.log(localHard[i].time)
                    localHard.splice(i, 1)
                } else {
                    console.log(player.name)
                    console.log(player.time)
                    console.log(localHard[i].name)
                    console.log(localHard[i].time)
                    player.time = `${localHard[i].time}`
                    localHard.splice(i, 1)
                
                } 
            }
            console.log(localHard)
        }

        localHard.push(player);
        
        console.log(localHard);
        console.log(`Skuplja ${ime.value}`);
        console.log(`Skuplja ${vreme.textContent}`);
        console.log(hard.checked);
        
        localHard.sort(function(a, b) {
            return parseFloat(a.time) - parseFloat(b.time);
        });

        if(localHard.length > 5) {
            localHard.pop()
        }
    
        localStorage.setItem("nizHard", JSON.stringify(localHard));
        console.log(localHard);
    }

    if(expert.checked) {
        nivo = "expert";

        localExpert = JSON.parse(localStorage.getItem("nizExpert") || "[]");
        console.log(localExpert);

        player = {
            name: ime.value,
            time: vreme.textContent,
            nivo: nivo
        };
        

        console.log(player)
        for(let i=0; i<localExpert.length; i++) {
            
           
            console.log(localExpert.length)
            let x = `${player.name}`
            let y = `${localExpert[i].name}`

            let n = x.localeCompare(y)
            console.log(n)
            
            if(n == 0) {
                num1 = Number(player.time)
                console.log(num1)
                num2 = Number(localExpert[i].time)
                console.log(num2)
                if ( num1 < num2 ) {
                    console.log(player.name)
                    console.log(player.time)
                    console.log(localExpert[i].name)
                    console.log(localExpert[i].time)
                    localExpert.splice(i, 1)
                } else {
                    console.log(player.name)
                    console.log(player.time)
                    console.log(localExpert[i].name)
                    console.log(localExpert[i].time)
                    player.time = `${localExpert[i].time}`
                    localExpert.splice(i, 1)
                
                } 
            }
            console.log(localExpert)
        }

        localExpert.push(player);
        
        console.log(localExpert);
        console.log(`Skuplja ${ime.value}`);
        console.log(`Skuplja ${vreme.textContent}`);
        console.log(expert.checked);
        
        localExpert.sort(function(a, b) {
            return parseFloat(a.time) - parseFloat(b.time);
        });

        if(localExpert.length > 5) {
            localExpert.pop()
        }
    
        localStorage.setItem("nizExpert", JSON.stringify(localExpert));
        console.log(localExpert);
    }
}

function tabelaReload() {
    document.querySelector(".tabela").reload()
}

function dugmeLako () {
    document.querySelector(".tabela").innerHTML = ""
    console.log(`dugme lako`)

    setTimeout(() => {
        localEasy = JSON.parse(localStorage.getItem("nizEasy") || "[]");
        
        let tabela = document.createElement("table")
        let mestoIgraca = document.createElement("th")
        let imeIgraca = document.createElement("th")
        let vremeIgraca = document.createElement("th")

        tabela.appendChild(mestoIgraca)
        mestoIgraca.innerHTML = "Mesto"
        tabela.appendChild(imeIgraca)
        imeIgraca.innerHTML = "Korisničko ime"
        tabela.appendChild(vremeIgraca)
        vremeIgraca.innerHTML = "Vreme"

        document.querySelector(".tabela").appendChild(tabela)

        localEasy.forEach((x, y) => {
            row = tabela.insertRow()
            let cell1 = row.insertCell(0)
            cell1.innerHTML = y + 1
            let cell2 = row.insertCell(1);
            cell2.innerHTML = x.name
            let cell3= row.insertCell(2);
            cell3.innerHTML = x.time
        })
        
        
    }, 300)
    
}

function dugmeSrednje() {
    document.querySelector(".tabela").innerHTML = ""
    console.log(`dugme srednje`)

    setTimeout(() => {
        localMedium = JSON.parse(localStorage.getItem("nizMedium") || "[]");
        
        let tabela = document.createElement("table")
        let mestoIgraca = document.createElement("th")
        let imeIgraca = document.createElement("th")
        let vremeIgraca = document.createElement("th")

        tabela.appendChild(mestoIgraca)
        mestoIgraca.innerHTML = "Mesto"
        tabela.appendChild(imeIgraca)
        imeIgraca.innerHTML = "Korisničko ime"
        tabela.appendChild(vremeIgraca)
        vremeIgraca.innerHTML = "Vreme"

        document.querySelector(".tabela").appendChild(tabela)

        localMedium.forEach((x, y) => {
            row = tabela.insertRow()
            let cell1 = row.insertCell(0)
            cell1.innerHTML = y + 1
            let cell2 = row.insertCell(1);
            cell2.innerHTML = x.name
            let cell3= row.insertCell(2);
            cell3.innerHTML = x.time
        })
        
    }, 300)
}

function dugmeTesko() {
    document.querySelector(".tabela").innerHTML = ""
    console.log(`dugme tesko`)

    setTimeout(() => {
        localHard = JSON.parse(localStorage.getItem("nizHard") || "[]");
        
        let tabela = document.createElement("table")
        let mestoIgraca = document.createElement("th")
        let imeIgraca = document.createElement("th")
        let vremeIgraca = document.createElement("th")

        tabela.appendChild(mestoIgraca)
        mestoIgraca.innerHTML = "Mesto"
        tabela.appendChild(imeIgraca)
        imeIgraca.innerHTML = "Korisničko ime"
        tabela.appendChild(vremeIgraca)
        vremeIgraca.innerHTML = "Vreme"

        document.querySelector(".tabela").appendChild(tabela)

        localHard.forEach((x, y) => {
            row = tabela.insertRow()
            let cell1 = row.insertCell(0)
            cell1.innerHTML = y + 1
            let cell2 = row.insertCell(1);
            cell2.innerHTML = x.name
            let cell3= row.insertCell(2);
            cell3.innerHTML = x.time
        })
        
    }, 300)
}

function dugmeExpert() {
    document.querySelector(".tabela").innerHTML = ""
    console.log(`dugme expert`)

    setTimeout(() => {
        localExpert = JSON.parse(localStorage.getItem("nizExpert") || "[]");
        
        let tabela = document.createElement("table")
        let mestoIgraca = document.createElement("th")
        let imeIgraca = document.createElement("th")
        let vremeIgraca = document.createElement("th")

        tabela.appendChild(mestoIgraca)
        mestoIgraca.innerHTML = "Mesto"
        tabela.appendChild(imeIgraca)
        imeIgraca.innerHTML = "Korisničko ime"
        tabela.appendChild(vremeIgraca)
        vremeIgraca.innerHTML = "Vreme"

        document.querySelector(".tabela").appendChild(tabela)

        localExpert.forEach((x, y) => {
            row = tabela.insertRow()
            let cell1 = row.insertCell(0)
            cell1.innerHTML = y + 1
            let cell2 = row.insertCell(1);
            cell2.innerHTML = x.name
            let cell3= row.insertCell(2);
            cell3.innerHTML = x.time
        })
        
    }, 300)
}