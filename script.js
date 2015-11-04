
(function() {
'use strict';
  
  $('#insertLocation').click(main);

  function main(){
    var city = $('#City').val();
    var state = $('#State').val();
    var zip = $('#Zip').val();
    var cityWords = city.match(/[a-z]+/gi);

    if (zip.length ===5){
      var url = getURL(zip);
    }else{
      cityWords=cityWords.join('_');
      var url = getURL(state+'/'+cityWords);
    }

    var specificData = getData(url);
  }

  function getData(url){
    var set1 = $.get(url[0]);
    var set2 = $.get(url[1]);
    var dataObj1={'feelslike_string':1,'display_location': 1,'relative_humidity':1 ,'temperature_string':1 ,'observation_time': 1,'precip_today_string': 1,'weather': 1,'icon_url':1};
    var dataObj2 = {}
    $.when(set1,set2).done(function(data1,data2){
      for (var prop in dataObj1){
        dataObj1[prop] = data1[0].current_observation[prop];
      }
      dataObj2=data2[0].forecast.simpleforecast.forecastday;
      updateDOM($.extend({},dataObj2,dataObj1));
    });
  }

  function getURL(location){
    var url3 = '.json';
    var url2 = ['conditions/q/','forecast/q/'];
    var url1 = 'http://api.wunderground.com/api/3c7b147ea110f7cf/';

    if (location==='autoip'){
      var getLocation = getData(url1+'geolookup/q/'+location+url3);
      return getLocation;
    }
    var urlArray = [];
    url2.forEach(function(dataSet){
      var fullURL = url1+dataSet+location+url3;
      urlArray.push(fullURL);
    });
    return urlArray;
  }

  function updateDOM(obj){
    console.log(obj);
    var div1= [obj.display_location.full+'<br>','<img src = '+obj.icon_url+'>'+'<br>',
              obj.weather+'<br>',obj.observation_time+'<br>','Temp: '+obj.temperature_string+'<br>',
              'Feels like: '+obj.feelslike_string+'<br>','Precipitation Today: '+obj.precip_today_string+'<br>',
              'Relative Humidity: '+obj.relative_humidity];
    $('.currentConditions').empty().append(div1);
    var day1 = obj[0];
    var day2 = obj[1];
    var day3 = obj[2];
    var day4 = obj[3];
    var forecast1 = [day1.date.weekday_short+', '+day1.date.monthname_short+' '+day1.date.day+' '+day1.date.year+'<br>',
                    '<img src = '+day1.icon_url+'>'+'<br>',day1.icon+'<br>','High: '+day1.high.fahrenheit+'('+day1.high.celsius+')<br>',
                    'Low: '+day1.low.fahrenheit+'('+day1.low.celsius+')<br>'];
    var forecast2 = [day2.date.weekday_short+', '+day2.date.monthname_short+' '+day2.date.day+' '+day2.date.year+'<br>',
                    '<img src = '+day2.icon_url+'>'+'<br>',day2.icon+'<br>','High: '+day2.high.fahrenheit+'('+day2.high.celsius+')<br>',
                    'Low: '+day2.low.fahrenheit+'('+day2.low.celsius+')<br>'];
    var forecast3 = [day3.date.weekday_short+', '+day3.date.monthname_short+' '+day3.date.day+' '+day3.date.year+'<br>',
                    '<img src = '+day3.icon_url+'>'+'<br>',day3.icon+'<br>','High: '+day3.high.fahrenheit+'('+day3.high.celsius+')<br>',
                    'Low: '+day3.low.fahrenheit+'('+day3.low.celsius+')<br>'];
    var forecast4 = [day4.date.weekday_short+', '+day4.date.monthname_short+' '+day4.date.day+' '+day4.date.year+'<br>',
                    '<img src = '+day4.icon_url+'>'+'<br>',day4.icon+'<br>','High: '+day4.high.fahrenheit+'('+day4.high.celsius+')<br>',
                    'Low: '+day4.low.fahrenheit+'('+day4.low.celsius+')<br>'];
    $('.forecast1').empty().append(forecast1);
    $('.forecast2').empty().append(forecast2);
    $('.forecast3').empty().append(forecast3);
    $('.forecast4').empty().append(forecast4);
    $('.container-fluid').removeClass('hide');
  }















})();