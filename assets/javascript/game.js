// create game object
var simpleRPG = {

    // character objects
    // Name, pic, hp, atk, status
    characters: {
        char1: {
            htmlChar: '#char1',
            htmlHP: '#char1hp',
            name: 'Es Mitsurugi',
            baseHP: 100,
            hp: 100,
            atk: 20,
            status: 'alive',
            alignment: ''
        },
        char2: {
            htmlChar: '#char2',
            htmlHP: '#char2hp',
            name: 'Lambda-11',
            baseHP: 110,
            hp: 110,
            atk: 20,
            status: 'alive',
            alignment: ''
        },
        char3: {
            htmlChar: '#char3',
            htmlHP: '#char3hp',
            name: 'Platinum Trinity',
            baseHP: 120,
            hp: 120,
            atk: 20,
            status: 'alive',
            alignment: ''
        },
        char4: {
            htmlChar: '#char4',
            htmlHP: '#char4hp',
            name: 'Tsubaki Yayoi',
            baseHP: 90,
            hp: 90,
            atk: 20,
            status: 'alive',
            alignment: ''
        }
    },

    enemiesDefeated: 0,

    // game initialize
    initialize: function () {
        // set characters to their default HP and alignment
        var objKeys = Object.keys(this.characters);

        $.each(objKeys, function (index) {
            var targetChar = simpleRPG.characters[objKeys[index]];
            var htmlTarget = simpleRPG.characters[objKeys[index]].htmlChar;
            var htmlCharHP = simpleRPG.characters[objKeys[index]].htmlHP;

            targetChar.hp = targetChar.baseHP;
            targetChar.alignment = '';
            $(htmlCharHP).text('HP: ' + targetChar.hp);

            if (!$(htmlTarget).hasClass('pickable')) {
                $(htmlTarget).addClass('pickable');
                $(htmlTarget).removeClass('enemy-char');
                $(htmlTarget).removeClass('player-char');
                $(htmlTarget).removeClass('opponent');
                $(htmlTarget).removeClass('hide-this');
            }

            $(htmlTarget).appendTo('#characterArea');
        });

        this.enemiesDefeated = 0;

        $('#characterSelect').removeClass('hide-this');
        $('#activeBoard').addClass('hide-this');
        $('#gameLogArea').addClass('hide-this');
        $('#enemyBenchArea').addClass('hide-this');
    },

    // player picks enemy
    // move enemy from bench to field
    pickEnemy: function (keyArray) {
        $('.enemy-char').on('click', function () {
            $(this).appendTo('#enemyArea');
            $(this).addClass('opponent');

            $.each(keyArray, function (index) {
                var htmlTarget = simpleRPG.characters[keyArray[index]].htmlChar;
                $(htmlTarget).off('click');
            })
        });

        simpleRPG.fightEnemy(keyArray);
    },

    // play match between pc and npc
    fightEnemy: function () {
        $('#attackButton').on('click', function () {
           var playerName = simpleRPG.characters[$('.player-char').attr('id')].name;
           var playerHP = simpleRPG.characters[$('.player-char').attr('id')].hp;
           var playerATK = simpleRPG.characters[$('.player-char').attr('id')].atk;
           var opponentName = simpleRPG.characters[$('.opponent').attr('id')].name;
           var opponentHP = simpleRPG.characters[$('.opponent').attr('id')].hp;
           var opponentATK = simpleRPG.characters[$('.opponent').attr('id')].atk;

           // clear previous logs
            $('#gameLog').html('');

           // deal damage to opponent and edit object data
            opponentHP -= playerATK;
            simpleRPG.characters[$('.opponent').attr('id')].hp = opponentHP;
            $('#gameLog').append(playerName + ' deals ' + playerATK + ' damage to ' + opponentName + '. <br>');

            // game state check (win, lose, next enemy)
            if (opponentHP <= 0) {
                // kill opponent
                $('#gameLog').append(opponentName + ' has been DEFEATED. <br>');
                $('#gameLog').append('>> Select a new opponent <<');
                $('.opponent').addClass('hide-this');
                $('.opponent').removeClass('opponent');



                simpleRPG.enemiesDefeated++;
                if (simpleRPG.enemiesDefeated === 3) {
                    $('#gameLog').html('<strong>YOU DEFEATED ALL CHALLENGERS</strong>');
                    simpleRPG.initialize();
                }
                else {
                    simpleRPG.pickEnemy();
                }
            }
            else {
                playerHP -= opponentATK;
                simpleRPG.characters[$('.player-char').attr('id')].hp = playerHP;
                $('#gameLog').append(opponentName + ' deals ' + opponentATK + ' damage to ' + playerName + '. <br>');

                if (playerHP <= 0) {
                    // lose game
                    $('#gameLog').html('<strong>YOU HAVE BEEN DEFEATED</strong>');
                    simpleRPG.initialize();
                }
            }

            simpleRPG.updateCards();
        });
    },

    updateCards: function () {
        var objKeys = Object.keys(this.characters);
        $.each(objKeys, function (index) {
            var targetChar = simpleRPG.characters[objKeys[index]];
            var htmlCharHP = simpleRPG.characters[objKeys[index]].htmlHP;
            $(htmlCharHP).text('HP: ' + targetChar.hp);
        });
    }
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

        simpleRPG.pickEnemy(objKeys);
    });
};