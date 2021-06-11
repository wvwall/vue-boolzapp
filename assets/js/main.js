
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

		lastMsg: function(index) {
			let msg = this.contacts[index].messages;
			return msg[msg.length - 1]
		},

        /* getTime : function(date) {
			let dateTime = new Date(date);
			let hours = dateTime.getHours();
			let minutes = dateTime.getMinutes();
			return `${hours} : ${minutes}`;
		}, */

		addMsg: function() {
            if (this.inputMsg != "") {
				//pushare all'interno dell'utente active il nuovo messaggio 
                let obj = {
                    date: this.now(),
                    text: this.inputMsg,
                    status: 'sent',
					drop: false
                }
                this.contacts[this.activeIndex].messages.push(obj)
				this.rixAuto(this.inputMsg)
                this.inputMsg = ""
				//richiamo rix automatica
                
            }
        },
	

		rixAuto: function(message) {
			console.log(message);
			let msg = message;
            setTimeout(() => {
				console.log(msg);
				// Settare dopo 1 secondo la risposta automatica
                let obj = {
                    date: this.now(),
                    text: "Sono un attimo occupato, ci sentiamo dopo",
                    status: 'received',
					drop:false
                }
                this.contacts[this.activeIndex].messages.push(obj)
				console.log(msg);

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
		
		addDarkTheme() {
			let darkThemeLinkEl = document.createElement("link");
			darkThemeLinkEl.setAttribute("rel", "stylesheet");
			darkThemeLinkEl.setAttribute("href", "./assets/css/darkMode.css");
			darkThemeLinkEl.setAttribute("id", "dark-theme-style");
	  
			let docHead = document.querySelector("head");
			docHead.append(darkThemeLinkEl);
		  },
		  removeDarkTheme() {
			let darkThemeLinkEl = document.querySelector("#dark-theme-style");
			let parentNode = darkThemeLinkEl.parentNode;
			parentNode.removeChild(darkThemeLinkEl);
		  },
		  darkThemeSwitch() {
			let darkThemeLinkEl = document.querySelector("#dark-theme-style");
			if (!darkThemeLinkEl) {
			  this.addDarkTheme()
			} else {
			  this.removeDarkTheme()
			}
		  }
		
	}
	
});


