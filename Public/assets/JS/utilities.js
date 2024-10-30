function movePage(page){
	var inputs = document.getElementById('movePageInput');
	inputs.value = page;
	var form = document.getElementById('movePageForm');
	form.submit();
}