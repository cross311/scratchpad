
var lineupsCtrl = function($scope) {
    var counter = 0;
    var createSkater = function(){return {name:'',jammer:false,pivot:false,counter:counter++};}
    $scope.sort = '+counter'
    $scope.newskater = createSkater();
    $scope.skaters = [];

    $scope.addSkater = function(newSkater){
        $scope.skaters.push(newSkater);
        $scope.newskater = createSkater();
    };

    $scope.blocker = function(skater){
        skater.counter = counter++;
    };

    $scope.jammer = function(skater){
        skater.counter = counter++ + 5;
    };

    $scope.pivot = function(skater){
        skater.counter = counter++;
    };

    var skaterFactory = function(name, jammer, pivot){
      var skater = createSkater();
        skater.name = name;
        skater.jammer = jammer || false;
        skater.pivot = pivot || false;
        return skater;
    };

    var termies = [
        skaterFactory("Ache",false,true),
        skaterFactory("Ames",false,true),
        skaterFactory("Arson",false,true),
        skaterFactory("Choppy",true,false),
        skaterFactory("Daryl",true,false),
        skaterFactory("Fizzy",false,false),
        skaterFactory("Lace",false,false),
        skaterFactory("Nat",false,false),
        skaterFactory("Nikki",true,false),
        skaterFactory("Phil",false,true),
        skaterFactory("Pippi",false,false),
        skaterFactory("Speed",false,false),
        skaterFactory("Sweets",true,false),
        skaterFactory("Vera",false,false)
    ];

    $scope.skaters = termies;
};
