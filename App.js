import Card from './components/card.js'
import Pioche from './components/pioche.js'
import Hand from './components/handcards.js'

//customElements.define("card-deck", Card, {extends: 'div'})

/**
 * Melange un Array
 * @param {Array} tab 
 */
function randomize(tab) {
    var i, j, tmp;
    for (i = tab.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = tab[i];
        tab[i] = tab[j];
        tab[j] = tmp;
    }
    return tab;
}

class Game{
    constructor(){
        //options du JEUX
            //nbre cartes du deck
            let cards_in_deck = 10
            // nbre cartes piochées
            let cards_in_hand = 4
            //nbre de carte piochées par tour
            this.cards_pioche_tour = 1
            

        //element du DOM
            //en tete
        this.enTete = document.querySelector("#en_tete")

        this.start(cards_in_deck, cards_in_hand)
    }

    start(cards_in_deck, cards_in_hand){
        //prepare les deck
        this.PIOCHE = new Pioche(cards_in_deck)
        this.HANDCARDS = new Hand()
        this.ENNEMYCARDS
        this.CIMETERY
        
        this.LovePoint = 0
        this.Cookie = 0
        this.Population = 0
        this.Days = 0

        this.current_card_pioche = 0

        //pioche carte départ
        this.display_Pioche()
        setTimeout(() => {
            this.pioche_in_deck(cards_in_hand).then((e) => {
                this.clickable_pioche(true)
            })
        }, 500);
        //prepare ennemy carte        
        //prepare le click
        this.PIOCHE.place_for_pioche.addEventListener('click', e => {
            this.click_on_pioche()
        })

        //affiche l'en-tete
        this.display_Days()
    }

    //*************************************************** DISPLAY */
    display_LovePoint(){}
    display_Cookie(){}
    display_Population(){}
    display_Days(){
        this.enTete.innerHTML = this.Days
    }

    display_Pioche(){ this.PIOCHE.display() }
    display_HandCards(){}
    display_EnnemyCards(){}

    //**************************************************** SET */
    set_LovePoint(nombre){}
    set_Cookie(nombre){}
    set_Population(nombre){}
    set_Days(nombre){
        this.Days = nombre
    }
    clickable_pioche(on_off){
        this.pioche_clickable = on_off ? true : false
}
    //***************************************************** ACTIONS */
    pioche_in_deck(number_cards){
        this.clickable_pioche(false)
        return new Promise((r, f) => {
            let i = 0;
            let func_pioche = e => {
                if(i < number_cards){
                    this.PIOCHE.pioche_card().then((e) => {
                        this.HANDCARDS.add_card(e)
                        func_pioche()
                    })
                } else { r(true) }
                i++
            }
    
            func_pioche()
        })
        
    }

    click_on_pioche(){
        if(this.pioche_clickable && this.current_card_pioche < this.cards_pioche_tour){
            this.pioche_in_deck(1).then((e) => {
                this.current_card_pioche ++
                this.clickable_pioche(true)
            })
        }
    }
}


new Game()