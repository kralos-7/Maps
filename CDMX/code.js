window.onresize = algo;

function algo(){
	window.location='index.html';
}

function rand(n) {
	return Math.floor(Math.random()*n);
}

// Modal ID
var modal = document.getElementById('modal-demo');
// Close modal button
var closeModal = document.getElementsByClassName('close-modal')[0];

// Close modal event listener
closeModal.addEventListener('click', function(){
    modal.classList.remove('visible');
});


var colors = [];
colors.push({
      'Gustavo_A_Madero': '#115811',      
      'Azcapotzalco': '#9ABE99',
      'Cuauhtémoc': '#F1FDF9',
      'Venustiano_Carranza': '#689967',      
      'Miguel_Hidalgo': '#115811',
      'Benito_Juárez': '#9ABE99',
      'Iztacalco': '#115811',      
      'Álvaro_Obregón': '#F1FDF9',
      'Coyoacán': '#689967',
      'Cuajimalpa': '#689967',
      'Iztapalapa': '#9ABE99',
      'La_Magdalena_Contreras': '#9ABE99',
      'Milpa_Alta': '#689967',
      'Tláhuac': '#115811',
      'Tlalpan': '#115811',
      'Xochimilco': '#F1FDF9' });
    
$(function() {
      
      var canvas_y = $(window).height() - 60; 
      var canvas_x = $(window).width() - 20;
      var escala;
      if(canvas_x < 400)
      {
		  escala = ".2 .2 0 0";
		  canvas_y = 360; 
          canvas_x = 270;
	  }else
	  {
          escala = "1 1 0 0";
		  canvas_y = 720; 
		  canvas_x = 540;
	  }
      //http://www.switchonthecode.com/tutorials/xml-parsing-with-jquery
      $.ajax({
        type: 'GET',
        url: 'images/cdmx.xml',// .svg renamed .xml for IE support
        dataType: 'xml',
        success: function(xml) {
          var r = Raphael('canvas', canvas_x , canvas_y);          
          var map = {};
          var map_shadow = {};
          var map_colors = {};
          var map_x = {};
          var map_y = {};
          var map_length = 0;
          var map_finished = {};
          var bgcolor = $('#container').css('background-color');
          var def_opacity = 0.7;
          var drag_opacity = 0.5;
          var active = null;                    
          $(xml).find('path').each(function() {
            map_length++;$('#rest').html(map_length);
            var id = (String)($(this).attr('id'));
            var path = (String)($(this).attr('d'));
            // set colors
            map_colors[id] = colors[rand(colors.length)][id];
            // set shadow map
            map_shadow[id] = r.path(path)
              .attr({fill:'gray', opacity: 0, "stroke-width": 0});
            // set main map
            map[id] = r.path(path)
              .attr({fill:map_colors[id], stroke: map_colors[id], opacity: def_opacity, scale: (escala) })
              .drag(
                // como los dx se incrementan continuamente
                // aqui calculo el diferencial continuamente
                function(dx, dy) {// move
                  /*this.translate(dx-this.dx, dy-this.dy);
                  this.dx = dx;
                  this.dy = dy;
                  this.translate(map_x[this.id]-this.getBBox().x, map_y[this.id]-this.getBBox().y);
                  map_shadow[id].attr({opacity: 0});*/
                },
                function(ox, oy) {// start
                  this.dx = 0;
                  this.dy = 0;
                  this.toFront();
                  this.attr({opacity: drag_opacity});
                },
                function() {// up
                  // trasladar a la posición original						
                  this.translate(map_x[this.id]-this.getBBox().x, map_y[this.id]-this.getBBox().y);
                  // quita el shadow que quedó en el move
                  map_shadow[id].attr({opacity: 0});
                  
                  // activar actual
                  active = this;
                  active.animate({fill: map_colors[id], opacity: def_opacity,"stroke-width": 0}, 500, '>');

                  // ocultar otras info
                  $('.info').hide();
                  // mostrar info actual
                  $('#'+id).show().css('background-color', 'white');

                  active.animate({fill: map_colors[active.id], stroke: map_colors[active.id],"stroke-width": 0}, 500, '>');
                  active.animate({fill: map_colors[id], opacity: def_opacity,"stroke-width": 0}, 500, '>');
                                    
                  // agregado	
                  //alert("click en "+id);
                  document.getElementById('nameM').innerHTML = ""+id.replace(/_/g, " ");;
                  modal.classList.toggle('visible');
                                    
                }
              )
              .hover(function() {
                this.id = id;
                this.color = map_colors[id];                                
                this.attr({cursor: 'pointer'});
                this.animate({fill: this.color, stroke: this.color,"stroke-width": 50}, 500, '>');
                                   
                  // ocultar otras info
                  $('.info').hide();
                  // mostrar info actual
                  $('#'+id).show().css('background-color', 'white');
                  //this.animate({fill: this.color, stroke: 'white'}, 500, '>');
				}, function() {
                  this.animate({fill: this.color, stroke: this.color,"stroke-width": 0}, 500, '>');
              });
            // save positions
            map_x[id] = map[id].getBBox().x;
            map_y[id] = map[id].getBBox().y;
            
          });// end each
          
          
          /*
          $('#shuffle_btn').click(function() {
            shuffle();
          });
          
          function shuffle() {
            function updateTimer() {};
            $('#score').html(0);
            map_lenght = 0;
            for (id in map) {
              map_lenght++;
              map[id].translate(-map[id].getBBox().x+rand(200), -map[id].getBBox().y+rand(200));
            }
            $('#rest').html(map_lenght);
            startTimer();
          }
          */
          
          
        } // end success
        
      });
           
});
