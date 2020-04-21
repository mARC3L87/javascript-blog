/* document.getElementById('test-button').addEventListener('click', function(){
	const links = document.querySelectorAll('.titles a');
	console.log('links', links);
}); */

'use strict';

{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
  };
  const opt = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    tagLinkSelector: '.post-tags .list a',
    articleAuthorSelector: '.post-author',
    articleAuthorLinkSelector: '.post-author a',
    tagsListSelector: '.tags',
    cloudClassCount: 5,
    cloudClassPrefix: 'tag-size-',
    authorsListsSelector: '.authors.list'
  };

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





  

  function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */

    const titleList = document.querySelector(opt.titleListSelector); 

    titleList.innerHTML = '';
			
    //find all the articles and save them to variable: articles */

    //let html = '';

    /* for each article */

    const articles = document.querySelectorAll(opt.articleSelector + customSelector);

    //console.log('custom selector: ', opt.articleSelector + customSelector);

    for(let article of articles) {

      // console.log('article: ', article);
				
      /* get the article id */

      const articleId = article.getAttribute('id');

      //console.log('article id: ', articleId);

      /* find the title element */

      const articleTitle = article.querySelector(opt.titleSelector).innerHTML;

      //console.log('article title: ', articleTitle);
      /* get the title from the title element */

      /* create HTML of the link */

      const linkHTMLData = {id: articleId, title: articleTitle};
      
      const linkHTML = templates.articleLink(linkHTMLData);

      console.log('Link HTML: ', linkHTML);

      //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

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

  function calculateTagsParams(tags) {
  
    //console.log('tags:', tags);

    const params = {

      max:0,

      min:999999,

    };

    for(let tag in tags) {
      
      if(tags[tag] > params.max) {

        params.max = tags[tag];

      } 

      if(tags[tag] < params.min) {

        params.min = tags[tag];

      }

      console.log(tag + ' is used ' + tags[tag] + ' times');

    }

    return params;
  }

  function calculacteTagClass(count, params) {

    const normalizedCount = count - params.min;

    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1 );

    return opt.cloudClassPrefix + classNumber;

  }

  function generateTags() {

    /* [NEW] create a new variable allTags an empty object */

    let allTags = {};

    //console.log('Wszystkie tagi: ', allTags);

    /* find all articles */

    const articles = document.querySelectorAll(opt.articleSelector);

    //console.log('wszystkie artykuły: ', articles); 

    /* START LOOP: for every article */

    for( let article of articles) {

      /* find tags wrapper */

      const tagsWrapper = article.querySelector(opt.articleTagsSelector);

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

        const linkHTMLData = {id: tag, title: tag};

        const linkHTML = templates.tagLink(linkHTMLData);

        //const linkHTML = '<li><a href="#tag-' + tag  + '">' +  tag  + '</a></li>';

        //console.log(' generate HTML: ', linkHTML);

        /* add generated code to html variable */

        html = html + ' ' + linkHTML;

        //console.log('generate code: ', html); 

        /* [NEW] check if this link is NOT already in allTags */

        if(!allTags[tag]) {

          /*[NEW] add tag to allTags object */

          allTags[tag] = 1;

        } else {

          allTags[tag]++;
        }

        //console.log('all tags:', allTags);

        /* [NEW] add generated code to allTags array */

        //allTags.push(linkHTML);

        //console.log(allTags);

        

        /* END LOOP: for each tag */

      }

      /* insert HTML of all links into the tags wrapper */

      tagsWrapper.insertAdjacentHTML('beforeend', html);

      //console.log('insert HTML: ', tagsWrapper);

      /* END LOOP: for every article */
 
    }

    /* [NEW] find list of tags in right column */

    const tagList = document.querySelector(opt.tagsListSelector);

    //console.log(tagList);

    /* [NEW] create variable for all links HTML code */

    const tagsParams = calculateTagsParams(allTags);

    //console.log('tagsParams:', tagsParams);

    const allTagsData = {tags: []};

    //let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */

    for(let tag in allTags) {
      
      //console.log('tag:', tag);

      /* [NEW] generate code of a link and add it to allTagsHTML */

      allTagsData.tags.push({

        tag: tag,

        count: allTags[tag],

        className: calculacteTagClass(allTags[tag], tagsParams),

      });

      //allTagsHTML += '<li><a href="#tag-' + tag  + '" class="' + calculacteTagClass(allTags[tag], tagsParams) + '">' +  tag  + '</a></li>' + ' (' + allTags[tag] + ') '; 

      //console.log('all tags html: ', allTagsHTML);

      /* [NEW] END LOOP: for each tag in allTags */

    }

    /* [NEW] add HTML from allTagsHTML to tagList */

    tagList.innerHTML = templates.tagCloudLink(allTagsData);

    console.log(allTagsData);

  }

  generateTags();

  function tagClickHandler(event) {

    /* prevent default action for this event */

    event.preventDefault();

    //console.log('link klikniety: ');

    /* make new constant named "clickedElement and give it the value of "this" */

    const clickedElement = this;

    //console.log('kliknity element: ', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');

    //console.log('atrybut kliknietego elementu: ', href);

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

    const tagLinks = document.querySelectorAll(opt.tagLinkSelector);

    /* START LOOP: for each link */

    for(let tagLink of tagLinks) {

      //console.log('linki', tagLink);

      /* add tagClickHandler as event listener for that link */

      tagLink.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */

    }

  }

  addClickListenerToTags();

  function calculateAuthorsParams(authors) {

    //console.log('authors:', authors);

    const params = {

      max:0,

      min:999999,

    };

    for(let author in authors) {
      
      if(authors[author] > params.max) {

        params.max = authors[author];

      } 

      if(authors[author] < params.min) {

        params.min = authors[author];

      }

      console.log(author + ' is used ' + authors[author] + ' times');

    }

    return params;
  }

  function calculacteAuthorsClass(count, params) {

    const normalizedCount = count - params.min;

    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1 );

    return opt.cloudClassPrefix + classNumber;

  }

  function generateAuthors() {

    /* [NEW] create a new variable allAuthors an empty object */

    let allAuthors = {};

    /*find all articles */

    const articles = document.querySelectorAll(opt.articleSelector);

    /* START LOOP: for every article */

    for(let article of articles) {

      /* find authors wrapper */

      const authorsWrapper = article.querySelector(opt.articleAuthorSelector);

      //console.log('Author Wrapper: ', authorsWrapper);

      /* make html variable with empty string */

      let html = '';

      /* get authors form 'data-authors' attribute */

      const articleAuthors = article.getAttribute('data-author');

      //console.log('Autorzy: ', articleAuthors);

      /* generate HTML of the link */

      const linkHTMLData = {id: articleAuthors, title: articleAuthors};

      const linkHTML = templates.authorLink(linkHTMLData);

      //const linkHTML = '<a href="#author-' + articleAuthors + '">' + articleAuthors + '</a>';

      //console.log('Link HTML: ', linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;

      //console.log('Add html: ', html);

      /* [NEW] chceck if this link is not already in allAuthors */
      
      if(!allAuthors[articleAuthors]) {

        /* [NEW] add author to allAuthors object */

        allAuthors[articleAuthors] = 1;

      } else {

        allAuthors[articleAuthors]++;

      }

      //console.log('all authors: ', allAuthors);

      /* insert HTML of links into the authors wrapper */

      authorsWrapper.insertAdjacentHTML('beforeend', html);

      //console.log('Insert: ', authorsWrapper);

      /* END LOOP: for every article */

    }

    /* [NEW] find list of authors in right column */

    const authorsList = document.querySelector(opt.authorsListsSelector);

    console.log('Lista autorów: ', authorsList);

    /* [NEW] create variable for all links HTML code */

    const authorsParams = calculateAuthorsParams(allAuthors);

    console.log('authors params:', authorsParams);

    //let allAuthorsHTML ='';

    const allAuthorsData = {authors: []};

    /* [NEW] START LOOP: for each author in allAuthors */
    
    for(let articleAuthors in allAuthors) { //Błąd w nazwie zmiennej (allAuthorsHTML zamiast allAuthors), który wcześniej nie wyświetlał listy autorów z prawej strony.

      console.log('articleAuthors: ', articleAuthors);

      /* [NEW] generate code of a link and add it to allAuthorsHTML */

      allAuthorsData.authors.push({

        author: articleAuthors,

        count: allAuthors[articleAuthors],

        className: calculacteAuthorsClass(allAuthors[articleAuthors], authorsParams),

      });

      console.log('allAuthorsData', allAuthorsData);

      //allAuthorsHTML += '<li><a href="#author-' + articleAuthors + '" class="' + calculacteAuthorsClass(allAuthors[articleAuthors], authorsParams) + '">' + articleAuthors + '</a></li>' + ' (' + allAuthors[articleAuthors] + ') ';

      //allAuthorsHTML (=+) - błąd w kolejności znaków, który nie generował linka 
    
      //console.log('allAuthorsHTML: ', allAuthorsHTML);

      /* END LOOP: for each author in allAuthors */
    
    }

    /* [NEW] add HTML from allAuthorsHTML to authorsList */

    authorsList.innerHTML = templates.authorCloudLink(allAuthorsData);

    console.log('authorsList.innerHTML: ', authorsList.innerHTML);

    

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

    //console.log('Href author links: ', hrefAuthorTagLinks);

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

    const authorsLinks = document.querySelectorAll(opt.articleAuthorLinkSelector);

    /* START LOOP: for each link */

    for(let authorsLink of authorsLinks) {

      //console.log(authorsLink);

      /* add authorClickHandler as event listener fo that link */

      authorsLink.addEventListener('click', authorClickHandler);

      /*END LOOP: fo each link */

    }

  }

  addClickListenerToAuthors();

}