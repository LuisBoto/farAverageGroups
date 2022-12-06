class Grouper {
	constructor() {
		this.individuals = [];
		this.addIndividual();
	}
	
	addIndividual() {
		let individualIndex = this.individuals.length+1;
		this.individuals.push(
			{
				name: "n"+individualIndex,
				marks: []
			}
		);
		return individualIndex;
	}
	
	parseMarksForIndividual(markString, individualIndex) {
		let marks = markString.split(" ");
		this.individuals[individualIndex].marks = []
		for (let i=0; i<marks.length; i++) {
			this.individuals[individualIndex].marks.push(parseFloat(marks[i]))
		}
		let finalMarks = this.individuals[individualIndex].marks;
		this.individuals[individualIndex].average = finalMarks.reduce((a, b) => a + b) / finalMarks.length;
	}

	getGroups() {
		let groups = [];
		let individuals = JSON.parse(JSON.stringify(this.individuals));
		individuals.sort((a, b) => parseFloat(a.average) - parseFloat(b.average));
		let groupSize = document.getElementById("groupSizeField").value
		let oddGroup = [], count = 0;
		while (individuals.length % groupSize != 0) {
			oddGroup.push(individuals[individuals.length/groupSize*count])
			individuals.splice(individuals.length/groupSize*count, 1);
		}
		if (oddGroup.length > 0) groups.push(oddGroup);
		for (let i=0; i<individuals.length/groupSize; i++) {
			let group = [];
			for (let j=0; j<groupSize; j++) {
				group.push(individuals[individuals.length/groupSize*j + i])
			}
			groups.push(group);
		}
		return groups;
	}
	
}

let grouper = new Grouper();

function addIndividual() {
	let individualIndex = grouper.addIndividual();
	document.getElementById("individualList").innerHTML += 
		"<h4 id='individual"+individualIndex+"'>n"+individualIndex+": </h4><input type='text' cols='25'>";
	document.getElementById("getGroupsButton").disabled=false;
}

function calculateGroups() {
	let individuals = document.getElementById("individualList").getElementsByTagName("input");
	individuals = Array.from(individuals);
	let count = 0;
	individuals.forEach(individual => {
		grouper.parseMarksForIndividual(individual.value.trim(), count);
		count++;
	});
	printGroupsOnConsole(grouper.getGroups());
}

function printGroupsOnConsole(groups) {
	document.getElementById("console").value = "Calculated groups: "+'\n';
	groups = groups.map(group => group.map(individual => individual.name));
	for (let i=0; i<groups.length; i++) {
		let groupMembers = "";
		groups[i].forEach(member => groupMembers += member+" ")
		document.getElementById("console").value += "Group number "+(i+1)+": "+groupMembers+ '\n';
	}
}