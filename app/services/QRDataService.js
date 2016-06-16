app.factory('QRDataService', function (DataService, $timeout) {

    var getAdvancedChartHistoryData = function (model) {
        return DataService.getHistory(model).then(function (response) {
            return response.data;
        }).catch(function (response) {
            return response;
        });
    };

    var getChartHistoryData = function (model) {
        return DataService.getTicks(model).then(function (response) {
            return response.data;
        }).catch(function (response) {
            return response;
        });
    };

    var processChannels = function (data) {
        var navTotal = 0, startingCapitalTotal = 0, changeTotal = 0, sizeTotal = 0, models = [], processedData = [];
        angular.forEach(data.models, function (value, key) {
            if (models.indexOf(value.name) === -1) {
                models.push(value.name);
                navTotal = navTotal + value.nav;
                startingCapitalTotal = startingCapitalTotal + value.startingCapital;
                changeTotal = changeTotal + (value.nav - value.startingCapital);
                sizeTotal = sizeTotal + value.size;
                processedData.push(value);
            }
        });
        return {
            nav: navTotal,
            size: sizeTotal,
            change: changeTotal,
            pchg: startingCapitalTotal !== 0 ? changeTotal / startingCapitalTotal * 100 : '',
            models: processedData
        };
    };

    var processClientChannels = function (response) {
        var data = {};
        angular.forEach(response.clientData, function (value, key) {
            data[value.name] = {
                name : value.name,
                change: value.change,
                nav: value.nav,
                capShort: value.capShort,
                changeYear: value.changeYear,
                changeMonth: value.changeMonth,
                capLong: value.capLong,
                changeAll: value.changeAll
            };
            var pairs = {};
            angular.forEach(value.pairs, function (pair, index) {
                pairs[pair.name] = {
                    name : pair.name,
                    nav: pair.nav,
                    changeYear: pair.changeYear,
                    changeMonth: pair.changeMonth,
                    size: pair.size,
                    changeAll: value.changeAll,
                    channels: pair.channels
                };
            });
            data[value.name].pairs = pairs;
        });
        var clientHeaders = JSON.parse('[{"key": "name","displayName": "Client", "type": "string"}, {"key": "nav","displayName": "NAV","type": "number"}, {"key": "changeMonth","displayName": "MTD","type": "percentage"}, {"key": "changeYear","displayName": "YTD","type": "percentage"}, {"key": "changeAll","displayName": "Total","type": "percentage"}]');
        var pairHeaders = JSON.parse('[{"key": "name","displayName": "Pair", "type": "string"}, {"key": "nav","displayName": "NAV","type": "number"}, {"key": "changeMonth","displayName": "MTD","type": "percentage"}, {"key": "changeYear","displayName": "YTD","type": "percentage"}, {"key": "changeAll","displayName": "Total","type": "percentage"}]');

        return {
            clientHeaders: clientHeaders,
            pairHeaders: pairHeaders,
            //channelHeaders : [],
            data: data
        };
    };

    var switchModel = function (model, enable) {
        return DataService.switchModel(model, enable).then(function (response) {
            return response.data;
        });
    };

    var switchLong = function (model, enable) {
        return DataService.switchLong(model, enable).then(function (response) {
            return response.data;
        });
    };

    var switchShort = function (model, enable) {
        return DataService.switchShort(model, enable).then(function (response) {
            return response.data;
        });
    };

    var switchRunScript = function (model, enable) {
        return DataService.switchRunScript(model, enable).then(function (response) {
            return response.data;
        });
    };

    var enableService = function () {
        return DataService.enableService().then(function (response) {
            return response.data;
        });
    };

    var disableService = function () {
        return DataService.disableService().then(function (response) {
            return response.data;
        });
    };

    var switchOnService = function () {
        return DataService.switchOnService().then(function (response) {
            return response.data;
        }).catch(function (response) {
            return response;
        });
    };

    var switchOffService = function () {
        return DataService.switchOffService().then(function (response) {
            return response.data;
        }).catch(function (response) {
            return response;
        });
    };

    var getChannelAnalyzerData = function () {
        return $timeout(function () {
            return JSON.parse('{"xAxis":{"categories":["Dez","Jan","Feb","Mär","Apr","Mai","Jun","Jul"]},"series":[{"data":[276,-675,291,188,296,-285,-100],"name":"60"},{"data":[521,-305,-1495,380,1111,-77,-82],"name":"70"},{"data":[295,-449,-785,-1565,1629,628,-480],"name":"80"},{"data":[1936,3847,7097,3117,2017,653,-91],"name":"90"},{"data":[1456,5435,639,993,-41,238,-1018],"name":"100"},{"data":[-1511,1044,-865,938,-208,2,-250],"name":"110"},{"data":[1085,3206,888,797,300,260,315],"name":"120"},{"data":[1676,-489,-238,672,0,236,425],"name":"130"},{"data":[-1652,-797,252,-383,0,245,776],"name":"140"},{"data":[-78,-112,-2129,-920,1154,0,815],"name":"150"},{"data":[276,-675,291,11,0,0,630],"name":"160"},{"data":[521,-305,-1495,195],"name":"170"},{"data":[295,-449,-785],"name":"180"},{"data":[-119,1097,1749,0,295],"name":"190"},{"data":[0,676,0,0,325],"name":"200"},{"data":[427,329],"name":"250"},{"data":[-2521,-34,0,165],"name":"300"},{"data":[0,0,0,0,0,0,1800],"name":"U"},{"data":[0,0,0,0,0,0,1721],"name":"V"},{"data":[0,0,0,0,0,0,1297],"name":"X"}],"title":{"text":"filter: TITTEL"}}');
        }, 100);
        //return DataService.getChannelAnalyzerData().then(function(response){
        //    return response.data;
        //});
    };

    var getTickUpdatesParams = function (model) {
        return {model: model};
    };

    var getChannelOverviewParams = function (filter, debug) {
        return {nameFilter: filter, debug: debug};
    };

    var getClientOverviewParams = function (client) {
        return {client: client};
    };

    var getTradeHistoryParams = function (model) {
        return {model: model};
    };

    return {
        getAdvancedChartHistoryData: getAdvancedChartHistoryData,
        getChartHistoryData: getChartHistoryData,
        getChannelAnalyzerData: getChannelAnalyzerData,
        switchModel: switchModel,
        switchLong: switchLong,
        switchShort: switchShort,
        switchRunScript: switchRunScript,
        enableService: enableService,
        disableService: disableService,
        switchOnService: switchOnService,
        switchOffService: switchOffService,
        processChannels: processChannels,
        processClientChannels: processClientChannels,
        getTickUpdatesParams: getTickUpdatesParams,
        getChannelOverviewParams: getChannelOverviewParams,
        getClientOverviewParams: getClientOverviewParams,
        getTradeHistoryParams: getTradeHistoryParams
    }

});