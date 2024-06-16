'use strict'

/************************************************************/
/* Constantes */
/************************************************************/

/*------------------------------------------------------------*/
// Dimensions du plateau
/*------------------------------------------------------------*/

// Nombre de cases par défaut du simulateur
const LARGEUR_PLATEAU	= 30;
const HAUTEUR_PLATEAU	= 15;

// Dimensions des cases par défaut en pixels
const LARGEUR_CASE	= 35;
const HAUTEUR_CASE	= 40;


/*------------------------------------------------------------*/
// Types des cases
/*------------------------------------------------------------*/
class Type_de_case{
	static Foret					= new Type_de_case('foret');

	static Eau						= new Type_de_case('eau');

	static Rail_horizontal			= new Type_de_case('rail horizontal');

	static Rail_vertical			= new Type_de_case('rail vertical');

	// NOTE: faisant la jonction de horizontal à vertical en allant vers la droite puis vers le haut (ou de vertical vers horizontal en allant de bas vers gauche)
	static Rail_droite_vers_haut	= new Type_de_case('rail droite vers haut');

	// NOTE: faisant la jonction de vertical à horizontal en allant vers le haut puis vers la droite (ou de horizontal à vertical en allant de gauche vers le bas)
	static Rail_haut_vers_droite	= new Type_de_case('rail haut vers droite');

	// NOTE: faisant la jonction de horizontal à vertical en allant vers la droite puis vers le bas (ou de vertical vers horizontal en allant de haut vers gauche)
	static Rail_droite_vers_bas		= new Type_de_case('rail droite vers bas');

	// NOTE: faisant la jonction de vertical à horizontal en allant vers le bas puis vers la droite (ou de horizontal à vertical en allant de gauche vers le haut)
	static Rail_bas_vers_droite		= new Type_de_case('rail bas vers droite');

	constructor(nom) {
		this.nom = nom;
	}
}



/*------------------------------------------------------------*/
// Images
/*------------------------------------------------------------*/
const IMAGE_EAU = new Image();
IMAGE_EAU.src = 'images/eau.png';

const IMAGE_FORET = new Image();
IMAGE_FORET.src = 'images/foret.png';

const IMAGE_LOCO = new Image();
IMAGE_LOCO.src = 'images/locomotive.png';

const IMAGE_RAIL_HORIZONTAL = new Image();
IMAGE_RAIL_HORIZONTAL.src = 'images/rail-horizontal.png';

const IMAGE_RAIL_VERTICAL = new Image();
IMAGE_RAIL_VERTICAL.src = 'images/rail-vertical.png';

const IMAGE_RAIL_BAS_VERS_DROITE = new Image();
IMAGE_RAIL_BAS_VERS_DROITE.src = 'images/rail-bas-vers-droite.png';

const IMAGE_RAIL_DROITE_VERS_BAS = new Image();
IMAGE_RAIL_DROITE_VERS_BAS.src = 'images/rail-droite-vers-bas.png';

const IMAGE_RAIL_DROITE_VERS_HAUT = new Image();
IMAGE_RAIL_DROITE_VERS_HAUT.src = 'images/rail-droite-vers-haut.png';

const IMAGE_RAIL_HAUT_VERS_DROITE = new Image();
IMAGE_RAIL_HAUT_VERS_DROITE.src = 'images/rail-haut-vers-droite.png';

const IMAGE_WAGON = new Image();
IMAGE_WAGON.src = 'images/wagon.png';


/************************************************************/
// Variables globales
/************************************************************/

// TODO

/************************************************************/
/* Classes */
/************************************************************/

/*------------------------------------------------------------*/
// Plateau
/*------------------------------------------------------------*/

class Plateau{
	/* Constructeur d'un plateau vierge */
	constructor(){
		this.largeur = LARGEUR_PLATEAU;
		this.hauteur = HAUTEUR_PLATEAU;

		// NOTE: à compléter…

		// État des cases du plateau
		// NOTE: tableau de colonnes, chaque colonne étant elle-même un tableau de cases (beaucoup plus simple à gérer avec la syntaxe case[x][y] pour une coordonnée (x,y))
		this.cases = [];
		for (let x = 0; x < this.largeur; x++) {
			this.cases[x] = [];
			for (let y = 0; y < this.hauteur; y++) {
				this.cases[x][y] = Type_de_case.Foret;
			}
		}
	}

	// NOTE: à compléter…

}

// classe Train

class Train{
	constructor(posX,posY,type,loco){
		this.x = posX;
		this.y = posY;
		this.type = type;
		this.direction= "droite";
		this.wagons= [];
		this.loco = loco;
	}
}


/************************************************************/
// Méthodes
/************************************************************/

function image_of_case(type_de_case){
	switch(type_de_case){
		case Type_de_case.Foret					: return IMAGE_FORET;
		case Type_de_case.Eau					: return IMAGE_EAU;
		case Type_de_case.Rail_horizontal		: return IMAGE_RAIL_HORIZONTAL;
		case Type_de_case.Rail_vertical			: return IMAGE_RAIL_VERTICAL;
		case Type_de_case.Rail_droite_vers_haut	: return IMAGE_RAIL_DROITE_VERS_HAUT;
		case Type_de_case.Rail_haut_vers_droite	: return IMAGE_RAIL_HAUT_VERS_DROITE;
		case Type_de_case.Rail_droite_vers_bas	: return IMAGE_RAIL_DROITE_VERS_BAS;
		case Type_de_case.Rail_bas_vers_droite	: return IMAGE_RAIL_BAS_VERS_DROITE;
    }
}


function dessine_case(contexte, plateau, x, y){
	const la_case = plateau.cases[x][y];

	// NOTE: à améliorer

	let image_a_afficher = image_of_case(la_case);
	// Affiche l'image concernée
	contexte.drawImage(image_a_afficher, x * LARGEUR_CASE, y * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
}

function dessine_plateau(page, plateau){
	// Dessin du plateau avec paysages et rails
	for (let x = 0; x < plateau.largeur; x++) {
		for (let y = 0; y < plateau.hauteur; y++) {
			dessine_case(page, plateau, x, y);
		}
	}

	// NOTE: à compléter…
}

function boutonsinit(plateau,tableauTrains){
	const boutons = document.querySelectorAll('input');
	boutons.forEach((bouton) => {
		bouton.addEventListener('click', () => {
			bouton.disabled = true;
			posercase(bouton.id,plateau,tableauTrains,bouton);
		});
	});
}

function posercase(id,plateau,tableauTrains,bouton){
	const canvas = document.getElementById('simulateur');
	const contexte = document.getElementById('simulateur').getContext("2d");

	canvas.addEventListener('click', function(event) {
    	const rect = canvas.getBoundingClientRect();
    	const x = event.clientX - rect.left;
    	const y = event.clientY - rect.top;
    	const caseX = Math.floor(x / LARGEUR_CASE);
    	const caseY = Math.floor(y / HAUTEUR_CASE);
		switch(id){
			case "bouton_foret" : plateau.cases[caseX][caseY] = Type_de_case.Foret;dessine_case(contexte,plateau,caseX,caseY); break;
			case "bouton_eau" : plateau.cases[caseX][caseY] = Type_de_case.Eau;dessine_case(contexte,plateau,caseX,caseY); break;
			case "bouton_rail_horizontal" : plateau.cases[caseX][caseY] = Type_de_case.Rail_horizontal;dessine_case(contexte,plateau,caseX,caseY); break;
			case "bouton_rail_vertical" : plateau.cases[caseX][caseY] = Type_de_case.Rail_vertical;dessine_case(contexte,plateau,caseX,caseY);; break;
			case "bouton_rail_droite_vers_haut" : plateau.cases[caseX][caseY] = Type_de_case.Rail_droite_vers_haut;dessine_case(contexte,plateau,caseX,caseY); break;
			case "bouton_rail_haut_vers_droite" : plateau.cases[caseX][caseY] = Type_de_case.Rail_haut_vers_droite;dessine_case(contexte,plateau,caseX,caseY); break;
			case "bouton_rail_droite_vers_bas" : plateau.cases[caseX][caseY] = Type_de_case.Rail_droite_vers_bas;dessine_case(contexte,plateau,caseX,caseY); break;
			case "bouton_rail_bas_vers_droite" : plateau.cases[caseX][caseY] = Type_de_case.Rail_bas_vers_droite;dessine_case(contexte,plateau,caseX,caseY); break;
			case "bouton_train_1" :
				if (plateau.cases[caseX][caseY] == Type_de_case.Rail_horizontal){
					let train = new Train(caseX,caseY,"1",1);
					tableauTrains.push(train);
					dessiner_train(caseX,caseY,"1");
					break;
				}
			case "bouton_train_2" :
				if (plateau.cases[caseX][caseY] == Type_de_case.Rail_horizontal && plateau.cases[caseX - 1][caseY] == Type_de_case.Rail_horizontal){
					dessiner_train(caseX,caseY,"1");
					dessiner_train(caseX - 1,caseY,"2",2);
					let train1 = new Train(caseX,caseY,"1",1);
					let train2 = new Train(caseX - 1,caseY,"2",0);
					train1.wagons.push(train2);
					tableauTrains.push(train1);
					tableauTrains.push(train2);
					break;
				}
			case "bouton_train_4" :
				if (plateau.cases[caseX][caseY] == Type_de_case.Rail_horizontal && plateau.cases[caseX - 1][caseY] == Type_de_case.Rail_horizontal && plateau.cases[caseX - 2][caseY] == Type_de_case.Rail_horizontal && plateau.cases[caseX - 3][caseY] == Type_de_case.Rail_horizontal){
					dessiner_train(caseX,caseY,"1");
					dessiner_train(caseX - 1,caseY,"2");
					dessiner_train(caseX - 2,caseY,"2");
					dessiner_train(caseX - 3,caseY,"2");
					let train1 = new Train(caseX,caseY,"1",1);
					let train2 = new Train(caseX - 1,caseY,"2",2);
					let train3 = new Train(caseX - 2,caseY,"2",2);
					let train4 = new Train(caseX - 3,caseY,"2",2);
					train1.wagons.push(train2);
					train1.wagons.push(train3);
					train1.wagons.push(train4);
					tableauTrains.push(train1);
					tableauTrains.push(train2);
					tableauTrains.push(train3);
					tableauTrains.push(train4);
					break;
			}
			case "bouton_train_6" :
				if (plateau.cases[caseX][caseY] == Type_de_case.Rail_horizontal && plateau.cases[caseX - 1][caseY] == Type_de_case.Rail_horizontal && plateau.cases[caseX - 2][caseY] == Type_de_case.Rail_horizontal && plateau.cases[caseX - 3][caseY] == Type_de_case.Rail_horizontal && plateau.cases[caseX - 4][caseY] == Type_de_case.Rail_horizontal && plateau.cases[caseX - 5][caseY] == Type_de_case.Rail_horizontal){
					dessiner_train(caseX,caseY,"1");
					dessiner_train(caseX - 1,caseY,"2");
					dessiner_train(caseX - 2,caseY,"2");
					dessiner_train(caseX - 3,caseY,"2");
					dessiner_train(caseX - 4,caseY,"2");
					dessiner_train(caseX - 5,caseY,"2");
					let train1 = new Train(caseX,caseY,"1",1);
					let train2 = new Train(caseX - 1,caseY,"2",2);
					let train3 = new Train(caseX - 2,caseY,"2",2);
					let train4 = new Train(caseX - 3,caseY,"2",2);
					let train5 = new Train(caseX - 4,caseY,"2",2);
					let train6 = new Train(caseX - 5,caseY,"2",2);
					train1.wagons.push(train2);
					train1.wagons.push(train3);
					train1.wagons.push(train4);
					train1.wagons.push(train5);
					train1.wagons.push(train6);
					tableauTrains.push(train1);
					tableauTrains.push(train2);
					tableauTrains.push(train3);
					tableauTrains.push(train4);
					tableauTrains.push(train5);
					tableauTrains.push(train6);

					break;
			}
		}
		id = null;
		//console.log(plateau.cases[caseX][caseY]);
		bouton.disabled = false;
	});
}
function dessiner_train(caseX,caseY,type){
	const contexte = document.getElementById('simulateur').getContext("2d");

		if(type == "1"){
			contexte.drawImage(IMAGE_LOCO, caseX * LARGEUR_CASE, caseY * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
		}
		else{
			contexte.drawImage(IMAGE_WAGON, caseX * LARGEUR_CASE, caseY * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
		}
}
function effacer_train(caseX,caseY,plateau){
	const contexte = document.getElementById('simulateur').getContext("2d");
	contexte.clearRect(caseX * LARGEUR_CASE, caseY * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
	dessine_case(contexte,plateau,caseX,caseY);
}
function deplacer_trains(plateau,tableauTrains,Pause){
	if(Pause == false){
		tableauTrains.forEach((train) => {
		let chgmt = 0;
		if(checkbounds(train)==1){
			detruire_train(train,tableauTrains,plateau);
			effacer_train(train.x,train.y,plateau);
			return;
		}
		if(chgmt == 0 && plateau.cases[train.x][train.y].nom == 'rail horizontal' && train.direction == "droite"){
			chgmt = 1;
		}
		if(chgmt == 0 && plateau.cases[train.x][train.y].nom == 'rail horizontal' && train.direction == "gauche"){
			chgmt = 1;
		}
		if(chgmt == 0 && plateau.cases[train.x][train.y].nom == 'rail vertical' && train.direction == "haut"){
			chgmt = 1;
		}
		if(chgmt == 0 && plateau.cases[train.x][train.y].nom == 'rail vertical' && train.direction == "bas"){
			chgmt = 1;
		}
		if(chgmt == 0 && plateau.cases[train.x][train.y].nom == 'rail droite vers haut' && train.direction == "droite"){
			train.direction = "haut";
			chgmt = 1;
		}else
		if(chgmt == 0 && plateau.cases[train.x][train.y].nom == 'rail droite vers haut' && train.direction == "bas"){
			train.direction = "gauche";
			chgmt = 1;
		}else
		if(chgmt == 0 && plateau.cases[train.x][train.y].nom == 'rail bas vers droite' && train.direction == "bas"){
			train.direction = "droite";
			chgmt = 1;
		}else
		if(chgmt == 0 && plateau.cases[train.x][train.y].nom == 'rail bas vers droite' && train.direction == "gauche"){
			train.direction = "haut";
			chgmt = 1;
		}else
		if(chgmt == 0 && plateau.cases[train.x][train.y].nom == 'rail droite vers bas' && train.direction == "droite"){
			train.direction = "bas";
			chgmt = 1;
		}else
		if(chgmt == 0 && plateau.cases[train.x][train.y].nom == 'rail droite vers bas' && train.direction == "haut"){
			train.direction = "gauche";
			chgmt = 1;
		}else
		if(chgmt == 0 && plateau.cases[train.x][train.y].nom == 'rail haut vers droite' && train.direction == "haut"){
			train.direction = "droite";
			chgmt = 1;
		}else
		if(chgmt == 0 && plateau.cases[train.x][train.y].nom == 'rail haut vers droite' && train.direction == "gauche"){
			train.direction = "bas";
			chgmt = 1;
		}
		if (chgmt == 0){
			effacer_train(train.x,train.y,plateau);
			detruire_train(train,tableauTrains,plateau);
			effacer_train(train.x,train.y,plateau);
			return;
		}
		chgmt = 0;
		if(train.direction == "droite"){
			effacer_train(train.x,train.y,plateau);
			train.x++;
			dessiner_train(train.x,train.y,train.type);
		}
		else if(train.direction == "gauche"){
			effacer_train(train.x,train.y,plateau);
			train.x--;
			dessiner_train(train.x,train.y,train.type);
		}
		else if(train.direction == "haut"){
			effacer_train(train.x,train.y,plateau);
			train.y--;
			dessiner_train(train.x,train.y,train.type);
		}
		else if(train.direction == "bas"){
			effacer_train(train.x,train.y,plateau);
			train.y++;
			dessiner_train(train.x,train.y,train.type);
		}
		if(checkcollisions(train,tableauTrains,plateau)==1){
			return;
		}
	});

	}
}
function detruire_train(train, tableauTrains,plateau){
	let index = tableauTrains.indexOf(train);
	if (index !== -1) {
	  	tableauTrains.splice(index, 1);
	}
	train.wagons.forEach((wagon) => {
		effacer_train(wagon.x,wagon.y,plateau);
		detruire_train(wagon,tableauTrains);
	});
}
function checkbounds(train){
	if(train.x < 0 || train.x > LARGEUR_PLATEAU || train.y < 0 || train.y > HAUTEUR_PLATEAU){
		return 1;
	}
	return 0;
}
function checkcollisions(train,tableauTrains,plateau){
	tableauTrains.forEach((train2) => {
		if(train != train2 && train.x == train2.x && train.y == train2.y){
			effacer_train(train.x,train.y,plateau);
			detruire_train(train,tableauTrains,plateau);
			effacer_train(train2.x,train2.y,plateau);
			detruire_train(train2,tableauTrains,plateau);
			return 1;
		}
	});
	return 0;
}

/************************************************************/
// Plateau de jeu initial
/************************************************************/


// NOTE : ne pas modifier le plateau initial
function cree_plateau_initial(plateau){
	// Circuit
	plateau.cases[12][7] = Type_de_case.Rail_horizontal;
	plateau.cases[13][7] = Type_de_case.Rail_horizontal;
	plateau.cases[14][7] = Type_de_case.Rail_horizontal;
	plateau.cases[15][7] = Type_de_case.Rail_horizontal;
	plateau.cases[16][7] = Type_de_case.Rail_horizontal;
	plateau.cases[17][7] = Type_de_case.Rail_horizontal;
	plateau.cases[18][7] = Type_de_case.Rail_horizontal;
	plateau.cases[19][7] = Type_de_case.Rail_droite_vers_haut;
	plateau.cases[19][6] = Type_de_case.Rail_vertical;
	plateau.cases[19][5] = Type_de_case.Rail_droite_vers_bas;
	plateau.cases[12][5] = Type_de_case.Rail_horizontal;
	plateau.cases[13][5] = Type_de_case.Rail_horizontal;
	plateau.cases[14][5] = Type_de_case.Rail_horizontal;
	plateau.cases[15][5] = Type_de_case.Rail_horizontal;
	plateau.cases[16][5] = Type_de_case.Rail_horizontal;
	plateau.cases[17][5] = Type_de_case.Rail_horizontal;
	plateau.cases[18][5] = Type_de_case.Rail_horizontal;
	plateau.cases[11][5] = Type_de_case.Rail_haut_vers_droite;
	plateau.cases[11][6] = Type_de_case.Rail_vertical;
	plateau.cases[11][7] = Type_de_case.Rail_bas_vers_droite;

	// Segment isolé à gauche
	plateau.cases[0][7] = Type_de_case.Rail_horizontal;
	plateau.cases[1][7] = Type_de_case.Rail_horizontal;
	plateau.cases[2][7] = Type_de_case.Rail_horizontal;
	plateau.cases[3][7] = Type_de_case.Rail_horizontal;
	plateau.cases[4][7] = Type_de_case.Rail_horizontal;
	plateau.cases[5][7] = Type_de_case.Eau;
	plateau.cases[6][7] = Type_de_case.Rail_horizontal;
	plateau.cases[7][7] = Type_de_case.Rail_horizontal;

	// Plan d'eau
	for(let x = 22; x <= 27; x++){
		for(let y = 2; y <= 5; y++){
			plateau.cases[x][y] = Type_de_case.Eau;
		}
	}

	// Segment isolé à droite
	plateau.cases[22][8] = Type_de_case.Rail_horizontal;
	plateau.cases[23][8] = Type_de_case.Rail_horizontal;
	plateau.cases[24][8] = Type_de_case.Rail_horizontal;
	plateau.cases[25][8] = Type_de_case.Rail_horizontal;
	plateau.cases[26][8] = Type_de_case.Rail_bas_vers_droite;
	plateau.cases[27][8] = Type_de_case.Rail_horizontal;
	plateau.cases[28][8] = Type_de_case.Rail_horizontal;
	plateau.cases[29][8] = Type_de_case.Rail_horizontal;

	// TCHOU
	plateau.cases[3][10] = Type_de_case.Eau;
	plateau.cases[4][10] = Type_de_case.Eau;
	plateau.cases[4][11] = Type_de_case.Eau;
	plateau.cases[4][12] = Type_de_case.Eau;
	plateau.cases[4][13] = Type_de_case.Eau;
	plateau.cases[4][13] = Type_de_case.Eau;
	plateau.cases[5][10] = Type_de_case.Eau;

	plateau.cases[7][10] = Type_de_case.Eau;
	plateau.cases[7][11] = Type_de_case.Eau;
	plateau.cases[7][12] = Type_de_case.Eau;
	plateau.cases[7][13] = Type_de_case.Eau;
	plateau.cases[8][10] = Type_de_case.Eau;
	plateau.cases[9][10] = Type_de_case.Eau;
	plateau.cases[8][13] = Type_de_case.Eau;
	plateau.cases[9][13] = Type_de_case.Eau;

	plateau.cases[11][10] = Type_de_case.Eau;
	plateau.cases[11][11] = Type_de_case.Eau;
	plateau.cases[11][12] = Type_de_case.Eau;
	plateau.cases[11][13] = Type_de_case.Eau;
	plateau.cases[12][11] = Type_de_case.Eau;
	plateau.cases[13][10] = Type_de_case.Eau;
	plateau.cases[13][11] = Type_de_case.Eau;
	plateau.cases[13][12] = Type_de_case.Eau;
	plateau.cases[13][13] = Type_de_case.Eau;

	plateau.cases[15][10] = Type_de_case.Eau;
	plateau.cases[15][11] = Type_de_case.Eau;
	plateau.cases[15][12] = Type_de_case.Eau;
	plateau.cases[15][13] = Type_de_case.Eau;
	plateau.cases[16][10] = Type_de_case.Eau;
	plateau.cases[16][13] = Type_de_case.Eau;
	plateau.cases[17][10] = Type_de_case.Eau;
	plateau.cases[17][11] = Type_de_case.Eau;
	plateau.cases[17][12] = Type_de_case.Eau;
	plateau.cases[17][13] = Type_de_case.Eau;

	plateau.cases[19][10] = Type_de_case.Eau;
	plateau.cases[19][11] = Type_de_case.Eau;
	plateau.cases[19][12] = Type_de_case.Eau;
	plateau.cases[19][13] = Type_de_case.Eau;
	plateau.cases[20][13] = Type_de_case.Eau;
	plateau.cases[21][10] = Type_de_case.Eau;
	plateau.cases[21][11] = Type_de_case.Eau;
	plateau.cases[21][12] = Type_de_case.Eau;
	plateau.cases[21][13] = Type_de_case.Eau;
}




/************************************************************/
// Fonction principale
/************************************************************/

function tchou(){
	console.log("Tchou, attention au départ !");
	/*------------------------------------------------------------*/
	// Variables DOM
	/*------------------------------------------------------------*/
	const contexte = document.getElementById('simulateur').getContext("2d");
	let Pause = false;
	document.getElementById('bouton_pause').addEventListener('click', function() {
		Pause = !Pause;
		this.textContent = Pause ? 'Redémarrer' : 'Pause';
	});

	// NOTE: ce qui suit est sûrement à compléter voire à réécrire intégralement

	// Création du plateau
	let plateau = new Plateau();
	let tableauTrains = [];
	cree_plateau_initial(plateau);


	// Dessine le plateau
	dessine_plateau(contexte, plateau);
	boutonsinit(plateau,tableauTrains);
	setInterval(() => {deplacer_trains(plateau,tableauTrains,Pause);}, 500);

}

/************************************************************/
// Programme principal
/************************************************************/
// NOTE: rien à modifier ici !
window.addEventListener("load", () => {
	// Appel à la fonction principale

	tchou();

});

