// check currecncy and telecenter for admission inscription 
	function checkTelecenterCurr(){
	

	var nat = $('#Nationality').val();
	var TelecenterCountry = "";
	if(nat == ""){
		//alert("������� ������ �� ���� ������ ��� ������ ��� �������");
		$('#Telecenter').val("");
		$('#Account_Currency').val("");
		return false;
		}
		
		var sid = $('#SID').val();
		//alert($('#Telecenter').val())
		$.ajax({
		   type: "POST",
		   dataType: "json",
		   async: false,
		   url: "search_ajax/getTelecenterCountry.php",
	   	   data: "tid="+$('#Telecenter').val()+ "&sid="+sid,
		   success: function(msg){
	 			TelecenterCountry = msg.telecenterCountry;
		   }
		   ,
	       error: function(XMLHttpRequest, textStatus, errorThrown)
	        {
	    	  TelecenterCountry = "";
	        }
		 });
		
		
	if(TelecenterCountry =="Saudi Arabia") 
		$('#Account_Currency').val(2);


		var motherNat = $("#mother_nationality").val();
		var doc1 = $("#attachment10").val();
		var doc2 = $("#attachment11").val();
		
		if(doc1 == "")
			doc1 = $("#attachment_currency_file10").val();
			
		if(doc2 == "")
			doc2 = $("#attachment_currency_file11").val();		
		
		if( TelecenterCountry !="Syria" ){ 
				$('#Account_Currency').val(2);
				}
			else{
			  if(syrianNationality(nat)){
				$('#Account_Currency').val(1);
			}
			else{
				if(syrianNationality(motherNat) && doc1!="" && doc2!="")
					$('#Account_Currency').val(1);
				else
					$('#Account_Currency').val(2);
				}
			
			}
			
		return true;
		
	}
	
	
function syrianNationality(nat){
 if(nat !=20 && nat !=21 && nat !=11 )
 	return false;
  return true;
}
	
//Behavior of the exchange block
function selectExchange(checkExch,orgCur){
	if(checkExch){ 
		document.getElementById('currecies').style.display='block'; 
		document.getElementById('tr_exchange_rate').style.display='block'; 
		changeRate(document.getElementById("new_currency").value); 
	} else {  
		document.getElementById("exchange_rate").value = "";
		document.getElementById('currecies').style.display='none'; 
		document.getElementById('tr_exchange_rate').style.display='none';
		changeRate(orgCur); 
		calcTotalAmt();
	}
	calcTotalAmt();
	
}
// change rate
function changeRate(val){
	
	 var rate = currenciesRates[val];
	 document.getElementById("exchange_rate").value = rate;	
	 document.getElementById("newCur").value = currencies[val];
	 document.getElementById("newCurId").value = val;
	 calcTotalAmt();
	}

// Menu Styles
function createStyles(quant){
styleBorder=(menuStyle.split(",")[quant-1].toLowerCase() == "flat")?cellBorder:0 
  document.writeln ('<style>');
  document.writeln ('.rcMenuStatic'+quant+' {font-family:'+fontFace.split(",")[quant-1]+';font-size:'+fontSize.split(",")[quant-1]+';color:'+fontColour.split(",")[quant-1]+';font-weight:'+fontWeight.split(",")[quant-1]+';background-color:'+menuBackground.split(",")[quant-1]+'; cursor:hand; text-decoration:'+fontDecoration.split(",")[quant-1]+'}');
  document.writeln ('.rcMenuHover'+quant+'  {font-family:'+fontFace.split(",")[quant-1]+';font-size:'+fontSize.split(",")[quant-1]+';color:'+fontHoverColour.split(",")[quant-1]+';font-weight:'+fontWeight.split(",")[quant-1]+';background-color:'+menuHoverBackground.split(",")[quant-1]+'; cursor:hand; text-decoration:'+fontDecoration.split(",")[quant-1]+'}');
  document.writeln ('.rcSubMenuStatic'+quant+' {font-family:'+sfontFace.split(",")[quant-1]+';font-size:'+sfontSize.split(",")[quant-1]+';color:'+sfontColour.split(",")[quant-1]+';font-weight:'+sfontWeight.split(",")[quant-1]+';text-decoration:'+sfontDecoration.split(",")[quant-1]+';background-color:'+smenuBackground.split(",")[quant-1]+'; cursor:hand}');
  document.writeln ('.rcSubMenuTitle'+quant+' {font-family:'+stfontFace.split(",")[quant-1]+';font-size:'+stfontSize.split(",")[quant-1]+';color:'+stfontColour.split(",")[quant-1]+';font-weight:'+stfontWeight.split(",")[quant-1]+';text-decoration:'+stfontDecoration.split(",")[quant-1]+';background-color:'+stmenuBackground.split(",")[quant-1]+'; cursor:hand}');
  document.writeln ('.rcSubMenuHover'+quant+'  {font-family:'+sfontFace.split(",")[quant-1]+';font-size:'+sfontSize.split(",")[quant-1]+';color:'+sfontHoverColour.split(",")[quant-1]+';font-weight:'+sfontWeight.split(",")[quant-1]+';text-decoration:'+sfontDecoration.split(",")[quant-1]+';background-color:'+smenuHoverBackground.split(",")[quant-1]+'; cursor:hand}');
  document.writeln ('</style>');
}
// Build and show the main menu items
function showMenus(quant,definedOrientation)
{
  createStyles(quant);
  if(definedOrientation!=""){orientation=definedOrientation}
  if (orientation.toLowerCase() == "vertical"){document.writeln ('<table border="0" cellpadding="0" cellspacing="'+styleBorder+'" bgColor="'+borderColor.split(",")[quant-1]+'">')}
  else{document.writeln ('<table border="0" cellpadding="0" cellspacing="'+styleBorder+'" bgColor="'+borderColor.split(",")[quant-1]+'"><tr>')}  
  for (x=0; x<eval("Menu"+quant).length; x++)
  {
    if (orientation.toLowerCase()=="vertical") document.writeln('<tr>')
    document.writeln ('<td width="'+menuWidth+'" onclick="tdMouseClick(\''+quant+'mainLink'+x+'\')" onMouseOver="hoverMenu(); popDown(\''+quant+'\','+x+', \''+quant+'button'+x+'\',\''+orientation+'\'); " onMouseOut="clearMenu('+quant+','+x+')" ')
    if (menuStyle.split(",")[quant-1].toLowerCase() == "3d"){document.writeln ('style="border-left:'+cellBorder+'px solid '+borderHighlight.split(",")[quant-1]+';border-top:'+cellBorder+'px solid '+borderHighlight.split(",")[quant-1]+';border-right:'+cellBorder+'px solid '+borderShadow.split(",")[quant-1]+';border-bottom:'+cellBorder+'px solid '+borderShadow.split(",")[quant-1]+';"');}        
    document.writeln ('><div id="'+quant+'button'+x+'"><table border="0" cellpadding="'+cellPadding.split(",")[quant-1]+'" cellspacing="0" width="100%"><tr><td class="rcMenuStatic'+quant+'" id="'+quant+'cell'+x+'" nowrap>');
    document.writeln ('<a id="'+quant+'mainLink'+x+'" href="'+eval("Menu"+quant)[x][1]+'" target="'+eval("Menu"+quant)[x][2]+'" class="rcMenuStatic'+quant+'">'+eval("Menu"+quant)[x][0]+'</a></td>');
    if (subIndicate == 1&&eval("subMenu"+quant)[x].length>=1){
      document.writeln('<td class="rcMenuStatic'+quant+'" id="'+quant+'cell'+x+'a" align="right">');
      document.writeln ('<a id="'+quant+'mainLink'+x+'a" href="'+eval("Menu"+quant)[x][1]+'" target="'+eval("Menu"+quant)[x][2]+'" class="rcMenuStatic'+quant+'">'+indicator+'</a></td>');}
    document.writeln ('</tr></table></div></td>');    
    if (orientation.toLowerCase()=="vertical") document.writeln('</tr>')
  }
  if (orientation.toLowerCase() == "vertical"){document.writeln ('</table>');}
  else{document.writeln ('</tr></table>');}   
// Build the sub menu items
  for (x=0; x<eval("Menu"+quant).length; x++)
  { 
    if (eval("subMenu"+quant)[x].length > 0)
    {     
      document.writeln ('<div id="'+quant+'MENU'+x+'" style="visibility:hidden; position:absolute; z-index:2" >');
      document.writeln ('<table width="'+smenuWidth.split(",")[quant-1]+'" border="0" cellpadding="'+cellPadding.split(",")[quant-1]+'" cellspacing="'+styleBorder+'" bgColor="'+sborderColor.split(",")[quant-1]+'">');
      for (y=0; y<eval("subMenu"+quant)[x].length; y++)
      {
        document.writeln ('<tr>');
        if (eval("subMenu"+quant)[x][y][1].indexOf("#") != -1)
        {
          document.writeln ('<td bgColor="'+eval("subMenu"+quant)[x][y][2]+'" id="'+quant+'subMenu'+x+y+'" onMouseOver="hoverMenu(); highlightMenu(\'sub\','+x+','+y+',\'\','+quant+')" nowrap')
          if (menuStyle.split(",")[quant-1].toLowerCase() == "3d"){document.writeln ('style="border-left:'+cellBorder+'px solid '+sborderHighlight.split(",")[quant-1]+';border-top:'+cellBorder+'px solid '+sborderHighlight.split(",")[quant-1]+';border-right:'+cellBorder+'px solid '+sborderShadow.split(",")[quant-1]+';border-bottom:'+cellBorder+'px solid '+sborderShadow.split(",")[quant-1]+';"');}
          document.writeln ('><p style="font-family:'+sfontFace.split(",")[quant-1]+'; font-size:'+sfontSize.split(",")[quant-1]+'; color:'+eval("subMenu"+quant)[x][y][1]+'"id="'+quant+'subLink'+x+y+'">'+eval("subMenu"+quant)[x][y][0]+'</p></td></tr>');
        }
        else
        {
			if (eval("subMenu"+quant)[x][y][0] == "������� ������� ������� ����" || eval("subMenu"+quant)[x][y][0] == "������� �������")
			{
				document.writeln ('<td align="center" id="'+quant+'subMenu'+x+y+'" class="rcSubMenuTitle'+quant+'" onMouseOver="hoverMenu(); highlightMenu(\'sub\','+x+','+y+',\'\','+quant+')" onMouseOut="clearMenu('+quant+','+x+');" onclick="tdMouseClick(\''+quant+'subLink'+x+y+'\')" nowrap')
				if (menuStyle.split(",")[quant-1].toLowerCase() == "3d"){document.writeln ('style="border-left:'+cellBorder+'px solid '+sborderHighlight.split(",")[quant-1]+';border-top:'+cellBorder+'px solid '+sborderHighlight.split(",")[quant-1]+';border-right:'+cellBorder+'px solid '+sborderShadow.split(",")[quant-1]+';border-bottom:'+cellBorder+'px solid '+sborderShadow.split(",")[quant-1]+';"');}
				document.writeln ('>'+eval("subMenu"+quant)[x][y][0]+'</td></tr>');
			}
			else
			{
				document.writeln ('<td id="'+quant+'subMenu'+x+y+'" class="rcSubMenuStatic'+quant+'" onMouseOver="hoverMenu(); highlightMenu(\'sub\','+x+','+y+',\'\','+quant+')" onMouseOut="clearMenu('+quant+','+x+');" onclick="tdMouseClick(\''+quant+'subLink'+x+y+'\')" nowrap')
				if (menuStyle.split(",")[quant-1].toLowerCase() == "3d"){document.writeln ('style="border-left:'+cellBorder+'px solid '+sborderHighlight.split(",")[quant-1]+';border-top:'+cellBorder+'px solid '+sborderHighlight.split(",")[quant-1]+';border-right:'+cellBorder+'px solid '+sborderShadow.split(",")[quant-1]+';border-bottom:'+cellBorder+'px solid '+sborderShadow.split(",")[quant-1]+';"');}
				document.writeln ('><a id="'+quant+'subLink'+x+y+'" href="'+eval("subMenu"+quant)[x][y][1]+'" target="'+eval("subMenu"+quant)[x][y][2]+'" class="rcSubMenuStatic'+quant+'">'+eval("subMenu"+quant)[x][y][0]+'</a></td></tr>');
			}
        }
      }

      document.writeln ('</table></div>');
    }
  }
} 
// Change colour or menu and submenu items when the mouse hovers over.  
function highlightMenu(element,mainMenu,dropMenu,state,quant)
{
  hoverMenu();
  state=(state == "hover")?"rcMenuHover"+quant:"rcMenuStatic"+quant
  if (element == "sub")
  {
    for (x=0; x < eval("subMenu"+quant)[mainMenu].length; x++)
    {
      if (eval("subMenu"+quant)[mainMenu][x][1].indexOf("#") == -1){
		  if (eval("subMenu"+quant)[mainMenu][x][0] == "������� ������� ������� ����" || eval("subMenu"+quant)[mainMenu][x][0] == "������� �������")
			{
				eval(obj0+'("'+quant+'subMenu'+mainMenu+x+'").className = "rcSubMenuTitle'+quant+'"')
				eval(obj0+'("'+quant+'subLink'+mainMenu+x+'").className = "rcSubMenuTitle'+quant+'"')
			}
			else{
				eval(obj0+'("'+quant+'subMenu'+mainMenu+x+'").className = "rcSubMenuStatic'+quant+'"')
				eval(obj0+'("'+quant+'subLink'+mainMenu+x+'").className = "rcSubMenuStatic'+quant+'"')
			}
      }
    } 
    if (eval("subMenu"+quant)[mainMenu][dropMenu][1].indexOf("#") == -1)  {
      eval(obj0+'("'+quant+'subMenu'+mainMenu+dropMenu+'").className="rcSubMenuHover'+quant+'"')
      eval(obj0+'("'+quant+'subLink'+mainMenu+dropMenu+'").className="rcSubMenuHover'+quant+'"')
    }
  }
  else
  {
    eval(obj0+'("'+quant+'cell'+mainMenu+'").className = "'+state+'"')
    eval(obj0+'("'+quant+'mainLink'+mainMenu+'").className = "'+state+'"')
    if (subIndicate == 1&&eval("subMenu"+quant)[mainMenu].length>=1)
    {
      eval(obj0+'("'+quant+'cell'+mainMenu+'a").className = "'+state+'"')
      eval(obj0+'("'+quant+'mainLink'+mainMenu+'a").className = "'+state+'"')
    }
  }
}
// Find positioning for sub menus
function getOffset(obj0, dim) 
{
  if(dim=="left") 
  {     
    oLeft = obj0.offsetLeft;    
    while(obj0.offsetParent!=null) 
    {    
      oParent = obj0.offsetParent     
      oLeft += oParent.offsetLeft 
      obj0 = oParent 	
    }
    return oLeft
  }
  else if(dim=="top")
  {
    oTop = obj0.offsetTop;
    while(obj0.offsetParent!=null) 
    {
      oParent = obj0.offsetParent
      oTop += oParent.offsetTop
      obj0 = oParent 	
    }
    return oTop
  }
  else if(dim=="width")
  {
    oWidth = obj0.offsetWidth
    return oWidth
  }  
  else if(dim=="height")
  {
    oHeight = obj0.offsetHeight
    return oHeight
  }    
  else
  {
    alert("Error: invalid offset dimension '" + dim + "' in getOffset()")
    return false;
  }
}
// Show sub menus
function popDown(quant, param, id, orientation)
{
  var cellBorderOffset = (isNS6)?cellBorder:eval(cellBorder*2)
  var browserAdjustment = (isNS6)?cellBorder:0
  var menu;
  var button;

  if (id)
  {    
    getOffset(eval(obj0+'(id)'),'left');
    getOffset(eval(obj0+'(id)'),'top');    
    getOffset(eval(obj0+'(id)'),'width');  
    getOffset(eval(obj0+'(id)'),'height');
    
    if (eval("Menu"+quant+"["+param+"][3]")=="right" && eval("subMenu"+quant+"["+param+"].length")>0) 
    { 
      oLeft=oLeft  
      oLeft=oLeft+oWidth; 
      getOffset(eval(obj0+'("'+quant+'MENU'+param+'")'),'width');
      oLeft=oLeft-oWidth ;
      alignAdjustment = cellBorder*2 + 1
    }
    else 
    {
      alignAdjustment = 0
      oLeft=oLeft
    }    
  }  

  
  n = 0;    
  while (n < eval("Menu"+quant).length)
  {          
    menu = quant+"MENU"+n
    if (param == n)
    {

      theobj0 = eval(obj0+'(menu)');
      if (theobj0)
      {
         theobj0.style.visibility = "visible"
          if (orientation.toLowerCase()=="vertical"){
            theobj0.style.left=(menuStyle.split(",")[quant-1].toLowerCase()=="flat")?oLeft+oWidth+cellBorder+parseInt(horizontalOffset.split(",")[quant-1]):oLeft+oWidth+cellBorderOffset+parseInt(horizontalOffset.split(",")[quant-1]);
            theobj0.style.top=(menuStyle.split(",")[quant-1].toLowerCase()=="flat")?oTop-cellBorder+parseInt(verticalOffset.split(",")[quant-1]):oTop+parseInt(verticalOffset.split(",")[quant-1])-browserAdjustment}
          else{
            theobj0.style.left=(menuStyle.split(",")[quant-1].toLowerCase()=="flat")?oLeft-cellBorder+parseInt(horizontalOffset.split(",")[quant-1])+alignAdjustment:oLeft+parseInt(horizontalOffset.split(",")[quant-1])-browserAdjustment+alignAdjustment;
            theobj0.style.top=(menuStyle.split(",")[quant-1].toLowerCase()=="flat")?oTop+oHeight+cellBorder+parseInt(verticalOffset.split(",")[quant-1]):oTop+oHeight+cellBorderOffset+parseInt(verticalOffset.split(",")[quant-1]);}
        }
      
       highlightMenu('main',n,'','hover',quant)
       if (eval("subMenu"+quant)[param].length > 0)
       {
         for (x=0; x<eval("subMenu"+quant)[param].length; x++)
         {
           if(eval("subMenu"+quant)[param][x][1].indexOf("#") == -1){
			    if (eval("subMenu"+quant)[param][x][0] == "������� ������� ������� ����" || eval("subMenu"+quant)[param][x][0] == "������� �������")
			{
				eval (obj0+'("'+quant+'subMenu'+param+x+'").className = "rcSubMenuTitle'+quant+'"')
				eval (obj0+'("'+quant+'subLink'+param+x+'").className = "rcSubMenuTitle'+quant+'"')
			}else
			{
             eval (obj0+'("'+quant+'subMenu'+param+x+'").className = "rcSubMenuStatic'+quant+'"')
             eval (obj0+'("'+quant+'subLink'+param+x+'").className = "rcSubMenuStatic'+quant+'"')  
			}
           }      
         }
       }
    }
    else 
    {  
      for (x=1; x<quantity+1; x++)
      {       
        menu = x+"MENU"+n   
        //alert(menu)     
        if (eval(obj0+'(menu)'))
        {
          eval(obj0+'(menu).style.visibility = "hidden"')            
        }
        highlightMenu ('main',n,'','static',quant)
      }
    }

    n++
  }  
}
// Re-set timer for sub menus
function hoverMenu()
{
  if(timer)
  clearTimeout(timer)
}
// Set timer for sub menus
function clearMenu(quant,menu)
{
   setDelay = subMenuDelay*100
   delay = (eval("subMenu"+quant)[menu].length > 0)?setDelay:1
  
   timer = setTimeout("popDown("+quant+","+(eval("Menu"+quant).length + 1)+")",delay)
}
// when you click the box, perform the same function as if the user had clicked the hyperlink
function tdMouseClick(theElement)
{
  eval(obj0+'(theElement).click()')
}

function newCalcTotal(){
	//alert('hi');
	
		var total = 0;
		
		var cPrice = 0;
		var ePrice = 0;
		$('input[name="c[]"]').each(
				function(){
					if ( $(this).prop("checked") && ( $(this).prop("disabled") != true ))  {
						$cPrice = $(this).next().val();
						$cExam = $(this).next().next().val();
						cPrice += parseInt($cPrice);
						//alert ($(this).prop("disabled")  + "  " +  cPrice);
						ePrice += parseInt($cExam);
					}
				}
		);
		
		var discount = 0;
		if ($('select[name="reduc"]').length != 0)
			 discount = $('select[name="reduc"]').val();
		cPrice = cPrice - cPrice*discount/100;
		
		total = cPrice + ePrice;
		
		var regFee = 0;
		if ($('input[name="regCheck"]').length != 0)
			if ( $('input[name="regCheck"]').prop("checked") )
				 regFee = parseInt($('input[name="regCheck"]').val());		
		
		var mofadalahFee = 0;
		if ($('input[name="mofadalahCheck"]').length != 0)
			if ( $('input[name="mofadalahCheck"]').prop("checked") )
				 mofadalahFee = parseInt($('input[name="mofadalahCheck"]').val());
				 
		var annFee = 0;
		if ( $('input[name="annuelCheck"]').prop("checked") )
			annFee = parseInt($('input[name="annuelCheck"]').val());
			
		var graduateFee = 0;
		if ($('input[name="graduateFee"]').length != 0)
			if ( $('input[name="graduateFee"]').prop("checked") )
				graduateFee = parseInt($('input[name="graduateFee"]').val());
			
		var duplicata = 0;
		if ($('input[name="duplicata"]').length != 0)
			if ( $('input[name="duplicata"]').prop("checked") )
				duplicata = parseInt($('input[name="duplicata"]').val());		
		
		total = total + regFee + annFee + graduateFee + duplicata + mofadalahFee;
		
		if ($('input[name="correctionAmount"]').length != 0)
			if($('input[name="correctionAmount"]').val() != ''){
			
				var cA = parseFloat($('input[name="correctionAmount"]').val());
				var sign = $('input:radio[name="sign"]:checked').val();
				if(sign == 'minus'){
					if(cA <= total)
						total = total - cA;
					else
						total = 0;	
				}else
					total = total + cA;
			}
        
		total = Math.ceil(total);
		
		var thesisInstallment = 0;
		if ($('input[name="installmentthesis"]').length != 0)
			if ($('input[name="installmentthesis"]').prop("checked"))
				 thesisInstallment = $('input[name="installmentthesis"]').val();
		
		total = Math.ceil(total - parseInt(thesisInstallment));
		
		var balance = 0;
		if ($('input[name="balance"]').length != 0)
			 balance = $('input[name="balance"]').val();
		
		
		if (balance != 0){
			var newTotal = 0;
			if (total > balance)
				 newTotal = total - balance;
			$('input[name="totalAmt"]').val(newTotal);
		}else
			$('input[name="totalAmt"]').val(total);
	}


function calcTotalAmt()
{
	var listCprice = document.getElementsByName("cprice");
	var listExamFee = document.getElementsByName("examFee");
	
	var regAndAnnuelAmt = 0;

	var annuelFees = document.getElementById("annuel_fees");
	if(annuelFees == null) return;
	
	var annuelFeesValue = parseFloat(annuelFees.value);
	if(isNaN(annuelFeesValue)) annuelFeesValue = 0;
	regAndAnnuelAmt += annuelFeesValue;

	
		
	var regFees = document.getElementById("reg_fees");	
	var regFeesValue = parseFloat(regFees.value);
	if(isNaN(regFeesValue)) regFeesValue = 0;
	regAndAnnuelAmt += regFeesValue;

	
	var gradAdvice = document.getElementById("grad_advice");
	
	if(gradAdvice){	
	var gradAdviceValue = parseFloat(gradAdvice.value);
	if(isNaN(gradAdviceValue)) gradAdviceValue = 0;
	regAndAnnuelAmt += gradAdviceValue;
	}
	
	
	var examResults = document.getElementById("exam_results");	
	if(examResults){
	var examResultsValue = parseFloat(examResults.value);
	if(isNaN(examResultsValue)) examResultsValue = 0;
	regAndAnnuelAmt += examResultsValue;
	}

	var duplicata = document.getElementById("duplicata");
	
	if(duplicata){	
	var duplicataValue = parseFloat(duplicata.value);
	if(isNaN(duplicataValue)) duplicataValue = 0;
	regAndAnnuelAmt += duplicataValue;
	}
	
	var stdReduction = parseFloat(document.getElementById("reduc").value);
	
	if(isNaN(stdReduction)) stdReduction = 0;
	
	var amtCorr = 0;
	if(document.getElementById("correction")){
	if(document.getElementById("correction").value != "")
		amtCorr = parseFloat(document.getElementById("correction").value);
	if(isNaN(amtCorr)) amtCorr = 0;
	}
	
	var totalCoursesAmt = 0;
	
	for(i=0;i<listCprice.length;i++){		
		if(listCprice[i].parentNode.childNodes[0].checked)
			totalCoursesAmt += parseFloat(listCprice[i].value);
		}
	
	
	totalCoursesAmt = totalCoursesAmt - totalCoursesAmt*stdReduction/100;
	
	
	var totalExamFeesAmt = 0;
	for(i=0;i<listExamFee.length;i++){			
		if(listExamFee[i].parentNode.childNodes[0].checked){
			currValue = parseFloat(listExamFee[i].value);
			if(!isNaN(currValue)){
				totalExamFeesAmt = totalExamFeesAmt + currValue;
			}				
		}
		}

	if(document.getElementById("ksa"))
		totalExamFeesAmt = parseFloat(document.getElementById("ksa").value) * totalExamFeesAmt;
	
	var totalAmt = totalCoursesAmt + totalExamFeesAmt + regAndAnnuelAmt;;
	document.getElementById("totalAmt").value = Math.ceil(totalAmt);

	if(document.getElementById("plusMinus")){
	var signCorrection = document.getElementById("plusMinus").value;
	if(signCorrection == '1')
		amtCorr = -1 * amtCorr;
	}
	totalAmt = Math.ceil(totalAmt);
	if(amtCorr > totalAmt){
		alert("The correction amount is greater than the total amount, the correction amount will be initialized");
		document.getElementById("correction").value = "";
		amtCorr = 0;
	}

	var totalAmtAfterCorrection = totalAmt - amtCorr;
	if(document.getElementById("totalAfterCorrection"))	
	document.getElementById("totalAfterCorrection").value = Math.ceil(totalAmtAfterCorrection);


	var isExch = false;
	if(document.getElementById("changeCurrency"))
		isExch = document.getElementById("changeCurrency").checked;

	if(!isExch){
		if(document.getElementById("totalNetAmount"))	
			document.getElementById("totalNetAmount").value = Math.ceil(totalAmtAfterCorrection);
	}
	else{ 
	 var rate =	document.getElementById("exchange_rate").value;
	 var T_amt = totalAmtAfterCorrection / rate;
	 document.getElementById("totalNetAmount").value = Math.ceil((T_amt*100)/100);
	}
	
}


function controlCorrectionReason(){

	if(!document.getElementById('correctionReason')) return false;
	
	var correctionReason = document.getElementById('correctionReason').value; 	
	if(document.getElementById('correction').value !="" && correctionReason.length<10){
		alert('You have to enter the reason of your correction payment, and at least it must contain 10 characters')
		return true;
	}
	return false;
			
}


function IsNumericSID()
//check for valid numeric strings	
{
	strString = $('#SID').val();
	var len = strString.length;
	var bln = (len == 11) && IsNumeric(strString);
	if(!bln){
		alert("����� ������ ��� �� ����� ������� ��ء ���� �� ����� 11 ����� �����");
		$('#SID').val("");
		}
	
}

function isMobile(strString){
	if(!IsNumeric(strString)) return false;
	
	if(strString.startsWith("09")){		
		if(strString.length != 10){
			alert("��� �������� ������ ��� �� ���� ��� ������ 10 ������");
			return false;
		}			 
	}
	else{
		if(!strString.startsWith("00")){
			return false;
		}
	}
	return true;
}


function IsNumeric(strString)
//check for valid numeric strings	
{	
	if(strString == "") return true;
var strValidChars = "0123456789.-";
var strChar;
var blnResult = true;

if (strString.length == 0) return false;

//test strString consists of valid characters listed above
for (i = 0; i < strString.length && blnResult == true; i++)
{
strChar = strString.charAt(i);
if (strValidChars.indexOf(strChar) == -1)
  {
  blnResult = false;
  }
}
return blnResult;
}


function chkNotNull(args){
	var elements=null, err=[];
	
	//if(args.jquery) elements = args;
	//if((''+args.tagName).toUpperCase() == 'FORM') 
	elements = $(args).find('input[@type="text"],input[@type="file"],textarea,select');
		
	elements = elements.filter('.notnull'); 
		
	elements.removeClass('nn_error');
	elements.removeClass('nn_error_select');
	elements.each(function(i){
		
		if(this.value == '' ||  this.value == '-1')	{
		    err.push(this);
		}
	});
    bool=true;
	if(err.length >= 1){
		for(var e=0;e<err.length;e++){
		    if ( (err[e].disabled!=true) && (err[e].style.display!='none') && (err[e].style.visibility!='hidden')) {
				if(err[e].tagName == "SELECT")
					$(err[e]).addClass('nn_error_select');
				else
			    	$(err[e]).addClass('nn_error');
			    bool=false;
			}    
		}
	}
	return bool;
}

//version 2
// used on checkForm function for mofadla
function chkNotNullV2(args){
	var elements=null, err=[];
	
	//if(args.jquery) elements = args;
	//if((''+args.tagName).toUpperCase() == 'FORM') 
	elements = $(args).find('input[type="text"],input[type="file"],textarea,select');
		
	elements = elements.filter('.notnull'); 
		
	elements.removeClass('nn_error');
	elements.removeClass('nn_error_select');
	elements.each(function(i){
		
		if(this.value == '' ||  this.value == '-1')	{
		    err.push(this);
		}
	});
    bool=true;
	if(err.length >= 1){
		for(var e=0;e<err.length;e++){
		    if ( (err[e].disabled!=true) && (err[e].style.display!='none') && (err[e].style.visibility!='hidden')) {
				if(err[e].tagName == "SELECT")
					$(err[e]).addClass('nn_error_select');
				else
			    	$(err[e]).addClass('nn_error');
			    bool=false;
			}    
		}
	}
	return bool;
}

function valid_mail(evt) {
	var keyCode = evt.which ? evt.which : evt.keyCode;
	var interdit = '&*?!:;,\t#~"%$?%*()[]{}<>|\\/`\'������������������������������������������������';
	var entree = String.fromCharCode(keyCode);

	if (interdit.indexOf(entree) >= 0) {
		return false;
	}
}

function isArabic(evt) {
	
	var keyCode = evt.which ? evt.which : evt.keyCode;
	var perm = '������������������������������������������������� ';
	if (perm.indexOf(String.fromCharCode(keyCode)) >= 0) {
		return true;
	}
	if(keyCode==8 || keyCode==9 || keyCode==46) return true;
	return false;
}


function isAlphabetic(evt) {
	
	var keyCode = evt.which ? evt.which : evt.keyCode;
	//alert(String.fromCharCode(keyCode));
	var txt = String.fromCharCode(keyCode);
	var regExpression=/[A-Za-z ]+/;
	if (regExpression.test(txt)) return true; 
	if(keyCode==8 || keyCode==9 || keyCode==46) return true;
	
	return false;
}


function isNumeric(evt) {
	
	var keyCode = evt.which ? evt.which : evt.keyCode;
	//alert(String.fromCharCode(keyCode));
	var valN = parseInt(String.fromCharCode(keyCode),10);
	if(isNaN(valN) && keyCode!=8 && keyCode!=9 && keyCode!=46)
		return false;
		
	return true;
}


// Script propos� par Marcus Eric - V1 : 2005
// V2 : 08/2006

// Enleve le '0' des nb < 10
function ConvNum(tabDeDate) {
for (i=0; i<tabDeDate.length; i++)
tabDeDate[i] = (tabDeDate[i].charAt(0)=='0')?tabDeDate[i].charAt(1):tabDeDate[i];
return tabDeDate;
}

// Retourne true si valeur_date est post�rieure � la date du jour
function DateFuture(valeur_date)
{var tabDate = valeur_date.split('-');
var datAujourdhui = new Date();
tabDate = ConvNum(tabDate);
if (valeur_date.length > 0)
{ var datTest_Date = new Date(parseInt(tabDate[2]), parseInt(tabDate[1])-1, parseInt(tabDate[0]));
if (datTest_Date <= datAujourdhui) return false;
}
return true;
}

// Retourne 1 si valeur_date1 < valeur_date2
// 0 si valeur_date1 = valeur_date2
// -1 si valeur_date1 > valeur_date2
function Compare_Dates(valeur_date1, valeur_date2)
{var tabDate1 = valeur_date1.split('-');
tabDate1 = ConvNum(tabDate1);
var datTest_Date1 = new Date(parseInt(tabDate1[2]), parseInt(tabDate1[1])-1, parseInt(tabDate1[0]));
var tabDate2 = valeur_date2.split('-');
tabDate2 = ConvNum(tabDate2);
var datTest_Date2 = new Date(parseInt(tabDate2[2]), parseInt(tabDate2[1])-1, parseInt(tabDate2[0]));
return (datTest_Date2-datTest_Date1==0)?"0":(datTest_Date2-datTest_Date1<0)?"-1":"1";
}


function changeRate(rateObj,objN){


	var specField = document.getElementById("degree"+objN+"_special1") ;
	if(specField == null || specField.value == "" || specField.value ==-1)
		 return true;
	 
	res = $.ajax({
		   type: "POST",
		   async: false,		   
		   url: "search_ajax/getRate.php",
		   data: "q="+specField.value+"&av="+rateObj.value,
		   success: function(msg){
		
		   		msg = msg.trim();
		   		
				if (msg != "0"){
		   			alert(msg);
					rateObj.value = "";   
				}
			}	
		 });

	
}



function changeSpec(progOrd,init){
	
	var progID = $("#Program"+progOrd).val();
	var specFieldID = "Std_prog_spec"+progOrd;
	
	if(progID == "" || progID <0){
		$('#'+specFieldID).html("<option value='' selected> -- �������� --</option>");
		return false;
		}
	
	for(f=1;f<=3;f++){
		if(progOrd != f){
			var curProgID = $("#Program"+f).val();
			if(curProgID == progID){
				alert("��� ��� ����� �������̡ ��� �� �����  ����");
				if(progID != '32'  && progID != '14' && progID != '33' )
					$("#Program"+progOrd).val("");
				}
			}
		}
	var res = new Array();
	
	
	
	
	
	$('#'+specFieldID).html('');
	$('#'+specFieldID).removeClass("notnull");
	$('#'+specFieldID).removeClass("nn_error");
	$('#'+specFieldID).removeClass("nn_error_select");

        var degreeType1 = $('#Degree1').val();
        var degreeType2 = $('#Degree2').val();
        var progBac = true;

        if(degreeType1 > 1 || degreeType2 >1 )
           progBac = false;
	
	if(progID == '8'  || progID == '3' || progID == '6' || progID == '16' || (progID == '14' && progBac ==false)){
		if (!progSpecAdm[progID] || progSpecAdm[progID] == ""){
		 $.ajax({
			   type: "POST",
			   async: false,		   
			   url: "search_ajax/spec.php",
			   data: "q="+progID,
			   success: function(msg){  
			 	  progSpecAdm[progID] = msg;
			      
			   }
			 });
		}

		 if (progSpecAdm[progID] && progSpecAdm[progID] != ""){
	  	   		
			 $('#'+specFieldID).html("<option value='' selected> -- �������� --</option>"+ progSpecAdm[progID]);
		      if(progID != '14')
		      $('#'+specFieldID).addClass("notnull");
	   	  }
	   	  /*else
	   		$('#Isis_spec'+i).html(all);*/
	   		
	}
	else{		
		$('#'+specFieldID).html("<option value='' selected> -- �������� --</option>")
		 checkCertProg(progOrd);
	}	
	if(progID == '8' || progID == '3'){
    $('#'+specFieldID).removeClass("notnull");
}
else
    $('#'+specFieldID).removeClass("notnull");
	}



function checkCertProg(progOrd){
	//setStdProgs();
	var cert = "������� ";
	var prog_id = $("#Program"+progOrd).val();

	var specFieldID = "Std_prog_spec"+progOrd;
	
	if (prog_id == -1 || prog_id == "" || prog_id == null || prog_id == "-1")
		return true;
	
	var cer = new Array();

	for (i = 0; i < 2; i++){
		cer[i] = new Array(document.getElementById('Degree'+(i+1)).value,
						document.getElementById('degree'+(i+1)+'_special1').value,
						document.getElementById('degree'+(i+1)+'_rate').value,
						document.getElementById('degree'+(i+1)+'_grade').value);
				
	}
	res = new Array();
	var msgDisplay = "";
	
	for(i=0; i<2; i++)
		if (cer[i][0]){
			
			stu_quali = "pro_id="+prog_id+"&specFieldID="+document.getElementById(specFieldID).value+
         		        "&stu_deg="+cer[i][0]+"&stu_spec="+cer[i][1]+
         			     "&stu_rate="+cer[i][2]+"&stu_av="+cer[i][3];
			
			
			
		   // alert(stu_quali);
		    $.ajax({type: "POST",async: false,url: "checkStudentProgram.php", data:stu_quali,success: 
					function(msg){ 				
						  if (!msg)
							  res[i] = true;
						  else{
								j = i+1;
							  	msgDisplay += "\n" + cert + j + " : " +msg;
			    		  		res[i] = false;
			    		  }
			   		}});	
	}

	if(!(res[0] || res[1])){
		document.getElementById("Program"+progOrd).value = "";
		var specProgFieldID = "Std_prog_spec"+progOrd;
		$('#'+specProgFieldID).html('');
	}

	var result = res[0] || res[1];
	if(!result && msgDisplay != ""){
		alert("���:"+msgDisplay);
		}
	else if(!result && msgDisplay == "" )
		 alert("�� ���� ������� �������");
	return result;
	
}


function setStdProgs(){
	

	var progHtml = "<option value=''>-------</option>";
	var cer = new Array();
	for (i = 0; i < 2; i++){
		cer[i] = new Array(document.getElementById('Degree'+(i+1)).value,
						document.getElementById('degree'+(i+1)+'_special1').value,
						document.getElementById('degree'+(i+1)+'_rate').value,
						document.getElementById('degree'+(i+1)+'_grade').value);
				
	}
	res = new Array();
	var params_prog = "";
	for(i=0; i<2; i++){
		if (cer[i][0]){			
			if(params_prog != "") params_prog += "&";
			params_prog +=  "stu_deg"+i+"="+cer[i][0]+"&stu_spec"+i+"="+cer[i][1]+
			     "&stu_rate"+i+"="+cer[i][2]+"&stu_av"+i+"="+cer[i][3];
			
	}
	}

	var resHTML = "";
$.ajax({type: "POST",async: false,url: "getStudentAuthPrograms.php", data:params_prog,success: 
	function(msg){ 				
		  if (!msg){
		  
			  resHTML = "";
			  
		  }
		  else{
		  
			  progHtml += msg;
			  resHTML = msg;
			  
		  }
		},
       error: function(XMLHttpRequest, textStatus, errorThrown)
        {
    	  alert("problem student auth");
        }});

	for (i = 1; i <= 3; i++){
		var curProg = $("#Program"+i).val();				
		$("#Program"+i).html(progHtml);
		$("#Program"+i).val(curProg);
		if(resHTML == ""){
			$("#Std_prog_spec"+i).html("");
			
		}
			
	
	}
	
}

	function setUnivDegree (degreeoriginid,fieldNameNum)
	{
		var fNum = "degree" + fieldNameNum + "_univ2_name";
		if((degreeoriginid == "1" || degreeoriginid == "2") && ($("#Degree"+ fieldNameNum).val() != "1"))
		{
			document.getElementById("degree" + fieldNameNum + "_univ_name").style.display = "block";
			document.getElementById("degree" + fieldNameNum + "_univ2_name").style.display = "none";
			document.getElementById("degree" + fieldNameNum + "_univ2_name").value = "";
			if (degreeoriginid == "1")
			{
				$("#degree" + fieldNameNum + "_univ_name").val("-1").change();
				$(".degree"+ fieldNameNum +"_univ_option_type1").attr("hidden",true);
				$(".degree"+ fieldNameNum +"_univ_option_type2").attr("hidden",true);
				$(".degree"+ fieldNameNum +"_univ_option_type1").removeAttr('hidden');
			}
			if (degreeoriginid == "2")
			{
				$("#degree" + fieldNameNum + "_univ_name").val("-1").change();
				$(".degree"+ fieldNameNum +"_univ_option_type1").attr("hidden",true);
				$(".degree"+ fieldNameNum +"_univ_option_type2").attr("hidden",true);
				$(".degree"+ fieldNameNum +"_univ_option_type2").removeAttr('hidden');
			}
			
		}	
		else if ((degreeoriginid == "3" ) && ($("#Degree"+ fieldNameNum).val() != "1"))
		{
			document.getElementById("degree" + fieldNameNum + "_univ_name").style.display = "none";
			document.getElementById("degree" + fieldNameNum + "_univ_name").value = "";
			document.getElementById("degree" + fieldNameNum + "_univ2_name").style.display = "block";
		}
		else
		{
			$("#degree" + fieldNameNum + "_univ_name").val("-1").change();
			$(".degree"+ fieldNameNum +"_univ_option_type1").attr("hidden",true);
			$(".degree"+ fieldNameNum +"_univ_option_type2").attr("hidden",true);
		}
	}
	
		
	
	
	function changeCities(country){
		if(country=="Syria"){
			document.getElementById("City").style.display = "block";
			document.getElementById("City2").style.display = "none";
			document.getElementById("City2").value = "";
			}
		else{
			document.getElementById("City").style.display = "none";
			document.getElementById("City").value = "";
			document.getElementById("City2").style.display = "block";
			}
	}

	
	
	function changeDegree(degreeID,fieldNameNum){
		var degreeType = 3;
		var fNum = "degree" + fieldNameNum + "_special1";

		if (!stuSpecAdm[degreeID] || stuSpecAdm[degreeID] == ""){
		$.ajax({
			   type: "POST",
			   async: false,		   
			   url: "getSpec.php",
			   data:"q="+degreeID,
			   success: function(msg){   
				
			  	stuSpecAdm[degreeID] = msg; 
			   		
			    }
			 });
		}

		 if (stuSpecAdm[degreeID] && stuSpecAdm[degreeID] != ""){
			 
			 var msgArray = stuSpecAdm[degreeID].split("|");
		   	 degreeType = msgArray[0];
		   	 $('#'+fNum).html(msgArray[1]);
			  }
			
		   

		if(degreeID != 1){
			
			document.getElementById('degree'+fieldNameNum+ '_rate').value = "";
			$('#degree'+fieldNameNum+ '_grade').removeAttr("disabled");
			
			$('#degree'+fieldNameNum+ '_origin').removeAttr("disabled").val('-1').change();
			$('#degree'+fieldNameNum+ '_univ_name').removeAttr("disabled");
			$('#degree'+fieldNameNum+ '_univ2_name').removeAttr("disabled");
		}
		else if(degreeID == 1){
			
			document.getElementById('degree'+fieldNameNum+ '_rate').value = "";
			document.getElementById('degree'+fieldNameNum+ '_grade').value = "";
			$('#degree'+fieldNameNum+ '_grade').attr("disabled", "disabled");
			
			$('#degree'+fieldNameNum+ '_origin').attr("disabled", "disabled").val("1").change();
			$('#degree'+fieldNameNum+ '_univ_name').attr("disabled", "disabled").val("-1").change();
			$('#degree'+fieldNameNum+ '_univ2_name').attr("disabled", "disabled").val("");
			}
		
		
	}

	function checkCondition(){

	var onOff = $('#conditional_student:checked').val();

	var bln = false;
	if(onOff !== undefined && onOff != null && onOff=="on") bln= true;

	if(bln){	
	$('#app_reg_desc').addClass("notnull");
	$('#app_reg_desc').addClass("nn_error");
	}
	else{
		$('#app_reg_desc').removeClass("notnull");
		$('#app_reg_desc').removeClass("nn_error");
		}
	
		for(i=1;i<=6;i++){
			if(bln){
				if(i<=2){
				$('#attachment'+i).removeClass("notnull");
				$('#attachment'+i).removeClass("nn_error");
				}
			}
			else{
				$('#attachment'+i).addClass("notnull");
				$('#attachment'+i).addClass("nn_error");

				if(i==2){
				// second degree
				var degree2 = $('#Degree2').val();
				if(degree2 ==0 || degree2==-1 || degree2 == '') {
					$('#attachment2').removeClass("notnull");
					$('#attachment2').removeClass("nn_error");
				}
				}
				

				if(i==6){
				// English certif (Toffel .. )
				var pt = $('#Eng_PT').val();				
				if(pt != "2" && pt!= "3") {
					$('#attachment6').removeClass("notnull");
					$('#attachment6').removeClass("nn_error");
				}
				}

				if(i==5){
				// Reduction
				var red = $('#Reduction').val();
				if(red != 4) {
					$('#attachment5').removeClass("notnull");
					$('#attachment5').removeClass("nn_error");
				}
				}
				}
			
			if($('#att'+i).val()!=""){
				$('#attachment'+i).removeClass("notnull");
				$('#attachment'+i).removeClass("nn_error");
				}
		}
		
		}




function start(){
	block = setInterval("copy_to_clipboard('Copy/Paste no authorized')",20);
}
function stop(){
	clearInterval(block);
}

    function copy_to_clipboard(text)  
    {  
        if(window.clipboardData)  
        {  
        window.clipboardData.setData('text',text);  
        }  
        else  
        {  
            var clipboarddiv=document.getElementById('divclipboardswf');  
        if(clipboarddiv==null)  
        {  
           clipboarddiv=document.createElement('div');  
               clipboarddiv.setAttribute("name", "divclipboardswf");  
           clipboarddiv.setAttribute("id", "divclipboardswf");  
           document.body.appendChild(clipboarddiv);  
        }  
            clipboarddiv.innerHTML='<embed src="clipboard.swf" FlashVars="clipboard='+  
    encodeURIComponent(text)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';  
        }  
       // alert('The text is copied to your clipboard...');  
        return false;  
    } 


    
 function submitForm(checkCredit1){
    	
    	if(confirm('���� �������� ��� ���� �� �������� ����� ������� ������� ��� �������� �� ��� �����ɡ �� ���� ������� �� �������ɿ')) 
    	{
    		
    			if(controlCorrectionReason()){
    				return false;
    			}
    			
    	  		if(checkCredit1 == true){
    	  			
    	  			if(checkCredit() == false){
    	  				 return false;
    	  			}
    	  			if ( checkISEprojects() == false){
    	  				alert("you can't register two projects in a term!");
    	  				return false;
    	  			}	
    	  		}else
    	  			if(!checkMaxMin()) 
        	  			return false;
    	  		
    	  		return true;
     			
    	} 
    		else 
    			return false;
    			
   	return true;	
 }
