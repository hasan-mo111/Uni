
function fillCategory(){ 
 // this function is used to fill the category list on load
addOption(document.reg_app_form.Category, "������ ������", "������ ������", "");
addOption(document.reg_app_form.Category, "������ ���������", "������ ���������", "");
addOption(document.reg_app_form.Category, "������ ��������", "������ ��������", "");
addOption(document.reg_app_form.Category, "�� ���� ����� ��� ������� �� �����", "�� ���� ����� ��� ������� �� �����", "");
}

function SelectSubCat(){
// ON selection of category this function will work

removeAllOptions(document.reg_app_form.SubCat);
addOption(document.reg_app_form.SubCat, "", "����..", "");

if(document.reg_app_form.Category.value == '������ ������'){
addOption(document.reg_app_form.SubCat,"���� �������� �����", "���� �������� �����");
addOption(document.reg_app_form.SubCat,"���� �������� ", "���� ��������");
addOption(document.reg_app_form.SubCat,"���� ��� �������", "���� ��� �������");
addOption(document.reg_app_form.SubCat,"���� �����", "���� �����");
}
if(document.reg_app_form.Category.value == '������ ���������'){
addOption(document.reg_app_form.SubCat,"����", "����");
addOption(document.reg_app_form.SubCat,"����� �����", "����� �����");
addOption(document.reg_app_form.SubCat,"�����", "�����", "");
}
if(document.reg_app_form.Category.value == '������ ��������'){
addOption(document.reg_app_form.SubCat,"������ ��������", "������ ��������");
}
if(document.reg_app_form.Category.value == '�� ���� ����� ��� ������� �� �����'){
addOption(document.reg_app_form.SubCat,"�� ���� ����� ��� ������� �� �����", "�� ���� ����� ��� ������� �� �����");
}

}
////////////////// 

function removeAllOptions(selectbox)
{
	var i;
	for(i=selectbox.options.length-1;i>=0;i--)
	{
		//selectbox.options.remove(i);
		selectbox.remove(i);
	}
}


function addOption(selectbox, value, text )
{
	var optn = document.createElement("OPTION");
	optn.text = text;
	optn.value = value;

	selectbox.options.add(optn);
}
