/* document.getElementById('test-button').addEventListener('click', function(){
	const links = document.querySelectorAll('.titles a');
	console.log('links', links);
}); */


{
const titleClickHandler = function(event){

	event.preventDefault();

	const clickedElement = this;

	/* console.log(event); */

	console.log('Link was clicked');

	/* [DONE] remove class 'active' from all article links*/
	const activeLinks = document.querySelectorAll('.titles a.active');

	for(let activeLink of activeLinks) {

		activeLink.classList.remove('active');

		/* console.log('usuń link ' + 'active'); */
	}
	/* [DONE] add class'active' to the clicked link */
	clickedElement.classList.add('active');

	console.log('clickedElement: ', clickedElement); 

	/* [DONE} remove class'active' from all articles*/
	const activeArticles = document.querySelectorAll('.posts .post.active');

	for(let activeArticle of activeArticles) {

		activeArticle.classList.remove('active');

		/* console.log('usuń artykuł ' + 'active'); */
	}

	/* [DONE] get 'href' attribute from the clicked link*/

	const articleSelector = clickedElement.getAttribute('href');

	console.log(articleSelector);

	/* [DONE] find the correct article using the selector (value of 'href' attribute) */

	const targetArticle = document.querySelector(articleSelector);

	console.log(targetArticle);

	/* [DONE] add class 'active' to correct article*/

	targetArticle.classList.add('active');

	console.log( 'targetArticle: ', targetArticle);

}

const links = document.querySelectorAll('.titles a');

for(let link of links) {
	
	link.addEventListener('click', titleClickHandler);
}



	const optArticleSelector = '.post',
		optTitleSelector = '.post-title',
		optTitleListSelector = '.titles';

	function generateTitleLinks() {
		// console.log(generateTitleLinks);

		/* remove contents of titleList*/
		function clearMessages() { 

		const titleList = document.querySelector(optTitleListSelector).innerHTML = '';
		
		console.log('title list: ', titleList);
		
	}
		clearMessages();

		/* for each article*/

			/* get the article id */

			/* find the title element */
			/* get the title from the title element */

			/* create HTML of the link */

			/* insert link into titleList */
	}

	generateTitleLinks();
}