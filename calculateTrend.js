function calculateTrend(variableIndex){
			
			var dayY = new Array();
			var dayDayTime = new Array();
			var dayYMean = 0;
			var yesterdayMean = 0;
			var todayCount = 0;
			var yesterdayCount=0;
			var startPoint = -1;
			var averageBeta = 0;
			var averageAlpha = 0;			

			for(var k=0; k<data[variableIndex].data[0].length; k++){
				
				if(typeof(data[variableIndex].data[0][k])=="number"){
					if(startPoint==-1){
						startPoint = k;
					}
					dayY.push(data[variableIndex].data[0][k]);
					dayDayTime.push(k);
					
					dayYMean += data[variableIndex].data[0][k];
					todayCount +=1;
				}				
			}
			
			dayYMean = dayYMean/todayCount;
			var yesterdayMeanArray = new Array();
			
			for(var k=0; k<todayCount; k++){
				var tempMean=0;
				var tempCount=0;
				for(var i=1; i<34; i++){
					if(typeof(data[variableIndex].data[i][k])=="number"){
						tempMean += data[variableIndex].data[i][k];
						tempCount +=1;
					}
				}
				
				if(tempCount>0){
					yesterdayMeanArray[k] = tempMean/tempCount;
					yesterdayCount+=1;
					yesterdayMean +=yesterdayMeanArray[k];
				}
				else{
					yesterdayMeanArray[k] = null;
				}
			}
			if(yesterdayCount>0){
				yesterdayMean = yesterdayMean/yesterdayCount;
			}
			else{
				yesterdayMean = dayYMean;
			}
						
			var dayCount_obs = 0;
			var dayYMeansArray = new Array();
			var dayYSquaredDevArray = new Array();
			var dayTimeMeansArray = new Array();
			var dayTimeSquaredDevArray = new Array();
			var dayTimeBetaArray = new Array();
			var alphasArray = new Array();
			var betaArrays;
						
			for(var i = 0; i < dayY.length; i++){			
				
					var from = i-5;
					var to = i + 5;
					if(from<0){
						from = 0;
					}
					if(to>dayY.length){
						to = dayY.length;
					}
					dayYMeansArray[i] = 0;
					dayTimeMeansArray[i] = 0;
					dayTimeBetaArray[i] = 0;
					alphasArray[i] = 0;
					
					for(var j=from; j<to; j++){
						dayYMeansArray[i] += dayY[j];
						dayTimeMeansArray[i] += dayDayTime[j];
					}
					dayYMeansArray[i] = dayYMeansArray[i]/(to - from);
					dayTimeMeansArray[i] = dayTimeMeansArray[i]/(to - from);
					
					for(var j=from; j<to; j++){
						dayYSquaredDevArray[i] = (dayY[j] - dayYMeansArray[i])*(dayY[j] - dayYMeansArray[i]);
						dayTimeSquaredDevArray[i] = (dayY[j] - dayTimeMeansArray[i])*(dayDayTime[j] - dayTimeMeansArray[i]);
						
						dayTimeBetaArray[i] += (dayDayTime[j] - dayTimeMeansArray[i])*(dayY[j]-dayYMeansArray[i]);
					}
					
					if(dayTimeSquaredDevArray[i]){
						dayTimeBetaArray[i] = dayTimeBetaArray[i]/dayTimeSquaredDevArray[i];
					}
					
					alphasArray[i] = dayYMeansArray[i] - dayTimeMeansArray[i]*dayTimeBetaArray[i];
			}
			
			for(var i = 0; i < dayTimeBetaArray.length; i++){
				averageBeta += dayTimeBetaArray[i];
				averageAlpha += alphasArray[i];
			}
			averageBeta = averageBeta/dayTimeBetaArray.length;
			averageAlpha = averageAlpha/alphasArray.length;
			
			var auxArray = new Array();
			for(var i = 0; i < startPoint; i++){
				auxArray.push(null);				
			}
			dayYMeansArray = auxArray.concat(dayYMeansArray);
			dayYSquaredDevArray = auxArray.concat(dayYSquaredDevArray);
			dayTimeMeansArray = auxArray.concat(dayTimeMeansArray);
			dayTimeSquaredDevArray = auxArray.concat(dayTimeSquaredDevArray);
			dayTimeBetaArray = auxArray.concat(dayTimeBetaArray);
			alphasArray = auxArray.concat(alphasArray);
			
			var estimation = new Array();
			
			var estimationsArray = new Array();
			var averageEstimationsArray = new Array();
			for(var i=0; i<35; i++){
				estimationsArray[i] = yesterdayTrend(variableIndex, i);				
			}
			
			for(var j=0; j<estimationsArray[0].length; j++){
				var averageEstimation = 0;
				var quantity = 0;
				for(var i=0; i<35; i++){
					if(typeof(estimationsArray[i][j])=="number"){
						averageEstimation += estimationsArray[i][j]
						quantity +=1;
					}
				}
				
				if(quantity>0){
					averageEstimationsArray[j] = (averageEstimation/quantity).toFixed(2);
				}
				else{
					averageEstimationsArray[j] = null;
				}
				
			}
			
			//var yesterday = yesterdayTrend(variableIndex, 1);
			var adjustmentCoefficient = dayYMean/yesterdayMean;
			
			for(var i=0;i<data[variableIndex].data[0].length; i++){
			
				if(i>=startPoint){
					if(i<startPoint + dayY.length){
						estimation[i] =alphasArray[i] + dayTimeBetaArray[i]*i;
					}
					else{
						if(averageEstimationsArray[i]==-1){			
							estimation[i]= estimation[i-1];
						}
						else{
							estimation[i] = adjustmentCoefficient*averageEstimationsArray[i];
						}
					}
				}
				else{
					estimation[i] = 0;
				}
			}
			
			return estimation;
			
}