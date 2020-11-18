export default class Card{

    constructor(card, in_face, where){
        this.infos = card

        this.face = document.createElement("div")
        this.face.classList.add('inner')
        this.face.classList.add('face')
        this.dos = document.createElement("div")
        this.dos.classList.add('inner')
        this.dos.classList.add('dos')
        
        this.contain = document.createElement("div")
        this.contain.classList.add("card")
        this.card = document.createElement("div")
        this.card.classList.add("box_inner")
        this.contain.appendChild(this.card)

        this.card.appendChild(this.dos)
        this.card.appendChild(this.face)


        //sur la face
        this.face.innerHTML = card.name + "<br/><br/>" + card.desc


       if(!in_face){
        this.contain.classList.add("card_devoile")
       }

       this.become_clickable()
    }


    become_clickable(){
        this.contain.classList.add("card_clickable")
    }

    remove_clickable(){
        this.contain.classList.remove("card_clickable")
    }

    /***************************************************** ANIMATION */

    return_card(){
        if(this.contain.className.indexOf("card_devoile") >= 0){
            this.contain.classList.remove("card_devoile")
        } else {
            this.contain.classList.add("card_devoile")
        }
    }

    card_appear_hors_champs(){
        this.style = "bottom : -100px"
    }

    anim_use(){
        return new Promise((r, f) => {
            this.remove_clickable()
            this.contain.animate([
                { transform : "translateY(100px)" },
                { transform : "scale(1.2)"}
            ], {
                duration : 200,
                fill : "forwards"
            })

            setTimeout(() => {
                $(this.contain).fadeOut("slow", function(e){
                    r(true)
                })
            }, 300);
        })
    }


    /***************************************************** SET */
    set_use(on_off){
        this.usable = on_off ? true : false
    }
}