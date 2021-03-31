
var app = new Vue({
	el:"#root",
	data: {
		inputMsg : " ",
		activeIndex : 0,
		contacts : contacts,
		filterMsg : "",
		isActive : false
	},
	
	methods: {
		active(index) {
			this.activeIndex = index
		},

		lastMsg(index) {
			let msg = contacts[index].messages;
			return msg[msg.length - 1]
		},

        /* getTime : function(date) {
			let dateTime = new Date(date);
			let hours = dateTime.getHours();
			let minutes = dateTime.getMinutes();
			return `${hours} : ${minutes}`;
		}, */

		addMsg() {
            if (this.inputMsg != "") {
				//pushare all'interno dell'utente active il nuovo messaggio 
                let obj = {
                    date: this.now(),
                    text: this.inputMsg,
                    status: 'sent',
					drop: false
                }
                this.contacts[this.activeIndex].messages.push(obj)
                this.inputMsg = ""
				//richiamo rix automatica
                this.rixAuto()
            }
        },
	

		rixAuto() {
            setTimeout(() => {
				// Settare dopo 1 secondo la risposta automatica
                let obj = {
                    date: this.now(),
                    text: "Ooooook",
                    status: 'received',
					drop:false
                }
                this.contacts[this.activeIndex].messages.push(obj)

            }, 1000);
        },
		
		now() {
            return moment().format("HH:mm");
        },
       
		//Prendere ora del messaggio inviato
        getFormattedtime(utente) {

            let time = utente.messages[utente.messages.length - 1].date;

            return moment(time,"HH:mm").format('HH:mm');
        },
		 searchUtente(){

            // Salvo il valore scritto nell'input in variabile
            let search = this.filterMsg.toLowerCase();

            console.log(search);

            // Scorro l'array contacts
            this.contacts.forEach((utente) => {

                // Controllo se utente è incluso in stringa search
                if (utente.name.toLowerCase().includes(search)) {
                    // stampo 
                    utente.visible = true;
                } else {
                    // non stampo
                    utente.visible = false;
                }
            });

        },
		showDrop(index){
            if(this.contacts[this.activeIndex].messages[index].drop == false){
                this.contacts[this.activeIndex].messages[index].drop = true;
            }else{
                this.contacts[this.activeIndex].messages[index].drop = false;
            }
        },
		deleteMsg(index){
            this.contacts[this.activeIndex].messages.splice(index, 1);
			
        },
		
	}
	
});


