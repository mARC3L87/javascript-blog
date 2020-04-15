/* document.getElementById('test-button').addEventListener('click', function(){
	const links = document.querySelectorAll('.titles a');
	console.log('links', links);
}); */

'use strict';

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

  





  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  function generateTitleLinks() {

    // const clickedElement = this;
    // console.log(generateTitleLinks);

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
			
    console.log('title list: ', titleList);

    /* find all the articles and save them to variable: articles */

    let html = '';

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector);

    for(let article of articles) {

      console.log('article: ', article);
				
				
      /* get the article id */

      const articleId = article.getAttribute('id');

      console.log('article id: ', articleId);

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      console.log('article title: ', articleTitle);
      /* get the title from the title element */

      /* create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      console.log('link html: ', linkHTML);

      /* insert link into titleList */

      titleList.insertAdjacentHTML('beforeend', linkHTML);

      console.log('before end: ', linkHTML); 

      /* insert link into html variable */


      html = html + linkHTML;

      console.log('html: ', html);

    }

    titleList.innerHTML = html;
  }

  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');

  console.log(links);
			
  for(let link of links) {
			
    link.addEventListener('click', titleClickHandler);

  }
  
}