class Grouper {
	constructor() {
		this.individuals = [];
		this.addIndividual();
	}
	
	addIndividual() {
		let individualIndex = this.individuals.length;
		this.individuals.push(
			{
				name: "n"+individualIndex,
				marks: []
			}
		);
		return individualIndex;
	}
	
	
}

let grouper = new Grouper();

function addIndividual() {
	let individualIndex = grouper.addIndividual();
	document.getElementById("individualList").innerHTML += 
		"<h4 id='individual"+individualIndex+"'>n"+individualIndex+": </h4><input type='text' cols='25'>";
}