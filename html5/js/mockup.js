var skaterService = function(){
    var skaterFactory = function(name, jammer, pivot, trackLead, blocker){
        var skater = {
            name: name || '',
            jammer: jammer || false,
            pivot: pivot || false,
            trackLead: trackLead || false,
            blocker: blocker || true
        };
        return skater;
    };
    return {
        build: skaterFactory,
        availableTeams: ['Terminators'],
        getTeam: {
            'Terminators':[
                skaterFactory("Ache",false,true,true,true),
                skaterFactory("Ames",false,true,true,true),
                skaterFactory("Arson",false,true,true,true),
                skaterFactory("Choppy",true,false,false,true),
                skaterFactory("Daryl",true,false,false,true),
                skaterFactory("Fizzy",false,false,false,true),
                skaterFactory("Lace",false,false,false,true),
                skaterFactory("Nat",false,false,false,true),
                skaterFactory("Nikki",true,false,false,true),
                skaterFactory("Phil",false,true,true,true),
                skaterFactory("Pippi",false,false,false,true),
                skaterFactory("Speed",false,false,false,true),
                skaterFactory("Sweets",true,false,false,true),
                skaterFactory("Vera",false,false,false,true)
            ]
        }
    }
};

var lineupsCtrl = function($scope) {
    var skaterFactory = skaterService();
    $scope.sort = '+name'
    $scope.newskater = skaterFactory.build();
    $scope.skaters = skaterFactory.getTeam['Terminators'];


    $scope.addSkater = function(newSkater){
        $scope.skaters.push(newSkater);
        $scope.newskater = skaterFactory.build();
    };

    $scope.blocker = function(skater){
        skater.blocker = !skater.blocker;
    };

    $scope.jammer = function(skater){
        skater.jammer = !skater.jammer;
    };

    $scope.pivot = function(skater){
        skater.pivot = !skater.pivot;
    };

    $scope.trackLead = function(skater){
        skater.trackLead = !skater.trackLead;
    };
};
