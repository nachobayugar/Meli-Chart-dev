var stock_isready = false;
var stock_tiempo = setInterval(function(){
	
	if(typeof(data)=='undefined'&& !stock_isready){
		return;	
	}
	if(typeof(data)!='undefined'&& !stock_isready && typeof(data[0].data[34])=='undefined'){
		return;	
	}
	if(typeof(data)!='undefined'&& !stock_isready && typeof(data[0].data[34])!='undefined' && typeof(graphName)=='undefined'){
		return;	
	}
	
	clearInterval(stock_tiempo);
	stock_isready = true;

	var defaultColors = ['#89A54E','#AA4643','#DBA901','#0040FF','#C2FF00', '#4572A7','#F7FE2E','#FFFFFF','#01DFD7','#DF01D7','#F5DA81','#F7F2E0','#D3F5A9'];
	
	var seriesStock = new Array();
	var dateStock = new Date()
	dateStock.setDate(dateStock.getDate()-6);
	
	var time = dateStock.getTime();
	
	var hours = dateStock.getHours()*60*60*1000;
	var minutes = dateStock.getMinutes()*60*1000;

	time = time - hours - minutes - 60*60*1000 - 60*60*1000;
	

	var x = (24*60/data[0].data[0].length).toFixed(0);
	
		for(var i=0; i<data.length; i++){
			var milliseconds = time;
			var allWeekArray = new Array();
			seriesStock[i] = new Object();
			seriesStock[i].name = data[i].name; //data[i].name;
			
			for(var j=30; j>=0; j--){
				var startPoint = data[i].data[j].length-1;
				if(j==0){					
					for (var k=data[i].data[j].length-1 ; k>=0; k--){
						if(typeof(data[i].data[j][k])=="number"){
							startPoint = k;
							k=-1;
						}
					}
				}
				
				for (var k=0 ; k<=startPoint; k++){
					allWeekArray.push([milliseconds, data[i].data[j][k]]);
					milliseconds+=1000*60*x
				}
				
			}
		
			
			seriesStock[i].data = allWeekArray;
			seriesStock[i].type = 'spline';
			if(data[i].color!=''){
				seriesStock[i].color = data[i].color
			}else{
				seriesStock[i].color = defaultColors[i]
			}
		}

	$(function() {
		
		Highcharts.setOptions({
			global : {
				useUTC : true
			}
		});
		
		// Create the chart
		window.chart = new Highcharts.StockChart({
			chart : {
				renderTo : 'containerWeekStock'
				/*events : {
					load : function() {

						// set up the updating of the chart each second
						var series = this.series[0];
						setInterval(function() {
							var x = (new Date()).getTime(), // current time
							y = Math.round(Math.random() * 100);
							series.addPoint([x, y], true, true);
						}, 1000);
					}
				}*/
			},
			
			rangeSelector: {
				buttons: [{
					count: 60,
					type: 'minute',
					text: '1H'
				}, {
					count: 1440,
					type: 'minute',
					text: '1D'
				},{
					count: 10080,
					type: 'minute',
					text: '1W'
				}, {
					type: 'all',
					text: 'All'
				}],
				inputEnabled: false,
				selected: 0
			},
			
			title : {
				text : graphName
			},
			
			exporting: {
				enabled: false
			},
			
			series : seriesStock
		});

	});
},100);