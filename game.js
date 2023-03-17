
let game_data;

let current_room=0;
let items_picked=[];

let command = [];

function game(data){
	game_data = data;
	
	document.getElementById("terminal").innerHTML = "<p><strong>¡Bienvenidos a ENTIerrame! </strong>El juego de terror definitivo.</p>";
	document.getElementById("terminal").innerHTML += "<p>Te enquentras en "+game_data.rooms[current_room].name+". ¿Que quieres hacer?</p>";
	

}



function terminal_out(info){
	let terminal = document.getElementById("terminal"); 
	
	terminal.innerHTML += info;
	
	terminal.scrollTop = terminal.scrollHeight;
}

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
		case "coger":
			
			let items = "";
			let items_num = game_data.rooms[current_room].items.length;
			for(let i = 0; i < items_num; i++){
				items += game_data.rooms[current_room].items[i] + " ";
			}
			
			terminal_out("<p>En esta sala hay estos items: " + items + "</p>");
		
			break;
		case "inventario":
		
			if (items_picked.length == 0) {
				terminal_out("<p>no tienes ningun item en el inventario</p>");
				return;
			} 
			
			let inventory_item = "";
			let num_inventory_item = items_picked.length;
			for(let i = 0; i < num_inventory_item; i++){
				inventory_item += items_picked[i]+", "; 
			}
			
			terminal_out("<p>Tienes estos items en el inventario: " + inventory_item + "</p>");
			break;
		default:
			terminal_out("<p><strong>Error</strong>: "+command+" commando no encontrado</p>");
	}
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

function paseInstruction(instruction){
	
	console.log("instruccion ", instruction);
	
	switch(instruction[0]){
		case"ver":
			let item_number = getItemNumber(instruction[1]);
			
			if (item_number < 0) {
				terminal_out("<p>Item erróneo</p>");
				return;
			}
			
			let item_description = game_data.items[item_number].description;
			
			terminal_out("<p>" + item_description + "</p>");
		//?
			break;
		
		case "ir":
			let door_num = getDoorNumber(instruction[1]);
			if(door_num < 0){
				terminal_out("<p>Puerta erronia</p>");
				return;
			}
			

			
			let room_num = getRoomNumber(game_data.doors[door_num].rooms[0]);
			if(room_num < 0){
				terminal_out("<p>Habitacion erronea</p>");
				return;
			}
			
			
			
			if (room_num == current_room){
				current_room = getRoomNumber(game_data.doors[door_num].rooms[1]);
			}
			else{
				current_room = room_num;
			}
			terminal_out("<p> Acabas de entrar en " + game_data.rooms[current_room].name+ +" </p>");
			break;
		
		case"coger":
		
			
			game_data.rooms[current_room].items.forEach(function(items){
				if (items == instruction[1]){
					let item_num = game_data.rooms[current_room].items.indexOf(items);
					if(item_num < 0){
						console.log("Error al borrar el item de la habitacion");
						return;
					}
					
				if (game_data.items[getItemNumber(items)].pickable == false) {
						terminal_out("<p>Este item no se puede recojer</p>");
						return;
					}
					
					game_data.rooms[current_room].items.forEach(function(item) {
						if (items == instruction[1]) {
							items_picked.push(game_data.rooms[current_room].items.splice(item_num, 1));
						}
					});
					
					terminal_out(items+" ha sido añadido al inventario");
					return;
					
				}
			});
			
			break;
		case "inventario":
			let item_inventory =  getItemNumber(instruction[1]);
			
			if (item_inventory < 0) {
				terminal_out("<p>el objeto no esta en tu inventario</p>");
			return;
			}
			
			
			
			let invetory_item_description =  game_data.items[item_inventory].description;
			
			terminal_out("<p>" + invetory_item_description + "</p>");
			
			break;
		
		
		default:
		terminal_out("<p><strong>ERROR</strong> escribe bien la instruction</p>");
	}
}

function readAction(){
	let instruction = document.getElementById("commands").value;
	let instruction_trim= instruction.trim();
	
	let data = instruction_trim.split(" ");
	
	if (data.length === 0 || instruction_trim == " ") {
		document.getElementById("terminal").innerHTML += "<strong>ERROR</strong> Escribe un comando correcto";
		return;
	}
	
	if ( data.length == 1){
		parseCommand(data[0]);
	}
	
	paseInstruction(data);
	
	
}

fetch("https://trlla2.github.io/game.json").then(response => response.json()).then(data => game(data));
