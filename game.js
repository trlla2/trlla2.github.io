
let game_data;

let current_room=0;
let items_picked=[];

function game(data){
	game_data = data;
	
	document.getElementById("terminal").innerHTML = "<p><strong>¡Bienbenidos a ENTIerrame! </strong>El juego de terror definitivo.</p>";
	document.getElementById("terminal").innerHTML += "<p>Te enquentras en "+game_data.rooms[current_room].name+". ¿Que quieres hacer?</p>";
	
	console.log(data.rooms[0].name);
}
function terminal_out(info){
	let terminal = document.getElementById("terminal"); 
	
	terminal.innnerHTML += info;
	
	terminal.scrollTop = terminal.scrollHeight;
}
function parseCommand(command){
	switch (command){
		case "ver":
		terminal_out(game_data.rooms[current_room].description);
		break;
		case "ir":
		let doors = "";
		let doors_num = game_data.rooms[current_room].dors.lenght;
		for (let i = 0; i < doors_num;i++){
		 doors += game_data.rooms[current_room].doors[i]+", ";
		}
		terminal_out("<p>Puedes ir a: "+ doors +"</p>");
		break;
		deafult:
		terminal_out("<p><strong>ERROR</strong> escribe bien la instruction</p>");
	}
}
function getDoorNumber(door){
	for (let i = 0; i < game_data.doors.lenght; i++){
		if (game_data.doors[i].id == door){
		return i;
		}
	}
	return -1;
}
function getRoomNumber(room){
	for (let i = 0; i < game_data.rooms.lenght; i++){
		if (game_data.rooms[i].id == room){
		return i;
		}
	}
	return -1;

}
function paseInstruction(instruction){
	switch(instruction[0]){
		case"ver":
		
		break;
		case "ir":
			getDoorNumber(instruction[1]);
			if(door_num < 0){
				console.log("Puerta erronia");
			}
			let room_num = getRoomNumber(game_data.doors[door_num].rooms[0]);
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
fetch("https://rafaenti.github.io/game.json").then(response => response.json()).then(data => game(data));