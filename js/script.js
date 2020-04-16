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

  };





  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks() {

    // const clickedElement = this;
    // console.log(generateTitleLinks);

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
			
    console.log('title list: ', titleList);

    /* find all the articles and save them to variable: articles */

    //let html = '';

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

      //html = html + linkHTML;

      //console.log('html: ', html);

    }

    //titleList.innerHTML = html;
 
  }

  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');

  console.log(links);
			
  for(let link of links) {
			
    link.addEventListener('click', titleClickHandler);
  
  }

  function generateTags() {

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    console.log('wszystkie artykuły: ', articles); 

    /* START LOOP: for every article */

    for( let article of articles) {


      /* find tags wrapper */

      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      console.log('Wrapper: ', tagsWrapper);

      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

      console.log('Get tags: ', articleTags);

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');

      console.log('rozbicie: ', articleTagsArray);

      /* START LOOP: for each tag */

      for(let tag of articleTagsArray) {

        console.log('wyświetl: ', tag);

        /* generate HTML of the link */

        const linkHTML = '<li><a href="#tag-' + tag  + '">' +  tag  + '</a></li>';

        console.log(' generate HTML: ', linkHTML);

        /* add generated code to html variable */

        html = html + ' ' + linkHTML;

        console.log('generate code: ', html); 

        /* END LOOP: for each tag */

      }

      /* insert HTML of all links into the tags wrapper */

      tagsWrapper.insertAdjacentHTML('beforeend', html);

      console.log('insert HTML: ', tagsWrapper);

      /* END LOOP: for every article */
 
    }

  }

  generateTags();

  function tagClickHandler(event) {

    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement and give it the value of "this" */

    const clickedElement = this;

    console.log('kliknity element: ', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const clickedElementAttribute = clickedElement.getAttribute('href');

    console.log('atrybut kliknietego elementu: ', clickedElementAttribute);

    /* make a new constant "tag" and extract tag from the "href" constant */

    /* find all tag links with class active */

    /* START LOOP: for each active tag link */

    /* remove class active */

    /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */

    /* START LOOP: for each found tag link */

    /* add class active */

    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks with article selector as argument */

  }

  function addClickListenerToTags() {
    
    /* find all links to tags */

    /* START LOOP: for each link */

      /* add tagClickHandles as event listener for that link */

    /* END LOOP: for each link */

  }

  addClickListenerToTags();

}