import Card from './card.js'

export default class HandCard{

    constructor(){
        this.DECK = []
    }

    use_card(){}
    delete_card(card){
        card.contain.remove()
        for(let i in card){
            delete card[i]
        }
        
        for(let i in this.DECK){
            if(Object.keys(this.DECK[i]).length === 0){
                delete this.DECK[i]
            }
        }
    }

    add_card(card){
        this.appear_in_hand(card)
        this.DECK.push(card)
        card.set_use(true)
        card.contain.addEventListener('click', e => {
            this.use(card)
        })
        return this.DECK
    }

    /************************************************** ANIMATIONS */
    appear_in_hand(card){
        document.querySelector(".handle").appendChild(card.contain);
        card.return_card()
    }

    /************************************************** GET */
    get_nbre_card(){
        return this.DECK.length
    }

    /***************************************************** USE */
    use(card){
        if(card.usable){
            //animation
            card.anim_use().then(e => {
                //animation terminée
                this.delete_card(card)
            })
        }
        return true
    }
}