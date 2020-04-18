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

    //console.log('clickedElement: ', clickedElement); 

    /* [DONE} remove class'active' from all articles*/
    const activeArticles = document.querySelectorAll('.posts .post.active');

    for(let activeArticle of activeArticles) {

      activeArticle.classList.remove('active');

      /* console.log('usuń artykuł ' + 'active'); */
    }

    /* [DONE] get 'href' attribute from the clicked link*/

    const articleSelector = clickedElement.getAttribute('href');

    //console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    //console.log(targetArticle);

    /* [DONE] add class 'active' to correct article*/

    targetArticle.classList.add('active');

    //console.log( 'targetArticle: ', targetArticle);

  };





  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optTagLinkSelector = '.post-tags .list a',
    optArticleAuthorSelector = '.post-author',
    optArticleAuthorLinkSelector = '.post-author a';

  function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
			
    //find all the articles and save them to variable: articles */

    //let html = '';

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    console.log('custom selector: ', optArticleSelector + customSelector);

    for(let article of articles) {

      // console.log('article: ', article);
				
      /* get the article id */

      const articleId = article.getAttribute('id');

      //console.log('article id: ', articleId);

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      //console.log('article title: ', articleTitle);
      /* get the title from the title element */

      /* create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      //console.log('link html: ', linkHTML);

      /* insert link into titleList */

      titleList.insertAdjacentHTML('beforeend', linkHTML);

      //console.log('before end: ', linkHTML); 

      /* insert link into html variable */

      //html = html + linkHTML;

      //console.log('html: ', html);

    }

    //titleList.innerHTML = html;
 
  }

  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');

  //console.log(links);
			
  for(let link of links) {
			
    link.addEventListener('click', titleClickHandler);
  
  }

  function generateTags() {

    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    //console.log('wszystkie artykuły: ', articles); 

    /* START LOOP: for every article */

    for( let article of articles) {

      /* find tags wrapper */

      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      //console.log('Wrapper: ', tagsWrapper);

      /* make html variable with empty string */

      let html = '';

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

      //console.log('Get tags: ', articleTags);

      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');

      //console.log('rozbicie: ', articleTagsArray);

      /* START LOOP: for each tag */

      for(let tag of articleTagsArray) {

        //console.log('wyświetl: ', tag);

        /* generate HTML of the link */

        const linkHTML = '<li><a href="#tag-' + tag  + '">' +  tag  + '</a></li>';

        //console.log(' generate HTML: ', linkHTML);

        /* add generated code to html variable */

        html = html + ' ' + linkHTML;

        //console.log('generate code: ', html); 

        /* END LOOP: for each tag */

      }

      /* insert HTML of all links into the tags wrapper */

      tagsWrapper.insertAdjacentHTML('beforeend', html);

      //console.log('insert HTML: ', tagsWrapper);

      /* END LOOP: for every article */
 
    }

  }

  generateTags();

  function tagClickHandler(event) {

    /* prevent default action for this event */

    event.preventDefault();

    console.log('link klikniety: ');

    /* make new constant named "clickedElement and give it the value of "this" */

    const clickedElement = this;

    console.log('kliknity element: ', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    console.log('atrybut kliknietego elementu: ', href);

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');

    console.log('extract: ', tag);

    /* find all tag links with class active */

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    console.log('all active: ', activeTags);

    /* START LOOP: for each active tag link */

    for(let activeTag of activeTags) {

      /* remove class active */

      activeTag.classList.remove('active');

      console.log('usuń active: ', activeTag);

      /* END LOOP: for each active tag link */

    }

    /* find all tag links with "href" attribute equal to the "href" constant */

    const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    console.log('wszystkie linki tagów: ', hrefTagLinks);

    /* START LOOP: for each found tag link */

    for(let hrefTagLink of hrefTagLinks) {

      console.log('jeden href: ', hrefTagLink);

      /* add class active */

      hrefTagLink.classList.add('active');

      console.log('aktywny href: ', hrefTagLink);

      /* END LOOP: for each found tag link */

    }

    /* execute function "generateTitleLinks with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');


  }

  function addClickListenerToTags() {
    
    /* find all links to tags */

    const tagLinks = document.querySelectorAll(optTagLinkSelector);

    /* START LOOP: for each link */

    for(let tagLink of tagLinks) {

      //console.log('linki', tagLink);

      /* add tagClickHandler as event listener for that link */

      tagLink.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */

    }

  }

  addClickListenerToTags();

  function generateAuthors() {

    /*find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article */

    for(let article of articles) {

      /* find authors wrapper */

      const authorsWrapper = article.querySelector(optArticleAuthorSelector);

      //console.log('Author Wrapper: ', authorsWrapper);

      /* make html variable with empty string */

      let html = '';

      /* get authors form 'data-authors' attribute */

      const articleAuthors = article.getAttribute('data-author');

      //console.log('Article Authors: ', articleAuthors);

      /* generate HTML of the link */

      const linkHTML = '<a href="#' + articleAuthors + '">' + articleAuthors + '</a>';

      //console.log('Link HTML: ', linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;

      //console.log('Add html: ', html);

      /* insert HTML of links into the authors wrapper */

      authorsWrapper.insertAdjacentHTML('beforeend', html);

      //console.log('Insert: ', authorsWrapper);

      /* END LOOP: for every article */

    }

  }

  generateAuthors();

  function authorClickHandler(event) {

    //console.log('Clicked Author');

    //console.log(event);

    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named clickedElement and give it the value of 'this' */

    const clickedElement = this;

    console.log('Klikniety element: ', clickedElement);

    /* make new constant 'href' and read the attribute 'href' of the clicked element */

    const href = clickedElement.getAttribute('href');

    console.log('Constant href: ', href);

    /* make a new constant 'author tag' and extract tag from the href constant */

    const authorTag = href.replace('#author-', '');

    console.log('Author tag extract: ', authorTag);

    /* find all author tag links with class active */

    const authorActiveTags = document.querySelectorAll('a.active[href^="#author-"]');

    console.log('Author active: ', authorActiveTags);

    /* START LOOP: for each active class link */

    for(let authorActiveTag of authorActiveTags) {

      /* remove class active */

      authorActiveTag.classList.remove('active');

      /* END LOOP: for each link */ 

    }

    /* find all author tag links with href attribute equal to the href constant */

    const hrefAuthorTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    console.log('Href author links: ', hrefAuthorTagLinks);

    /* START LOOP: for each found tag link */

    for(let hrefAuthorTagLink of hrefAuthorTagLinks) {

      /* add class active */

      hrefAuthorTagLink.classList.add('active');

      console.log('active');

      /* END LOOP: for each found tag link */

    }

    /* execute function generateTitleLinks with article selector as argument */

    generateTitleLinks('[data-author="' + authorTag + '"]');



  }

  function addClickListenerToAuthors() {

    /* find all links to authors */

    const authorsLinks = document.querySelectorAll(optArticleAuthorLinkSelector);

    /* START LOOP: for each link */

    for(let authorsLink of authorsLinks) {

      console.log(authorsLink);

      /* add authorClickHandler as event listener fo that link */

      authorsLink.addEventListener('click', authorClickHandler);

      /*END LOOP: fo each link */

    }

  }

  addClickListenerToAuthors();

}