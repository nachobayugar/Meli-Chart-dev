var totals_isready = false;
var totals_tiempo = setInterval(function(){
	
	if(typeof(data)=='undefined'&& !totals_isready){
		return;	
	}
	if(typeof(data)!='undefined'&& !totals_isready && typeof(data[0].data[34])=='undefined'){
		return;	
	}
	if(typeof(data)!='undefined'&& !totals_isready && typeof(data[0].data[34])!='undefined' && typeof(graphName)=='undefined'){
		return;	
	}
	
	clearInterval(totals_tiempo);
	totals_isready = true;


	var defaultColors = ['#89A54E','#AA4643','#DBA901','#0040FF','#C2FF00', '#4572A7','#F7FE2E','#FFFFFF','#01DFD7','#DF01D7','#F5DA81','#F7F2E0','#D3F5A9'];

	var seriesWeekTotal = new Array()
		
		for(var i=0; i<data.length; i++){
			seriesWeekTotal[i] = new Object();
			seriesWeekTotal[i].name = data[i].name;
			
			var sum1 = 0;
			var sum2 = 0;
			var sum3 = 0;
			var sum4 = 0;
			var sum5 = 0;
			
			for(var j=0; j<7; j++){
				var count = 0;
				for(var k = 0; k<data[i].data[j].length; k++){
					if(data[i].data[j][k]!= null){
						count += 1;
						sum1 = sum1 + data[i].data[j][k];
					}
				}
				
				if(count>0){
					sum1 = sum1/count;
				}
				
			}
			
			for(var j=7; j<14; j++){
				var count = 0;
				for(var k = 0; k<data[i].data[j].length; k++){
					if(data[i].data[j][k]!= null){
						count += 1;
						sum2 = sum2 + data[i].data[j][k];
					}
				}
				if(count>0){
					sum2 = sum2/count;
				}
				
			}
			
			for(var j=14; j<21; j++){
				var count = 0;
				for(var k = 0; k<data[i].data[j].length; k++){
					if(data[i].data[j][k]!= null){
						count += 1;
						sum3 = sum3 + data[i].data[j][k];
					}
				}
				if(count>0){
					sum3 = sum3/count;
				}
			}
			
			for(var j=21; j<28; j++){
				var count = 0;
				for(var k = 0; k<data[i].data[j].length; k++){
					if(data[i].data[j][k]!= null){
						count += 1;
						sum4 = sum4 + data[i].data[j][k];
					}
				}
				if(count>0){
					sum4 = sum4/count;
				}
			}
			
			for(var j=28; j<35; j++){
				var count = 0;
				for(var k = 0; k<data[i].data[j].length; k++){
					if(data[i].data[j][k]!= null){
						count += 1;
						sum5 = sum5 + data[i].data[j][k];
					}
				}
				if(count>0){
					sum5 = sum5/count;
				}
			}
			
			seriesWeekTotal[i].data = [sum1, sum2, sum3, sum4, sum5];
			
			if(data[i].color!=''){
				seriesWeekTotal[i].color = data[i].color
			}else{
				seriesWeekTotal[i].color = defaultColors[i]
			}
		}

	var chart;

				$(document).ready(function() {
					chart = new Highcharts.Chart({
						chart: {
							renderTo: 'containerWeekTotal',
							defaultSeriesType: 'bar'
						},
						title: {
							text: 'Totals per week'
						},
						xAxis: {
							categories: ['Current Week', 'Last Week', 'Two Weeks Ago', 'Three Weeks Ago', 'Four Weeks Ago']
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
						//tooltip: {
						//	formatter: function() {
						//		return ''+
						//			 this.series.name +': '+ this.y +'';
						//	}
						//},
						plotOptions: {
							series: {
								stacking: 'normal'
							}
						},
						series: seriesWeekTotal

					});
					
					
				});
},100);