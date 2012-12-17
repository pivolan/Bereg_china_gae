/**
 * Created with PyCharm.
 * User: pivo
 * Date: 17.12.12
 * Time: 22:07
 * To change this template use File | Settings | File Templates.
 */
$(function() {

	jQuery('#favoritos ul').jcarousel();

	// Setup the nav drop-downs
	$('#nav').nmcDropDown({
		show: {height: 'show', opacity: 'show'}
	});


	$('#sidebarNav').nmcDropDown({
		trigger: 'click',
		submenu_selector: 'p',
		show: {height: 'show'},
		hide: {height: 'hide'}
	});

	var bv =  $.browser.version.string();
	bv = bv.split('.');
	bv = bv[0];
	$('body').addClass('os' + $.browser.OS());
	$('body').addClass($.browser.browser() + bv);

	$('.produtoDownloads .manual').click(function(e) {
		e.preventDefault();
		Shadowbox.init({skipSetup: true});
		Shadowbox.open({
			content: basePath + 'downloads.php?produto=' + $(this).attr('rel') + '&arquivo=manual&lang=' + currLang,
			player: 'iframe',
			width: 730,
			height: 440,
			title: 'Download de arquivos'
		});
	});
	$('.produtoDownloads .instalacao').click(function(e) {
		e.preventDefault();
		Shadowbox.init({skipSetup: true});
		Shadowbox.open({
			content: basePath + 'downloads.php?produto=' + $(this).attr('rel') + '&arquivo=instalacao&lang=' + currLang,
			player: 'iframe',
			width: 730,
			height: 440,
			title: 'Download de arquivos'
		});
	});

});

/**
 * jQuery Validation Plugin 1.8.0
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2011 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(c){c.extend(c.fn,{validate:function(a){if(this.length){var b=c.data(this[0],"validator");if(b)return b;b=new c.validator(a,this[0]);c.data(this[0],"validator",b);if(b.settings.onsubmit){this.find("input, button").filter(".cancel").click(function(){b.cancelSubmit=true});b.settings.submitHandler&&this.find("input, button").filter(":submit").click(function(){b.submitButton=this});this.submit(function(d){function e(){if(b.settings.submitHandler){if(b.submitButton)var f=c("<input type='hidden'/>").attr("name",
		b.submitButton.name).val(b.submitButton.value).appendTo(b.currentForm);b.settings.submitHandler.call(b,b.currentForm);b.submitButton&&f.remove();return false}return true}b.settings.debug&&d.preventDefault();if(b.cancelSubmit){b.cancelSubmit=false;return e()}if(b.form()){if(b.pendingRequest){b.formSubmitted=true;return false}return e()}else{b.focusInvalid();return false}})}return b}else a&&a.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing")},valid:function(){if(c(this[0]).is("form"))return this.validate().form();
else{var a=true,b=c(this[0].form).validate();this.each(function(){a&=b.element(this)});return a}},removeAttrs:function(a){var b={},d=this;c.each(a.split(/\s/),function(e,f){b[f]=d.attr(f);d.removeAttr(f)});return b},rules:function(a,b){var d=this[0];if(a){var e=c.data(d.form,"validator").settings,f=e.rules,g=c.validator.staticRules(d);switch(a){case "add":c.extend(g,c.validator.normalizeRule(b));f[d.name]=g;if(b.messages)e.messages[d.name]=c.extend(e.messages[d.name],b.messages);break;case "remove":if(!b){delete f[d.name];
	return g}var h={};c.each(b.split(/\s/),function(j,i){h[i]=g[i];delete g[i]});return h}}d=c.validator.normalizeRules(c.extend({},c.validator.metadataRules(d),c.validator.classRules(d),c.validator.attributeRules(d),c.validator.staticRules(d)),d);if(d.required){e=d.required;delete d.required;d=c.extend({required:e},d)}return d}});c.extend(c.expr[":"],{blank:function(a){return!c.trim(""+a.value)},filled:function(a){return!!c.trim(""+a.value)},unchecked:function(a){return!a.checked}});c.validator=function(a,
																																																																																																																															  b){this.settings=c.extend(true,{},c.validator.defaults,a);this.currentForm=b;this.init()};c.validator.format=function(a,b){if(arguments.length==1)return function(){var d=c.makeArray(arguments);d.unshift(a);return c.validator.format.apply(this,d)};if(arguments.length>2&&b.constructor!=Array)b=c.makeArray(arguments).slice(1);if(b.constructor!=Array)b=[b];c.each(b,function(d,e){a=a.replace(RegExp("\\{"+d+"\\}","g"),e)});return a};c.extend(c.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",
	validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:c([]),errorLabelContainer:c([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(a){this.lastActive=a;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass);this.addWrapper(this.errorsFor(a)).hide()}},onfocusout:function(a){if(!this.checkable(a)&&(a.name in this.submitted||!this.optional(a)))this.element(a)},
	onkeyup:function(a){if(a.name in this.submitted||a==this.lastElement)this.element(a)},onclick:function(a){if(a.name in this.submitted)this.element(a);else a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(a,b,d){c(a).addClass(b).removeClass(d)},unhighlight:function(a,b,d){c(a).removeClass(b).addClass(d)}},setDefaults:function(a){c.extend(c.validator.defaults,a)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",
	url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:c.validator.format("Please enter no more than {0} characters."),minlength:c.validator.format("Please enter at least {0} characters."),rangelength:c.validator.format("Please enter a value between {0} and {1} characters long."),
	range:c.validator.format("Please enter a value between {0} and {1}."),max:c.validator.format("Please enter a value less than or equal to {0}."),min:c.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){function a(e){var f=c.data(this[0].form,"validator");e="on"+e.type.replace(/^validate/,"");f.settings[e]&&f.settings[e].call(f,this[0])}this.labelContainer=c(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&
		this.labelContainer||c(this.currentForm);this.containers=c(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var b=this.groups={};c.each(this.settings.groups,function(e,f){c.each(f.split(/\s/),function(g,h){b[h]=e})});var d=this.settings.rules;c.each(d,function(e,f){d[e]=c.validator.normalizeRule(f)});c(this.currentForm).validateDelegate(":text, :password, :file, select, textarea",
		"focusin focusout keyup",a).validateDelegate(":radio, :checkbox, select, option","click",a);this.settings.invalidHandler&&c(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){this.checkForm();c.extend(this.submitted,this.errorMap);this.invalid=c.extend({},this.errorMap);this.valid()||c(this.currentForm).triggerHandler("invalid-form",[this]);this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);
	return this.valid()},element:function(a){this.lastElement=a=this.clean(a);this.prepareElement(a);this.currentElements=c(a);var b=this.check(a);if(b)delete this.invalid[a.name];else this.invalid[a.name]=true;if(!this.numberOfInvalids())this.toHide=this.toHide.add(this.containers);this.showErrors();return b},showErrors:function(a){if(a){c.extend(this.errorMap,a);this.errorList=[];for(var b in a)this.errorList.push({message:a[b],element:this.findByName(b)[0]});this.successList=c.grep(this.successList,
		function(d){return!(d.name in a)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){c.fn.resetForm&&c(this.currentForm).resetForm();this.submitted={};this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b=0,d;for(d in a)b++;return b},hideErrors:function(){this.addWrapper(this.toHide).hide()},
	valid:function(){return this.size()==0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{c(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(a){}},findLastActive:function(){var a=this.lastActive;return a&&c.grep(this.errorList,function(b){return b.element.name==a.name}).length==1&&a},elements:function(){var a=this,b={};return c([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&
			a.settings.debug&&window.console&&console.error("%o has no name assigned",this);if(this.name in b||!a.objectLength(c(this).rules()))return false;return b[this.name]=true})},clean:function(a){return c(a)[0]},errors:function(){return c(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=c([]);this.toHide=c([]);this.currentElements=c([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},
	prepareElement:function(a){this.reset();this.toHide=this.errorsFor(a)},check:function(a){a=this.clean(a);if(this.checkable(a))a=this.findByName(a.name).not(this.settings.ignore)[0];var b=c(a).rules(),d=false,e;for(e in b){var f={method:e,parameters:b[e]};try{var g=c.validator.methods[e].call(this,a.value.replace(/\r/g,""),a,f.parameters);if(g=="dependency-mismatch")d=true;else{d=false;if(g=="pending"){this.toHide=this.toHide.not(this.errorsFor(a));return}if(!g){this.formatAndAdd(a,f);return false}}}catch(h){this.settings.debug&&
			window.console&&console.log("exception occured when checking element "+a.id+", check the '"+f.method+"' method",h);throw h;}}if(!d){this.objectLength(b)&&this.successList.push(a);return true}},customMetaMessage:function(a,b){if(c.metadata){var d=this.settings.meta?c(a).metadata()[this.settings.meta]:c(a).metadata();return d&&d.messages&&d.messages[b]}},customMessage:function(a,b){var d=this.settings.messages[a];return d&&(d.constructor==String?d:d[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(arguments[a]!==
			undefined)return arguments[a]},defaultMessage:function(a,b){return this.findDefined(this.customMessage(a.name,b),this.customMetaMessage(a,b),!this.settings.ignoreTitle&&a.title||undefined,c.validator.messages[b],"<strong>Warning: No message defined for "+a.name+"</strong>")},formatAndAdd:function(a,b){var d=this.defaultMessage(a,b.method),e=/\$?\{(\d+)\}/g;if(typeof d=="function")d=d.call(this,b.parameters,a);else if(e.test(d))d=jQuery.format(d.replace(e,"{$1}"),b.parameters);this.errorList.push({message:d,
		element:a});this.errorMap[a.name]=d;this.submitted[a.name]=d},addWrapper:function(a){if(this.settings.wrapper)a=a.add(a.parent(this.settings.wrapper));return a},defaultShowErrors:function(){for(var a=0;this.errorList[a];a++){var b=this.errorList[a];this.settings.highlight&&this.settings.highlight.call(this,b.element,this.settings.errorClass,this.settings.validClass);this.showLabel(b.element,b.message)}if(this.errorList.length)this.toShow=this.toShow.add(this.containers);if(this.settings.success)for(a=
																																																																																																																																		0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight){a=0;for(b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass)}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return c(this.errorList).map(function(){return this.element})},showLabel:function(a,
																																																																																																																																																																																																																																																																	   b){var d=this.errorsFor(a);if(d.length){d.removeClass().addClass(this.settings.errorClass);d.attr("generated")&&d.html(b)}else{d=c("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(a),generated:true}).addClass(this.settings.errorClass).html(b||"");if(this.settings.wrapper)d=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();this.labelContainer.append(d).length||(this.settings.errorPlacement?this.settings.errorPlacement(d,c(a)):d.insertAfter(a))}if(!b&&this.settings.success){d.text("");
		typeof this.settings.success=="string"?d.addClass(this.settings.success):this.settings.success(d)}this.toShow=this.toShow.add(d)},errorsFor:function(a){var b=this.idOrName(a);return this.errors().filter(function(){return c(this).attr("for")==b})},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(a){var b=this.currentForm;return c(document.getElementsByName(a)).map(function(d,e){return e.form==
			b&&e.name==a&&e||null})},getLength:function(a,b){switch(b.nodeName.toLowerCase()){case "select":return c("option:selected",b).length;case "input":if(this.checkable(b))return this.findByName(b.name).filter(":checked").length}return a.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):true},dependTypes:{"boolean":function(a){return a},string:function(a,b){return!!c(a,b.form).length},"function":function(a,b){return a(b)}},optional:function(a){return!c.validator.methods.required.call(this,
			c.trim(a.value),a)&&"dependency-mismatch"},startRequest:function(a){if(!this.pending[a.name]){this.pendingRequest++;this.pending[a.name]=true}},stopRequest:function(a,b){this.pendingRequest--;if(this.pendingRequest<0)this.pendingRequest=0;delete this.pending[a.name];if(b&&this.pendingRequest==0&&this.formSubmitted&&this.form()){c(this.currentForm).submit();this.formSubmitted=false}else if(!b&&this.pendingRequest==0&&this.formSubmitted){c(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=
			false}},previousValue:function(a){return c.data(a,"previousValue")||c.data(a,"previousValue",{old:null,valid:true,message:this.defaultMessage(a,"remote")})}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(a,b){a.constructor==String?this.classRuleSettings[a]=b:c.extend(this.classRuleSettings,
		a)},classRules:function(a){var b={};(a=c(a).attr("class"))&&c.each(a.split(" "),function(){this in c.validator.classRuleSettings&&c.extend(b,c.validator.classRuleSettings[this])});return b},attributeRules:function(a){var b={};a=c(a);for(var d in c.validator.methods){var e=a.attr(d);if(e)b[d]=e}b.maxlength&&/-1|2147483647|524288/.test(b.maxlength)&&delete b.maxlength;return b},metadataRules:function(a){if(!c.metadata)return{};var b=c.data(a.form,"validator").settings.meta;return b?c(a).metadata()[b]:
		c(a).metadata()},staticRules:function(a){var b={},d=c.data(a.form,"validator");if(d.settings.rules)b=c.validator.normalizeRule(d.settings.rules[a.name])||{};return b},normalizeRules:function(a,b){c.each(a,function(d,e){if(e===false)delete a[d];else if(e.param||e.depends){var f=true;switch(typeof e.depends){case "string":f=!!c(e.depends,b.form).length;break;case "function":f=e.depends.call(b,b)}if(f)a[d]=e.param!==undefined?e.param:true;else delete a[d]}});c.each(a,function(d,e){a[d]=c.isFunction(e)?
		e(b):e});c.each(["minlength","maxlength","min","max"],function(){if(a[this])a[this]=Number(a[this])});c.each(["rangelength","range"],function(){if(a[this])a[this]=[Number(a[this][0]),Number(a[this][1])]});if(c.validator.autoCreateRanges){if(a.min&&a.max){a.range=[a.min,a.max];delete a.min;delete a.max}if(a.minlength&&a.maxlength){a.rangelength=[a.minlength,a.maxlength];delete a.minlength;delete a.maxlength}}a.messages&&delete a.messages;return a},normalizeRule:function(a){if(typeof a=="string"){var b=
{};c.each(a.split(/\s/),function(){b[this]=true});a=b}return a},addMethod:function(a,b,d){c.validator.methods[a]=b;c.validator.messages[a]=d!=undefined?d:c.validator.messages[a];b.length<3&&c.validator.addClassRules(a,c.validator.normalizeRule(a))},methods:{required:function(a,b,d){if(!this.depend(d,b))return"dependency-mismatch";switch(b.nodeName.toLowerCase()){case "select":return(a=c(b).val())&&a.length>0;case "input":if(this.checkable(b))return this.getLength(a,b)>0;default:return c.trim(a).length>
		0}},remote:function(a,b,d){if(this.optional(b))return"dependency-mismatch";var e=this.previousValue(b);this.settings.messages[b.name]||(this.settings.messages[b.name]={});e.originalMessage=this.settings.messages[b.name].remote;this.settings.messages[b.name].remote=e.message;d=typeof d=="string"&&{url:d}||d;if(this.pending[b.name])return"pending";if(e.old===a)return e.valid;e.old=a;var f=this;this.startRequest(b);var g={};g[b.name]=a;c.ajax(c.extend(true,{url:d,mode:"abort",port:"validate"+b.name,
	dataType:"json",data:g,success:function(h){f.settings.messages[b.name].remote=e.originalMessage;var j=h===true;if(j){var i=f.formSubmitted;f.prepareElement(b);f.formSubmitted=i;f.successList.push(b);f.showErrors()}else{i={};h=h||f.defaultMessage(b,"remote");i[b.name]=e.message=c.isFunction(h)?h(a):h;f.showErrors(i)}e.valid=j;f.stopRequest(b,j)}},d));return"pending"},minlength:function(a,b,d){return this.optional(b)||this.getLength(c.trim(a),b)>=d},maxlength:function(a,b,d){return this.optional(b)||
		this.getLength(c.trim(a),b)<=d},rangelength:function(a,b,d){a=this.getLength(c.trim(a),b);return this.optional(b)||a>=d[0]&&a<=d[1]},min:function(a,b,d){return this.optional(b)||a>=d},max:function(a,b,d){return this.optional(b)||a<=d},range:function(a,b,d){return this.optional(b)||a>=d[0]&&a<=d[1]},email:function(a,b){return this.optional(b)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(a)},
	url:function(a,b){return this.optional(b)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},
	date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a))},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9-]+/.test(a))return false;var d=0,e=0,f=false;a=a.replace(/\D/g,"");for(var g=a.length-1;g>=
			0;g--){e=a.charAt(g);e=parseInt(e,10);if(f)if((e*=2)>9)e-=9;d+=e;f=!f}return d%10==0},accept:function(a,b,d){d=typeof d=="string"?d.replace(/,/g,"|"):"png|jpe?g|gif";return this.optional(b)||a.match(RegExp(".("+d+")$","i"))},equalTo:function(a,b,d){d=c(d).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){c(b).valid()});return a==d.val()}}});c.format=c.validator.format})(jQuery);
(function(c){var a={};if(c.ajaxPrefilter)c.ajaxPrefilter(function(d,e,f){e=d.port;if(d.mode=="abort"){a[e]&&a[e].abort();a[e]=f}});else{var b=c.ajax;c.ajax=function(d){var e=("port"in d?d:c.ajaxSettings).port;if(("mode"in d?d:c.ajaxSettings).mode=="abort"){a[e]&&a[e].abort();return a[e]=b.apply(this,arguments)}return b.apply(this,arguments)}}})(jQuery);
(function(c){!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(e){e=c.event.fix(e);e.type=b;return c.event.handle.call(this,e)}c.event.special[b]={setup:function(){this.addEventListener(a,d,true)},teardown:function(){this.removeEventListener(a,d,true)},handler:function(e){arguments[0]=c.event.fix(e);arguments[0].type=b;return c.event.handle.apply(this,arguments)}}});c.extend(c.fn,{validateDelegate:function(a,
																																																																																																																																	b,d){return this.bind(b,function(e){var f=c(e.target);if(f.is(a))return d.apply(f,arguments)})}})})(jQuery);




// jQBrowser v0.2: http://davecardwell.co.uk/javascript/jquery/plugins/jquery-browserdetect/
new function(){var Public={browser:function(){return Private.browser},version:{number:function(){return Private.version.number},string:function(){return Private.version.string}},OS:function(){return Private.OS},aol:function(){return Private.aol},camino:function(){return Private.camino},firefox:function(){return Private.firefox},flock:function(){return Private.flock},icab:function(){return Private.icab},konqueror:function(){return Private.konqueror},mozilla:function(){return Private.mozilla},msie:function(){return Private.msie},netscape:function(){return Private.netscape},opera:function(){return Private.opera},safari:function(){return Private.safari},linux:function(){return Private.linux},mac:function(){return Private.mac},win:function(){return Private.win}};$.browser=Public;var Private={browser:"Unknown",version:{number:undefined,string:"Unknown"},OS:"Unknown",aol:false,camino:false,firefox:false,flock:false,icab:false,konqueror:false,mozilla:false,msie:false,netscape:false,opera:false,safari:false,linux:false,mac:false,win:false};for(var i=0,ua=navigator.userAgent,ve=navigator.vendor,data=[{name:"Safari",browser:function(){return/Apple/.test(ve)}},{name:"Opera",browser:function(){return window.opera!=undefined}},{name:"iCab",browser:function(){return/iCab/.test(ve)}},{name:"Konqueror",browser:function(){return/KDE/.test(ve)}},{identifier:"aol",name:"AOL Explorer",browser:function(){return/America Online Browser/.test(ua)},version:function(){return ua.match(/rev(\d+(?:\.\d+)+)/)}},{name:"Flock",browser:function(){return/Flock/.test(ua)}},{name:"Camino",browser:function(){return/Camino/.test(ve)}},{name:"Firefox",browser:function(){return/Firefox/.test(ua)}},{name:"Netscape",browser:function(){return/Netscape/.test(ua)}},{identifier:"msie",name:"Internet Explorer",browser:function(){return/MSIE/.test(ua)},version:function(){return ua.match(/MSIE (\d+(?:\.\d+)+(?:b\d*)?)/)}},{name:"Mozilla",browser:function(){return/Gecko|Mozilla/.test(ua)},version:function(){return ua.match(/rv:(\d+(?:\.\d+)+)/)}}];i<data.length;i++){if(data[i].browser()){var identifier=data[i].identifier?data[i].identifier:data[i].name.toLowerCase();Private[identifier]=true;Private.browser=data[i].name;var result;if(data[i].version!=undefined&&(result=data[i].version())){Private.version.string=result[1];Private.version.number=parseFloat(result[1])}else{var re=new RegExp(data[i].name+"(?:\\s|\\/)(\\d+(?:\\.\\d+)+(?:(?:a|b)\\d*)?)");result=ua.match(re);if(result!=undefined){Private.version.string=result[1];Private.version.number=parseFloat(result[1])}}break}}for(var i=0,pl=navigator.platform,data=[{identifier:"win",name:"Windows",OS:function(){return/Win/.test(pl)}},{name:"Mac",OS:function(){return/Mac/.test(pl)}},{name:"Linux",OS:function(){return/Linux/.test(pl)}}];i<data.length;i++){if(data[i].OS()){var identifier=data[i].identifier?data[i].identifier:data[i].name.toLowerCase();Private[identifier]=true;Private.OS=data[i].name;break}}}();


jQuery.validator.addMethod("campoCPF", function( value, element ) {
	if (value != '' && value != '___.___.___-__') {
		cpf = value.split(".");
		if (cpf.length == 3) {
			n1 = cpf[0];
			n2 = cpf[1];
			n3 = cpf[2];
			cpf = n3.split('-');
			n3 = cpf[0];
			dv = cpf[1];

			cpf = n1.toString();
			cpf = cpf + n2.toString();
			cpf = cpf + n3.toString();

			var d1 = 0;
			for (i = 0; i < 9; i++) {
				d1 += cpf.charAt(i)*(10-i);
			}
			if (d1 == 0) {
				return false;
			}

			d1 = 11 - (d1 % 11);
			if (d1 > 9) d1 = 0;
			if (dv.charAt(0) != d1) {
				return false;
			}

			d1 *= 2;
			for (i = 0; i < 9; i++) {
				d1 += cpf.charAt(i)*(11-i);
			}

			d1 = 11 - (d1 % 11);
			if (d1 > 9) d1 = 0;

			if (dv.charAt(1) != d1) {
				return false;
			}
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}, "");

jQuery.validator.addMethod("campoCNPJ", function( value, element ) {
	if (value != '' && value != '__.___.___/____-__') {
		CNPJ = value;
		CNPJ = CNPJ. replace (".","");
		CNPJ = CNPJ. replace (".","");
		CNPJ = CNPJ. replace ("-","");
		CNPJ = CNPJ. replace ("/","");

		var a = [];
		var b = new Number;
		var c = [6,5,4,3,2,9,8,7,6,5,4,3,2];

		for (i=0; i<12; i++){
			a[i] = CNPJ.charAt(i);
			b += a[i] * c[i+1];
		}

		if ((x = b % 11) < 2) {a[12] = 0} else {a[12] = 11-x}
		b = 0;
		for (y=0; y<13; y++) {
			b += (a[y] * c[y]);
		}
		if ((x = b % 11) < 2) {a[13] = 0;} else {a[13] = 11-x;}
		if ((CNPJ.charAt(12) != a[12]) || (CNPJ.charAt(13) != a[13])){
			return false;
		}
		return true;
	}
}, "");


function br(){
	/*
	 * Translated default messages for the jQuery validation plugin.
	 * Locale: PT_BR
	 */
	jQuery.extend(jQuery.validator.messages, {
		required: "Campo obrigat&oacute;rio.",
		remote: "Por favor, corrija este campo.",
		email: "Por favor, forne&ccedil;a um endere&ccedil;o eletr&ocirc;nico v&aacute;lido.",
		url: "Por favor, forne&ccedil;a uma URL v&aacute;lida.",
		date: "Por favor, forne&ccedil;a uma data v&aacute;lida.",
		dateISO: "Por favor, forne&ccedil;a uma data v&aacute;lida (ISO).",
		number: "Por favor, forne&ccedil;a um n&uacute;mero v&aacute;lida.",
		digits: "Por favor, forne&ccedil;a somente d&iacute;gitos.",
		creditcard: "Por favor, forne&ccedil;a um cart&atilde;o de cr&eacute;dito v&aacute;lido.",
		equalTo: "Por favor, forne&ccedil;a o mesmo valor novamente.",
		campoCPF: "CPF inv&aacute;lido.",
		campoCNPJ: "CNPJ inv&aacute;lido.",
		accept: "Por favor, forne&ccedil;a um valor com uma extens&atilde;o v&aacute;lida.",
		maxlength: jQuery.validator.format("Por favor, forne&ccedil;a n&atilde;o mais que {0} caracteres."),
		minlength: jQuery.validator.format("Por favor, forne&ccedil;a ao menos {0} caracteres."),
		rangelength: jQuery.validator.format("Por favor, forne&ccedil;a um valor entre {0} e {1} caracteres de comprimento."),
		range: jQuery.validator.format("Por favor, forne&ccedil;a um valor entre {0} e {1}."),
		max: jQuery.validator.format("Por favor, forne&ccedil;a um valor menor ou igual a {0}."),
		min: jQuery.validator.format("Por favor, forne&ccedil;a um valor maior ou igual a {0}.")
	});
}


function es(){
	/*
	 * Translated default messages for the jQuery validation plugin.
	 * Locale: ES (Spanish; Español)
	 */
	jQuery.extend(jQuery.validator.messages, {
		required: "Este campo es obligatorio.",
		remote: "Por favor, rellena este campo.",
		email: "Por favor, escribe una dirección de correo válida",
		url: "Por favor, escribe una URL válida.",
		date: "Por favor, escribe una fecha válida.",
		dateISO: "Por favor, escribe una fecha (ISO) válida.",
		number: "Por favor, escribe un número entero válido.",
		digits: "Por favor, escribe sólo dígitos.",
		creditcard: "Por favor, escribe un número de tarjeta válido.",
		equalTo: "Por favor, escribe el mismo valor de nuevo.",
		accept: "Por favor, escribe un valor con una extensión aceptada.",
		maxlength: jQuery.validator.format("Por favor, no escribas más de {0} caracteres."),
		minlength: jQuery.validator.format("Por favor, no escribas menos de {0} caracteres."),
		rangelength: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
		range: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1}."),
		max: jQuery.validator.format("Por favor, escribe un valor menor o igual a {0}."),
		min: jQuery.validator.format("Por favor, escribe un valor mayor o igual a {0}.")
	});
}





(function($) {

	$.extend({
		metadata : {
			defaults : {
				type: 'class',
				name: 'metadata',
				cre: /({.*})/,
				single: 'metadata'
			},
			setType: function( type, name ){
				this.defaults.type = type;
				this.defaults.name = name;
			},
			get: function( elem, opts ){
				var settings = $.extend({},this.defaults,opts);
				// check for empty string in single property
				if ( !settings.single.length ) settings.single = 'metadata';

				var data = $.data(elem, settings.single);
				// returned cached data if it already exists
				if ( data ) return data;

				data = "{}";

				if ( settings.type == "class" ) {
					var m = settings.cre.exec( elem.className );
					if ( m )
						data = m[1];
				} else if ( settings.type == "elem" ) {
					if( !elem.getElementsByTagName )
						return undefined;
					var e = elem.getElementsByTagName(settings.name);
					if ( e.length )
						data = $.trim(e[0].innerHTML);
				} else if ( elem.getAttribute != undefined ) {
					var attr = elem.getAttribute( settings.name );
					if ( attr )
						data = attr;
				}

				if ( data.indexOf( '{' ) <0 )
					data = "{" + data + "}";

				data = eval("(" + data + ")");

				$.data( elem, settings.single, data );
				return data;
			}
		}
	});
	$.fn.metadata = function( opts ){
		return $.metadata.get( this[0], opts );
	};

})(jQuery);

/*
 Masked Input plugin for jQuery
 Copyright (c) 2007-2011 Josh Bush (digitalbush.com)
 Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
 Version: 1.3
 */
(function(a){var b=(a.browser.msie?"paste":"input")+".mask",c=window.orientation!=undefined;a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn"},a.fn.extend({caret:function(a,b){if(this.length!=0){if(typeof a=="number"){b=typeof b=="number"?b:a;return this.each(function(){if(this.setSelectionRange)this.setSelectionRange(a,b);else if(this.createTextRange){var c=this.createTextRange();c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select()}})}if(this[0].setSelectionRange)a=this[0].selectionStart,b=this[0].selectionEnd;else if(document.selection&&document.selection.createRange){var c=document.selection.createRange();a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length}return{begin:a,end:b}}},unmask:function(){return this.trigger("unmask")},mask:function(d,e){if(!d&&this.length>0){var f=a(this[0]);return f.data(a.mask.dataName)()}e=a.extend({placeholder:"_",completed:null},e);var g=a.mask.definitions,h=[],i=d.length,j=null,k=d.length;a.each(d.split(""),function(a,b){b=="?"?(k--,i=a):g[b]?(h.push(new RegExp(g[b])),j==null&&(j=h.length-1)):h.push(null)});return this.trigger("unmask").each(function(){function v(a){var b=f.val(),c=-1;for(var d=0,g=0;d<k;d++)if(h[d]){l[d]=e.placeholder;while(g++<b.length){var m=b.charAt(g-1);if(h[d].test(m)){l[d]=m,c=d;break}}if(g>b.length)break}else l[d]==b.charAt(g)&&d!=i&&(g++,c=d);if(!a&&c+1<i)f.val(""),t(0,k);else if(a||c+1>=i)u(),a||f.val(f.val().substring(0,c+1));return i?d:j}function u(){return f.val(l.join("")).val()}function t(a,b){for(var c=a;c<b&&c<k;c++)h[c]&&(l[c]=e.placeholder)}function s(a){var b=a.which,c=f.caret();if(a.ctrlKey||a.altKey||a.metaKey||b<32)return!0;if(b){c.end-c.begin!=0&&(t(c.begin,c.end),p(c.begin,c.end-1));var d=n(c.begin-1);if(d<k){var g=String.fromCharCode(b);if(h[d].test(g)){q(d),l[d]=g,u();var i=n(d);f.caret(i),e.completed&&i>=k&&e.completed.call(f)}}return!1}}function r(a){var b=a.which;if(b==8||b==46||c&&b==127){var d=f.caret(),e=d.begin,g=d.end;g-e==0&&(e=b!=46?o(e):g=n(e-1),g=b==46?n(g):g),t(e,g),p(e,g-1);return!1}if(b==27){f.val(m),f.caret(0,v());return!1}}function q(a){for(var b=a,c=e.placeholder;b<k;b++)if(h[b]){var d=n(b),f=l[b];l[b]=c;if(d<k&&h[d].test(f))c=f;else break}}function p(a,b){if(!(a<0)){for(var c=a,d=n(b);c<k;c++)if(h[c]){if(d<k&&h[c].test(l[d]))l[c]=l[d],l[d]=e.placeholder;else break;d=n(d)}u(),f.caret(Math.max(j,a))}}function o(a){while(--a>=0&&!h[a]);return a}function n(a){while(++a<=k&&!h[a]);return a}var f=a(this),l=a.map(d.split(""),function(a,b){if(a!="?")return g[a]?e.placeholder:a}),m=f.val();f.data(a.mask.dataName,function(){return a.map(l,function(a,b){return h[b]&&a!=e.placeholder?a:null}).join("")}),f.attr("readonly")||f.one("unmask",function(){f.unbind(".mask").removeData(a.mask.dataName)}).bind("focus.mask",function(){m=f.val();var b=v();u();var c=function(){b==d.length?f.caret(0,b):f.caret(b)};(a.browser.msie?c:function(){setTimeout(c,0)})()}).bind("blur.mask",function(){v(),f.val()!=m&&f.change()}).bind("keydown.mask",r).bind("keypress.mask",s).bind(b,function(){setTimeout(function(){f.caret(v(!0))},0)}),v()})}})})(jQuery);


/**
 * nmcDropDown plugin - v1.0.3
 * Author: Eli Van Zoeren
 * Copyright (c) 2009 New Media Campaigns
 * http://www.newmediacampaigns.com
 **/
(function(a){a.fn.nmcDropDown=function(b){var c=a.extend({},a.fn.nmcDropDown.defaults,b);return this.each(function(){menu=a(this);submenus=menu.children("li:has("+c.submenu_selector+")");if(c.fix_IE){menu.css("z-index",51).parents().each(function(d){if(a(this).css("position")=="relative"){a(this).css("z-index",(d+52))}});submenus.children(c.submenu_selector).css("z-index",50)}over=function(){a(this).addClass(c.active_class).children(c.submenu_selector).animate(c.show,c.show_speed);return false};out=function(){a(this).removeClass(c.active_class).children(c.submenu_selector).animate(c.hide,c.hide_speed);return false};if(c.trigger=="click"){submenus.toggle(over,out).children(c.submenu_selector).hide()}else{if(a().hoverIntent){submenus.hoverIntent({interval:c.show_delay,over:over,timeout:c.hide_delay,out:out}).children(c.submenu_selector).hide()}else{submenus.hover(over,out).children(c.submenu_selector).hide()}}})};a.fn.nmcDropDown.defaults={trigger:"hover",active_class:"open",submenu_selector:"ul",show:{opacity:"show"},show_speed:300,show_delay:50,hide:{opacity:"hide"},hide_speed:200,hide_delay:100,fix_IE:true}})(jQuery);


/**
 * hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
 * <http://cherne.net/brian/resources/jquery.hoverIntent.html>
 *
 * @param  f  onMouseOver function || An object with configuration options
 * @param  g  onMouseOut function  || Nothing (use configuration options object)
 * @author    Brian Cherne <brian@cherne.net>
 */
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:15000,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);


customFadingSlider = function(list, options) {
	this.initialize(list, options);
}

$.extend(customFadingSlider.prototype, {
	autoChageSTO: null,
	currentSlide: 0,
	slideSpeed: 500,
	slideTimeout: 100,
	objectInstance: null,
	theList: null,
	paginationList: null,

	initialize: function(list, options) {
		this.theList = list;

		if (options.slideSpeed != undefined) this.slideSpeed = options.slideSpeed;
		if (options.slideTimeout != undefined) this.slideTimeout = options.slideTimeout;
		if (options.objectInstance != undefined) this.objectInstance = options.objectInstance;
		if (options.paginationList != undefined) {
			this.paginationList = options.paginationList;
		} else {
			options.paginationList = null;
		}

		$(list + ' li').each(function(idx) {
			$(this).attr('rel', idx);
			$(this).removeClass('active');
			if (options.paginationList != null) {
				$(options.paginationList).append('<li><a href="#" rel="' + options.objectInstance + '_' + idx + '">' + (idx+1) + '</a></li>');
			}
		});
		$(list + ' li:first').addClass('active');

		if (options.paginationList != null) {
			$(options.paginationList + ' li:first').addClass('active');

			$(options.paginationList + ' a').click(function(e) {
				e.preventDefault();
				mySets = $(this).attr('rel');
				mySets = mySets.split('_');
				eval(mySets[0] + '.moveToSlide(' + mySets[1] + ')');
			});
		}

		this.moveSlider(true);
	},

	moveToSlide: function(whereTo) {
		clearTimeout(this.autoChageSTO);
		this.currentSlide = whereTo;
		this.moveSlider(true);
	},

	stopAutomatic: function() {
		clearTimeout(this.autoChageSTO);
	},

	moveSlider: function(next) {
		$(this.theList + ' li.active').fadeOut(this.slideSpeed);
		$(this.theList + ' li.active').removeClass('active');
		$(this.paginationList + ' li.active').removeClass('active');
		$(this.theList + ' li:eq(' + this.currentSlide + ')').addClass('active');
		$(this.paginationList + ' li:eq(' + this.currentSlide + ')').addClass('active');
		$(this.theList + ' li:eq(' + this.currentSlide + ')').fadeIn(this.slideSpeed);

		if (next) {
			this.currentSlide++;
			if (this.currentSlide >= $(this.theList).children('li').length) {
				this.currentSlide = 0;
			}
			code = this.objectInstance + '.moveSlider(true);';
			this.autoChageSTO = setTimeout(code, this.slideTimeout);
		}
	}
});

customSlider = function(list, container, options) {
	this.initialize(list, container, options);
}

$.extend(customSlider.prototype, {
	autoChageSTO: null,
	currentSlide: 0,
	slideSpeed: 500,
	slideTimeout: 100,
	objectInstance: null,
	theList: null,
	theContainer: null,
	inputMethod: 'click',
	automatic: true,


	initialize: function(list, container, options) {
		this.theList = list;
		this.theContainer = container;

		if (options.slideSpeed != undefined) this.slideSpeed = options.slideSpeed;
		if (options.slideTimeout != undefined) this.slideTimeout = options.slideTimeout;
		if (options.inputMethod != undefined) this.inputMethod = options.inputMethod;
		if (options.automatic != undefined) this.automatic = options.automatic;
		if (options.objectInstance != undefined) this.objectInstance = options.objectInstance;

		var totalW = 0;
		$(list + ' li').each(function(idx) {
			$(this).attr('rel', idx);
			$(this).removeClass('active');
			totalW = totalW + $(this).width();
		});
		$(list).width(totalW);
		$(list + ' li:first').addClass('active');
		$(container).animate({marginLeft: 0}, this.slideSpeed)

		if (this.inputMethod == 'click') {
			$(list + ' li').click(function() {
				clearTimeout(this.autoChageSTO);
				this.currentSlide = $(this).attr('rel');
				this.moveSlider(false);
			});
		}

		this.moveSlider(true);
	},

	stopAutomatic: function() {
		clearTimeout(this.autoChageSTO);
	},

	moveSlider: function(next) {
		var width = $(this.theList).find('li:first').width();
		var newPos = width * this.currentSlide * -1;

		$(this.theList + ' li').removeClass('active');
		$(this.theList + ' li:eq(' + this.currentSlide + ')').addClass('active');

		$(this.theList).stop();
		$(this.theList).animate({marginLeft: newPos}, this.slideSpeed)

		if (next && this.automatic) {
			this.currentSlide++;
			if (this.currentSlide >= $(this.theList).children('li').length) {
				this.currentSlide = 0;
			}
			code = this.objectInstance + '.moveSlider(true);';
			this.autoChageSTO = setTimeout(code, this.slideTimeout);
		}
	}
});

sliderProdutoHome = function(options) {
	this.initialize(options);
}

$.extend(sliderProdutoHome.prototype, {
	autoChageSTO: null,
	currentSlide: 0,
	slideSpeed: 500,
	slideTimeout: 5000,

	initialize: function(options) {
		if (options.slideSpeed != undefined) this.slideSpeed = options.slideSpeed;
		if (options.slideTimeout != undefined) this.slideTimeout = options.slideTimeout;

		produtoHomeCount = 0;

		$('#produtoHome a').each(function() {
			$(this).attr('rel', produtoHomeCount);
			produtoHomeCount++;
		});

		$('#produtoHome a').click(function(e) {
			e.preventDefault();
			produtoHome.moveToSlide($(this).attr('rel'));
		});

		this.moveSlider(true);
	},

	moveToSlide: function(whereTo) {
		clearTimeout(this.autoChageSTO);
		this.currentSlide = whereTo;
		this.moveSlider(true);
	},

	moveSlider: function(next) {
		o = '#produtoHome li:eq(' + this.currentSlide + ')';

		$('#produtoHome li').removeClass('aberto');
		$('.contentTab:visible').hide();
		$($(o + ' a').attr('href') + '.contentTab').show();
		$(o).addClass('aberto');

		if (next) {
			this.currentSlide++;
			if (this.currentSlide >= $('#produtoHome').children('li').length) {
				this.currentSlide = 0;
			}
			//clearTimeout(this.autoChageSTO);
			this.autoChageSTO = setTimeout('produtoHome.moveSlider(true);', this.slideTimeout);
		}
	}
});