function dayTrend(variableIndex){
			
			var dayY = new Array();
			var dayDayTime = new Array();
			var afterMidDay = new Array();
			
			var dayYMean = 0;
			var dayDayTimeMean = 0;
			var afterMidDayMean = 0;
			
			var dayDayTimeBeta = 0;
			var afterMidDayBeta = 0;
			
			var dayYSquaredDev = 0;
			var dayDayTimeSquaredDev = 0;
			var afterMidDaySquaredDev = 0;

			for(var k=0; k<data[variableIndex].data[0].length; k++){
				if(typeof(data[variableIndex].data[0][k])=="number"){
					dayY.push(data[variableIndex].data[0][k]);
					if(3*k<data[variableIndex].data[0].length){
						if(24*k<data[variableIndex].data[0].length){
							afterMidDay.push(1);
							dayDayTime.push(k);
						}
						else{
							afterMidDay.push(0);
							dayDayTime.push(0);
						}
					}
					else{
						afterMidDay.push(1);
						dayDayTime.push(k);
					}
				}
				else{
					dayDayTime.push(k);
				}
			}

			var dayCount_obs = 0;
			
			for(var i = 0; i < dayY.length; i++){
				dayCount_obs +=1;
				dayYMean += dayY[i];
				dayDayTimeMean += dayDayTime[i];
				afterMidDayMean = afterMidDay[i];
			}
			
			dayYMean = dayYMean/dayCount_obs;
			dayDayTimeMean = dayDayTimeMean/dayCount_obs;
			afterMidDayMean = afterMidDayMean/dayCount_obs;
			
			for(var i = 0; i < dayY.length; i++){
				dayYSquaredDev +=(dayY[i]-dayYMean)*(dayY[i]-dayYMean);
				dayDayTimeSquaredDev += (dayDayTime[i]-dayDayTimeMean)*(dayDayTime[i]-dayDayTimeMean);
				afterMidDaySquaredDev += (afterMidDay[i]-afterMidDayMean)*(afterMidDay[i]-afterMidDayMean);
				
				dayDayTimeBeta += (dayDayTime[i] - dayDayTimeMean)*(dayY[i]-dayYMean);
				afterMidDayBeta += (afterMidDay[i] - afterMidDayMean)*(afterMidDay[i]-afterMidDayMean);
			}
			
			dayDayTimeBeta =dayDayTimeBeta/dayDayTimeSquaredDev;
			afterMidDayBeta =afterMidDayBeta/afterMidDaySquaredDev;
			
			var alpha = dayYMean - dayDayTimeBeta*dayDayTimeMean; // - afterMidDayBeta*afterMidDayMean;
			
			var dayYEstimado = new Array();
			for(var i=0;i<data[variableIndex].data[0].length; i++){
				dayYEstimado[i] = (alpha + dayDayTimeBeta*dayDayTime[i]).toFixed(0); // + afterMidDayBeta*afterMidDay[i]).toFixed(0);
			}
			
			return dayYEstimado
		}
