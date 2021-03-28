
var app = new Vue({
	el:"#root",
	data: {
		inputMsg : " ",
		activeIndex : 0,
		contacts : contacts,
		
	},
	methods: {
		Active(index) {
			this.activeIndex = index
		},
		lastMsg(index) {
			let msg = contacts[index].messages
			return msg[msg.length - 1]
		},
        
	},
});


