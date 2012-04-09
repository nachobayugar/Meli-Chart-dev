var isready = false;
var tiempo = setInterval(function(){
	
	if(typeof(data)=='undefined'&& !isready){
		return;	
	}
	if(typeof(data)!='undefined'&& !isready && typeof(data[0].data[34])=='undefined'){
		return;	
	}
	
	clearInterval(tiempo);
	isready = true;
	
	
$(document).ready(function() {
var seriesTypesArray = new Array();
for(i=0; i<=data.length; i++){
	if(typeof(seriesTypesFromHtml)!="undefined"){
		seriesTypesArray.push(seriesTypesFromHtml)
	}
	else{
		seriesTypesArray.push("area")
	}
}

var categories = new Array();
var writeHourEach = (data[0].data[0].length/24); //calcula cada cuanto quiero escribir la hora
var writeHour = parseInt(writeHourEach.toFixed(0)); 
var writeHourTemp = parseInt(writeHourEach.toFixed(0));
var period = parseInt((24*60/data[0].data[0].length).toFixed(0))

	for(var i=0; i<=data[0].data[0].length; i++){
		if(i==writeHourTemp){
			var hour = (i*period/60);
			hour = hour.toFixed(0).toString();
			writeHourTemp += writeHour;

			categories[i] = hour;			
		}		
		else{
			categories[i] = ' ';
		}
	}

var series = new Array();
	var sum;
	var pieSeries = new Array()
	var i;
	for(i=0; i<=data.length; i++){
		if(i<data.length){
			series[i] = new Object();
			pieSeries[i] = new Object();
			series[i].name = data[i].name;
			pieSeries[i].name = data[i].name;
			series[i].data = data[i].data[0];
			sum = 0;
			count = 0;
			for(var j=0; j<series[i].data.length; j++){
				if(series[i].data[j]!= null){
					count +=1;
					sum = sum + series[i].data[j];
				}
			}
			pieSeries[i].y = (count>0) ? sum/count : sum;
			//series[i].type = 'area';
			series[i].type = seriesTypesArray[i];
			if(data[i].color!=''){
				series[i].color = data[i].color
			}else{
				series[i].color = defaultColors[i]
				pieSeries[i].color = defaultColors[i]
			}
		} else{
			if (showpie == 'Y'){
				series[i] = new Object();
				series[i].type = 'pie';
				series[i].name = 'Totales';
				series[i].data = pieSeries;
				series[i].center = [100, 20];
				series[i].size = 100;
				series[i].showInLegend = false;
			}
		}
	}
	
if (showpie != 'Y'){
	i = i-1;
}
if (showTrend=="Y"){
	
	series[i] = new Object();
	series[i].name = series[serieIndex].name + "(trend)";
	series[i].type = 'spline';
	var trendData = new Array();
	var allTrend = calculateTrend(serieIndex);
	//var allTrend = trend(serieIndex);

	for(var trendIndex=0; trendIndex < series[serieIndex].data.length; trendIndex++){
		trendData.push(parseInt(allTrend[trendIndex]));
	}
	series[i].data = trendData;
	i+=1;
}

if (todayTrend=="Y"){
	
	series[i] = new Object();
	series[i].name = series[serieIndex].name + "(today trend)";
	series[i].type = 'line';
	var trendData = new Array();
	var allTrend = dayTrend(serieIndex);

	for(var trendIndex=0; trendIndex < series[serieIndex].data.length; trendIndex++){
		trendData.push(parseInt(allTrend[trendIndex]));
	}
	series[i].data = trendData;
	i+=1;
}

if(showLastWeek=="Y"){
	series[i] = new Object();
	series[i].name = series[serieIndex].name + "(last week)";
	series[i].type = 'line';
	series[i].data = new Array();
	
	var lastWeekArray = new Array();
	
	for(var lastWeekIndex=0; lastWeekIndex < data[serieIndex].data[7].length; lastWeekIndex++){
		lastWeekArray.push(data[serieIndex].data[7][lastWeekIndex]);
	}
	
	series[i].data = lastWeekArray;	
	i+=1;
}
	
var chart;
					
						chart = new Highcharts.Chart({
							chart: {
								renderTo: 'grafico1', //graphName,
								//defaultSeriesType: (typeof(seriesTypesFromHtml)!="undefined") ? seriesTypesFromHtml : 'area'
							},
							credits: {
        						enabled: false	
							},						


							title: {
								text: graphName + " (last updated: " + lastUpdated.toString() + ")" //'Pagos de Hoy'
							},
							xAxis: {
								categories: categories 
							},
							tooltip: {
								formatter: function() {
									
									
									var s;
									if (this.point.name) { // the pie chart
										s = ''+
											 this.point.name +': '+ parseInt(this.percentage) + '%'; //' pagos';
									} else {
										s = ''+
											this.series.name + ' ' + this.x + ': '+ this.y; // 
									} 
									return s;
								}
							},
							plotOptions: {
								area:{
									stacking: stacking,
									marker: {
										enabled: false,
										symbol: 'circle',
										radius: 2,
										states: {
											hover: {
												enabled: true
											}
										}
									},
									fillOpacity: 0.5
								},
								spline: {
									lineWidth: 4,
									states: {
										hover: {
											lineWidth: 5
										}
									},
									marker: {
										enabled: false,
										states: {
											hover: {
												enabled: true,
												symbol: 'circle',
												radius: 5,
												lineWidth: 1
											}
										}	
									},
									//pointInterval: 3600000, // one hour
									//pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
								}
							},
							labels: {
								items: [{
									html: (showpie== 'Y' )? 'Totales' : '', //SI ESTA HABILITADO 
									style: {
										left: '05px',
										top: '8px',
										color: 'black'				
									}
								}]
							},
							series: series
						});
						
						
					});			





},100);


