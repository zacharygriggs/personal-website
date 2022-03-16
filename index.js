var active = "aboutme";
var active_project = "seniordesign";

// Note: the purpose of this strange looking code is to hide my e-mail address from being seen in plain HTML
// This is very unfortunately something I need to do because of the prevalence of spam bots.
// When contact info is requested, it assembles my e-mail from combining these variables.

var fZFSxkDuAeaVAlb = "z";
var MWFjktNiXniGKHk = "a";
var ngNAoIvWSnqxXIV = "c";
var onPmXLJeUwNXorI = "h";
var VcjONnMAQuJVzRI = "r";
var ErYoSJAbzftNGYL = "y";
var nkFJjVzUJVnhOOv = "g";
var YTEbuUwqlrESHRe = "i";
var WFCpoIQBGZIyUCM = "s";
var rQqzEVyufWTZvnA = "o";
var SUDsqtwTzwdrYyW = "u";
var SxBqSWGlyxdWtIr = "t";
var glSIVLFWHwTjHdP = "l";
var CXwcFEfmoIVxsNH = "k";
var FXnByBnrWUABkHX = "m";
var HmANTXdJRjHaqYm = "d";

$(document).ready(function() {
    // Main menu selections
    var active_cookie = getCookie('active');
    if(active_cookie != 'aboutme' && active_cookie != '') {
        activate(active_cookie);
    }
    $('#aboutme').click(function(){
        activate("aboutme");
    });
    $('#resume').click(function(){
        activate("resume");
    });
	$('#certifications').click(function(){
        activate("certifications");
    });
    $('#experience').click(function(){
        activate("experience");
    });
    $('#contact').click(function(){
        activate("contact");
    });
    $('#ref').click(function() {
        activate('ref');
    });
    var active_project_cookie = getCookie('activeproject');
    if(active_project_cookie != 'aboutme' && active_project_cookie != '') {
        activate_project(active_project_cookie);
    }
    // Project selections
    $('#seniordesign').click(function(){
        activate_project("seniordesign");
    });
    $('#sdl').click(function(){
        activate_project("sdl");
    });
    $('#jast').click(function(){
        activate_project("jast");
    });
    $('#uoss').click(function(){
        activate_project("uoss");
    });
    $('#learnvjass').click(function(){
        activate_project("learnvjass");
    });
});

function activate(id) {
    // No need to do anything if they click the already active tab...
    if(active != id) {
        // Turn the current tab to off
        $('#' + active).removeClass('active');
        $('#' + active + '-content').addClass('hidden');
        // Turn the new tab on
        $('#' + id).addClass('active');
        $('#' + id + '-content').removeClass('hidden');
        // Save state
        active = id;
        document.cookie = 'active=' + id;
    }
}

function activate_project(id) {
    if(active_project != id) {
        // Turn the current tab to off
        $('#' + active_project).removeClass('active');
        $('#' + active_project + '-content').addClass('hidden');
        // Turn the new tab on
        $('#' + id).addClass('active');
        $('#' + id + '-content').removeClass('hidden');
        // Save state
        active_project = id;
        document.cookie = 'activeproject=' + id;
    }
}

function showContactInfo() {
	// Hide my e-mail from spam bots!
	document.getElementById("showInfoButton").style.visibility = "hidden"; 
	document.getElementById("contact-information-box").innerHTML = "Personal email: <a href=\"mailto:" + fZFSxkDuAeaVAlb + MWFjktNiXniGKHk + ngNAoIvWSnqxXIV + onPmXLJeUwNXorI + MWFjktNiXniGKHk + VcjONnMAQuJVzRI + ErYoSJAbzftNGYL + nkFJjVzUJVnhOOv + VcjONnMAQuJVzRI + YTEbuUwqlrESHRe + nkFJjVzUJVnhOOv + nkFJjVzUJVnhOOv + WFCpoIQBGZIyUCM + "@" + rQqzEVyufWTZvnA + SUDsqtwTzwdrYyW + SxBqSWGlyxdWtIr + glSIVLFWHwTjHdP + rQqzEVyufWTZvnA + rQqzEVyufWTZvnA + CXwcFEfmoIVxsNH + "." + ngNAoIvWSnqxXIV + rQqzEVyufWTZvnA + FXnByBnrWUABkHX + "\">" + fZFSxkDuAeaVAlb + MWFjktNiXniGKHk + ngNAoIvWSnqxXIV + onPmXLJeUwNXorI + MWFjktNiXniGKHk + VcjONnMAQuJVzRI + ErYoSJAbzftNGYL + nkFJjVzUJVnhOOv + VcjONnMAQuJVzRI + YTEbuUwqlrESHRe + nkFJjVzUJVnhOOv + nkFJjVzUJVnhOOv + WFCpoIQBGZIyUCM + "@" + rQqzEVyufWTZvnA + SUDsqtwTzwdrYyW + SxBqSWGlyxdWtIr + glSIVLFWHwTjHdP + rQqzEVyufWTZvnA + rQqzEVyufWTZvnA + CXwcFEfmoIVxsNH + "." + ngNAoIvWSnqxXIV + rQqzEVyufWTZvnA + FXnByBnrWUABkHX + "</a><br>Github: <a href=\"https://github.com/" + fZFSxkDuAeaVAlb + MWFjktNiXniGKHk + ngNAoIvWSnqxXIV + onPmXLJeUwNXorI + MWFjktNiXniGKHk + VcjONnMAQuJVzRI + ErYoSJAbzftNGYL + nkFJjVzUJVnhOOv + VcjONnMAQuJVzRI + YTEbuUwqlrESHRe + nkFJjVzUJVnhOOv + nkFJjVzUJVnhOOv + WFCpoIQBGZIyUCM + "\">" + fZFSxkDuAeaVAlb + MWFjktNiXniGKHk + ngNAoIvWSnqxXIV + onPmXLJeUwNXorI + MWFjktNiXniGKHk + VcjONnMAQuJVzRI + ErYoSJAbzftNGYL + nkFJjVzUJVnhOOv + VcjONnMAQuJVzRI + YTEbuUwqlrESHRe + nkFJjVzUJVnhOOv + nkFJjVzUJVnhOOv + WFCpoIQBGZIyUCM + "</a><br>LinkedIn: <a href=\"https://www.linkedin.com/in/" + nkFJjVzUJVnhOOv + VcjONnMAQuJVzRI + YTEbuUwqlrESHRe + nkFJjVzUJVnhOOv + nkFJjVzUJVnhOOv + WFCpoIQBGZIyUCM + fZFSxkDuAeaVAlb + FXnByBnrWUABkHX + "/\">" + nkFJjVzUJVnhOOv + VcjONnMAQuJVzRI + YTEbuUwqlrESHRe + nkFJjVzUJVnhOOv + nkFJjVzUJVnhOOv + WFCpoIQBGZIyUCM + fZFSxkDuAeaVAlb + FXnByBnrWUABkHX + "</a>"
}

// credit: w3schools
// https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

