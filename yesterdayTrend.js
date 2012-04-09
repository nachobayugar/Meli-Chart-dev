function yesterdayTrend(variableIndex, dayIndex){
			
			var dayY = new Array();
			var dayDayTime = new Array();
			
			for(var k=0; k<data[variableIndex].data[dayIndex].length; k++){
				
				if(typeof(data[variableIndex].data[dayIndex][k])=="number"){
					dayY.push(data[variableIndex].data[dayIndex][k]);
					dayDayTime.push(k);
				}
				else{
					dayY.push(null);
					dayDayTime.push(k);
				}
				
			}
			
			var dayCount_obs = 0;
			var dayYMeansArray = new Array();
			var dayYSquaredDevArray = new Array();
			var dayTimeMeansArray = new Array();
			var dayTimeSquaredDevArray = new Array();
			var dayTimeBetaArray = new Array();
			var alphasArray = new Array();
			
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
				var notNullObs = 0;
				for(var j=from; j<to; j++){
					if(typeof(dayY[j])=="number"){
						dayYMeansArray[i] += dayY[j];
						dayTimeMeansArray[i] += dayDayTime[j];
						notNullObs+=1;
					}
				}
				
				if(notNullObs>1){
					dayYMeansArray[i] = dayYMeansArray[i]/notNullObs;
					dayTimeMeansArray[i] = dayTimeMeansArray[i]/notNullObs;
					
					for(var j=from; j<to; j++){
						if(typeof(dayY[j])=="number" && typeof(dayDayTime[j])=="number"){
							
							dayYSquaredDevArray[i] = (dayY[j] - dayYMeansArray[i])*(dayY[j] - dayYMeansArray[i]);
							dayTimeSquaredDevArray[i] = (dayY[j] - dayTimeMeansArray[i])*(dayDayTime[j] - dayTimeMeansArray[i]);
							
							dayTimeBetaArray[i] += (dayDayTime[j] - dayTimeMeansArray[i])*(dayY[j]-dayYMeansArray[i]);
						}
					}
					
					if(dayTimeSquaredDevArray[i]){
						dayTimeBetaArray[i] = dayTimeBetaArray[i]/dayTimeSquaredDevArray[i];
					}
					
					alphasArray[i] = dayYMeansArray[i] - dayTimeMeansArray[i]*dayTimeBetaArray[i];
				}
				
				else{
					dayYMeansArray[i] = null;
					dayTimeMeansArray[i] = null;
					dayTimeBetaArray[i] = null;
					alphasArray[i] = null;
				}
				
				
				
			}
			
			var estimation = new Array();
			
			for(var i=0;i<data[variableIndex].data[1].length; i++){
				if(i<dayY.length){
					if(typeof(dayTimeBetaArray[i])=="number" && typeof(alphasArray[i])=="number"){
						estimation[i] =alphasArray[i] +  dayTimeBetaArray[i]*dayDayTime[i];
					}
					else{
						estimation[i] = null;
					}
				}
				else{
					if(typeof(dayTimeBetaArray[dayTimeBetaArray.length-1])=="number"){
						estimation[i] = dayYMeansArray[dayYMeansArray.length-1] + dayTimeBetaArray[dayTimeBetaArray.length-1]*i ;//dayYEstimado[i-1];
					}
					else{
						estimation[i] = 0;
					}
					
				}
			}
			
			return estimation;
			
}
