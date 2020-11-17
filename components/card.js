export default class Card extends HTMLDivElement{

    constructor(card, in_face, where){
        super()

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



        //creation du style
       let shadow = this.attachShadow({mode: 'open'});
       var style = document.createElement('style')
       style.textContent = `
.card {
    perspective: 1000px;
    height: 300px;
    width:200px;
    position:relative;
    z-index : 3;
    transition: transform 0.2s ease-in;
}

.box_inner{
    height: 100%;
    width:100%;
    position: relative;
    display:flex;
    flex-direction:column;
    justify-content : center;
    align-items : center;
    transition: transform 0.5s;
    transform-style: preserve-3d;
    text-align:center;
}

.card_devoile .box_inner{
    transform: rotateY(180deg);
}

.card_clickable{
    cursor:pointer;
}

.card_clickable:hover{
    transform : translateY(45px);
}

.handle:hover{
    transform : translateY(-45px);
    cursor:pointer;
}

.card .inner {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display:flex;
    flex-direction:column;
    justify-content : center;
    align-items : center;
    border-radius:7%;
    box-shadow:2px 2px 10px rgba(0, 0, 0, 0.5);
    padding:15px;
}

.card .face{
    z-index: 1;
    background-color:rgb(241, 241, 229);
}

.card .dos{
    z-index: 2;
    background-color:rgba(0, 0, 100, 1);
    transform: rotateY(180deg);
}
       `
       shadow.appendChild(style)
       shadow.appendChild(this.contain)


       if(!in_face){
        this.contain.classList.add("card_devoile")
       }

       switch(where){
           case "hand" :
               this.contain.classList.add("handle")
               break;
            case "pioche" :
                this.become_clickable()
                break;
       }
    }


    become_clickable(){
        this.contain.classList.add("card_clickable")
        this.contain.addEventListener('click', this.return_card.bind(this), true)
    }

    remove_clickable(){
        this.contain.classList.remove("card_clickable")
        this.contain.removeEventListener('click', this.return_card.bind(this), true)
    }


    return_card(){
        if(this.contain.className.indexOf("card_devoile") >= 0){
            this.contain.classList.remove("card_devoile")
        } else {
            this.contain.classList.add("card_devoile")
        }
        this.remove_clickable()
    }

    move(x, y){
        this.style = "transition:all 0.5s linear;transform:translate("+x+"px,"+y+"px);"
    }
}