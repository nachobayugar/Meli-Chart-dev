var isready = false;
var tiempoFourWeeks = setInterval(function(){
	
	if(typeof(data)=='undefined'&& !isready){
		return;	
	}
	if(typeof(data)!='undefined'&& !isready && typeof(data[0].data[34])=='undefined'){
		return;	
	}
	
	clearInterval(tiempoFourWeeks);
	isready = true;
	
	
$(document).ready(function() {

var categoriesFourWeeks = new Array();
var writeHourEach = (data[0].data[0].length/24); //calcula cada cuanto quiero escribir la hora
var writeHour = parseInt(writeHourEach.toFixed(0)); 
var writeHourTemp = parseInt(writeHourEach.toFixed(0));
var period = parseInt((24*60/data[0].data[0].length).toFixed(0))

	for(var i=0; i<=data[0].data[0].length; i++){
		if(i==writeHourTemp){
			var hour = (i*period/60);
			hour = hour.toFixed(0).toString();
			writeHourTemp += writeHour;

			categoriesFourWeeks[i] = hour;			
		}		
		else{
			categoriesFourWeeks[i] = ' ';
		}
	}


var seriesFourWeekComparisson = new Array();	
	for(var i=0; i<data.length; i++){
		seriesFourWeekComparisson[i] = new Object();
		seriesFourWeekComparisson[i].name = data[i].name; 
		seriesFourWeekComparisson[i].data = new Array();
		var difArray = new Array();
		var todayArray = data[i].data[0];
		var lastWeekArray = data[i].data[28];
		
		for(var j = 0; j<lastWeekArray.length; j++){
		if(lastWeekArray[j] == null || todayArray[j] == null){
			difArray[j] = 0;
		} else{
			if(lastWeekArray[j]>0){
				difArray[j] = -(100*(todayArray[j] - lastWeekArray[j])/lastWeekArray[j]).toFixed(2);
				} else {
					if(todayArray[j]>0){
						difArray[j] = 100.00;
					} else {
						difArray[j] = 0.00;
					}
				}
			}
		}
		seriesFourWeekComparisson[i].data = difArray;
		seriesFourWeekComparisson[i].type = 'spline';
		if(data[i].color!=''){
			seriesFourWeekComparisson[i].color = data[i].color
		}else{
			seriesFourWeekComparisson[i].color = defaultColors[i]
		}
	}


		var chart;
		
		
			chart = new Highcharts.Chart({
				chart: {
					renderTo: 'containerFourWeeksComparisson',
					defaultSeriesType: 'line',
					marginRight: 130,
					marginBottom: 25
				},
				title: {
					text: 'Four weeks ago comparisson (in % variation)',
					//x: -20 //center
				},
				subtitle: {
					text: graphName,
					//x: -20
				},
				xAxis: {
					categories: categoriesFourWeeks 
				},
				yAxis: {
					title: {
						text: 'Quantity'
					},
					plotLines: [{
						value: 0,
						width: 1,
					//	color: '#808080'
					}]
				},
				//tooltip: {
				//	formatter: function() {
			    //           return '<b>'+ this.series.name +'</b><br/>'+
				//			this.x +': '+ this.y +'°C';
				//	}
				//},
				plotOptions: {
						spline: {
							lineWidth: 2,
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
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'top',
					x: -10,
					y: 100,
					borderWidth: 0
				},
				series: seriesFourWeekComparisson 
			});
			
			
		});

},100);