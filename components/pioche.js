import Card from './card.js'

export default class Pioche{
    constructor(cards_total_in_deck){
        this.pioche_clickable = false
        this.DECK = this.create_deck(cards_total_in_deck)
        this.place_for_pioche = document.querySelector(".pioche")
    }

    RecupCards(){
        let result = {}
            $.ajax({
                url:"./Cards.json",
                async:false,
                type:"get",
                dataType:"json"
            }).done(function(html){result = html})
            
            return result
    }

    create_deck(cards_total_in_deck){    
        let DECK = []
        let result = this.RecupCards()
    
        //on remplit le deck selon le nombre de carte indiquée dans le json
        result.forEach(element => {
            for(let i = 0 ; i < element.number_in_deck ; i++){
                let new_card = new Card(element)
                DECK.push(new_card)
            }
        });
    
        //on mélange le tout
        this.randomize(DECK)
    
        //on enlève des cartes pour correspondre au nombre de cartes demandées dans le deck
        if(cards_total_in_deck < DECK.length){
            let card_to_remove = DECK.length - cards_total_in_deck
    
            for(let i = 0; i < card_to_remove; i++){
                DECK.pop()
            }
        }

        //this.display()
        return DECK
    }
    
    add_card_in_deck(){}
    
    /**
     * Retourne la dernière carte de la pioche
     * @param {int} number_cards 
     */
    pioche_card(number_cards){
        if(!number_cards){ number_cards = 1 }
        return new Promise((resolve, reject) => {
            let select_card = this.DECK.pop()
            this.animation_quit(select_card).then(function(e) {
                resolve(e)
            })
        })
    }

    delete_card(number_cards){
        for(let i = 0 ; i < number_cards ; i++){
            this.DECK.pop()
        }
    }

    display(){
        for(let i = 0; i < this.DECK.length; i++){
            this.place_for_pioche.appendChild(this.DECK[i].contain)
        }
    }
    /***************************************************************** ACTIONS */


    /***************************************************************** GET */
    get_last_card(){
        let last = this.DECK.length - 1
        return this.DECK[last];
    }

    /***************************************************************** ANIMATIONS */
    animation_quit(card){
        return new Promise((resolve, reject) => {
            card.contain.animate([
                { transform : "translateY(500px)" },
            ], {
                duration : 500,
                fill : "forwards"
            })
            setTimeout(() => {
                resolve(card)
            }, 500);
        })
    }


    randomize(tab) {
        var i, j, tmp;
        for (i = tab.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            tmp = tab[i];
            tab[i] = tab[j];
            tab[j] = tmp;
        }
        return tab;
    }
}