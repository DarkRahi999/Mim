$(document).ready(function(){
    $('h4').css('color','red');
});

$(document).ready(function(){
    $('pre').css('color','green');
});

$(document).ready(function(){
    $('h3').css('color','blue');
});

$(document).ready(function(){
    $('p').css('color','purple');

     
    $('p.new').css('font-weight','bold').css('font-size','20px');
    $('#nam').css('background-color','yellow').css('font-size','50px');

});

$(document).ready(function(){
    $('#m3, #m2, .n3, li').css('font-size','50px');
    $('li:eq(2)').css('color','orange')
    $('p:first').css('background-color','yellow');
    $('p:last').css('background-color','blue').css('color','yellow');
    $('p:eq(1)').css('background-color','red');

});



$(document).ready(function(){
    $('#box1').click(function(){
        $(this).css('background-color','red');
    });
    $('#box2').dblclick(function(){
        $(this).css('background-color','orange');
    });
    $('#box3').contextmenu(function(){
        $(this).css('background-color','yellow');
    });
    $('#box4').mouseenter(function(){
        $(this).css('background-color','blue');
    });
    $('#box5').mouseleave(function(){
        $(this).css('background-color','green');
    });
});

$(document).ready(function(){
    $('body').keyup(function(){
        $(this).css('background-color','yellow');
    });
});
$(document).ready(function(){
    $('body').keydown(function(){
        $(this).css('background-color','salmon');
    });
});
$(document).ready(function(){
    $('#number1').keypress(function(){
        $(this).css('background-color','red');
    });
});


$(document).ready(function(){
    $('#fname,#lname').focus(function(){
        $(this).css('background-color','skyblue');
    });
});
$(document).ready(function(){
    $('#fname,#lname').blur(function(){
        $(this).css('background-color','rgb(190, 188, 188)');
    });
    $('#fname,#lname').select(function(){
        $(this).css('background-color','rgba(83, 113, 247, 1)');
    });
    $('#language').change(function(){
        $(this).css('background-color','rgba(15, 236, 163, 1)');
    });
    $('form').submit(function(){
            alert('dane');
    });
});


$(document).ready(function(){
    $('#boxbutton1').click(function(){
        $('#redbox').hide('3s');
    });
    $('#boxbutton2').click(function(){
        $('#redbox').show('slow');
    });
});

$(document).ready(function(){
    $('#boxbutton3').click(function(){
        $('#bluebox').toggle('3s');
    });
    
});

$(document).ready(function(){
    $('#boxbutton4').click(function(){
        $('#purplebox').fadeOut('3s');
    });
    $('#boxbutton5').click(function(){
        $('#purplebox').fadeIn('slow');
    });
});




$(document).ready(function(){
    $('#boxbutton6').click(function(){
        $('#greenbox').fadeToggle('30000');
    });
    
});
$(document).ready(function(){
    $('#boxbutton7').click(function(){
        $('#graybox').fadeTo('slow','0.25');
    });
    
});


$(document).ready(function(){
    $('#boxbutton8').click(function(){
        $('#yellowbox').slideUp('30000');
    });
    $('#boxbutton9').click(function(){
        $('#yellowbox').slideDown('30000');
    });
});



$(document).ready(function(){
    $('#boxbutton10').click(function(){
        $('#blackbox').slideToggle('slow');
    });
    
});
$(document).ready(function(){
    $('#boxbutton11').click(function(){
        $('#pinkbox').animate({ left:'400px',
            opacity: '0.5',
            height: '100px',
            width: '100px'

        },'10000');
    });
    
});
$(document).ready(function(){
    $('#boxbutton12').click(function(){
      
        let box = $('rainbowkbox')

        box.animate({ width:'500px', opacity:'0.25'},'10000');
        box.animate({ height:'500px', opacity:'0.25'},'10000');
        box.animate({ width:'500px', opacity:'0.25'},'10000');
        box.animate({ height:'500px', opacity:'0.25'},'10000');
        box.animate({ width:'500px', opacity:'0.25'},'10000');
        box.animate({ height:'500px', opacity:'0.25'},'10000');
    });
    
});









