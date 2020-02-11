
// racourci de document.getElementById
function $(id){
	return document.getElementById(id);
}

function toggle() {
  	var x = document.getElementById("listTodos");
  	if (x.style.display === "none") {
    	x.style.display = "block";
  	} else {
    	x.style.display = "none";
  	}
}


/**************************************************************************
        	VIDER LES DONNEES LORSQU'UN AUTRE USER EST SELECTIONNE
**************************************************************************/

$('listUsers').onchange = function (){
	$("listTodos").innerHTML = '';
	$("listAlbums").innerHTML = '';
	$("photos").innerHTML = '';
	$("listArticles").innerHTML = '';
}


/**************************************************************************
                            SELECT & HIS OPTIONS
**************************************************************************/

fetch('https://jsonplaceholder.typicode.com/users').then(function(result){
	console.warn('Données récupérées !');
	result.json()
		.then(function(data){
			console.warn('Données Jsonizées !');
			console.log(data);


			// Créé les <option> du <select> en fonction des données de l'API
			for (user of data) {
				let sel = $('listUsers');
				let opt = document.createElement('option');

				opt.appendChild(document.createTextNode(user.name));
				opt.value = user.id;

				sel.appendChild(opt);
			}
		});
}).catch(function(error){
	console.error('Une erreur s\'est produite.');
	console.log(error);
});



/**************************************************************************
                                TODO LIST
**************************************************************************/

$('loadTodo').onclick = function (){

	

	// Permet d'éviter de doubler l'affichage de la Todo list quand on clique plusieur fois sur le bouton 
	$("listTodos").innerHTML = '';


	// Récupère l'ID de l'utilisateur
	let sel = $('listUsers');
	let valueSel = sel.options[sel.selectedIndex].value;

	fetch('https://jsonplaceholder.typicode.com/todos?userId=' + valueSel).then(function(result){
		console.warn('Données récupérées !');
		result.json()
			.then(function(data){
				console.warn('Données Jsonizées !');
				console.log(data);

				// Créé les <li> du <ul> en fonction des données de l'API
				for (todo of data) {

					// Préparation du ou des <li>
					let ul = $('listTodos');
					let li = document.createElement('li');

					li.innerHTML = todo.title;



					// 
					if(todo.completed === true){						
						li.style.textDecoration = 'line-through';
					}


					// Création définitive dans le DOM du ou des <li>
					ul.appendChild(li);
				}
			});
	}).catch(function(error){
		console.error('Une erreur s\'est produite.');
		console.log(error);
	});
}
		


/**************************************************************************
                            ALBUMS PHOTOS
**************************************************************************/

$('loadAlbums').onclick = function (){

	// Permet d'éviter de doubler l'affichage de la list d'albums quand on clique plusieur fois sur le bouton 
	$("listAlbums").innerHTML = '';
	


	// Récupère l'ID de l'utilisateur
	let sel = $('listUsers');
	let valueSel = sel.options[sel.selectedIndex].value;

	fetch('https://jsonplaceholder.typicode.com/albums?userId=' + valueSel).then(function(result){
		console.warn('Données récupérées !');
		result.json()
			.then(function(data){
				console.warn('Données Jsonizées !');
				console.log(data);


				// Créé les <li> du <ul> en fonction des données de l'API
				for (album of data) {

					// Préparation du ou des <li>
					let ul = $('listAlbums');
					let li = document.createElement('li');

					li.innerHTML = '<button class="btn btn-outline-dark mb-2 btn-block" value="'+ album.id +'">' + album.title + '</button>';
					
					li.addEventListener('click', function(e){						
						// console.log(e);
						let valueAlbum = e.target.value;
						console.log(valueAlbum);

						$("photos").innerHTML = '';

						fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + valueAlbum).then(function(result){
							console.warn('Données récupérées !');
							result.json()
								.then(function(data){
									console.warn('Données Jsonizées !');
									console.log(data);

									for (photo of data) {
										console.log(photo.thumbnailUrl);
										$('photos').innerHTML += '<a class="mr-2 mb-2" target="_blank" href="' + photo.url + '"><img src="' + photo.thumbnailUrl + '" alt="' + photo.title + '" title="' + photo.title + '"></a>';
									}
								});
						}).catch(function(error){
							console.error('Une erreur s\'est produite.');
							console.log(error);
						});
					})


					// Création définitive dans le DOM du ou des <li>
					ul.appendChild(li);





				}
			});
	}).catch(function(error){
		console.error('Une erreur s\'est produite.');
		console.log(error);
	});
}


/**************************************************************************
                            	ARTICLES
**************************************************************************/

$('loadArticles').onclick = function (){

	// Permet d'éviter de doubler l'affichage de la list d'albums quand on clique plusieur fois sur le bouton 
	$("listArticles").innerHTML = '';
	


	// Récupère l'ID de l'utilisateur
	let sel = $('listUsers');
	let valueSel = sel.options[sel.selectedIndex].value;

	fetch('https://jsonplaceholder.typicode.com/posts?userId=' + valueSel).then(function(result){
		console.warn('Données récupérées !');
		result.json()
			.then(function(data){
				console.warn('Données Jsonizées !');
				console.log(data);

				for (article of data) {
					
					// $('listArticles').innerHTML += '<div>';
					$('listArticles').innerHTML += '<h3 class="mt-5">' + article.title + '</h3>';
					$('listArticles').innerHTML += '<p class="text-justify">' + article.body + '</p>';
					$('listArticles').innerHTML += '<p class="text-muted font-weight-light ml-3 font-italic">Commentaire(s) :</p>';
					$('listArticles').innerHTML += '<div id="commentairesArticle' + article.id + '">';

					fetch('https://jsonplaceholder.typicode.com/comments?postId=' + article.id).then(function(result){
						console.warn('Données récupérées !');
						result.json()
							.then(function(commentaires){
								console.warn('Données Jsonizées !');
								console.log(commentaires);

								// for (commentaire of commentaires) {
									
								// 	$('commentairesArticle' + commentaire.postId).innerHTML += '<div class="bg-dark">';
								// 	$('commentairesArticle' + commentaire.postId).innerHTML += '<h5>' + commentaire.name + '</h5>';
								// 	$('commentairesArticle' + commentaire.postId).innerHTML += '<p class="text-italic">' + commentaire.email + '</p>';
								// 	$('commentairesArticle' + commentaire.postId).innerHTML += '<p>' + commentaire.body + '</p>';							
								// 	$('commentairesArticle' + commentaire.postId).innerHTML += '</div>';							
								// }

								for (commentaire of commentaires) {
									
									$('commentairesArticle' + commentaire.postId).innerHTML += '<div class="col-lg-6 bg-light border border-grey rounded shadow px-3 pb-0 pt-3 ml-5 mb-3"><h5 class="mb-0">' + commentaire.name + '</h5><p class="font-italic text-muted mb-0 ml-4">' + commentaire.email + '</p><p>' + commentaire.body + '</p></div>';
														
								}

							});
					}).catch(function(error){
						console.error('Une erreur s\'est produite.');
						console.log(error);
					});

					$('listArticles').innerHTML += '</div>';
					// $('listArticles').innerHTML += '</div>';
				}

			});
	}).catch(function(error){
		console.error('Une erreur s\'est produite.');
		console.log(error);
	});
}