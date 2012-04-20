var isready = false;
var loadTime = setInterval(function(){
	
	if(typeof(data)=='undefined'&& !isready){
		return;	
	}
	
	if(typeof(data)!='undefined'&& !isready && typeof(data[0].data[34])=='undefined'){
		return;	
	}
	
	clearInterval(loadTime);
	isready = true;
	
	var index = 0;
	
	var periodicity = parseInt((24*60/data[0].data[0].length).toFixed(0));
	
	for(var i=0; i<data.length; i++){
		var weekDay = new Date();
		
		for (var j=0; j<data[i].data.length; j++){
		
			//Seteo el día 
			if(j>0){
				weekDay.setDate(weekDay.getDate()-1);
			}
			//var day = weekDay.toString().substring(0,15);
			var stringMonth = weekDay.getMonth() + 1;
			var stringDay = weekDay.getDate();
			if(weekDay.getMonth() < 10){
				stringMonth = "0" + stringMonth
			}
			if(weekDay.getDate() < 10){
				stringDay = "0" + stringDay
			}
			var day = stringMonth + "-" + stringDay + " (" + weekDay.toString().substring(0,15) + ")";
			for(var k=0; k<data[i].data[j].length; k++){
					//Seteo la hora del día
					var dayHour = Math.floor(k*periodicity/60);
					var dayMinutes = Math.abs(((dayHour - k*periodicity/60)*60).toFixed(0));
					var dayHourString = dayHour.toString()
					var dayMinutesString = dayMinutes.toString()
					if(dayHour<10){
						dayHourString = "0" + dayHourString;
					}
					if(dayMinutes<10){
						dayMinutesString = "0" + dayMinutesString;
					}
					var dayTime = dayHourString + ":" + dayMinutesString;
					///////
					
					if(typeof(data[i].data[j][k])=="number"){
						datos[index] = new Array(data[i].name, day, dayTime, data[i].data[j][k]);
						originalData[index] = new Array(data[i].name, day, dayTime, data[i].data[j][k]);
					}
					else{
						datos[index] = new Array(data[i].name, day, dayTime, '');
						originalData[index] = new Array(data[i].name, day, dayTime, '');
					}
					
					
					index +=1;
			}
		}
	}
	
	var pTable = new OAT.Pivot('tabla', '', 'filtros', cabecera, datos,	[0], [2], [1,2], 3, null);
	pTable.go();
	//function init() {		
	//	var pTable = new OAT.Pivot('tabla', '', 'filtros', cabecera, datos,	[0], [2], [1,2], 3, null);
	//	pTable.go();
	//}
	
	var aggRef = function() {
		pTable.options.agg = parseInt($v("pivot_agg"));
		pTable.go();
		}

		/*create agg function list */
		/*
		OAT.Dom.clear("pivot_agg");
		for (var i=0;i<OAT.Statistics.list.length;i++) {
			var item = OAT.Statistics.list[i];
			OAT.Dom.option(item.shortDesc,i,"pivot_agg");
			if (pTable.options.agg == i) {
				$("pivot_agg").selectedIndex = i; 
			}
			OAT.Dom.attach("pivot_agg","change",aggRef);

			pTable.go();
		}*/
	
},100);