var JAMMER = 'Jammer',
    JAMMER_POSITION = 0,
    PIVOT  = 'Pivot',
    PIVOT_POSITION = 1,
    BLOCKER= 'Blocker',
    BLOCKER1_POSITION = 2,
    BLOCKER2_POSITION = 3,
    BLOCKER3_POSITION = 4,
    TRACKLEAD= 'Tracklead'


var skaterService = function(){
    var togglePosition = function(skater, position){
        var lowerPosition = position.toLowerCase();
        skater[lowerPosition] = !skater[lowerPosition];
    }

    var skaterFactory = function(name, jammer, pivot, trackLead, blocker){
        var skater = {
            name: name || '',
            jammer: jammer || false,
            pivot: pivot || false,
            tracklead: trackLead || false,
            blocker: blocker || true,
            toggleJammer: function(){togglePosition(this, JAMMER);},
            togglePivot: function(){togglePosition(this, PIVOT);},
            toggleBlocker: function(){togglePosition(this, BLOCKER);},
            toggleTracklead: function(){togglePosition(this, TRACKLEAD);}
        };
        return skater;
    };
    return {
        build: skaterFactory,
        availableTeams: ['Terminators'],
        getTeam: {
            'Terminators':[
                skaterFactory("Ache",false,true,true,true),
                skaterFactory("Ames",true,true,true,true),
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

var boutSkaterService = function(){
    var skaters = [];
    var boutSkaterFactory = function(skater){
        var boutSkater = {
            skater: skater,
            name: function(){return this.skater.name;},
            jammer: function(){return this.skater.jammer;},
            pivot: function(){return this.skater.pivot;},
            tracklead: function(){return this.skater.tracklead;},
            blocker: function(){return this.skater.blocker;},

            /* Bout skater properties */
            jams: 0,
            penalties: 0,
            sits: 0,
            timesJammer: 0,
            timesPivot: 0,
            timesBlocker: 0,

            madeJammer: function(){this.inJam('Jammer');},
            madePivot: function(){this.inJam('Pivot');},
            madeBlocker: function(){this.inJam('Blocker');},

            inJam: function(positionString){
                this.jams++;
                this['times'+positionString]++
            },
            nixedFromJam: function(positionString){
                this.jams--;
                this['times'+positionString]--;
            },

            wentToBox: function(){this.penalties++;},
            madeSit: function(){this.sits++;}
        };

        skaters.push(boutSkater);

        return boutSkater;
    };

    return {
        build: boutSkaterFactory,
        skaters: skaters
    };
};

var jamSkaterService = function() {
    var jamSkaterFactory = function(boutSkater, jam){
        jamSkater = {
            boutSkater: boutSkater,
            name: function(){return this.boutSkater.name;},
            jam: jam,
            penalties:[],
            togglePenatly:function(){ togglePenalty(this); }
        };

        return jamSkater;
    };

    var buildPenalty = function(skater){
        var number = skater.penalties.length + 1;
        var penalty = {
            skater: skater,
            number:number,
            active: true,
            carriedIntoNextJam: false,
            delete: function(){
                if(!this.active) return;
                this.skater.penalties.slice(0, this.skater.penalties.length - 1)
            }
        };

        return penalty;
    };

    var togglePenalty = function(skater){
        if(skater.penalties.length === 0 || skater.penalties[skater.penalties.length - 1].active === false){
            var p = buildPenalty(skater);
            skater.penalties.push(p);
            skater.boutSkater.wentToBox();
            return;
        }
        var lastPenalty = skater.penalties[skater.penalties.length - 1];
        lastPenalty.active = false;
    };

    return {
        build: jamSkaterFactory
    };
};

var jamService = function(jamSkater){
    var jams = [];

    var jamFactory = function(){
        var jam = {
            number: jams.length + 1,
            complete: false,
            skaters:[{jammer:true},{pivot:true},{blocker:true},{blocker:true},{blocker:true}]
        };

        jams.push(jam);

        return jam;
    };

    var setJammer = function (jam, boutSkater) {
        if(jam.jammer && jam.jammer.boutSkater){
            jam.jammer.boutSkater.timesJammer--;
            jam.jammer.boutSkater.jams--;
        }
        jam.jammer = jamSkater.build(boutSkater);
        jam.jammer.boutSkater.timesJammer++;
        jam.jammer.boutSkater.jams++;
        jam.jammer.jammer = true;
    };
    var setPivot = function (jam, boutSkater) {
        if(jam.pivot && jam.pivot.boutSkater) {
            jam.pivot.boutSkater.timesPivot--;
            jam.pivot.boutSkater.jams--;
            jam.jammer.jammer = true;
        }
        jam.pivot = jamSkater.build(boutSkater);
        jam.pivot.boutSkater.timesPivot++;
        jam.pivot.boutSkater.jams++;
        jam.pivot.pivot = true;
    };
    var setBlocker1 = function (jam, boutSkater) {
        if(jam.blocker1 && jam.blocker1.boutSkater) {
            jam.blocker1.boutSkater.timesBlocker--;
            jam.blocker1.boutSkater.jams--;
        }
        jam.blocker1 = jamSkater.build(boutSkater);
        jam.blocker1.boutSkater.timesBlocker++;
        jam.blocker1.boutSkater.jams++;
        jam.blocker1.blocker = true;
    };
    var setBlocker2 = function (jam, boutSkater) {
        if(jam.blocker2 && jam.blocker2.boutSkater) {
            jam.blocker2.boutSkater.timesBlocker--;
            jam.blocker2.boutSkater.jams--;
        }
        jam.blocker2 = jamSkater.build(boutSkater);
        jam.blocker2.boutSkater.timesBlocker++;
        jam.blocker2.boutSkater.jams++;
        jam.blocker2.blocker = true;
    };
    var setBlocker3 = function (jam, boutSkater) {
        if(jam.blocker3 && jam.blocker3.boutSkater) {
            jam.blocker3.boutSkater.timesBlocker--;
            jam.blocker3.boutSkater.jams--;
        }
        jam.blocker3 = jamSkater.build(boutSkater);
        jam.blocker3.boutSkater.timesBlocker++;
        jam.blocker3.boutSkater.jams++;
        jam.blocker3.blocker = true;
    };

    return {
        jams: jams,
        build:jamFactory,
        setJammer: setJammer,
        setPivot: setPivot,
        setBlocker1: setBlocker1,
        setBlocker2: setBlocker2,
        setBlocker3: setBlocker3
    };
};

var lineupsCtrl = function($scope) {
    var skater = skaterService();
    var boutSkater = boutSkaterService();
    var jamSkater = jamSkaterService();
    var jam = jamService(jamSkater);
    var skaterChoseCallback = function(skater){};

    var skaters = skater.getTeam['Terminators'];
    for(var i = 0; i < skaters.length; i++){
        var s = boutSkater.build(skaters[i]);
    }

    $scope.sort = '+name'
    $scope.newskater = skater.build();
    $scope.availableSkaters = skaters;
    $scope.skaters = boutSkater.skaters;
    $scope.jams = jam.jams;
    $scope.newJam = jam.build();
    $scope.skatersToChoseFrom = [];

    $scope.addJam = function(){
        $scope.newJam = jam.build();
    };

    $scope.toggleJam = function(jam){
        jam.complete = !jam.complete;
    };

    $scope.toggleBox = function(skater){

    }

    $scope.chooseJammer = function(selectedJam){
        var callback = function(chosenSkater){
            if(selectedJam.jammer && selectedJam.jammer.name() && selectedJam.jammer.name() === chosenSkater.name()) return;
            jam.setJammer(selectedJam, chosenSkater);
        }
        var filter = function (skater) {
            return skater.jammer();
        };
        showSkaterChoser(filter, callback);
    };

    $scope.choosePivot = function(selectedJam){
        var callback = function(chosenSkater){
            if(selectedJam.pivot && selectedJam.pivot.name() && selectedJam.pivot.name() === chosenSkater.name()) return;
            jam.setPivot(selectedJam, chosenSkater);
        }
        var filter = function (skater) {
            return skater.pivot();
        };
        showSkaterChoser(filter, callback);
    };

    $scope.chooseBlocker1 = function(selectedJam){
        var callback = function(chosenSkater){
            if(selectedJam.blocker1 && selectedJam.blocker1.name() && selectedJam.blocker1.name() === chosenSkater.name()) return;
            jam.setBlocker1(selectedJam, chosenSkater);
        }
        var filter = function (skater) {
            return skater.blocker();
        };
        showSkaterChoser(filter, callback);
    };

    $scope.chooseBlocker2 = function(selectedJam){
        var callback = function(chosenSkater){
            if(selectedJam.blocker2 && selectedJam.blocker2.name() && selectedJam.blocker2.name() === chosenSkater.name()) return;
            jam.setBlocker2(selectedJam, chosenSkater);
        }
        var filter = function (skater) {
            return skater.blocker();
        };
        showSkaterChoser(filter, callback);
    };

    $scope.chooseBlocker3 = function(selectedJam){
        var callback = function(chosenSkater){
            if(selectedJam.blocker3 && selectedJam.blocker3.name() && selectedJam.blocker3.name() === chosenSkater.name()) return;
            jam.setBlocker3(selectedJam, chosenSkater);
        }
        var filter = function (skater) {
            return skater.blocker();
        };
        showSkaterChoser(filter, callback);
    };


    $scope.addSkater = function(newSkater){
        $scope.skaters.push(newSkater);
        $scope.newskater = skater.build();
    };

    var showSkaterChoser = function(filter, callback){
        skaterChoseCallback = callback;
        $scope.skatersToChoseFrom = [];

        for(var i = 0; i < $scope.skaters.length; i++){
            var skater = $scope.skaters[i];
            if(filter(skater)){
                skater.chose = choseSkater;
                $scope.skatersToChoseFrom.push(skater);
            }
        }
    };

    var choseSkater = function(){
        $scope.skatersToChoseFrom = [];
        skaterChoseCallback(this);
        skaterChoseCallback = function(skater){};
    };
};
