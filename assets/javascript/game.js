// create game object
var simpleRPG = {

    // character objects
    // Name, pic, hp, atk, status
    characters: {
        char1: {
            htmlChar: '#char1',
            htmlHP: '#char1hp',
            name: 'Es Mitsurugi',
            baseHP: '100',
            hp: '100',
            atk: '20',
            status: 'alive',
            alignment: ''
        },
        char2: {
            htmlChar: '#char2',
            htmlHP: '#char2hp',
            name: 'Lambda-11',
            baseHP: '110',
            hp: '110',
            atk: '20',
            status: 'alive',
            alignment: ''
        },
        char3: {
            htmlChar: '#char3',
            htmlHP: '#char3hp',
            name: 'Platinum Trinity',
            baseHP: '120',
            hp: '120',
            atk: '20',
            status: 'alive',
            alignment: ''
        },
        char4: {
            htmlChar: '#char4',
            htmlHP: '#char4hp',
            name: 'Tsubaki Yayoi',
            baseHP: '90',
            hp: '90',
            atk: '20',
            status: 'alive',
            alignment: ''
        }
    },

    // game initialize
    initialize: function () {
        // set characters to their default HP and alignment
        var objKeys = Object.keys(this.characters);

        $.each(objKeys, function (index) {
            var targetChar = simpleRPG.characters[objKeys[index]];
            var htmlCharHP = simpleRPG.characters[objKeys[index]].htmlHP;

            targetChar.hp = targetChar.baseHP;
            targetChar.alignment = '';
            $(htmlCharHP).text('HP: ' + targetChar.hp);
        });

        // hide active board, log, and bench
        $('#activeBoard').addClass('hide-this');
        $('#gameLogArea').addClass('hide-this');
        $('#enemyBenchArea').addClass('hide-this');
    }

        // player picks enemy
        // move enemy from bench to field

        // play match between pc and npc

        // game reset

        // game state check (win, lose, next enemy)

};

window.onload = function () {
    // initialize RPG
    simpleRPG.initialize();

    // wait for character select
    $('.pickable').on('click', function () {
        // hide character select and show board sections
        $('#characterSelect').addClass('hide-this');
        $('#activeBoard').removeClass('hide-this');
        $('#gameLogArea').removeClass('hide-this');
        $('#enemyBenchArea').removeClass('hide-this');

        // set player card alignment and turn click event off
        $(this).removeClass('pickable');
        $(this).addClass('player-char');
        $(this).off('click');

        // set enemy card alignments
        var objKeys = Object.keys(simpleRPG.characters);
        // loop through each character to set to enemy
        $.each(objKeys, function (index) {
            var htmlTarget = simpleRPG.characters[objKeys[index]].htmlChar;
            if ($(htmlTarget).hasClass('pickable')) {
                $(htmlTarget).removeClass('pickable');
                $(htmlTarget).addClass('enemy-char');
                simpleRPG.characters[objKeys[index]].alignment = 'enemy';
            }
            else {
                simpleRPG.characters[objKeys[index]].alignment = 'player';
            }
            // turn click event off
            $(htmlTarget).off('click');
        });

        // move selected character to player area
        $('.player-char').appendTo('#playerArea');

        // move non-selected to enemy bench
        $('.enemy-char').appendTo('#enemyBench');
    });

    // react to selecting an enemy character
    $('.enemy-char').on('click', function () {
        $(this).appendTo('#enemyArea');
    });

};