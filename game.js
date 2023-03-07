
let game_data;

let current_room=0;
let items_picked=[];

let command = [];

function terminal_out(info){
	let terminal = document.getElementById("terminal"); 
	
	terminal.innnerHTML += info;
	
	terminal.scrollTop = terminal.scrollHeight;
}

function getDoorNumber(door){
	for (let i = 0; i < game_data.doors.length; i++){
		if (game_data.doors[i].id == door){
			return i;
		}
	}
	return -1;
}

function getRoomNumber(room){
	for (let i = 0; i < game_data.rooms.length; i++){
		if (game_data.rooms[i].id == room){
			return i;
		}
	}
	return -1;
}

function getItemNumber (item){
	let items_num = game_data.items.length;
	
	for(let i = 0; i < items_num; i++){
		if(game_data.items[i].id == item){
			return i;
		}
	}
	
	return -1;
}

function executeCommand () {
	command = document.getElementById("commands").value.trim().split(" ");
	document.getElementById("commands").value = "";
	console.log(command);
	
	if (command.length == 0 || command == "") {
		terminalOut("<p><strong>ERROR:</strong> Escribe una instrucción</p>");
		return;
	}
	
	if (command.length == 1) {
		parseCommand(command[0]);
	}
	else {
		parseInstruction(command);
	}
}

/*
function readAction(){
	let command = document.getElementById("commands").value;
	let instruction_trim= instruction.trim();
	let data = command.trim().split(" ");
	
	if (data.lenght = 0 || instruction_trim == " ") {
		document.getElementById("terminal").innerHTML += "<strong>ERROR</strong> Escribe un comando correcto";
		return;
	}
	
	if ( data.lenght == 1){
		parseCommand(data[0]);
	}
	else
		paseInstruction(data);
	}
	
}
*/

function parseCommand(command){
      	console.log("comando", command);
	switch (command){
		case "ver":
			terminal_out("<p>"+game_data.rooms[current_room].description+"</p>");
			break;
			
		case "ir":
			let doors = "";
			let doors_num = game_data.rooms[current_room].doors.length;
			for (let i = 0; i < doors_num;i++){
				doors += game_data.rooms[current_room].doors[i]+", ";
			}
			terminal_out("<p>Puedes ir a: "+ doors +"</p>");
			break;
			//cogerP?
		default:
			terminal_out("<p><strong>Error</strong>: "+command+" commando no encontrado</p>");
	}
}

function paseInstruction(instruction){
	
	console.log("instruccion ", instruccion);
	
	switch(instruction[0]){
		case"ver":
		//llenar
			break;
		
		case "ir":
			let door_num = getDoorNumber(instruction[1]);
			if(door_num < 0){
				console.log("Puerta erronia");
				return;
			}
			
			console.log("Door num: ", door_num);
			
			let room_num = getRoomNumber(game_data.doors[door_num].rooms[0]);
			if(room_num < 0){
				console.log("Habitacion erronea");
				return;
			}
			
			console.log("Room num: ", room_num);
			
			if (room_num == current_room){
				current_room = getRoomNumber(game_data.doors[door_num].rooms[1]);
			}
			else{
				current_room = room_num;
			}
			//getRoomNumber(HABITACIoN);
			
			break;
		
		case"coger":
			game_data.rooms[current_room].items.forEach(function(item){
				if (items == instruction[1]){
					items_picked.push(item);
					let item_num = game_data.rooms[current_room].items.indexOf(items);
					if(item_num < 0){
						console.log("Error al borrar el item de la habitacion");
						return;
					}
				
					game_data.rooms[current_room]items.splice(items_num,1);
				
					return;
				}
			});
		
			break;
		
		case"ver":
		terminal_out(game_data.items[instruction[1]].description);
		break;
		deafult:
		terminal_out("<p><strong>ERROR</strong> escribe bien la instruction</p>");
	}
}


function game(data){
	game_data = data;
	
	document.getElementById("terminal").innerHTML = "<p><strong>¡Bienbenidos a ENTIerrame! </strong>El juego de terror definitivo.</p>";
	document.getElementById("terminal").innerHTML += "<p>Te enquentras en "+game_data.rooms[current_room].name+". ¿Que quieres hacer?</p>";
	
	console.log(data.rooms[0].name);
}

fetch("https://rafaenti.github.io/game.json").then(response => response.json()).then(data => game(data));