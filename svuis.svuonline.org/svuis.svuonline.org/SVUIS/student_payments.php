<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<head>
<title>Syrian Virtual University Information System</title>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1256">
<meta http-equiv="Content-Language" content="en-us">
<meta content="Global" name="Distribution">
<meta content="General" name="RATING">
<meta
	content="SVU"
	name="description">
<meta content="SVU" name="keywords">
<meta content="index,follow" name="robots">

<meta content="Advisor" name="author">
<meta content="English" name="language">
<meta content="8" name="revisit-after">
<meta name="google-site-verification" content="aNXRB2NPt0a9mXYJcPkyYP8mF6uBVpOR1tLrsDa6erA" />
<link href="style.css" type="text/css" rel="stylesheet">
<script src="include/js/jquery-latest.js"></script>
<script src="include/js/jquery.titlealert.js"></script>
<script src="include/soundmanager/script/soundmanager2.js"></script>

<script type="text/javascript" src="previewImageLib/js/ajaxupload.3.9.js" ></script>
<script language="javascript" type="text/javascript" src="include/js/datetimepicker.js"></script>
<link rel="stylesheet" type="text/css" href="previewImageLib/styles.css" />


<script type="text/javascript" src="svuis.js"></script>
<meta content="MSHTML 6.00.2900.2912" name="GENERATOR">

<script defer type="text/javascript" src="ckeditor/ckeditor.js"></script>
<script defer src="ckeditor/plugins/ckeditor_wiris/integration/WIRISplugins.js?viewer=image"></script>


<script>

soundManager.setup({
	  url: 'include/soundmanager/swf/',
	  onready: function() {
	    
	  },
	  ontimeout: function() {
	    // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
	  }
	});
	
            function showIETooltip(e){
                if(!e){var e = window.event;}
                var obj = e.srcElement;
                var objHeight = obj.offsetHeight;
                var optionCount = obj.options.length;
                var eX = e.offsetX;
                var eY = e.offsetY;

                //vertical position within select will roughly give the moused over option...
                var hoverOptionIndex = Math.floor(eY / (objHeight / optionCount));

                var tooltip = document.getElementById('dvDiv');
                tooltip.innerHTML = obj.options[hoverOptionIndex].title;

                mouseX=e.pageX?e.pageX:e.clientX;
                mouseY=e.pageY?e.pageY:e.clientY;

                tooltip.style.left=mouseX+10;
                tooltip.style.top=mouseY;

                tooltip.style.display = 'block';

                var frm = document.getElementById("frm");
                frm.style.left = tooltip.style.left;
                frm.style.top = tooltip.style.top;
                frm.style.height = tooltip.offsetHeight;
                frm.style.width = tooltip.offsetWidth;
                frm.style.display = "block";
            }
            function hideIETooltip(e){
                var tooltip = document.getElementById('dvDiv');
                var iFrm = document.getElementById('frm');
                tooltip.innerHTML = '';
                tooltip.style.display = 'none';
                iFrm.style.display = 'none';
            }
        </script>
        
<script type="text/javascript" language="JavaScript"><!--

//Use Freely as long as following disclaimer is intact ::
//---------------------------------------------------------------
//Cross Browser Multi-Orientation Menu v1.5 17th August 2004
//This script written by Rik Comery. www.ricom.co.uk
//For support, visit the "Resources" section at www.ricom.co.uk           
//All rights reserved.   
//Featured in the SimplytheBest DHTML Scripts Library at http://simplythebest.net/scripts/

//MENU ITEMS //
//DUPLICATE THIS ENTIRE SECTION FOR MULTIPLE MENUS.  PLEASE SEE THE INSTRUCTIONS FILE FOR DETAILS ///   

String.prototype.startsWith = function(str)
{return (this.match("^"+str)==str);}

var progSpecAdm = new Array();
var stuSpecAdm = new Array();

var Menu1 = new Array ();
var subMenu1 = new Array ();
var currenciesRates = new Array();
var currencies = new Array();

Menu1[0] = new Array("", "","", "left")
 subMenu1[0] = new Array()

Menu1[1] = new Array("Home - الصفحة الرئيسية", "index.php","_top", "center")
 subMenu1[1] = new Array()

/*
Menu1[2] = new Array("University Profile", "pages.php?id=2","_top", "center")
 subMenu1[2] = new Array()
	 subMenu1[2][0] = new Array ("Mission & Vision", "pages.php?id=91","_top")
	 subMenu1[2][1] = new Array ("Quality Assurance", "pages.php?id=34","_top")
	 //subMenu1[2][2] = new Array ("General information", "/SVUIS/documentation/generalInformation.pdf","_top")
	 subMenu1[2][2] = new Array ("Rules & Legislations", "pages.php?id=9","_top")
	 //subMenu1[2][4] = new Array ("Usage Policy", "pages.php?id=10","_top")
	 //	 subMenu1[2][1] = new Array ("Academic Excellence", "pages.php?id=33","_top")

Menu1[3] = new Array("University Structure", "pages.php?id=3","_top", "center")
 subMenu1[3] = new Array()
	 subMenu1[3][0] = new Array ("University Presidency", "pages.php?id=11","_top")
	 //subMenu1[3][1] = new Array ("Information Technology", "pages.php?id=12","_top")
	 subMenu1[3][1] = new Array ("Iternational Relations", "pages.php?id=13","_top")
	 //subMenu1[3][2] = new Array ("Student Affairs", "pages.php?id=15","_top")
	 //subMenu1[3][3] = new Array ("Exam Affairs", "pages.php?id=16","_top")
	 subMenu1[3][2] = new Array ("Telecenters", "pages.php?id=17","_top")
//	 subMenu1[3][6] = new Array ("Public Relations", "pages.php?id=14","_top")

Menu1[4] = new Array("Boards & Councils", "pages.php?id=28","_top", "center")
 subMenu1[4] = new Array()
	 subMenu1[4][0] = new Array ("Board of Trustees", "pages.php?id=29","_top")
	 subMenu1[4][1] = new Array ("University Council", "pages.php?id=30","_top")
	 subMenu1[4][2] = new Array ("Scientific Affairs Council", "pages.php?id=31","_top")
	 subMenu1[4][3] = new Array ("Student Affairs Council", "pages.php?id=32","_top")

Menu1[5] = new Array("Academic Programs", "#","_top", "center")
Menu1[5] = new Array("Academic Programs", "pages.php?id=4","_top", "center")
 subMenu1[5] = new Array()
 subMenu1[5][0] = new Array ("دليل الطالب للقبول الجامعي", "/images/upload/Guide_mof.pdf","_top")
 subMenu1[5][1] = new Array ("البرامج الحالية", "","")
 subMenu1[5][2] = new Array ("BAIT برنامج الإجازة في تقانة المعلومات", "pages.php?id=95","_top")
 subMenu1[5][3] = new Array ("BACT برنامج الإجازة في تقانة الاتصالات", "pages.php?id=94","_top")
 subMenu1[5][4] = new Array ("BL الإجازة في الحقوق", "pages.php?id=33","_top")
 subMenu1[5][5] = new Array ("BSCE الإجازة في الاقتصاد", "pages.php?id=19","_top")
 subMenu1[5][6] = new Array ("BMC الإجازة في الاعلام والاتصال", "pages.php?id=43","_top")
 subMenu1[5][7] = new Array ("EDU دبلوم التأهيل التربوي", "pages.php?id=20","_top")
 subMenu1[5][8] = new Array ("ENG برنامج تعليم اللغة الانكليزية", "pages.php?id=21","_top")
 subMenu1[5][9] = new Array ("ISE الإجازة في الهندسة المعلوماتية", "pages.php?id=23","_top")
 subMenu1[5][10] = new Array ("MBA ماجستير تأهيل وتخصص لإدارة الأعمال", "pages.php?id=24","_top")
 subMenu1[5][11] = new Array ("MWT ماجستير تأهيل وتخصص في تقانات الوب", "pages.php?id=27","_top")
 subMenu1[5][12] = new Array ("MWS ماجستير الدراسات العليا في علوم الوب", "pages.php?id=90","_top")
 subMenu1[5][13] = new Array ("MiQ ماجستير تأهيل وتخصص في الجودة", "pages.php?id=96","_top")
 subMenu1[5][14] = new Array ("PMTM  تأهيل وتخصص في إدارة التقانة", "pages.php?id=97","_top")
 subMenu1[5][15] = new Array ("TIC المعهد التقاني للحاسوب", "pages.php?id=99","_top")
  // subMenu1[5][15] = new Array ("UoG البرامج التعليمية لجامعة غرينتش", "pages.php?id=43","_top")
 subMenu1[5][16] = new Array ("البرامج المتوقف التسجيل فيها", "","")
 subMenu1[5][17] = new Array ("BIT الإجازة في تقانة المعلومات", "pages.php?id=18","_top")
 subMenu1[5][18] = new Array ("MTM ماجستير الدراسات العليا في إدارة التقانة", "pages.php?id=26","_top")
 subMenu1[5][19] = new Array ("MQM ماجستير الدراسات العليا في إدارة الجودة", "pages.php?id=25","_top")
 subMenu1[5][20] = new Array ("HND الدبلوم الوطني العالي", "pages.php?id=22","_top")
 subMenu1[5][21] = new Array ("DP برنامج الدكتوراه", "pages.php?id=92","_top")
*/
/*Menu1[6] = new Array("Services Center", "pages.php?id=5","_top", "center")
 subMenu1[6] = new Array()*/
	 
/*Menu1[6] = new Array("contact Us", "pages.php?id=6","_top", "center")
 subMenu1[6] = new Array()
*/
/// FORMAT MENU  ///
menuStyle = "flat"                                  // Menu Style (flat, 3d)
cellPadding = "3"                                   // Cell Padding
cellBorder = 1                                      // Border width (for no border, enter 0)  THIS VALUE APPLIES TO ALL MENUS
verticalOffset = "3"                                // Vertical offset of Sub Menu. 
horizontalOffset = "0"                              // Horizontal offset of Sub Menu. 
subMenuDelay = 1                                    // Time sub menu stays visible for (in seconds). THIS VALUE APPLIES TO ALL MENUS
subIndicate = 1                                     // Show if a sub menu is present (use 0 for "no")  THIS VALUE APPLIES TO ALL MENUS
indicator = "" 										// Symbol to show if a sub menu is present (subIndicate must be to set to 1)
                                                // Use standard HTML <img> tag. You can use a character instead of an image. 
                                                // e.g.      indicator = ">"
//Main Menu Items
menuWidth = "772"                  	// Width of menu item.  Use 0 for default
borderColor = ""          		   	// Border Colour (flat mode only)
borderHighlight = ""      			// Border Highlight Colour (3d mode only)
borderShadow = ""         			// Border Shadow Colour (3d mode only)
menuBackground = "#6f7b79"       	// Cell Background Colour
menuHoverBackground = "#6f7b79"    	// Cell Background Colour on mouse rollover
fontFace = "Helvetica"           	// Font Face
fontColour = "White"           		// Font Colour
fontHoverColour = "#DEAA5A"      	// Font Colour on mouse rollover
fontSize = "8pt"                 	// Font Size
fontDecoration = "none"          	// Style of the link text (none, underline, overline, line-through)
fontWeight = "normal"              	// Font Weight (normal, bold)

//Sub Menu Items
smenuWidth = "120"                 	// Width of sub menu item.  Use 0 for default
sborderColor = "#ffffff"       	   	// Border Colour (flat mode only)
sborderHighlight = ""     			// Border Highlight Colour (3d mode only)
sborderShadow = ""        			// Border Shadow Colour (3d mode only)
smenuBackground = "#6f7b79"        	// Cell Background Colour
smenuHoverBackground = "#6f7b79" 	// Cell Background Colour on mouse rolloverr
sfontFace = "Helvetica"            	// Font Face
sfontColour = "White"          		// Font Colour
sfontHoverColour = "#DEAA5A"     	// Font Colour on mouse rollover
sfontSize = "8pt"                	// Font Size
sfontDecoration = "none"         	// Style of the link text (none, underline, overline, line-through)
sfontWeight = "normal"           	// Font Weight (normal, bold)

//Sub Menu title
stmenuWidth = "120"                 	// Width of sub menu item.  Use 0 for default
stborderColor = "#ffffff"       	   	// Border Colour (flat mode only)
stborderHighlight = ""     			// Border Highlight Colour (3d mode only)
stborderShadow = ""        			// Border Shadow Colour (3d mode only)
stmenuBackground = "#b9bebd"        	// Cell Background Colour
stmenuHoverBackground = "#eee" 	// Cell Background Colour on mouse rolloverr
stfontFace = "Helvetica"            	// Font Face
stfontColour = "#4a5452"          		// Font Colour
stfontHoverColour = "#DEAA5A"     	// Font Colour on mouse rollover
stfontSize = "8pt"                	// Font Size
stfontDecoration = "none"         	// Style of the link text (none, underline, overline, line-through)
stfontWeight = "bold"           	// Font Weight (normal, bold)

quantity = 1
/// END FORMAT MENU  ////

/// DO NOT EDIT BELOW THIS LINE  ///
//Browser Sniffer
var isIE = (document.getElementById && document.all)?true:false;
var isNS4 = (document.layers)?true:false;
var isNS6 = (document.getElementById && !document.all)?true:false;
var timer;
var obj0 = (isIE)?"document.all":"document.getElementById";




// Vérifie le format d une date saisie
function Verif_Date(valeur_date)
{ var tabDate = valeur_date.split('-');
tabDate = ConvNum(tabDate);
var datTest_Date = new Date(parseInt(tabDate[0]), parseInt(tabDate[1])-1, parseInt(tabDate[2]));
if (valeur_date.length>10)
{ alert("");
return false;
}
for (i=0; i<valeur_date.length; i++)
{ if (valeur_date.charAt(i) == ' ')
{ alert("");
return false;
}
}
if (valeur_date.length > 0)
{ if ((parseInt(tabDate[2]) != datTest_Date.getDate()) || (parseInt(tabDate[1]) != parseInt(datTest_Date.getMonth())+1))
{ alert("");
return false;
}
if ((tabDate[0].length != 4) || (parseInt(tabDate[0]) < 1900) || (parseInt(tabDate[0]) > 2099))
{ alert("");
return false;
}
}
return true;
}

function insertAtCaret(areaId,text) {
    var txtarea = document.getElementById(areaId);
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
        "ff" : (document.selection ? "ie" : false ) );
    if (br == "ie") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        strPos = range.text.length;
    }
    else if (br == "ff") strPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0,strPos);  
    var back = (txtarea.value).substring(strPos,txtarea.value.length); 
    txtarea.value=front+text+back;
    strPos = strPos + text.length;
    if (br == "ie") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        range.moveStart ('character', strPos);
        range.moveEnd ('character', 0);
        range.select();
    }
    else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }
    txtarea.scrollTop = scrollPos;
}

//



    //
    -->
</script>

<script type="text/javascript" src="header.php"></script>
<script type= "text/javascript" src="include/js/list.js"></script>
</head>
<body 
	bgcolor="#333333" style="background-color: #b7c1c5;"  leftmargin="0"
	topmargin="0" bottommargin="0" onload="fillCategory();"
	onLoad=" MM_preloadImages('images/ar_d.gif','images/ar_r.gif','images/arrow_menu.gif','images/bg.gif','images/circle.gif','images/circle_.gif','images/dot_menu.gif','images/dotted_pixel.gif','images/dotted_pixel_horizontal.gif','images/loading.gif','images/menu_connector.gif','images/menu_connector_end.gif','images/minus_menu.gif','images/plus_menu.gif','images/display_.gif')">
<TABLE cellSpacing="0" cellPadding="0" align="center" border="0">
  <TR>
    <TD width="5%" bgColor=#ffffff height=108>&nbsp;</TD>
    <TD bgColor="#ffffff" height="108">
<!---------------------------------------------------->
<!-------- header --------------->
      <table cellspacing="0" cellpadding="0" width="772" align="center" border="0">
        <!--<tr>
          <td align="right" style="padding-top:12px; padding-right:2px">
            <a href="help.php?page=" target="_blank"><img src="images/icon/nav_tts.gif" alt="Online Help" title="Online Help" /></a> <a href=""><img src="images/icon/sitemap_.gif" alt="Site Map" title="Site Map" /></a>		 </td>
        </tr>-->
        <tr>
           <td style="background-color: #005a82;"><img id="head_06" src="images/header.jpg" width="772" height="147" alt="" /></td>
        </tr>
        
         <!--
        <tr bgcolor="#6f7b79">
          <td colspan="3" height="27">
		  	<script type="text/javascript" language="JavaScript">showMenus(1,'Horizontal')</script>
		<!--	  <div align="center"> <font color="#ffffff"> <a class="htext" href="index.php">Home</a>&nbsp;&nbsp; 
				  |&nbsp;&nbsp; <a class="htext" href="pages.php?id=2"> Mission & Profile</a>&nbsp;&nbsp;
				   |&nbsp;&nbsp; <a class="htext" href="pages.php?id=3"> University Structure</a>&nbsp;&nbsp;
				    |&nbsp;&nbsp; <a class="htext" href="pages.php?id=4"> Academic Programs</a>&nbsp;&nbsp;
					 |&nbsp;&nbsp; <a class="htext" href="pages.php?id=5"> Services Center</a>&nbsp;&nbsp;
					  |&nbsp;&nbsp; <a class="htext" href=""> Announcements</a>&nbsp;
					   |&nbsp;&nbsp; <a class="htext" href="pages.php?id=6"> Contact Us</a> &nbsp;
				</div>	>
			</td>
        </tr -->
      <style type="text/css">
			#SVU_h_menu {
				background-color: #005a82;
				border-bottom: solid 4px;
				border-bottom-color: #b2a260;
				z-index: 500;
				clear: both;
				width: 100%;
				margin: -4px 0px 0px -1px;
				}
			#SVU_h_menu li{
				position: relative;
				display: block;
				float: left;
			}
			#SVU_h_menu li a{
				    font-weight: bold;
				position: relative;
				z-index: 550;
				display: block;
				padding: 0px 34px;
				line-height: 30px;
				font-family: 'Play', Helvetica, Arial, sans-serif;
				font-size: 12px;
				color: #ffffff;
				letter-spacing: 0.1px;
			}
			#SVU_h_menu li a:hover{
				color: #19c0f3;
			}
			#SVU_h_menu ul{
				margin: 0px;
				padding: 0px;
			}
		</style>
        <tr>
        	<td id="SVU_h_menu">
        		<ul>
					<li><a rel="nofollow noreferrer" href="http://svuis.svuonline.org/">Home</a></li>
					<li><a rel="nofollow noreferrer" href="http://svuonline.org/">SVU Portal</a></li>
					<li><a rel="nofollow noreferrer" href="http://mail.svuonline.org/">E-mail</a></li>
					<li><a rel="nofollow noreferrer" href="https://lms.svuonline.org/login/index.php">LMS</a></li>
					<li><a rel="nofollow noreferrer" href="https://requestsystem.svuonline.org/">Request system</a></li>
					<li><a rel="nofollow noreferrer" href="http://svu.netlanguages.com/netlang/">English Courses</a></li>
				</ul>
        	</td>
        </tr>
        
      </table>
<!--------//-- header --------------->
  
<!---------- news --------------->
      <table cellspacing="0" cellpadding="0" width="772" align="center" border="0">
        <tr bgcolor="#FFFFFF">
			<td valign="top" width="1" background="images/grey_pixel.gif"><img height="1" src="images/grey_pixel.gif" width="1" /></td>
			<td height="20" style="padding-top:3px"><img src="spacer.gif" width="1" height="1" align="absmiddle" />
			<div style="height:14px; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>
			</td>
			<td valign="top" width="1" background="images/grey_pixel.gif"><img height="1" src="images/grey_pixel.gif" width="1" /></td>
        </tr>
      </table>
<!--------//-- news --------------->
		<table cellspacing="0" cellpadding="0" width="100%" align="center" border="0">
			<tr>
				<td valign="top" width="1" background="images/grey_pixel.gif"><img height="1" src="images/grey_pixel.gif" width="1" /></td>
				<td valign="top">
				<div align="center" style="width:190px; max-width:190px; display:block" id="left_panel">
					<style>
.container {
	  position: relative;
	  width: 100%;
	  max-width: 400px;
	  display: flex
	}

	.imgp {
	  width:100%;
	  height:100%;
	  border-radius: 0%;
	  border: 0px solid ;
	  
	}
</style>

<table cellspacing="0" cellpadding="0" width="90%" align="center" border="0">
	<tr valign="top">
		<td>


		<!--  table cellspacing="0" cellpadding="0" width="100%" align="center" border="0">
			<tr>
				<td style="CURSOR: pointer" onclick="javascript:i1.src = showhide('d1');" width="11%"><img src="images/plus_menu.gif" name="i1" width="19" height="16" id="i1" /></td>
				<td class="smenu" style="CURSOR: pointer" onclick="javascript:i1.src = showhide('d1');" width="89%">
				<b>Rules & Legislations</b></td>
			</tr>
		</table-->
		<!-------------------->
		<!--  div id="d1" name="d1" style="display:none">
			<table cellspacing="0" cellpadding="0" width="100%" border="0">
				<tr>
					<td width="19%"><img height="14" src="images/menu_connector.gif" width="26" align="absBottom" /></td>
					<td><a class="smenublue" href="pages.php?id=9">SVU Legislations</a></td>
				</tr>
				<tr>
					<td width="19%"><img height="17" src="images/menu_connector_end.gif" width="26" align="absBottom" /></td>
					<td><a class="smenublue" href="pages.php?id=10">Usage Policy</a></td>
				</tr>
			</table>
		</div-->
<!---========================================--->
<!---=================Manal=======================--->
		
<!---=================/Manal=======================--->		
<!---=================Register Student=======================--->
				<table cellspacing="0" cellpadding="0" width="100%" align="center" border="0">
			<tr>
				<td style="CURSOR: pointer" onclick="javascript:i3.src = showhide('d3');" width="9%"><img src="images/minus_menu.gif" name="i3" width="19" height="16" id="i3" />				</td>
				<td class="smenu" style="CURSOR: pointer;  FONT-SIZE: 12px;" onclick="javascript:i3.src = showhide('d3');" width="91% ">
				<b > Register Student </b> </td>
			</tr>
		</table>
		<!-------------------->
		<div id="d3" style="DISPLAY:block" name="d3">
			<table cellspacing="0" cellpadding="0" width="100%" border="0">
				
				
				<tr>
					<td><img src="images/menu_connector.gif" width="26" height="14" align="absBottom" /></td>
					<td><a class="smenublue" href="sa_app_reg_auth.php"><b>Registration of the New student</b></a> </td>
				</tr>

				<!-- tr>
					<td><img src="images/menu_connector.gif" width="26" height="14" align="absBottom" /></td>
					<td><a class="smenublue" href="sa_app_reg_auth.php?phd=1">Register a New PhD Student</a> </td>
				</tr-->
<tr>
					<td width="19%"><img src="images/menu_connector_end.gif" width="26" height="14" align="absBottom" /></td>
					<td><a class="smenublue" href="https://svuonline.org/sites/default/files/pr/Guide_f21.pdf">Student Registration Guide</a></td>
				</tr>

				<tr>
					<td width="19%"><img src="images/menu_connector_end.gif" width="26" height="14" align="absBottom" /></td>
					<td><a class="smenublue" href="https://svuonline.org/ar/%D8%A7%D9%84%D8%AA%D9%82%D9%88%D9%8A%D9%85%20%D8%A7%D9%84%D8%B3%D9%86%D9%88%D9%8A">SVU Calendar</a></td>
				</tr>
			
													<tr>
				<td width="11%"><img src="images/icon/informat.gif" width="16" height="16" /></td>
				<td width="89%" style="padding-top:1px"><a class="smenu" href="training_registration.php" style="cursor:pointer">Training Center</a></td>
				</tr>
								

			</table>
		</div>
				<!---=================//Register Student=======================--->

	<!---===============//ADMINISTRATION Bashar=========================--->


<!-- =========== //ADMINISTRATION tutors managments grades /for administrative affairs  =========== -->
<!-- =========== End  ADMINISTRATION tutors managments grades /for administrative affairs  ========= -->


<!-- =========== Begin Finace pages /for Razan maraashly account  =========== -->



<!-- =========== //Tests block for STUDESTs projects  =========== -->

<!-- =========== //Tests block for STUDESTs projects  =========== -->







<!---===============//ADMINISTRATION Bashar=========================--->



<!---=================Student service=======================--->
<!---=================//Student service=======================--->



















<!---===============Finance fi=========================--->

<!-- -->


<!-- -->








<!---===============// Student Affair Council=========================--->


		<!-- <table cellspacing="0" cellpadding="0" width="100%" align="center" border="0">
			<tr>
				<td width="9%"><img src="images/dot_menu.gif" width="19" height="16" /></td>
				<td width="91%"><a class="smenu" href="javascript:void(0);" onclick="MM_openBrWindow('../../../isis_livehelp','','width=525,height=400')" style="cursor:pointer">Live Messenger</a></td>
			</tr>
		</table> -->
		<!-- <table cellspacing="0" cellpadding="0" width="100%" align="center" border="0">
			<tr>
				<td width="9%"><img src="images/dot_menu.gif" width="19" height="16" /></td>
				<td width="91%"><a class="smenu" href="support_system/en" target="_blank">Ticketing System</a></td>
			</tr>
		</table> -->
		<!-- <table cellspacing="0" cellpadding="0" width="100%" align="center" border="0">
			<tr>
				<td width="9%"><img src="images/dot_menu.gif" width="19" height="16" /></td>
				<td width="91%"><a class="smenu" href="login.php?act=logout" target="_blank">Kill Session</a></td>
			</tr>
		</table> -->		</td>
	</tr>
</table>
<div style="height:15; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>
<script>
function fncCheckOTP(otp){
	var  params_prog = "user=" + otp;
	$.ajax({type: "POST",async: false,url: "search_ajax/getOTP.php", data:params_prog,success: 
		function(msg){ 	
					
			  if (!msg || msg == 0 || msg == '0'){
				  $('#tr_otp').hide();
			  }
			  else{
				  $('#tr_otp').show();
			  }
			},
	       error: function(XMLHttpRequest, textStatus, errorThrown)
	        {
	    	  alert("problem Get OTP");
	        }});
    
}
</script>

<table cellspacing="0" cellpadding="0" width="94%" align="center" border="1" style="border-collapse:collapse; border:1px solid #C0C0C0">
	<tr valign="top">
		<td>
		<div class="smenu" style="background-color:#EDEDED; padding:2px"> <img src="images/icon/group_ge.gif" align="left" />Login</div>
		<div><img src="images/space.gif" width="1" height="1" /></div>
		<table cellspacing="0" cellpadding="0" width="100%" align="center" border="0">
			<form name="login" action="login.php" method="post">
				<td></td>
				<td width="2"></td>
				<td width="100"></td>
				<td width="10"></td>
			</tr>
			<tr>
				<td align="right"><font color="#3a618c">username</font></td>
				<td></td>
				<td align="left"><input type="text" name="user_name" value="" class="login_input" onblur="fncCheckOTP(this.value)" /></td>
				<td></td>
			</tr>
			<tr height="20">
				<td align="right"><font color="#3a618c">password</font></td>
				<td></td>
				<td align="left"><input type="password" name="user_pass" value="" class="login_input" /></td>
				<td></td>
			</tr>
				<tr height="20" style="display:none" id="tr_otp">
				<td align="right"><font color="red">OTP</font></td>
				<td></td>
				<td align="left"><input type="password" name="user_otp" value="" class="login_input" /></td>
				<td></td>
			</tr>
			
			<tr height="22">		
				<td colspan='4' style="width:100%;padding: 0px 6px;">
					<input type="hidden" name="from_page" value="/SVUIS/student_payments.php" />
					<a style="display: none;" align="right" value="Forgot Password"  href="reset_password.php" ><font color="red" size="1">Forgot Password?</font></a>
				
					<input style=" margin-left: 28px; " type="submit" value="login" class="btn1" />
				</td>
			</tr>
			
			</form>
		</table>
		</td>
	</tr>
</table>
<div style="height:14; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>


<!--  div style="height:14; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>
<table cellspacing="0" cellpadding="0" width="95%" align="center" border="0">
	<tr valign="top">
		<td colspan="2" align="center">
			<a href="http://mail.svuonline.org" target="_blank" style="cursor:pointer">
				<img src="images/mail.jpg"/>
			</a>
		</td>
	</tr>
</table -->

<!--  div style="height:14; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>
<table cellspacing="0" cellpadding="0" width="95%" align="center" border="0">
	<tr valign="top">
		<td colspan="2" align="center">
			<a href="https://moodle.svuonline.org" target="_blank" style="cursor:pointer">
				<img src="images/moodle.jpg"/>
			</a>
		</td>
	</tr>
</table -->



<!--  div style="height:14; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>
<table cellspacing="0" cellpadding="0" width="95%" align="center" border="0" style="background-color:#D6DEE6;">
	<tr valign="top">
		<td colspan="2" align="center">
			<a href="https://requestsystem.svuonline.org" target="_blank" style="cursor:pointer">
				<img src="images/web_request.jpg"/>
			</a>
		</td>
	</tr>
</table -->

<!-- div style="height:14; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>
<table cellspacing="0" cellpadding="0" width="95%" align="center" border="0">
	<tr valign="top">
		<td colspan="2" align="center">
			<a href="http://svu.netlanguages.com/netlang/" target="_blank" style="cursor:pointer">
				<img src="images/english_courses.jpg"/>
			</a>
		</td>
	</tr>
</table -->

<!-- div style="height:14; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>
<table cellspacing="0" cellpadding="0" width="95%" align="center" border="0">
	<tr valign="top">
		<td colspan="2" align="center">
			<a href="https://socialnetwork.svuonline.org/svu_socialnetwork/" target="_blank" style="cursor:pointer">
				<img src="images/social_network.jpg"/>
			</a>
		</td>
	</tr>
</table -->

<div style="height:14; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>
<table cellspacing="0" cellpadding="0" style="height: 63px;" width="100%" align="top" border="0">
	<tr valign="top">
		<td colspan="2" align="center">
			<a href="https://www.youtube.com/channel/UCJwPgp0tOp1ZqkzbmDvFSaw" target="_blank" style="cursor:pointer">
				<img src="images/youtube.jpg"/>
			</a>
		</td>
	</tr>
</table>

<div style="height:15; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>
<table cellspacing="0" cellpadding="0" width="95%" align="center" border="0" style="background-color:#D6DEE6;">
	<tr valign="top">
		<td colspan="2" align="center">
			<a href="https://www.facebook.com/svuonline.org" target="_blank" style="cursor:pointer">
				<img src="images/facebook.jpg"/>
			</a>
		</td>
	</tr>
</table>

<!-- div style="height:14; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>
< table cellspacing="0" cellpadding="0" width="95%" align="center" border="0">
	<tr valign="top">
		<td colspan="2" align="center">
			<a href="https://twitter.com/SVU_Syria" target="_blank" style="cursor:pointer">
				<img src="images/twitter.jpg"/>
			</a>
		</td>
	</tr>
</table -->


<!--<!--? if ( (session_is_registered('student') && $_SESSION ['student']['student_status'] == '3') || ((session_is_registered('user')) && (session_is_registered('group'))) ) { ?>
<div style="height:14; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>
<table cellspacing="0" cellpadding="0" width="95%" align="center" border="0">
	<tr valign="top">
		<td width="43" style="padding-left:5px">
			<a href="category.php" target="_blank" style="font-size:11px; color:#DB6705; cursor:pointer">
			<img src="images/vfs.jpg" width="40" height="40"></a>
		</td>
		<td valign="middle" style="padding-left:5px; color:#DB6705">
			<a href="category.php" target="_blank" style="font-size:11px; color:#DB6705; cursor:pointer">
			<b>Virtual File System</b><br>Sharing files and folders</a>
		</td>
	</tr>
</table>

<!--? } ?>-->


<!--  div style="height:14; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div-->
<!--table cellspacing="0" cellpadding="0" width="95%" align="center" border="0">
	<tr valign="top">
		<td width="43" style="padding-left:5px">
				<img src="images/vclass.gif" width="40" height="40">

		</td>
		<td valign="middle" style="padding-left:5px; color:#DB6705">
				<b>Virtual Classes</b><br>Download old Sessions<br>


			<!-- a href="http://sessions.svuonline.org/loadbalance/tutor.aspx" target="_blank" style="font-size:11px; color:#DB6705; cursor:pointer">
				<font  color="#0000CC" style="font-style:normal">Tutor</font>
			</a-->
			<!--  a href="http://sessions.svuonline.org/" target="_blank" style="font-size:11px; color:#DB6705; cursor:pointer">
				<font  color="#CC0000" style="font-style:normal">Student</font>
			</a>

		</td>
	</tr>
</table-->


<!--  div style="height:14; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>
<table cellspacing="0" cellpadding="0" width="95%" align="center" border="0">
	<tr valign="top">
		<td colspan="2" align="center">
			<a href="https://www.svuonline.org/SVUIS/grad_chk.php" target="_blank" style="cursor:pointer">
				<img src="images/graduation_checker.jpg"/>
			</a>
		</td>
	</tr>
</table -- >


<!--   div style="height:14; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>
<table cellspacing="0" cellpadding="0" width="95%" align="center" border="0">
	<tr valign="top">
		<td width="43" style="padding-left:5px">
			<a href="https://oldmail.svuonline.org" target="_blank" style="font-size:11px; color:#DB6705; cursor:pointer">
				<img src="images/old_mail.png" width="40" height="40">
			</a>
		</td>
		<td valign="middle" style="padding-left:5px; color:#DB6705">
			<a href="https://oldmail.svuonline.org" target="_blank" style="font-size:11px; color:#DB6705; cursor:pointer">
				<b>OLD Mail System</b><br>Show OLD Emails
			</a>
		</td>
	</tr>
</table-->
<!--<div style="height:14; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>
<table cellspacing="0" cellpadding="0" width="95%" align="center" border="0">
	<tr valign="top">
		<td width="43" style="padding-left:5px">
			<a href="http://213.178.230.164/otrs/customer.pl" target="_blank" style="font-size:11px; color:#DB6705; cursor:pointer">
				<img src="images/support.gif" width="40" height="40">
			</a>
		</td>
		<td valign="middle" style="padding-left:5px; color:#DB6705">
			<a href="http://213.178.230.164/otrs/customer.pl" target="_blank" style="font-size:11px; color:#DB6705; cursor:pointer">
				<b>Ticketing System</b><br>Submitting & Tracking Issues
			</a>
		</td>
	</tr>
</table>-->
<!-- div style="height:14; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>
<table cellspacing="0" cellpadding="0" width="95%" align="center" border="0">
	<tr valign="top">
		<td width="43" style="padding-left:5px">
			<a href="http://lms.svuonline.org/mlepremium/" target="_blank" style="font-size:11px; color:#DB6705; cursor:pointer">
				<img src="images/LMS.gif" width="40" height="40">
			</a>
		</td>
		<td valign="middle" style="padding-left:5px; color:#DB6705">
			<a href="http://lms.svuonline.org/mlepremium/" target="_blank" style="font-size:11px; color:#DB6705; cursor:pointer">
				<b>Old Learning Management System</b><br>E-Content & Courses
			</a>
		</td>
	</tr>
</table -->


<!-- div style="height:14; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>
<table cellspacing="0" cellpadding="0" style="height: 63px;" width="100%" align="top" border="0">
	<tr valign="top">
		<td colspan="2" align="center">
			<a href="acm.php" target="_blank" style="cursor:pointer">
				<img src="images/acm.jpg"/>
			</a>
		</td>
	</tr>
</table -->


<!-- div style="height:15; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>

<table cellspacing="0" cellpadding="0" width="95%" align="center" border="0" style="background-color:#D6DEE6;">
            <tr valign="top">
                        <td width="63" style="padding-left:5px">
                                    <a href="QA_page.php" target="_self" style="font-size:11px; color:#DB6705; cursor:pointer">
                                                <img src="images/QALogo1.gif" width="50" height="40">
                                    </a>
                        </td>
                        <td valign="middle" style="padding-left:5px; color:#6699FF">
                                    <a href="QA_page.php" target="_self" style="font-size:11px; color:#DB6705; cursor:pointer">
                                                <b>Academic</b><br>Quality Assurance<br>
                                                </br>

                                    </a>

                        </td>

            </tr>

</table  -->
					<div style="height:14; background-image:url(images/dotted_pixel_horizontal.gif); width:100%"/></div>
				</div>
				
				<div align="center" style="width:15px; max-width:15px; display:none" id="left_panel_hide">
				<img src="images/show_btn.gif" width="12" height="38" onClick="left_panel.style.display='';left_panel_hide.style.display='none'"align="right" vspace="35" style="cursor:pointer" />
				</div>
				</td>
				<td valign="top" background="images/dotted_pixel.gif"><img height="3" src="images/dotted_pixel.gif" width="1" /></td>
				<td valign="top" width="98%"><br />
				<img src="images/webdev_arena.gif" />
	<script>
										function conf()
										{
											var a;
											//a=confirm('Are you sure you want to delete this payment?');
											//if(a==true)
												a=confirm('هذا الزر يقوم بحذف الايصال هل أنت متأكد من هذه العملية');
											if(a==true)
												a=confirm('انت تقوم بحذف الايصال هل انت متأكد');
											
										return a;	
											
										}
										function update_reg(payment_id,res,vdate)
										{
											conf=confirm("Are you sure you want to update this payment ");
											if(conf)
											{
											var update_p = true;	

											var variable="";

												variable="act=update_pay" + "&pid=" + payment_id + "&date=" + vdate+ "&desc=" + res;

											$.ajax({
													   type: "POST",
													  		   
													   url: "update_payment.php",
													  
													   data: variable ,
													   success: function(msg){		     
													     if(msg == "error")
													    	 alert("error in update payment:"+"   "+payment_id);
													     else
													    	alert("payment updated successfully:"+"   "+payment_id);
													    
													   }
													 });
												
														
														}
											else
												return;
								
										}
										</script>
				</td>
				<td valign="top" width="1" background="images/grey_pixel.gif"><img height="1" src="images/grey_pixel.gif" width="1" /></td>
			</tr>
		</table>
<iframe width=199 height=178 name="gToday:normal:agenda.js" id="gToday:normal:agenda.js" src="DatePicker/ipopeng.htm" scrolling="no" frameborder="0" style="visibility:visible; z-index:999; position:absolute; top:-500px; left:-500px;"></iframe>
		<table cellspacing="0" cellpadding="0" width="772" align="center" border="0">
			<tr bgcolor="#6f7b79">
				<td height="2"><img height="8" src width="0" /></td>
			</tr>
			<tr>
				<td>
								<table cellspacing="0" cellpadding="0" width="100%" align="center" border="0">
					<tr>
						<td height="30" align="center" style="font-family:'Trebuchet MS', Verdana, Tahoma;">
						Copyright © 2011-2012, SVU All rights reserved.<br>
						<small style="color:#0066CC; font-size:10px"> </small>
						
						</td>
					</tr>
				</table>
				</td>
			</tr>
		</table>
<!--------//-- footer --------------->
<!------//---------------------------------------------->
    </TD>
    <TD width="5%" bgColor=#ffffff height=108>&nbsp;</TD>
  </TR>
</TABLE>
<font style='font-size:11px' color=red><center>page in 0.0018949508666992 seconds</center></font></body>
</html>
