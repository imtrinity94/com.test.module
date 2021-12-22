/**
 * @function varParser
 * @version 0.0.1
 * @param {Any} variable 
 * @param {Any} configElemName 
 * @returns {Any}
 */
function varParser(variable,configElemName) {
	var all = Server.getAllConfigurationElementCategories()
	
	//get category
	var category = Server.getConfigurationElementCategoryWithPath('Private Cloud');
	
	//die in a fire if non-existent
	if (category == null) {
	    throw "Configuration element category '" + categoryPath + "' not found or empty!";
	}
	
	//get _all_ the elements
	var elements = category.configurationElements;
	var result = [];
	
	
	for (i = 0; i < elements.length; i++) {
	    // if (elements[i].name.match(/Location Store/gm)) { 
	    //     var ENV_SLUG = elements[i].getAttributeWithKey('ENV_SLUG').value.toLowerCase();
	    //     System.debug('ENV_SLUG: '+ENV_SLUG)
	    //     var ENV_SLUG_REMOTE = elements[i].getAttributeWithKey('ENV_SLUG_REMOTE').value.toLowerCase();
	    //     var DOMAIN = elements[i].getAttributeWithKey('DC_DOMAIN').value.toLowerCase();
	    //     var DC = elements[i].getAttributeWithKey('DC').value.toLowerCase();
	    //     var ENV_SHORT = elements[i].getAttributeWithKey('ENV_SLUG').value.toLowerCase().slice(-2);
	    //     System.debug('ENV_SHORT: '+ENV_SHORT)
	    // }
	
	    //in case we have more than 1 argument passed we're looking for the exact config element and the variable inside
	    if (arguments.length > 1) { 
	        if (elements[i].name == configElemName) {
	            var variable = elements[i].getAttributeWithKey(variable).value;
	        }
	    }
	}
	
	//Use actions to retrieve ENV and IDC instead of config element
	var env = System.getModule("com.telus.utl").getEnv().toLowerCase();
	var idc = System.getModule("com.telus.utl").getIDC();
	var idc_remote = System.getModule("com.telus.utl").getIDCRemote();
	var ENV_SLUG = idc+env;
	//System.debug('ENV_SLUG: '+ENV_SLUG)
	var ENV_SLUG_REMOTE = idc_remote+env;
	var DOMAIN = env+'.pc.local'
	var DC = idc.toUpperCase();
	var ENV_SHORT = env;
	//System.debug('ENV_SHORT: '+ENV_SHORT)
	
	
	
	switch (typeof variable){
	    case "string":
	        System.debug('string');
	   
	        return variable.replace('_ENV_', ENV_SLUG).replace('_DOMAIN_', DOMAIN).replace('_ENV-REMOTE_', ENV_SLUG_REMOTE).replace('_DC_', DC).replace('_ENV-SHORT_', ENV_SHORT);
	        break;
	
	    
	    case "object":
	        //System.debug('object');
	
	    for (i = 0; i < variable.length; i++) {
	        try{ 
	            if (variable[i].indexOf('=') !== -1) {
	                if (variable[i].indexOf(ENV_SLUG + '=') !== -1) {
	                    result.push(variable[i].replace('_ENV_', ENV_SLUG).replace('_DOMAIN_', DOMAIN).replace('_ENV-REMOTE_', ENV_SLUG_REMOTE).replace(ENV_SLUG + '=', '').replace('_DC_', DC).replace('_ENV-SHORT_', ENV_SHORT));
	                }
	            } else {
	                    result.push(variable[i].replace('_ENV_', ENV_SLUG).replace('_DOMAIN_', DOMAIN).replace('_ENV-REMOTE_', ENV_SLUG_REMOTE).replace('_DC_', DC).replace('_ENV-SHORT_', ENV_SHORT));
	            }
	
	        }
	        catch(err){
	    }
	    
	    // in case it's any other object holding property name and the name matches our env
	
	        if (typeof variable[i].name !== 'undefined' && variable[i].name.toLowerCase().indexOf('_' + ENV_SLUG) !== -1) {
	            return variable[i];
	        }
	    }
	
	
	    //System.debug('arr length: ' + result.length);
	
	    if (result.length == 1) {
	        return result[0];
	    } else {
	        return result;
	    }
	        break;
	}
	
};
