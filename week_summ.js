var summ_isready = false;
var summ_tiempo = setInterval(function(){
	
	if(typeof(data)=='undefined'&& !summ_isready){
		return;	
	}
	if(typeof(data[0])=='undefined'&& !summ_isready){
		return;
	}
	if(typeof(data)!='undefined'&& !summ_isready && typeof(data[0].data[34])=='undefined'){
		return;	
	}
	if(typeof(data)!='undefined'&& !summ_isready && typeof(data[0].data[34])!='undefined' && typeof(graphName)=='undefined'){
		return;	
	}
	
	clearInterval(summ_tiempo);
	summ_isready = true;

	var defaultColors = ['#89A54E','#AA4643','#DBA901','#0040FF','#C2FF00', '#4572A7','#F7FE2E','#FFFFFF','#01DFD7','#DF01D7','#F5DA81','#F7F2E0','#D3F5A9'];

	var seriesWeeksCategories = new Array();
	var date = new Date();

	for(var dayIndex=0; dayIndex<7; dayIndex++){
		var weekDay;
		date.setDate(date.getDate()-dayIndex);
		var weekDayNumber = parseInt(date.getDay());
		switch(weekDayNumber){
			case 0:
				weekDay = "Sun";
				break;
			case 1:
				weekDay = "Mon";
				break;
			case 2:
				weekDay = "Tue";
				break;
			case 3:
				weekDay = "Wed";
				break;
			case 4:
				weekDay = "Thu";
				break;
			case 5:
				weekDay = "Fri";
				break;
			case 6:
				weekDay = "Sat";
				break;
		}
		if(dayIndex!=0){
			weekDay = "last " + weekDay;
		}
		else{
			weekDay = "today (" + weekDay + ")";
		}
		
		seriesWeeksCategories.push(weekDay);
		date = new Date();
		/*
		if(dayIndex == 0){
			seriesWeeksCategories.push("today");
		}
		else if(dayIndex == 1){
			seriesWeeksCategories.push("yesterday");
		}
		else{
			seriesWeeksCategories.push(dayIndex + " days ago");
		}*/
	}

	var seriesWeeksSummary = new Array()
		for(var i=0; i<data.length; i++){
			seriesWeeksSummary[i] = new Object();
			seriesWeeksSummary[i].name = data[i].name;
			
			var dailyTotals = [0, 0, 0, 0, 0, 0, 0];
			var weekTotals
			
			for(var j=0; j<7; j++){
				var count = 0;
				for(var k = 0; k<data[i].data[j].length; k++){
					if(data[i].data[j][k] != null){
						count +=1;
						dailyTotals[j] = dailyTotals[j] + data[i].data[j][k];
					}
				}
				
				if(count==0){
					dailyTotals[j] = 0
				}
				else{
					dailyTotals[j] = dailyTotals[j]/count;
				}
			}
				
			seriesWeeksSummary[i].data = dailyTotals;
			if(data[i].color!=''){
				seriesWeeksSummary[i].color = data[i].color
			}else{
				seriesWeeksSummary[i].color = defaultColors[i]
			}
		}


	var chart;
				$(document).ready(function() {

					chart = new Highcharts.Chart({
					
						chart: {
							renderTo: 'containerWeeksSummary',
							defaultSeriesType: 'bar'
						},
						title: {
							text: 'Week summary'
						},
						xAxis: {
							categories: seriesWeeksCategories
						},
						yAxis: {
							min: 0,
							title: {
								text: graphName
							}
						},
						legend: {
							backgroundColor: '#FFFFFF',
							reversed: true
						},
						tooltip: {
							formatter: function() {
								return ''+
									 this.series.name +': '+ this.y +'';
							}
						},
						plotOptions: {
							series: {
								stacking: 'normal'
							}
						},
							series: seriesWeeksSummary
					});
					
					
				});

},100);