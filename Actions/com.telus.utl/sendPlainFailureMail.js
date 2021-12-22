/**
 * @function sendPlainFailureMail
 * @version 1.0.0
 * @param {string} ERROR 
 * @param {string} MAIL_LIST 
 * @returns {string}
 */
function sendPlainFailureMail(ERROR,MAIL_LIST) {
	System.log("Sending Error Email");
	var message = new EmailMessage();
	message.toAddress = MAIL_LIST;
	message.subject = workflow.name.toUpperCase() +" WORKFLOW FAILED";
	message.addMimePart(workflow.name +" failed with error \""+ ERROR+"\"", "text/plain; charset=UTF-8");
	message.sendMessage();
	System.log("Failure Notification sent");
	
};
