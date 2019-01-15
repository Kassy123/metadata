var myChartObject1 = document.getElementById('myChart1');
var myChartObject2 = document.getElementById('myChart2');
var myChartObject3 = document.getElementById('myChart3');
			
var divPlot = document.getElementById('divPlot');
var inputFiles = document.getElementById("file-input");
var isographic = document.getElementById('iso');

var myjson = [];
var dataset = {
	"kameraMake": [],
	"kameraModel":[],
	"erstellungsdatum":[],
	"aenderungsdatum":[],
	"brennweite":[],
	"belichtungszeit":[],
	"blende":[],
	"ISO":[],
	"blitz":[],
	"programm":[]
}

var a = 0;


var changed = false;

inputFiles.onchange = function(e) {	

	if(inputFiles.files.length >= 1){
		for(var j = 0; j<inputFiles.files.length; j++){
			console.log(j + " Durchlauf");
			EXIF.getData(e.target.files[j], function(){

				dataset.kameraMake = EXIF.getTag(this, "Make"),
				console.log(dataset.kameraMake);
				dataset.kameraModel=EXIF.getTag(this, "Model"),
				console.log(dataset.kameraModel);
				dataset.erstellungsdatum = EXIF.getTag(this, "DateTimeOriginal"),
				console.log(dataset.erstellungsdatum);
				dataset.aenderungsdatum = EXIF.getTag(this, "DateTime"),
				console.log(dataset.aenderungsdatum);
				dataset.brennweite = EXIF.getTag(this, "FocalLength"),
				console.log(dataset.brennweite);
				dataset.belichtungszeit = EXIF.getTag(this, "ExposureTime"),
				console.log(dataset.belichtungszeit);
				dataset.blende = EXIF.getTag(this, "FNumber"),
				console.log(dataset.blende);
				dataset.ISO = EXIF.getTag(this, "ISOSpeedRatings"),
				console.log(dataset.ISO);
				dataset.blitz = EXIF.getTag(this, "Flash"),
				console.log(dataset.blitz);
				dataset.programm = EXIF.getTag(this, "ExposureProgram"),
			
				myjson.push(dataset);
				

				console.log(myjson);
				//myjson[j].push(dataset);
			/*	data.ISO = EXIF.getTag(this, "ISOSpeedRatings"),
				console.log("ISO " + data.ISO);
				data.kameraMake = EXIF.getTag(this, "Make"),
				console.log("kameramake " + data.kameraMake);
				data.kameraModel= EXIF.getTag(this, "Model"),
				data.erstellungsdatum= EXIF.getTag(this, "DateTimeOriginal"),
				data.aenderungsdatum= EXIF.getTag(this, "DateTime"),
				data.brennweite = EXIF.getTag(this, "FocalLength"),
				data.belichtungszeit = EXIF.getTag(this, "ExposureTime"),
				data.blende = EXIF.getTag(this, "FNumber"),
				data.blitz = EXIF.getTag(this, "Flash"),
				data.programm = EXIF.getTag(this, "ExposureProgram"),
				*/
				la = EXIF.getTag(this, "GPSLatitude"),
				lo = EXIF.getTag(this, "GPSLongitude"),
				la2 = EXIF.getTag(this, "GPSLatitudeRef"),
				lo2 = EXIF.getTag(this, "GPSLongitudeRef"),
				alti = EXIF.getTag(this, "GPSAltitude"),
				idir = EXIF.getTag(this, "GPSImgDirection");
				
				a=a+2;

				/**
				if(j==inputFiles.files.length){
					var chart1 = new Chart(myChartObject1, {
						type: 'line',
						data: {
							labels: kameraMake,
							datasets: [{
								label: "ISO",
								data: ISO
							}]
						}
					
					});

					console.log(belichtungszeit + "belichtungszeit");
					var chart2 = new Chart(myChartObject2, {
						type: 'line',
						data: {
							labels: kameraMake,
							datasets: [{
								label: "Belichtungszeit",
								data: belichtungszeit
							}]
						}
					
					});

					console.log(brennweite + "brennweite");
					var chart3 = new Chart(myChartObject3, {
						type: 'line',
						data: {
							labels: kameraMake,
							datasets: [{
								label: "Brennweite",
								data: brennweite
							}]
						}
					
					});
					
				}
*/ 
			
						//console.log(erstellungsdatum[i]);
				//if(a/2==inputFiles.files.length){
				/*	for (var i = 0; i < inputFiles.files.length; i++) {
						document.getElementById("exif").innerHTML="<b>Kamera: </b>" + myjson[i].kameraMake + " " + myjson[i].kameraModel;
						console.log(myjson[i].kameraMake + " myjason kameraMake");
					}*/
					for (var i = 0; i < inputFiles.files.length; i++) {
						document.getElementById("exif").innerHTML+="<br><br><b>Kamera: </b>" + myjson[i].kameraMake + " " + myjson[i].kameraModel;
						document.getElementById("exif").innerHTML+="<br><br><b>Erstellungsdatum: </b>" + myjson[i].erstellungsdatum;
						console.log("durchlaufen erstellung " + myjson[i].erstellungsdatum);
						document.getElementById("exif").innerHTML+="<br><b>Zuletzt ge&auml;ndert: </b>" + myjson[i].aenderungsdatum;
						console.log("änderung "+myjson[i].aenderungsdatum);
						document.getElementById("exif").innerHTML+="<br><br><b>Brennweite: </b>" + myjson[i].brennweite + " mm";
						console.log("brennweite "+myjson[i].brennweite);
						document.getElementById("exif").innerHTML+="<br><b>Belichtungszeit: </b>" + myjson[i].belichtungszeit + " s";
						document.getElementById("exif").innerHTML+="<br><b>Blende: </b>" + myjson[i].blende;
						document.getElementById("exif").innerHTML+="<br><b>ISO: </b>" + myjson[i].ISO;
						document.getElementById("exif").innerHTML+="<br><b>Blitz: </b>" + myjson[i].blitz;
						document.getElementById("exif").innerHTML+="<br><b>Programm: </b>" + myjson[i].programm;

					}
					
					if(String(la)!="undefined"&&String(la).replace("NaN","")==String(la)) {
						la=String(la).replace(",","&deg; ");
						la=la.replace(",","&prime; ");
						lo=String(lo).replace(",","&deg; ");
						lo=lo.replace(",","&prime; ");
						var koor=la2 + la + "&Prime; " + lo2 + lo + "&Prime;";
						document.getElementById("exif").innerHTML+="<br><br><b>Koordinaten: </b><a href='https://www.google.de/maps/place/"+koor+"' target='_blank'>"+koor+"</a>";
						document.getElementById("exif").innerHTML+="<br><b>H&ouml;he: </b>" + alti + " m";
						document.getElementById("exif").innerHTML+="<br><b>Richtung: </b>" + idir;
					}
				//}
				/*
				for(var o = 0; o < inputFiles.files.length; o++){
					for(var u= 0; u< inputFiles.files.length; u++){
						if(myjson[o].ISO==myjson[u].ISO) {
							if(o!=u){
								//noch einmal zu oft
							console.log("zweimal der selbe iso");
							document.getElementById("exif").innerHTML+="der selbe Iso: " + myjson[o][7];
							}
						}
						if(myjson[o][0]==myjson[u][0]){
							if(o!=u){
							console.log("selbes kameramake");
							document.getElementById("exif").innerHTML+="der selbe kameramake: " + myjson[o][0];
							}
						}
						if(myjson[o][1]==myjson[u][1]){
							if(o!=u){
								document.getElementById("exif").innerHTML+="das selbe Kameramodel: " + myjson[o][1];
							}
						}
					}
				}*/
			});		
			
		}
		console.log(myjson + " myjason ausgabe");
	}
	else{
		EXIF.getData(e.target.files[0], function() {
			var make = EXIF.getTag(this, "Make"),
			model = EXIF.getTag(this, "Model"),
			date1 = EXIF.getTag(this, "DateTimeOriginal"),
			date2 = EXIF.getTag(this, "DateTime"),
			fl = EXIF.getTag(this, "FocalLength"),
			expo = EXIF.getTag(this, "ExposureTime"),
			fn = EXIF.getTag(this, "FNumber"),
			iso = EXIF.getTag(this, "ISOSpeedRatings"),
			flash = EXIF.getTag(this, "Flash"),
			prog = EXIF.getTag(this, "ExposureProgram"),
			la = EXIF.getTag(this, "GPSLatitude"),
			lo = EXIF.getTag(this, "GPSLongitude"),
			la2 = EXIF.getTag(this, "GPSLatitudeRef"),
			lo2 = EXIF.getTag(this, "GPSLongitudeRef"),
			alti = EXIF.getTag(this, "GPSAltitude"),
			idir = EXIF.getTag(this, "GPSImgDirection");
			kameraMake.push(make);
			console.log(kameraMake);
			kameraModel.push(model);
			console.log(kameraModel);
			erstellungsdatum.push(date1);
			console.log(erstellungsdatum);
			aenderungsdatum.push(date2);
			console.log(aenderungsdatum);
			brennweite.push(fl);
			console.log(brennweite);
			belichtungszeit.push(expo);
			console.log(belichtungszeit);
			blende.push(fn);
			console.log(blende);
			ISO.push(iso);
			console.log(ISO);
			blitz.push(flash);
			console.log(blitz);
			programm.push(prog);
			console.log(programm);
			
			
			
            if(j==inputFiles.files.length){
                var chart = new Chart(myChartObject, {
                    type: 'line',
                    data: {
                        labels: kameraMake,
                        datasets: [{
                            label: "ISO",
                            data: ISO
                        }]
                    }
                
                });
			}
			

			for (var i = 0; i < inputFiles.files.length; i++) {
						console.log(i);
						document.getElementById("exif").innerHTML="<b>Kamera: </b>" + kameraMake[i] + " " + kameraModel[i];
						console.log(kameraMake[i] + " " + kameraModel[i]);
					}
					for (var i = 0; i < inputFiles.files.length; i++) {
						document.getElementById("exif").innerHTML+="<br><br><b>Erstellungsdatum: </b>" + erstellungsdatum[i];
						console.log(erstellungsdatum[i]);
					}
					for (var i = 0; i < inputFiles.files.length; i++) {
						document.getElementById("exif").innerHTML+="<br><b>Zuletzt ge&auml;ndert: </b>" + aenderungsdatum[i];
						console.log(aenderungsdatum[i]);
					}
					for (var i = 0; i < inputFiles.files.length; i++) {
						document.getElementById("exif").innerHTML+="<br><br><b>Brennweite: </b>" + brennweite[i] + " mm";
					}
					for (var i = 0; i < inputFiles.files.length; i++) {
						document.getElementById("exif").innerHTML+="<br><b>Belichtungszeit: </b>" + belichtungszeit[i] + " s";
					}
					for (var i = 0; i < inputFiles.files.length; i++) {
						document.getElementById("exif").innerHTML+="<br><b>Blende: </b>" + blende[i];
					}
					for (var i = 0; i < inputFiles.files.length; i++) {
						document.getElementById("exif").innerHTML+="<br><b>ISO: </b>" + ISO[i];
					}
					for (var i = 0; i < inputFiles.files.length; i++) {
						document.getElementById("exif").innerHTML+="<br><b>Blitz: </b>" + blitz[i];
					}
					for (var i = 0; i < inputFiles.files.length; i++) {
						document.getElementById("exif").innerHTML+="<br><b>Programm: </b>" + programm[i];
					}
					
			
			if(String(la)!="undefined"&&String(la).replace("NaN","")==String(la)) {
				la=String(la).replace(",","&deg; ");
				la=la.replace(",","&prime; ");
				lo=String(lo).replace(",","&deg; ");
				lo=lo.replace(",","&prime; ");
				var koor=la2 + la + "&Prime; " + lo2 + lo + "&Prime;";
				document.getElementById("exif").innerHTML+="<br><br><b>Koordinaten: </b><a href='https://www.google.de/maps/place/"+koor+"' target='_blank'>"+koor+"</a>";
				document.getElementById("exif").innerHTML+="<br><b>H&ouml;he: </b>" + alti + " m";
				document.getElementById("exif").innerHTML+="<br><b>Richtung: </b>" + idir;
			}
			
		});
	}
//	scatterPlot3d( parent, kameraMake, kameraModel, erstellungsdatum, aenderungsdatum, brennweite, belichtungszeit,blende, iso, blitz, programm );
}


	
var kameraMake2 = [];
var kameraModel2 =[];
var erstellungsdatum2 = [];
var aenderungsdatum2 = [];
var brennweite2 = [];
var belichtungszeit2 =[];
var blende2 = [];
var ISO2 = [];
var blitz2 = [];
var programm2 = [];
var inputFiles2 = document.getElementById("file-input-2");
inputFiles2.onchange = function(e) {	
	if(inputFiles2.files.length >= 1){
		for(var j = 0; j<inputFiles2.files.length; j++){
				EXIF.getData(e.target.files[j], function(){
				
				make = EXIF.getTag(this, "Make"),
				model = EXIF.getTag(this, "Model"),
				date1 = EXIF.getTag(this, "DateTimeOriginal"),
				date2 = EXIF.getTag(this, "DateTime"),
				fl = EXIF.getTag(this, "FocalLength"),
				expo = EXIF.getTag(this, "ExposureTime"),
				fn = EXIF.getTag(this, "FNumber"),
				iso = EXIF.getTag(this, "ISOSpeedRatings"),
				flash = EXIF.getTag(this, "Flash"),
				prog = EXIF.getTag(this, "ExposureProgram"),
				la = EXIF.getTag(this, "GPSLatitude"),
				lo = EXIF.getTag(this, "GPSLongitude"),
				la2 = EXIF.getTag(this, "GPSLatitudeRef"),
				lo2 = EXIF.getTag(this, "GPSLongitudeRef"),
				alti = EXIF.getTag(this, "GPSAltitude"),
				idir = EXIF.getTag(this, "GPSImgDirection");
				kameraMake2.push(make);
				console.log(kameraMake);
				kameraModel2.push(model);
				console.log(kameraModel);
				erstellungsdatum2.push(date1);
				console.log(erstellungsdatum);
				aenderungsdatum2.push(date2);
				console.log(aenderungsdatum);
				brennweite2.push(fl);
				console.log(brennweite);
				belichtungszeit2.push(expo);
				console.log(belichtungszeit);
				blende2.push(fn);
				console.log(blende);
				ISO2.push(iso);
				console.log(ISO);
				blitz2.push(flash);
				console.log(blitz);
				programm2.push(prog);
				console.log(programm);
				a=a+2;

				
				/**
				if(j==inputFiles.files.length){
					var chart1 = new Chart(myChartObject1, {
						type: 'line',
						data: {
							labels: kameraMake,
							datasets: [{
								label: "ISO",
								data: ISO
							}]
						}
					
					});

					console.log(belichtungszeit + "belichtungszeit");
					var chart2 = new Chart(myChartObject2, {
						type: 'line',
						data: {
							labels: kameraMake,
							datasets: [{
								label: "Belichtungszeit",
								data: belichtungszeit
							}]
						}
					
					});

					console.log(brennweite + "brennweite");
					var chart3 = new Chart(myChartObject3, {
						type: 'line',
						data: {
							labels: kameraMake,
							datasets: [{
								label: "Brennweite",
								data: brennweite
							}]
						}
					
					});
					
				}
*/
				if(a/2==inputFiles2.files.length){
					for (var i = 0; i < inputFiles2.files.length; i++) {
						console.log(i);
						document.getElementById("exif2").innerHTML="<b>Kamera: </b>" + kameraMake2[i] + " " + kameraModel2[i];
						console.log(kameraMake2[i] + " " + kameraModel2[i]);
					}
					for (var i = 0; i < inputFiles2.files.length; i++) {
						document.getElementById("exif2").innerHTML+="<br><br><b>Erstellungsdatum: </b>" + erstellungsdatum2[i];
						console.log(erstellungsdatum2[i]);
					}
					for (var i = 0; i < inputFiles2.files.length; i++) {
						document.getElementById("exif2").innerHTML+="<br><b>Zuletzt ge&auml;ndert: </b>" + aenderungsdatum2[i];
						console.log(aenderungsdatum2[i]);
					}
					for (var i = 0; i < inputFiles2.files.length; i++) {
						document.getElementById("exif2").innerHTML+="<br><br><b>Brennweite: </b>" + brennweite2[i] + " mm";
					}
					for (var i = 0; i < inputFiles2.files.length; i++) {
						document.getElementById("exif2").innerHTML+="<br><b>Belichtungszeit: </b>" + belichtungszeit2[i] + " s";
					}
					for (var i = 0; i < inputFiles2.files.length; i++) {
						document.getElementById("exif2").innerHTML+="<br><b>Blende: </b>" + blende2[i];
					}
					for (var i = 0; i < inputFiles2.files.length; i++) {
						document.getElementById("exif2").innerHTML+="<br><b>ISO: </b>" + ISO2[i];
					}
					for (var i = 0; i < inputFiles2.files.length; i++) {
						document.getElementById("exif2").innerHTML+="<br><b>Blitz: </b>" + blitz2[i];
					}
					for (var i = 0; i < inputFiles2.files.length; i++) {
						document.getElementById("exif2").innerHTML+="<br><b>Programm: </b>" + programm2[i];
					}
					
					if(String(la)!="undefined"&&String(la).replace("NaN","")==String(la)) {
						la=String(la).replace(",","&deg; ");
						la=la.replace(",","&prime; ");
						lo=String(lo).replace(",","&deg; ");
						lo=lo.replace(",","&prime; ");
						var koor=la2 + la + "&Prime; " + lo2 + lo + "&Prime;";
						document.getElementById("exif2").innerHTML+="<br><br><b>Koordinaten: </b><a href='https://www.google.de/maps/place/"+koor+"' target='_blank'>"+koor+"</a>";
						document.getElementById("exif2").innerHTML+="<br><b>H&ouml;he: </b>" + alti + " m";
						document.getElementById("exif2").innerHTML+="<br><b>Richtung: </b>" + idir;
					}
				}
				for(var o = 0; o < inputFiles2.files.length; o++){
					for(var u= 0; u< inputFiles2.files.length; u++){
						if(ISO[o]==ISO[u]) {
							if(o!=u){
								//noch einmal zu oft
							console.log("zweimal der selbe iso");
							document.getElementById("exif2").innerHTML+="der selbe Iso: " + ISO2[o];
							}
						}
						if(kameraMake2[o]==kameraMake2[u]){
							if(o!=u){
							console.log("selbes kameramake");
							document.getElementById("exif2").innerHTML+="der selbe kameramake: " + kameraMake2[o];
							}
						}
						if(kameraModel2[o]==kameraModel2[u]){
							if(o!=u){
								document.getElementById("exif2").innerHTML+="das selbe Kameramodel: " + kameraModel2[o];
							}
						}
					}
				}
			});
			}
		
		}
	else{
		EXIF.getData(e.target.files[0], function() {
			var make = EXIF.getTag(this, "Make"),
			model = EXIF.getTag(this, "Model"),
			date1 = EXIF.getTag(this, "DateTimeOriginal"),
			date2 = EXIF.getTag(this, "DateTime"),
			fl = EXIF.getTag(this, "FocalLength"),
			expo = EXIF.getTag(this, "ExposureTime"),
			fn = EXIF.getTag(this, "FNumber"),
			iso = EXIF.getTag(this, "ISOSpeedRatings"),
			flash = EXIF.getTag(this, "Flash"),
			prog = EXIF.getTag(this, "ExposureProgram"),
			la = EXIF.getTag(this, "GPSLatitude"),
			lo = EXIF.getTag(this, "GPSLongitude"),
			la2 = EXIF.getTag(this, "GPSLatitudeRef"),
			lo2 = EXIF.getTag(this, "GPSLongitudeRef"),
			alti = EXIF.getTag(this, "GPSAltitude"),
			idir = EXIF.getTag(this, "GPSImgDirection");
			kameraMake2.push(make);
			console.log(kameraMake);
			kameraModel2.push(model);
			console.log(kameraModel);
			erstellungsdatum2.push(date1);
			console.log(erstellungsdatum);
			aenderungsdatum2.push(date2);
			console.log(aenderungsdatum);
			brennweite2.push(fl);
			console.log(brennweite);
			belichtungszeit2.push(expo);
			console.log(belichtungszeit);
			blende2.push(fn);
			console.log(blende);
			ISO2.push(iso);
			console.log(ISO);
			blitz2.push(flash);
			console.log(blitz);
			programm2.push(prog);
			console.log(programm);
			
			
			
            if(j==inputFiles2.files.length){
                console.log("test");
                var chart = new Chart(myChartObject, {
                    type: 'line',
                    data: {
                        labels: kameraMake2,
                        datasets: [{
                            label: "ISO",
                            data: ISO2
                        }]
                    }
                
                });
			}
			

			for (var i = 0; i < inputFiles2.files.length; i++) {
						console.log(i);
						document.getElementById("exif2").innerHTML="<b>Kamera: </b>" + kameraMake2[i] + " " + kameraModel2[i];
						console.log(kameraMake2[i] + " " + kameraModel2[i]);
					}
					for (var i = 0; i < inputFiles2.files.length; i++) {
						document.getElementById("exif2").innerHTML+="<br><br><b>Erstellungsdatum: </b>" + erstellungsdatum2[i];
						console.log(erstellungsdatum[i]);
					}
					for (var i = 0; i < inputFiles2.files.length; i++) {
						document.getElementById("exif2").innerHTML+="<br><b>Zuletzt ge&auml;ndert: </b>" + aenderungsdatum2[i];
						console.log(aenderungsdatum[i]);
					}
					for (var i = 0; i < inputFiles2.files.length; i++) {
						document.getElementById("exif2").innerHTML+="<br><br><b>Brennweite: </b>" + brennweite2[i] + " mm";
					}
					for (var i = 0; i < inputFiles2.files.length; i++) {
						document.getElementById("exif2").innerHTML+="<br><b>Belichtungszeit: </b>" + belichtungszeit2[i] + " s";
					}
					for (var i = 0; i < inputFiles2.files.length; i++) {
						document.getElementById("exif2").innerHTML+="<br><b>Blende: </b>" + blende2[i];
					}
					for (var i = 0; i < inputFiles2.files.length; i++) {
						document.getElementById("exif2").innerHTML+="<br><b>ISO: </b>" + ISO2[i];
					}
					for (var i = 0; i < inputFiles2.files.length; i++) {
						document.getElementById("exif2").innerHTML+="<br><b>Blitz: </b>" + blitz2[i];
					}
					for (var i = 0; i < inputFiles2.files.length; i++) {
						document.getElementById("exif2").innerHTML+="<br><b>Programm: </b>" + programm2[i];
					}
					
			
			if(String(la)!="undefined"&&String(la).replace("NaN","")==String(la)) {
				la=String(la).replace(",","&deg; ");
				la=la.replace(",","&prime; ");
				lo=String(lo).replace(",","&deg; ");
				lo=lo.replace(",","&prime; ");
				var koor=la2 + la + "&Prime; " + lo2 + lo + "&Prime;";
				document.getElementById("exif2").innerHTML+="<br><br><b>Koordinaten: </b><a href='https://www.google.de/maps/place/"+koor+"' target='_blank'>"+koor+"</a>";
				document.getElementById("exif2").innerHTML+="<br><b>H&ouml;he: </b>" + alti + " m";
				document.getElementById("exif2").innerHTML+="<br><b>Richtung: </b>" + idir;
			}
			
		});
	}

}



/*
var belichtungsgraphic = document.getElementById('belichtung');
belichtungsgraphic.onclick = function(laenge, kameraMa, kameraMo, erstellungsd, aenderungsd, brennw, belichtungsz, blen, IS, bli, progr, mak, mode,dat1, dat2, fll, is, flas, pro){
	console.log("BelichtungsClickErkannt");

	for(var a = 0; a<laenge; a++){
		if(belichtungsgraphic.checked == true){
			var chart1 = new Chart(myChartObject1, {
				type: 'line',
				data: {
					labels: kameraMa,
					datasets: [{
						label: "ISO",
						data: belichtungsz
					}]
				}
			
			});
		}
	}

}
var isographic = document.getElementById('iso');
isographic.onclick = function(laenge, kameraMa, kameraMo, erstellungsd, aenderungsd, brennw, belichtungsz, blen, IS, bli, progr, mak, mode,dat1, dat2, fll, is, flas, pro){
console.log("IsoClickErkannt");
	for(var a = 0; a<laenge; a++){
		if(isographic.checked == true){
			var chart1 = new Chart(myChartObject1, {
				type: 'line',
				data: {
					labels: kameraMa,
					datasets: [{
						label: "ISO",
						data: IS
					}]
				}
			
			});
		}
	}
};
*/
