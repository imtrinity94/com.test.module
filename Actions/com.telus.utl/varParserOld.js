/**
 * @function varParserOld
 * @version 0.0.0
 * @param {string} variable 
 * @returns {string}
 */
function varParserOld(variable) {
	var all =Server.getAllConfigurationElementCategories()
	
	for (var ce in all){
	//System.log (all[ce].path)
	}
	
	//get category
	var category = Server.getConfigurationElementCategoryWithPath('Private Cloud');
	
	//die in a fire if non-existent
	if (category == null) {
	    throw "Configuration element category '" + categoryPath + "' not found or empty!";
	}
	
	//get _all_ the elements
	var elements = category.configurationElements;
	var result = [];
	var genCE = [];
	//retrieve general config elements
	for (i = 0; i < elements.length; i++) {
	    if (elements[i].name.match(/Location Store/gm)) { 
	        var ENV_SLUG = elements[i].getAttributeWithKey('ENV_SLUG').value.toLowerCase();
	        System.debug("ENV_SLUG: "+ENV_SLUG)
	    }
	    if (elements[i].name.match(/- General/gm)) {
			//System.debug ('Config elements needeed is: '+ elements[i].name)
	        genCE.push(elements[i]);
	      }
	}
	
	//Find variable
	for (i = 0; i < genCE.length; i++) {
	
	    try{ 
	        
	        System.debug(genCE[i].getAttributeWithKey(variable).value)
	        variableValue = genCE[i].getAttributeWithKey(variable).value;
	        // System.debug("Desired variable is in " + genCE[i].name)
	        
	        for (j = 0; j < variableValue.length; j++){
	            if (variableValue[j].split("=")[0] == ENV_SLUG){
	                System.debug("Needed env specific value: "+variableValue[j].split("=")[1])
	                return variableValue[j].split("=")[1];
	            }
	        }
	
	    }
	    catch(err){
	    // System.debug("Desired variable is not in " + genCE[i].name)
	}
	}
	//var IDC = element.getAttributeWithKey('ENV_SLUG').value.slice(0,4).toLowerCase();
	
	//return IDC;
};
