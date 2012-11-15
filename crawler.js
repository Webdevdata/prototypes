var request = require('request')
  , jsdom = require('jsdom')
  , EventEmitter = require('events').EventEmitter
  ;

function Crawler(){}

Crawler.prototype = new EventEmitter();



function getCountries(){ 
	var countriesURL = "http://www.alexa.com/topsites/countries"
		countryList  = []; 
	request.get(countriesURL,  
		function processCountries(err, res, body) {
			if (err){
   		       throw new Error('request(): ' + JSON.stringify(error));
   		    }
   		    if( res.statusCode === 200 ){
	   		    jsdom.env({
		          html: body
		          , scripts: ['http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js']
		          , done: function getCountriesList(error, window) {
		              if (error) throw new Error('jsdom.done(): ' + JSON.stringify(error));
		             
						var $ = window.$, countryURL
	    				$(".categories a").each(function() {
	      					countryURL = countriesURL + $(this).attr("href"); 
	      					countryList.push( countryURL ); 	
	    				});
	    				getSitesForCountries(countryList); 
		            }
		        });
		    }
		}
	);
}

function getSitesForCountries(countryList){
	var current = 0,
		countryURL
		; 

	console.log(countryList.length, countryList[0], countryList[countryList.length - 1 ])
	//iterate over countries 
	getNextCountry();

	function getNextCountry(){
		countryURL = countryList[current++];
		if(countryURL){ 
			request.get(countryURL, getSitesOfCountry);
		}
	}
}

function getSitesOfCountry(countryURL){
	request.get(countryURL, function processCountries(err, res, body) {

	})

}

getCountries(); 