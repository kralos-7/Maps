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
      'Anáhuac': '#115811',                  
      'Lampazos_de_Naranjo': '#F1FDF9',
      'Vallecillo': '#689967',      
      'Sabinas_Hidalgo': '#115811',      
      'Paras': '#9ABE99',      
      'Villaldama': '#115811',            
      'Bustamante': '#F1FDF9',      
      'Mina': '#689967',      
      'Agualeguas': '#689967',      
      'Salinas_Victoria': '#9ABE99',      
      'Garcia': '#9ABE99',      
      'Cerralvo': '#689967',      
      'Higueras': '#115811',      
      'Los_Aldamas': '#115811',      
      'General_Trevino': '#F1FDF9',
      'Melchor_Ocampo': '#9ABE99',
      'Doctor_Coss':'#115811',
      'General_Bravo': '#F1FDF9',
      'Los_Ramones': '#689967',
      'China': '#115811',
      'Los_Herreras':'#F1FDF9',
      'General_Teran':'#689967',
      'Santa_Catarina':'#9ABE99',
      'Santiago':'#689967',
      'Allende':'#115811',
      'Montemorelos':'#689967',
      'Rayones':'#115811',
      'Linares':'#9ABE99',
      'Galeana':'#F1FDF9',
      'Iturbide':'#689967',
      'Doctor_Arroyo':'#9ABE99',
      'Aramberri':'#115811',
      'General_Zaragoza':'#689967',
      'Mier_y_Noriega':'#115811',
      'Cadereyta_Jiménez':'#115811',
      'Doctor_González':'#9ABE99',
      'Pesquería':'#F1FDF9',
      'Monterrey':'#115811',
      'Juárez':'#9ABE99',
      'Apodaca':'#115811',
      'General_Zuazua':'#F1FDF9',
      'General_Escobedo':'#F1FDF9',
      'Hidalgo':'#115811',
      'Ciénega_de_Flores':'#115811',
      'Guadalupe':'#689967',
      'Marín':'#689967',
      'Carmen':'#115811',
      'San_Pedro_Garza_García':'#689967',
      'San_Nicolás_de_los_Garza':'#9ABE99',
      'Abasolo':'#9ABE99'
       });
    
$(function() {
      
      var canvas_y = $(window).height() - 60; 
      var canvas_x = $(window).width() - 20;
      var escala;
      if(canvas_x < 500)
      {
		  escala = "1 1 0 0";
		  canvas_y = 500; 
          canvas_x = 320;
	  }else
	  {
          //escala = "2 2 100 40";
          escala = "2 2 0 0";
		  canvas_y = 991; 
		  canvas_x = 640;
	  }
      //http://www.switchonthecode.com/tutorials/xml-parsing-with-jquery
      $.ajax({
        type: 'GET',
        url: 'images/nl.xml',// .svg renamed .xml for IE support
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
