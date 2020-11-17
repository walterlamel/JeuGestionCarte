export default class Pioche{
    constructor(cards_total_in_deck){
        this.create_deck(cards_total_in_deck)
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
            for(let i = 0 ; i < element.number_in_deck ; i++)    {
                DECK.push(element)
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

        this.DECK = DECK
        return DECK
    }
    
    shake_deck(){}
    add_card_in_deck(){}
    pioche_card(){}
    delete_card(){}

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